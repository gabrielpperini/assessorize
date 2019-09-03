/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createDrawerNavigator, createStackNavigator , createAppContainer } from "react-navigation";
import React, { Component } from 'react';
import { View , Image , TouchableOpacity} from 'react-native';
import OneSignal from 'react-native-onesignal'
import assets from "./assets";
import Icon from 'react-native-vector-icons/FontAwesome'

import Login from './src/screens/Login';
import Home from "./src/screens/Home";
import Rcc from "./src/screens/Rcc";
import Registros from "./src/screens/Registros";
import User from "./src/screens/user";
import RccRes from "./src/screens/RccRes";
import RccView from "./src/screens/RccView";
import Atendidas from "./src/screens/Atendidas";
import RccParcial from "./src/screens/RccParcial";

const t = createStackNavigator({
    Login: Login,
    Home: Home,
    Rcc: Rcc,
    RccRes: RccRes,
    RccView: RccView,
    RccParcial: RccParcial,
    Registros: Registros,
    User: User,
    Atendidas: Atendidas,
},  {
        initialRouteName: 'Login',
        headerMode: 'screen',
        defaultNavigationOptions: ({navigation}) =>  ({
            headerStyle: {
                backgroundColor: '#721e24',
                height: 75
            },
            headerTitle: <Image source={assets.iconeHeader} style={{
                width: 90 - (90 / 15),
                height: 40 - (40 / 15),
                tintColor: "#c97334"
            }} />,
            headerTitleContainerStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                left: 50
            },
            headerRight: <TouchableOpacity onPress={()=>{navigation.navigate('User')}} style={{padding: 20}}><Icon
            name="user"
            color="#c97334"
            size={30}
            onPress={()=>{navigation.navigate('User')}}
            style={{
                  textAlign: 'center',
              }}
            /></TouchableOpacity>,
            headerTintColor: "#c97334"
        })
    }  
)

const Router = createAppContainer(t);

export default class App extends Component {

  componentDidMount(){
    OneSignal.init('84c1964d-bdb8-42ca-80d1-607157c57ed3');
    OneSignal.addEventListener("received", this.receivedPush);
    OneSignal.addEventListener("opened", this.openedPush);
    OneSignal.addEventListener("ids", this.idsPush);
  }
    
  receivedPush(push){
    console.log("Received Push:", push);
  }
  openedPush(push){
    console.log("Opened Push:", push);
  }
  idsPush(push){
    console.log("IDS Push:", push);
  }

  render(){
      console.disableYellowBox = true;
      return(
          <View style={{flex: 1}}>
              <Router/>
          </View>
      )
  }
} 

