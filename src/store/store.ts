import {combineReducers, configureStore} from '@reduxjs/toolkit';
import wordsReducer from './words/slice';
import currentWordReducer from './currentWord/slice';

const rootReducer = combineReducers({
  wordsReducer,
  currentWordReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
