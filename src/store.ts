import { configureStore, combineReducers } from '@reduxjs/toolkit';
import testReducer from './reducers/testReducer';
import redirectorReducer from './reducers/redirectorReducer';
import calibrationReducer from './reducers/calibrationReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
const rootReducer = combineReducers({tests: testReducer, redirector: redirectorReducer, calibrator:calibrationReducer })


export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector