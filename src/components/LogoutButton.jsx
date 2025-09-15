import { Pressable, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearUser } from '../store/slices/userSlice';
const LogoutButton = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(clearUser());
    };

    return (
        <Pressable 
            style={styles.button} 
            onPress={handleLogout}
        >
            <Text style={styles.buttonText}>Cerrar sesión</Text>
        </Pressable>
    );
};

export default LogoutButton;

const styles = StyleSheet.create({
    button: {
        width: '80%',
        paddingVertical: 12,
        backgroundColor: '#e74c3c', 
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});