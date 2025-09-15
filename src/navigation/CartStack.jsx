import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from '../screens/cart/CartScreen';

const Stack = createNativeStackNavigator();

const CartStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Tu carrito">
            <Stack.Screen name="Tu carrito" component={CartScreen} />
        </Stack.Navigator>
    );
};

export default CartStack;