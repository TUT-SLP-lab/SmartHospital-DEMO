import { PageTitle } from '@/components/page-title';

import { RefSyncEval } from './_components/ref-sync-eval';

export default function RefSyncEvalPage() {
  return (
    <div>
      <PageTitle>評価: 参照による連携手法</PageTitle>
      <div className="mt-8">
        <RefSyncEval />
      </div>
    </div>
  );
}
