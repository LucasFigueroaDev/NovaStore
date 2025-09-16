import { Text, Pressable, StyleSheet } from 'react-native'

const AppButton = ({ title, onPress, color = 'red', textColor = 'white', disabled = false }) => {
    return (
        <Pressable onPress={onPress} disabled={disabled} style={[styles.button, { backgroundColor: color }]}>
            <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AppButton