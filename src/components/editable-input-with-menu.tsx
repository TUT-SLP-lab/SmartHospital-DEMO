import { MoreVertical, X } from 'lucide-react';
import type { ComponentPropsWithRef } from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { Button } from './ui/button';
import { Input } from './ui/input';
interface Props extends ComponentPropsWithRef<'input'> {
  onRemove: () => void;
  onMenuSelect?: (item: string) => void;
  menuItems?: string[];
}

export const EditableInputWithMenu = ({
  value,
  onChange,
  onRemove,
  menuItems,
  onMenuSelect,
  ...props
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Input value={value} onChange={onChange} className="flex-1" {...props} />
      <div className="flex gap-1">
        {menuItems && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onRemove}
                className="h-4 w-4"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {menuItems?.map((item, i) => (
                <DropdownMenuItem key={i} onClick={() => onMenuSelect?.(item)}>
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-4 w-4"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
