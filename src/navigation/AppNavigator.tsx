import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tab" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default AppNavigator;