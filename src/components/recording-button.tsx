import { Loader2, Mic } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

interface Props {
  onClick: () => void;
  recording: boolean;
  loading?: boolean;
}

export const RecordingButton = ({ onClick, recording, loading }: Props) => {
  return (
    <Button
      variant={recording ? 'destructive' : 'secondary'}
      size="xl"
      onClick={onClick}
      className={cn('rounded-full', recording && 'animate-pulse bg-red-600')}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        "REC"
      )}
    </Button>
  );
};
