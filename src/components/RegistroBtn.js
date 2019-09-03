import React from 'react';
import {Text, TouchableOpacity } from 'react-native';

export default RegistroBtn = ({
    data,
    onPress
}) =>{
    return(
        <TouchableOpacity style={styles.registros.button}
        onPress={() => {onPress()}}
        >
            <Text style={styles.registros.buttonText}>{data.assuntoNome}</Text>
        </TouchableOpacity>
    );
}