import { ICounterSize } from "@/components/shared/ui/Counter/Counter.props";

interface checkRangeParams {
  value: number;
  setValue: (value: number) => void;
  counterSize: ICounterSize;
  replace: number;
}

export const checkRange = ({ value, setValue, counterSize, replace }: checkRangeParams) => {
  if (value < counterSize.min) {
    return setValue(replace);
  }
  if (value > counterSize.max) {
    return setValue(counterSize.max);
  }
  return null;
};
