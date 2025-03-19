import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='xl:flex'>
      <div className='max-xl:fixed max-xl:bottom-0 max-xl:w-full flex flex-col xl:flex-row xl:min-h-screen'>
        <Sidebar />
      </div>
      <main className='flex flex-col px-4 py-6 md:px-10 md:py-8 w-full max-xl:mb-20'>
        {children}
      </main>
    </div>
  );
}
