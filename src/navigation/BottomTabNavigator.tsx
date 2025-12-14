import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import CreateMurmurScreen from '../screens/app/CreateMurmurScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen}  options={{
        title: "Home",
        tabBarIcon: () => null,
      }}/>
      <Tab.Screen name="CreateMurmur" component={CreateMurmurScreen} options={{
        title: "Create Murmur",
        tabBarIcon: () => null,
      }}/>
      <Tab.Screen name="Profile" component={ProfileScreen}  options={{
        title: "Profile",
        tabBarIcon: () => null,
      }}/>
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;