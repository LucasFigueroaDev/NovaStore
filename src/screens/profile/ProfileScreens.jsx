import { StyleSheet, Text, View } from 'react-native'

export default function ProfileScreens() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>ProfileScreens</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00cdff'
    },
    text: {
        fontSize: 18,
        textTransform: 'uppercase'
    }
})