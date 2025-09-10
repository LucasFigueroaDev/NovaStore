import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import { useGetProductsQuery } from '../../services/shopApi';
import { useDispatch } from 'react-redux';
import { setProductSelected } from '../../store/slices/productsSlice';
import DiscountOffers from '../../components/DiscountOffers';
const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { data: products, isLoading, error } = useGetProductsQuery();
    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            // Selecciona 5 productos aleatorios
            const shuffled = [...products].sort(() => 0.5 - Math.random());
            setRandomProducts(shuffled.slice(0, 5));
        }
    }, [products]);

    const handleSelectProduct = (item) => {
        dispatch(setProductSelected(item));
        navigation.navigate('Detalles', { product: item });;
    };


    const renderProduct = ({ item }) => (
        <Pressable style={styles.card} onPress={() => handleSelectProduct(item)}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
        </Pressable >
    );

    if (isLoading) return <Text style={{ textAlign: 'center', marginTop: 50 }}>Cargando productos...</Text>;
    if (error) return <Text style={{ textAlign: 'center', marginTop: 50 }}>Error al cargar productos</Text>;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://i.ibb.co/DDdr8VdQ/Novastore.png' }}
                style={styles.banner}
            />

            <View style={styles.bannerTitle}>
                <Text style={styles.bannerText}>¡Productos Destacados!</Text>
            </View>
            <FlatList
                data={randomProducts}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />
            <DiscountOffers products={products} navigation={navigation} />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 10 },
    banner: { width: '100%', height: 150, resizeMode: 'cover', marginBottom: 20 },
    bannerTitle: {backgroundColor: '#2a8bf3ff', padding: 2, alignItems: 'center', marginBottom: 10,borderRadius: 10 },
    bannerText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
    card: { height: 220, margin: 5, backgroundColor: '#f5f5f5', borderRadius: 8, padding: 10, alignItems: 'center' },
    image: { width: '100%', height: 150, resizeMode: 'contain' },
    title: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginVertical: 5 },
    price: { fontSize: 12, color: '#007AFF' },
});
