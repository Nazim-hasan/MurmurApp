import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/app/HomeScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import CreateMurmurScreen from '../screens/app/CreateMurmurScreen';
import FriendsScreen from '../screens/app/FriendsScreen';
import HomeIcon from '../assets/svg/HomeIcon';
import FriendIcon from '../assets/svg/FriendIcon';
import PersonIcon from '../assets/svg/PersonIcon';
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
      {/* <Tab.Screen name="CreateMurmur" component={CreateMurmurScreen} options={{
        title: "Create Murmur",
        tabBarIcon: () => null,
      }}/> */}
      <Tab.Screen name="Profile" component={ProfileScreen}  options={{
        title: "Profile",
        tabBarIcon: ({focused}) => <PersonIcon color={focused ? Theme.colors.primary : Theme.colors.black} />,
      }}/>
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;