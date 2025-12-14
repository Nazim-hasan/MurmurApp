import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import CreateMurmurScreen from "../screens/app/CreateMurmurScreen";
import MurmurDetailsScreen from "../screens/app/MurmurDetailsScreen";
import FriendsProfileScreen from "../screens/app/FriendsProfileScreen";

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
      <Stack.Screen name="FriendsProfile" component={FriendsProfileScreen} />
      <Stack.Screen name="MurmurDetails" component={MurmurDetailsScreen} options={{
        presentation: 'modal'
      }}/>
    </Stack.Navigator>
  );
}

export default AppNavigator;