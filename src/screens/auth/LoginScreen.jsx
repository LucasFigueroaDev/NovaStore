import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, Pressable, ActivityIndicator, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { saveSession, clearSession } from "../../db";
import { useDispatch } from "react-redux";
import { setUserEmail, setLocalId } from "../../store/slices/userSlice";
import { useLoginMutation } from "../../services/authApi";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [persistSession, setPersistSession] = useState(false);
    const [triggerLogin, result] = useLoginMutation()
    const dispatch = useDispatch();

    const handleLogin = async () => {
        triggerLogin({ email, password });
    };

    useEffect(() => {
        (async () => {
            if (result.status === "fulfilled") {
                try {
                    if (persistSession) {
                        await saveSession(result.data.idToken, result.data.email);
                        dispatch(setUserEmail(result.data.email))
                        dispatch(setLocalId(result.data.idToken))
                    } else {
                        await clearSession();
                    }
                    dispatch(setUserEmail(result.data.email))
                    dispatch(setLocalId(result.data.idToken))
                } catch (error) {
                    console.log("Error al guardar sesión:", error);
                }
            }
        })()
    }, [result])


    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://i.ibb.co/DDdr8VdQ/Novastore.png' }} style={styles.img} />
            <Text style={styles.subTitle}>Inicia sesión</Text>
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
                    placeholder='Password'
                    style={styles.input}
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

export default LoginScreen;

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
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
});