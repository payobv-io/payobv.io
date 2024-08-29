import Header from '@/components/ui/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <Header />
      {children}
    </div>
  );
}
