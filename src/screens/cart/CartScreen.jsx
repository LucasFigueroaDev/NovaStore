// screens/CartScreen.js
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, removeFromCart, clearCart } from "../../store/slices/cartSlice";
import Toast from "react-native-toast-message";
const CartScreen = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const handleIncrease = (id) => {
        dispatch(increment({ id }));
    };

    const handleDecrease = (id) => {
        dispatch(decrement({ id }));
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart({ id }));
        Toast.show({
            type: "success",
            text1: "Producto eliminado del carrito",
            position: "top",
            visibilityTime: 2000,
        });
    };

    const handleClear = () => {
        dispatch(clearCart());
        Toast.show({
            type: "success",
            text1: "Carrito vaciado",
            position: "top",
            visibilityTime: 2000,
        });
    };

    const getTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2);
    };

    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <View style={styles.counter}>
                <TouchableOpacity style={styles.button} onPress={() => handleDecrease(item.id)}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.count}>{item.count}</Text>
                <TouchableOpacity style={styles.button} onPress={() => handleIncrease(item.id)}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.id)}>
                    <Text style={styles.removeText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {cartItems.length === 0 ? (
                <Text style={styles.emptyText}>Tu carrito está vacío</Text>
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                    />
                    <Text style={styles.total}>Total: ${getTotal()}</Text>
                    <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                        <Text style={styles.clearText}>Vaciar Carrito</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#f9f9f9",
    },
    itemContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
        color: "#333",
    },
    price: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#007AFF",
        marginBottom: 10,
    },
    counter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: "#EAF4FF",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    buttonText: {
        color: "#007AFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    count: {
        fontSize: 16,
        fontWeight: "500",
        marginHorizontal: 10,
    },
    removeButton: {
        marginLeft: 10,
        backgroundColor: "#FFE5E5",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    removeText: {
        color: "#FF3B30",
        fontSize: 14,
        fontWeight: "600",
    },
    total: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "right",
        marginVertical: 15,
        color: "#333",
    },
    emptyText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 50,
        color: "#777",
    },
    clearButton: {
        marginTop: 10,
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    clearText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});

