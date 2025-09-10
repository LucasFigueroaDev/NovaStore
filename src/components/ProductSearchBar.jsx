import { StyleSheet, TextInput, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ProductSearchBar = ({ setSearch }) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Buscar producto..."
                onChangeText={(text) => setSearch(text)}
                style={styles.input}
            />
            <Ionicons name="search" size={24} color="black" style={styles.icon} />
        </View>
    );
}

export default ProductSearchBar

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
        marginTop: 20,
        marginBottom: 10
    },
    icon: {
        marginRight: 5
    },
    input: {
        flex: 1,
        height: "100%"
    }
});