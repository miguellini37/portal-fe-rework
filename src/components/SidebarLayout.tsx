import { Sidebar } from './Sidebar';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ width: '210px', flexShrink: 0 }}>
        <Sidebar />
      </div>
      <main style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>{children}</main>
    </div>
  );
};
