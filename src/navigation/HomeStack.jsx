import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreens";
import DetailProductScreen from "../screens/detailProduct/DetailProductScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detalles" component={DetailProductScreen} />
        </Stack.Navigator>
    );
}