import { Header } from '@/components/header';
import { ModeToggle } from '@/components/mode-toggle';
import { PageSelect } from '@/components/page-select';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        actions={
          <div className="flex-0 flex gap-1">
            <ModeToggle />
            <PageSelect />
          </div>
        }
      />
      <main className="mx-auto max-w-screen-md px-4 py-8">{children}</main>
    </>
  );
}
