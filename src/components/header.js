import { StyleSheet ,Text,View,useColorScheme} from "react-native"

import React from 'react';
import { Colors } from "react-native/Libraries/NewAppScreen";
const isDarkMode = useColorScheme() === 'dark';
export const AppHeader=({title})=>{
    return (
        <Text style = {styles.headerStyle}>{title}</Text>
    );
}

const styles = StyleSheet.create({
    headerStyle:{
        fontSize:18,
        color : isDarkMode? Colors.white : Colors.black
    }
})