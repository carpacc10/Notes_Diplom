import { StyleSheet, Text, SafeAreaView } from "react-native";
import NoteScreen from "./app/screens/NoteScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteDelail from "./app/components/NoteDetail";
import { NavigationContainer } from "@react-navigation/native";
import colors from "./app/misc/colors";
import NoteProvider from "./app/contexts/NoteProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{
            headerTitle: "",
            headerTransparent: true,
            headerTintColor: colors.PRIMARY,
          }}
        >
          <Stack.Screen component={NoteScreen} name="NoteScreen" />
          <Stack.Screen component={NoteDelail} name="NoteDelail" />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
