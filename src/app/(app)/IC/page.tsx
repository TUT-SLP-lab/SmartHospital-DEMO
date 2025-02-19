import { ICview } from '@/app/(app)/IC/_components/IC-view';
import { PageTitle } from '@/components/page-title';

export default function SOAPTopPage() {
  return (
    <div>
      <PageTitle>IC</PageTitle>
      <div className="mt-4">
        <ICview />
      </div>
    </div>
  );
}
