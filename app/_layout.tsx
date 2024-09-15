import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/providers/redux/store";
import { RootSiblingParent } from "react-native-root-siblings";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Root() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <GestureHandlerRootView>
          <Slot />
        </GestureHandlerRootView>
      </RootSiblingParent>
    </Provider>
  );
}
