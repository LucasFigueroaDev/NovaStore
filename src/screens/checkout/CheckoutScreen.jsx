import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { useState } from 'react';
import { saveOrder } from '../../services/firebaseApi';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/slices/cartSlice';
import Checkbox from 'expo-checkbox';
import Toast from 'react-native-toast-message';
import formStyles from '../../styles/formStyles';

const CheckoutScreen = ({ navigation, route }) => {
    const { cartItems, total } = route.params;
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [isCardPayment, setIsCardPayment] = useState(false);
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleCheckout = async () => {
        if (loading) return;

        if (!name || !address || !phone) {
            Toast.show({
                type: 'error',
                text1: 'Por favor, completa todos los campos',
            })
            return;
        }

        if (isCardPayment && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc)) {
            Toast.show({
                type: 'error',
                text1: 'Por favor, completa todos los detalles de la tarjeta',
            })
            return;
        }

        setLoading(true);

        const orderData = {
            buyer: { name, address, phone },
            items: cartItems.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                count: item.count,
            })),
            total,
            paymentMethod: isCardPayment ? 'Tarjeta' : 'Efectivo',
            createdAt: new Date().toISOString(),
        };

        try {
            const orderId = await saveOrder(orderData); 
            dispatch(clearCart());
            navigation.navigate('Ticket', {
                orderId: orderId,
                orderData: orderData
            });
        } catch (error) {
            console.error("Error al crear la orden:", error);
            Toast.show({
                type: 'error',
                text1: 'Error al crear la orden intenta de nuevo',
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Resumen de la Compra</Text>
            {cartItems.map(item => (
                <View key={item.id} style={styles.itemContainer}>
                    <Text>{item.title} ({item.count})</Text>
                    <Text>${(item.price * item.count).toFixed(2)}</Text>
                </View>
            ))}
            <Text style={styles.totalText}>Total: ${total}</Text>

            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Datos de Contacto</Text>
                <TextInput
                    style={formStyles.input}
                    placeholder="Nombre completo"
                    placeholderTextColor={'#000'}
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={formStyles.input}
                    placeholder="Dirección"
                    placeholderTextColor={'#000'}
                    value={address}
                    onChangeText={setAddress}
                />
                <TextInput
                    style={formStyles.input}
                    placeholder="Teléfono"
                    placeholderTextColor={'#000'}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            </View>
            <View style={styles.paymentContainer}>
                <Text style={styles.formTitle}>Método de Pago</Text>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={!isCardPayment}
                        onValueChange={() => setIsCardPayment(false)}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Efectivo</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={isCardPayment}
                        onValueChange={() => setIsCardPayment(true)}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Tarjeta de Crédito/Débito</Text>
                </View>

                {isCardPayment && (
                    <View style={styles.cardForm}>
                        <TextInput
                            style={formStyles.input}
                            placeholder="Número de tarjeta"
                            keyboardType="numeric"
                            value={cardDetails.number}
                            onChangeText={text => setCardDetails({ ...cardDetails, number: text })}
                        />
                        <View style={styles.cardRow}>
                            <TextInput
                                style={[formStyles.input, styles.halfInput]}
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChangeText={text => setCardDetails({ ...cardDetails, expiry: text })}
                            />
                            <TextInput
                                style={[formStyles.input, styles.halfInput]}
                                placeholder="CVC"
                                keyboardType="numeric"
                                value={cardDetails.cvc}
                                onChangeText={text => setCardDetails({ ...cardDetails, cvc: text })}
                            />
                        </View>
                    </View>
                )}
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleCheckout}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Procesando...' : 'Finalizar Compra'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'right',
    },
    formContainer: {
        marginTop: 30,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paymentContainer: {
        marginTop: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        marginRight: 8,
    },
    label: {
        fontSize: 16,
    },
    cardForm: {
        marginTop: 10,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
    button: {
        backgroundColor: '#04af4bff',
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;