import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';

const TicketScreen = ({ navigation }) => {
    const route = useRoute();
    const { orderId, orderData } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Gracias por tu compra!</Text>
            <Text style={styles.subtitle}>Tu pedido ha sido procesado exitosamente.</Text>

            <View style={styles.ticketBox}>
                <Text style={styles.label}>Número de Orden:</Text>
                <Text style={styles.orderId}>{orderId}</Text>

                <Text style={styles.label}>Total Pagado:</Text>
                <Text style={styles.totalText}>${orderData.total}</Text>

                <Text style={styles.label}>Método de Pago:</Text>
                <Text style={styles.paymentMethod}>{orderData.paymentMethod}</Text>
            </View>

            <Pressable
                style={styles.homeButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Volver al Inicio</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
        color: '#555',
    },
    ticketBox: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        maxWidth: 400,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    orderId: {
        fontSize: 20,
        color: 'blue',
    },
    totalText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#444',
    },
    paymentMethod: {
        fontSize: 16,
    },
    homeButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TicketScreen;