import React, {Component} from 'react';
import {Text, 
    View,
    ImageBackground,
    AsyncStorage,
} from 'react-native';
import assets from '../../assets';
import styles from '../styles'
import { LoginApiUpdate }  from '../../Api'
import HomeBtn from '../components/HomeBtn';


export default class Home extends Component {
    
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        headerLeft: null,
    };

    state={
    }

    async componentDidMount(){
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        if(!user){
            this.props.navigation.replace({
                routeName: 'Login'
            });
        }else{
            user = await LoginApiUpdate(user.id);
            if(!user){
                this.props.navigation.replace({
                    routeName: 'Login'
                });
            }
        }
        // await AsyncStorage.removeItem('registros');
    }

    render() {
        return (
            <ImageBackground style={styles.default.imageBackground}
            source={assets.bgLogin}
            >
                <View style={{
                    height: '60%',
                    marginTop: '40%',
                    justifyContent: 'space-evenly',
                }}>
                    <HomeBtn text='RCC' onPress={() => {this.props.navigation.navigate('Rcc')} }/>
                    <HomeBtn text='Registros' onPress={() => {this.props.navigation.navigate('Registros')} }/>
                    <HomeBtn text='Atendidas' onPress={() => {this.props.navigation.navigate('Atendidas')} }/>
                </View>
            </ImageBackground>
        );
    }
}
