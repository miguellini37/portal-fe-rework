import { Sidebar } from './Sidebar';

interface SidebarLayoutProps {
    children: React.ReactNode;
  }

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ width: '250px', flexShrink: 0 }}>
          <Sidebar />
        </div>
        <main style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    );
  };