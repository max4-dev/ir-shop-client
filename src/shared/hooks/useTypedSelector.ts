import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "@/src/app/redux/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
