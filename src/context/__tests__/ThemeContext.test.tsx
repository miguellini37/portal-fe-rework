import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';

// Mock matchMedia
const mockMatchMedia = (matches: boolean) => {
  const listeners: Array<(e: { matches: boolean }) => void> = [];
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: (_: string, cb: (e: { matches: boolean }) => void) => listeners.push(cb),
      removeEventListener: jest.fn(),
    })),
  });
  return listeners;
};

const ThemeDisplay: React.FC = () => {
  const { theme, resolved, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolved}</span>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('system')}>Set System</button>
    </div>
  );
};

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

describe('ThemeProvider', () => {
  it('defaults to system theme', () => {
    mockMatchMedia(false); // system prefers light
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme').textContent).toBe('system');
    expect(screen.getByTestId('resolved').textContent).toBe('light');
  });

  it('resolves to dark when system prefers dark', () => {
    mockMatchMedia(true);
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(screen.getByTestId('resolved').textContent).toBe('dark');
  });

  it('allows user to override to dark', () => {
    mockMatchMedia(false);
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Set Dark'));
    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(screen.getByTestId('resolved').textContent).toBe('dark');
    expect(localStorage.getItem('portal-theme')).toBe('dark');
  });

  it('removes localStorage when set to system', () => {
    localStorage.setItem('portal-theme', 'dark');
    mockMatchMedia(false);
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Set System'));
    expect(localStorage.getItem('portal-theme')).toBeNull();
  });

  it('reads stored theme from localStorage', () => {
    localStorage.setItem('portal-theme', 'dark');
    mockMatchMedia(false);
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(screen.getByTestId('resolved').textContent).toBe('dark');
  });

  it('adds dark class to documentElement when resolved dark', () => {
    mockMatchMedia(false);
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Set Dark'));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class when switching to light', () => {
    document.documentElement.classList.add('dark');
    mockMatchMedia(false);
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Set Light'));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
