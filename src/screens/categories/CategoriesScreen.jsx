import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, Pressable } from 'react-native'
import { useDispatch } from 'react-redux'
import { setCategorySelected } from '../../store/slices/productsSlice'
import { useGetCategoriesQuery } from '../../services/shopApi';
const CategoriesScreens = ({ navigation }) => {
    const dispatch = useDispatch();
    const { data: categories, isLoading, error } = useGetCategoriesQuery();

    const handleSelectCategory = (category) => {
        dispatch(setCategorySelected(category));
        navigation.navigate('Productos');
    };

    const renderCategoryItem = ({ item }) => {
        return (
            <Pressable onPress={() => handleSelectCategory(item.title)} style={styles.item}>
                <Text style={styles.text}>{item.title}</Text>
                <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
            </Pressable>
        )
    };

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando categorías...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loaderContainer}>
                <Text style={{ color: 'red' }}>Error al cargar categorías</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

export default CategoriesScreens

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    text: {
        fontSize: 18,
        color: '#000'
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});