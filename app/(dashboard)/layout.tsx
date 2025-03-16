import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <div className='fixed max-xl:bottom-0 w-full flex flex-col xl:flex-row xl:h-screen'>
        <Sidebar />
      </div>
      <main>{children}</main>
    </div>
  );
}
