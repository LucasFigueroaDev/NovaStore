import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from '../../screens/cart/CartScreen';
import CheckoutScreen from "../../screens/checkout/CheckoutScreen";
import TicketScreen from "../../screens/ticketScreen/TicketScreen";
import HomeScreen from "../../screens/home/HomeScreens";

const Stack = createNativeStackNavigator();

const CartStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Tu carrito">
            <Stack.Screen name="Tu carrito" component={CartScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="Ticket" component={TicketScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default CartStack;