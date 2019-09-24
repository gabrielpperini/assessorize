import React from 'react';
import {Text, TouchableOpacity } from 'react-native';

export default RegistroBtn = ({
    data,
    onPress
}) =>{
    var assuntoNome = '';
    if(data.assuntoNome.length > 23){
        assuntoNome = data.assuntoNome.substr(0,23) + '...'
    }else{
        assuntoNome = data.assuntoNome;
    }
    return(
        <TouchableOpacity style={styles.registros.button}
        onPress={() => {onPress()}}
        >
            <Text style={styles.registros.buttonText}>{assuntoNome}</Text>
        </TouchableOpacity>
    );
}