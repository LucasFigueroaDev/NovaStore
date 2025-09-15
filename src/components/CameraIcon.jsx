import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

const CameraIcon = () => {
    return (
        <View style={styles.iconContainer}>
            <Icon name="photo-camera" size={40} color="black"  />
        </View>
    )
}

export default CameraIcon

const styles = StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})