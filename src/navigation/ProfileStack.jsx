import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from '../screens/profile/ProfileScreens';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Perfil">
            <Stack.Screen name="Perfil" component={ProfileScreen} />
        </Stack.Navigator>
    );
};

export default ProfileStack;