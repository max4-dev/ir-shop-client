import { counterSizeI } from "@/components/shared/ui/Counter/Counter.props";

interface checkRangeParams {
  value: number;
  setValue: (value: string) => void;
  counterSize: counterSizeI;
  replace: number | string;
}

export const checkRange = ({value, setValue, counterSize, replace}: checkRangeParams) => {
  if (value < counterSize.min) {
    return setValue(String(replace))
  } if(value > counterSize.max) {
    return setValue(String(counterSize.max))
  }
  return null;
}