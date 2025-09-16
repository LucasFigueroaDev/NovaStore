import { View, Text, StyleSheet} from 'react-native';

const DiscountOffers = ({ products, navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Text style={styles.bannerText}>¡Ofertas Especiales!</Text>
            </View>
            <Text style={styles.sectionTitle}>Super descuentos en productos seleccionados</Text>
            <Text style={styles.sectionTitle}>Abonando en efectivo tenes hasta un 20% de descuento</Text>
        </View>
    );
};

export default DiscountOffers;

const styles = StyleSheet.create({
    container: { marginVertical: 3 },
    banner: { 
        backgroundColor: '#2a8bf3ff', 
        padding: 2, 
        alignItems: 'center', 
        marginBottom: 10, 
        borderRadius: 10 },
    bannerText: { 
        color: '#fff', 
        fontSize: 18, 
        fontWeight: 'bold' },
    sectionTitle: { 
        fontSize: 16, 
        textAlign: 'center', 
        marginBottom: 10 },
});
