import FormPage from "./src/screens/FormPage";
import HomeScreen from "./src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalkThroughPage from "./src/screens/WalkThroughPage";
import SelectDateAndTime from "./src/screens/SelectDateAndTime";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import ThankyouScreen from "./src/screens/ThankyouScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Helvetica: require("./assets/Fonts/Helvetica.ttf"),
    "Helvetica-Bold": require("./assets/Fonts/Helvetica-Bold.ttf"),
    "Helvetica-light": require("./assets/Fonts/helvetica-light-587ebe5a59211.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WalkThroughPage">
        <Stack.Screen
          name="WalkThroughPage"
          component={WalkThroughPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectDateAndTime"
          component={SelectDateAndTime}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FormPage"
          component={FormPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ThankyouScreen"
          component={ThankyouScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
