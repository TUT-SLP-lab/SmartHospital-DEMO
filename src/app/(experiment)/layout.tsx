import { Header } from '@/components/header';
import { ModeToggle } from '@/components/mode-toggle';

export default function ExperimentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header actions={<ModeToggle />} />
      <main className="mx-auto max-w-screen-md px-4 py-8">{children}</main>
    </>
  );
}
