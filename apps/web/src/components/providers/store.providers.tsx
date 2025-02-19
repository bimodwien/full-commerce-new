'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/lib/redux/store';
import AuthProvider from './auth.providers';
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>{children}</AuthProvider>
      </PersistGate>
    </Provider>
  );
}
