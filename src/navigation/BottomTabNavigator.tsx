import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FriendIcon from '../assets/svg/FriendIcon';
import HomeIcon from '../assets/svg/HomeIcon';
import PersonIcon from '../assets/svg/PersonIcon';
import FriendsScreen from '../screens/app/FriendsScreen';
import HomeScreen from '../screens/app/HomeScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import { Theme } from '../theme/Theme';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen}  options={{
        title: "Home",
        tabBarIcon: ({ focused }) => <HomeIcon color={focused ? Theme.colors.primary : Theme.colors.black} />,
      }}/>
      <Tab.Screen name="Friends" component={FriendsScreen} options={{
        title: "Friends",
        tabBarIcon: ({ focused }) => <FriendIcon color={focused ? Theme.colors.primary : Theme.colors.black} />,
      }}/>
      <Tab.Screen name="Profile" component={ProfileScreen}  options={{
        title: "Profile",
        tabBarIcon: ({focused}) => <PersonIcon color={focused ? Theme.colors.primary : Theme.colors.black} />,
      }}/>
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;