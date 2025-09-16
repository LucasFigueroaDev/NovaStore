import * as ImagePicker from 'expo-image-picker';
import CameraIcon from '../../components/CameraIcon'
import AppButton from '../../components/AppButton';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateProfilePictureMutation } from '../../services/profileApi'
import { setImage, clearUser } from '../../store/slices/userSlice';
const ProfileScreens = () => {
    const user = useSelector(state => state.user.email);    
    const localId = useSelector(state => state.user.localId);
    const image = useSelector(state => state.user.image);
    
    const [triggerUpdateProfilePicture, result] = useUpdateProfilePictureMutation();
    const dispatch = useDispatch();
    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true
        });
        if (!result.canceled) {
            const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
            dispatch(setImage(imgBase64));
            triggerUpdateProfilePicture({ localId: localId, image: imgBase64 });
        }
    }
    const handleLogout = () => {
        dispatch(clearUser());
    };
    return (
        <View style={styles.containerProfile}>
            <View style={styles.containImg}>
                {
                    image ?
                        <Image source={{ uri: image }} resizeMode="cover" style={styles.imageProfile} />
                        :
                        <Text style={styles.textprofile}>{user}</Text>
                }
                <Pressable onPress={pickImage} style={styles.button}>
                    <CameraIcon />
                </Pressable>
            </View>
            <Text style={styles.nameprofile}>{user}</Text>
            <AppButton title="Cerrar Sesión" onPress={handleLogout} />
        </View>
    )
}

export default ProfileScreens

const styles = StyleSheet.create({
    containerProfile: {
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containImg: {
        width: 150,
        height: 150,
        borderRadius: 128,
        backgroundColor: '#4469e6ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageProfile: {
        width: 150,
        height: 150,
        borderRadius: 128,
    },
    textprofile: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    button: {
        position: 'absolute',
        right: 10,
        bottom: 0,
    },
    nameprofile: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    }
})