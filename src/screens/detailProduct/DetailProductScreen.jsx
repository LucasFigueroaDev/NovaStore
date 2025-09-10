import { Text, Image, StyleSheet, ScrollView, useWindowDimensions, Pressable } from "react-native";
import { addToCart } from "../../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
const DetailProductScreen = ({ navigation }) => {
    const product = useSelector(state => state.products.productSelected);
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));

        Toast.show({
            type: "success",
            text1: "Producto agregado",
            position: "top",
            visibilityTime: 2000,
        });
    };
    return (
        <ScrollView contentContainerStyle={styles.container} onPress={() => navigation.navigate('HomeStack', { screen: 'Home' })}>
            <Image source={{ uri: product.thumbnail }} alt={product.title} width='100%' height={width * 0.7} resizeMode="contain" />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.discount}>Descuento: {product.discountPercentage}% abonando en efectivo o transferencia</Text>
            <Text style={styles.price}>${product.price}</Text>
            {
                product.stock > 0
                    ? <Text style={styles.stock}>Stock disponible: {product.stock}</Text>
                    : <Text style={{ color: "red" }}>Sin stock</Text>
            }
            <Pressable style={styles.addButton} onPress={() => handleAddToCart(product)}>
                <Text style={styles.addButtonText}>Agregar al carrito</Text>
            </Pressable>
        </ScrollView>
    );
}

export default DetailProductScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 5
    },
    brand: {
        fontSize: 16,
        color: "gray",
        marginBottom: 10
    },
    price: {
        fontSize: 18,
        color: "#007AFF",
        marginBottom: 5
    },
    discount: {
        fontSize: 14,
        textAlign: "center",
        color: "green",
        marginVertical: 5
    },
    stock: {
        fontSize: 14,
        color: "gray",
        marginBottom: 15
    },
    description: {
        fontSize: 14,
        textAlign: "center"
    },
    addButton: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16
    }
});
