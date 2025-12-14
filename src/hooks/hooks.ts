// app/hooks.ts (or similar file)
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

// Create a custom typed hook for the selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// It is also best practice to do the same for useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
