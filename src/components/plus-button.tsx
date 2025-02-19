import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

interface Props {
  onClick: () => void;
}

export const PlusButton = ({ onClick }: Props) => {
  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={onClick}
      className={cn('rounded-full')}
    >
      <Plus className="h-4 w-4" />
    </Button>
  );
};
