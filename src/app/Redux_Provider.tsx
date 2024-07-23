"use client";
import { Provider } from "react-redux";
import React from "react";
import { store, persistor } from "@/redux/store"; // Ensure this path is correct
import { PersistGate } from "redux-persist/integration/react";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
