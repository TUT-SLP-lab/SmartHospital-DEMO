import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Dummy } from '@/app/(app)/swipe/_components/Types/type';

interface Props {
  onSelect: (selectedId: string) => void; // 選択時に渡すコールバック
  dummy: Dummy; // ダミーデータの配列
}

export const DnPSelect = ({ dummy, onSelect }: Props) => {
  return (
    <Select onValueChange={(value) => onSelect(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="選択してください" />
      </SelectTrigger>
      <SelectContent>
        {dummy.map((item) => (
          <SelectItem key={item.ID} value={item.ID}>
            {item.Name.lastname
              ? `${item.Name.lastname} ${item.Name.firstname}`
              : item.Name.firstname}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
