import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, ActivityIndicator, Image } from "react-native";
import { useSignupMutation } from "../../services/authApi";
import Toast from "react-native-toast-message";
import formStyles from '../../styles/formStyles'

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signup, { isLoading, isError, error, isSuccess, data }] = useSignupMutation();

    const handleSignup = () => {
        if (!email || !password || !confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Error al registrarse',
                text2: 'Todos los campos son obligatorios',
            })
            return;
        }
        if (password !== confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Error al registrarse',
                text2: 'Las contraseñas no coinciden',
            })
            return;
        }
        signup({ email, password });
    };

    useEffect(() => {
        if (isSuccess && data) {
            Toast.show({
                type: 'success',
                text1: 'Registro exitoso',
                text2: 'Ahora puedes iniciar sesión',
            })
            navigation.navigate("Login");
        }
        if (isError) {
            const errorMessage = error?.data?.error?.message || "Error al registrarse. Inténtalo de nuevo.";
            Toast.show({
                type: 'error',
                text1: 'Error al registrarse'
            })
        }
    }, [isSuccess, isError, data, error]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://i.ibb.co/DDdr8VdQ/Novastore.png' }} style={styles.img} />
            <Text style={styles.subTitle}>Crea tu cuenta</Text>
            <View style={formStyles.form}>
                <TextInput
                    onChangeText={setEmail}
                    placeholderTextColor={'#b8b2b2ff'}
                    placeholder="Email"
                    style={formStyles.input}
                    value={email}
                />
                <TextInput
                    onChangeText={setPassword}
                    placeholderTextColor={'#b8b2b2ff'}
                    placeholder='Contraseña'
                    style={formStyles.input}
                    secureTextEntry
                    value={password}
                />
                <TextInput
                    onChangeText={setConfirmPassword}
                    placeholderTextColor={'#b8b2b2ff'}
                    placeholder='Repetir contraseña'
                    style={formStyles.input}
                    secureTextEntry
                    value={confirmPassword}
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={{ ...styles.whiteText, ...styles.underLineText }}>
                        Inicia sesión
                    </Text>
                </Pressable>
            </View>
            <Pressable style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Crear cuenta</Text>
            </Pressable>
        </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    img: { width: '100%', height: 150, resizeMode: 'cover', marginBottom: 20 },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 40,
        textAlign: "center",
    },
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
});