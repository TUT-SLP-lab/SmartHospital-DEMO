import { ArrowUp  } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

interface Props {
  onClick: () => void;
}

export const ReturnButton = ({ onClick }: Props) => {
  return (
    <Button
      variant="secondary"
      size="icon2"
      onClick={onClick}
      className={cn('rounded-full')}
    >
      <ArrowUp  className="h-4 w-4" />
    </Button>
  );
};
