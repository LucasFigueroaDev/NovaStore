import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, ActivityIndicator, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUserEmail, setLocalId } from "../../store/slices/userSlice";
import { useSignupMutation } from "../../services/authApi";

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signup, { isLoading, isError, error, isSuccess, data }] = useSignupMutation();
    const dispatch = useDispatch();

    const handleSignup = () => {
        if (!email || !password || !confirmPassword) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }
        signup({ email, password, returnSecureToken: true });
    };

    useEffect(() => {
        if (isSuccess && data) {
            alert("¡Registro exitoso! Por favor, inicia sesión.");
            navigation.navigate("Login");
        }
        if (isError) {
            console.error("Error en el registro:", error);
            const errorMessage = error?.data?.error?.message || "Error al registrarse. Inténtalo de nuevo.";
            alert(errorMessage);
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
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={setEmail}
                    placeholderTextColor={'#b8b2b2ff'}
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                />
                <TextInput
                    onChangeText={setPassword}
                    placeholderTextColor={'#b8b2b2ff'}
                    placeholder='Contraseña'
                    style={styles.input}
                    secureTextEntry
                    value={password}
                />
                <TextInput
                    onChangeText={setConfirmPassword}
                    placeholderTextColor={'#b8b2b2ff'}
                    placeholder='Repetir contraseña'
                    style={styles.input}
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
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: "#fff",
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