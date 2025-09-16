import HomeStack from '../home/HomeStack'
import CategoriesStack from '../categories/CategoriesStack'
import CartStack from '../cart/CartStack'
import ProfileStack from '../profile/ProfileStack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

const tab = createBottomTabNavigator()
export default function BottomTabs() {
    return (
        <tab.Navigator
            screenOptions={
                {
                    headerShown: false, 
                    tabBarActiveTintColor: '#007AFF',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: { backgroundColor: '#fff' },
                    tabBarShowLabel: false,
                }
            }>
            <tab.Screen name="HomeStack" component={HomeStack} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}/>
            <tab.Screen name="CategoriesStack" component={CategoriesStack} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} /> }}/>
            <tab.Screen name="Cart" component={CartStack} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} /> }} />
            <tab.Screen name="PerfilProfile" component={ProfileStack} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> }}/>
        </tab.Navigator>
    )
}

