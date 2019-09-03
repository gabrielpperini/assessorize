import React, {Component} from 'react';
import {Text, 
    Image,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import assets from '../../assets';
import styles from '../styles'
import { LoginApi }  from '../../Api'
import LoginInput from '../components/LoginInput';


export default class Login extends Component {
    
    static navigationOptions = {
        header: null,
    };
    
    
    constructor(props){
        super(props);
    }

    state={
        marginImage: 75,
        marginTextInput: 25,
        marginButton: 30,
        user: null,
        pass: null,
        error: 'none',
        load: false
    }

    login = async () => {
        this.setState({load: true});
        if(this.state.user || this.state.pass){
            var login = await LoginApi(this.state.user, this.state.pass);
            if(login){
                this.props.navigation.replace({
                    routeName: 'Home'
                });
                this.setState({user: '', pass: '', error: 'none'});
            }else{
                this.setState({error: 'flex'});
            }
        }else{
            this.setState({error: 'flex'});
        }
        this.setState({load: false});
        
    }

    onFocus = () => {this.setState({
        marginImage: 10,
        marginTextInput: 10,
        marginButton: 15
    })}
    onBlur = () => {this.setState({
        marginImage: 75,
        marginTextInput: 25,
        marginButton: 30
    })}
    onChangeUser = (user) => {
        this.setState({user});
    }
    onChangePass = (pass) => {
        this.setState({pass});
    }

    render() {
        return (
            <ImageBackground style={styles.default.imageBackground}
            source={assets.bgLogin}
            >
            
                <Image source={assets.icon} style={[{
                   marginVertical: this.state.marginImage,
                }, styles.login.image]} />

                <LoginInput
                placeholder="user"
                icon="user"
                marginTextInput={this.state.marginTextInput}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChangeText={this.onChangeUser}
                value={this.state.user}
                />
                <LoginInput
                placeholder="password"
                icon="lock"
                marginTextInput={this.state.marginTextInput}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChangeText={this.onChangePass}
                value={this.state.pass}
                secureTextEntry
                />               
               
                <Text style={{color: '#d80000', display: this.state.error }}>O usuário está incorreto!</Text>
                <TouchableOpacity style={[{
                    marginTop: this.state.marginButton,
                }, styles.login.button]}
                onPress={() => this.login()}
                >
                    <Text style={[styles.login.buttonText,{display: this.state.load ? 'none' : 'flex'}]}>Entrar</Text>
                    <ActivityIndicator style={{display: this.state.load ?'flex'  : 'none'}} size={40} color={"#c97334"} />
                </TouchableOpacity>

            </ImageBackground>
        );
    }
}


