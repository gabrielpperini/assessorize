import React from 'react';
import {Text, 
    View,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default LoginInput = ({
    placeholder,
    icon,
    marginTextInput,
    onFocus,
    onBlur,
    onChangeText,
    value,
    secureTextEntry
}) => {
    return(
        <View style={[{
            marginTop: marginTextInput,
        }, styles.login.view]} >
            <TextInput style={styles.login.textInput} 
            maxLength={14} 
            placeholder={placeholder}
            onFocus={() => { onFocus() }}
            onBlur={() => { onBlur() }}
            onChangeText={text => {onChangeText(text)}}
            value={value}
            secureTextEntry={secureTextEntry}
            />
            <Icon
                name={icon}
                color={"#c97334"}
                size={30}
                style={styles.login.icon}
            />
        </View>
    );
}