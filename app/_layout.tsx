import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/providers/redux/store";
import { RootSiblingParent } from "react-native-root-siblings";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SessionProvider } from "@/providers/ctx";

export default function Root() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <GestureHandlerRootView>
          <SessionProvider>
            <Slot />
          </SessionProvider>
        </GestureHandlerRootView>
      </RootSiblingParent>
    </Provider>
  );
}
