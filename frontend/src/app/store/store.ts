import { setupListeners } from '@reduxjs/toolkit/query';
import articlesApi from '@/entities/article/api';
import { combineReducers, configureStore, Action } from '@reduxjs/toolkit';
import userSlice from '@/entities/user/model';
import { resetApp } from './actions';
import authApi from '@/shared/api/endpoints/auth';
import errorHandlerMiddleware from './middlewares/errorHandler';
import usersApi from '@/entities/user/api';
import notificationsSlice from '@/widgets/notifications/model/slice';

const combinedReducer = combineReducers({
  [notificationsSlice.name]: notificationsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [articlesApi.reducerPath]: articlesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

const rootReducer = (state: any, action: Action) =>
  combinedReducer(action.type === resetApp.toString() ? undefined : state, action);

export const store = configureStore({
  reducer: rootReducer as typeof combinedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      errorHandlerMiddleware,
      articlesApi.middleware,
      authApi.middleware,
      usersApi.middleware
    ),
});

setupListeners(store.dispatch);
