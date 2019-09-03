import React from 'react';
import {Text, TouchableOpacity } from 'react-native';

export default HomeBtn = ({
    text,
    onPress,
    styleButton,
    styleText
}) =>{
    return(
        <TouchableOpacity style={[styles.home.button,styleButton]}
        onPress={() => {onPress()}}
        >
            <Text style={[styles.home.buttonText,styleText]}>{text}</Text>
        </TouchableOpacity>
    );
}