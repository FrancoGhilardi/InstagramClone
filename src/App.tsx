import React from "react";
import { Provider } from "react-redux";
import { store } from "./core/store/store";
import { AppLayout } from "./ui/templates/AppLayout";
import { RootNavigator } from "./navigation/RootNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <AppLayout>
        <RootNavigator />
      </AppLayout>
    </Provider>
  );
}
