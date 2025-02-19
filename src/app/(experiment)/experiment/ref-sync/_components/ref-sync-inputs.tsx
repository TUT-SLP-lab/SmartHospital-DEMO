import { EditableInputWithMenu } from '@/components/editable-input-with-menu';
import type { PickUpPosition, RoundsKeyWordValues } from '@/hooks/useRefSync';

interface Props {
  originalText: string;
  startText: RoundsKeyWordValues;
  pickUpPositions: PickUpPosition[];
  onChange: (value: string) => void;
}

export const RefSyncInputs = ({
  originalText,
  startText,
  pickUpPositions,
  onChange,
}: Props) => {
  return (
    <div className="space-y-3">
      {pickUpPositions.map((position, index) => {
        return (
          <EditableInputWithMenu
            // NOTE: フォームのフォーカスをそのままにしたい為indexをkeyに入れている
            key={index}
            value={originalText.substring(
              position.startIndex + startText.length,
              position.endIndex,
            )}
            onChange={(e) => {
              const text = originalText;
              const endIndex =
                position.endIndex - position.startIndex + startText.length >
                e.target.value.length
                  ? position.startIndex +
                    startText.length +
                    e.target.value.length +
                    1
                  : position.endIndex;

              const changedText =
                text.slice(0, position.startIndex + startText.length) +
                e.target.value +
                text.slice(endIndex);
              onChange(changedText);
            }}
            onRemove={() => {
              const text = originalText;
              const removedText =
                text.slice(0, position.startIndex) +
                text.slice(position.endIndex);
              onChange(removedText);
            }}
          />
        );
      })}
    </div>
  );
};
