import { View, Text, FlatList, Image, StyleSheet, Pressable, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useGetProductsByCategoryQuery } from '../../services/shopApi';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setProductSelected } from '../../store/slices/productsSlice';
import ProductSearchBar from '../../components/ProductSearchBar';


const ProductsScreen = ({ navigation }) => {
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const category = useSelector(state => state.products.categorySelected);
    const { data: productsFilteredByCategory, isLoading, error } = useGetProductsByCategoryQuery(category)
    const dispatch = useDispatch();
    const handleSelectProduct = (product) => {
        dispatch(setProductSelected(product));
        navigation.navigate('Detalles');
    };
    const { width } = useWindowDimensions();
    const numColumns = 2;
    const cardWidth = (width - 10 * 2 - 5 * (numColumns * 2)) / numColumns;

    useEffect(() => {
        if (search) {
            const filteredProducts = productsFilteredByCategory.filter(product => product.title.toLowerCase().includes(search.toLocaleLowerCase()));
            setProductsFiltered(filteredProducts);
        } else {
            setProductsFiltered(productsFilteredByCategory);
        }
    }, [category, search, productsFilteredByCategory]);
    const renderItem = ({ item }) => (
        <Pressable style={[styles.card, { width: cardWidth }]} onPress={() => handleSelectProduct(item)}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
        </Pressable>
    );

    if (isLoading) return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color="#007AFF" />
        </View>
    );

    if (error) return (
        <View style={styles.loader}>
            <Text>Error al cargar productos</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ProductSearchBar setSearch={setSearch} />
            <FlatList
                data={productsFiltered}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                numColumns={numColumns}
            />
        </View>
    );
}

export default ProductsScreen

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 10 },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    card: {
        margin: 5,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        height: 220, // altura fija para consistencia
    },
    image: { width: 100, height: 100, resizeMode: 'contain' },
    title: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginVertical: 5 },
    price: { fontSize: 12, color: '#007AFF',  },
});