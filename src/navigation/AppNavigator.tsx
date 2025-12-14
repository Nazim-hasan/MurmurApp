import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import CreateMurmurScreen from "../screens/app/CreateMurmurScreen";

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
      <Stack.Screen name="CreateMurmur" component={CreateMurmurScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;