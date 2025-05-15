import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import type { AppDispatch, RootState } from './types';

export const useDispatch = () => useReduxDispatch<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
