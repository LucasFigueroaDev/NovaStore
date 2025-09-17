import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, Pressable, Switch } from "react-native";
import { saveSession, clearSession } from "../../db";
import { useDispatch } from "react-redux";
import { setUserEmail, setLocalId, setImage } from "../../store/slices/userSlice";
import { useLoginMutation } from "../../services/authApi";
import formStyles from '../../styles/formStyles'
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [persistSession, setPersistSession] = useState(false);
    const [triggerLogin, result] = useLoginMutation()
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const data = await triggerLogin({ email, password }).unwrap();
            if (persistSession) {
                await saveSession(data.localId, data.email, data.image);
            } else {
                await clearSession();
            }
            dispatch(setUserEmail(data.email))
            dispatch(setLocalId(data.localId))
            dispatch(setImage(data.image || null))
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error al iniciar sesión',
                text2: error.message || 'Intente nuevamente',
            })
            throw new Error(error.message || 'Error en el login');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://i.ibb.co/DDdr8VdQ/Novastore.png' }} style={styles.img} />
            <Text style={styles.subTitle}>Inicia sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={setEmail}
                    placeholderTextColor={'#000'}
                    placeholder="Email"
                    style={formStyles.input}
                    value={email}
                />
                <TextInput
                    onChangeText={setPassword}
                    placeholderTextColor={'#000'}
                    placeholder='Password'
                    style={formStyles.input}
                    secureTextEntry
                    value={password}
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={{ ...styles.whiteText, ...styles.underLineText }}>
                        Crea una
                    </Text>
                </Pressable>
            </View>
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </Pressable>
            <View style={styles.rememberMe}>
                <Text style={{ color: '#b8b2b2ff' }}>¿Mantener sesión iniciada?</Text>
                <Switch
                    onValueChange={setPersistSession}
                    value={persistSession}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    img: { 
        width: '100%', 
        height: 150, 
        resizeMode: 'cover', 
        marginBottom: 20 },
    subTitle: {
        fontSize: 18,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    footTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    whiteText: {
        color: '#b8b2b2ff',
    },
    underLineText: {
        textDecorationLine: 'underline',
        marginLeft: 5,
    },
    button: {
        height: 50,
        backgroundColor: "#2a8bf3ff",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
});

export default LoginScreen;