import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../screens/categories/CategoriesScreen";
import ProductsScreen from "../screens/products/ProductsScreen";
import DetailProductScreen from "../screens/detailProduct/DetailProductScreen";

const Stack = createNativeStackNavigator();

export default function CategoriesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Categorias" component={CategoriesScreen} />
            <Stack.Screen name="Productos" component={ProductsScreen} />
            <Stack.Screen name="Detalles" component={DetailProductScreen} />
        </Stack.Navigator>
    );
}