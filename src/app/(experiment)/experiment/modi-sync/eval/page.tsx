import { PageTitle } from '@/components/page-title';

import { ModiSyncEval } from './_components/modi-sync-eval';

export default function ModiSyncEvalPage() {
  return (
    <div>
      <PageTitle>評価: 修正による連携手法</PageTitle>
      <div className="mt-8">
        <ModiSyncEval />
      </div>
    </div>
  );
}
