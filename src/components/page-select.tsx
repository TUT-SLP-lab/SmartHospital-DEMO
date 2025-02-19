'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const PageSelect = () => {
  const router = useRouter();
  const pathName = usePathname();

  const onValueChange = (value: string) => {
    if (value === pathName) return;

    router.push(value);
  };

  return (
    <Select value={pathName} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="/">トップページ</SelectItem>
        <SelectItem value="/vital">Vital</SelectItem>
        <SelectItem value="/soap">SOAP</SelectItem>
        <SelectItem value="/swipe">SWIPE</SelectItem>
        <SelectItem value="/IC">IC</SelectItem>
      </SelectContent>
    </Select>
  );
};
