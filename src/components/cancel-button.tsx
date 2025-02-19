import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

interface Props {
  onClick: () => void;
  recording: boolean;
  loading?: boolean;
}

export const CancelButton = ({ onClick, recording, loading }: Props) => {
  return (
    <Button
      variant={recording ? 'destructive' : 'outline'}
      size="icon"
      onClick={onClick}
      className={cn('rounded-full', recording && 'animate-pulse bg-red-600')}
      disabled={loading}
    ><X className="h-4 w-4" /></Button>
  );
};
