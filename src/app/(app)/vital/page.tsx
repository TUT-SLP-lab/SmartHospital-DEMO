import { VITALView } from './_components/vital-view';
import { PageTitle } from '@/components/page-title';


export default function SOAPTopPage() {
  return (
    <div>
      <PageTitle>VITAL</PageTitle>
      <div className="mt-4">
        <VITALView />
      </div>
    </div>
  );
}