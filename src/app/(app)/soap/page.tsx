import { SOAPView } from '@/app/(app)/soap/_components/soap-view';
import { PageTitle } from '@/components/page-title';


export default function SOAPTopPage() {
  return (
    <div>
      <PageTitle>SOAP</PageTitle>
      <div className="mt-4">
        <SOAPView />
      </div>
    </div>
  );
}
