import BottomTabs from "./tabs/BottomTabs";
import AuthStack from "./auth/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { setLocalId, setUserEmail } from "../store/slices/userSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSession, initSessionTable } from "../db";
import { ActivityIndicator, View } from "react-native";

const MainNavigator = () => {
    const email = useSelector(state=>state.user.email);
    const localId = useSelector(state=>state.user.localId);
    const [checkingSession, setCheckingSession] = useState(true);
    const dispatch = useDispatch();

    useEffect(()=>{
        const checking = async () =>{
            await initSessionTable();
            const session = await getSession();
            if(session){
                dispatch(setUserEmail(session.email));
                dispatch(setLocalId(session.localId));
            }
            setCheckingSession(false);
        }
        checking();
    },[])
        
    if (checkingSession) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={'#007AFF'} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {
                email ? <BottomTabs /> : <AuthStack />
            }
        </NavigationContainer>
    )
}

export default MainNavigator