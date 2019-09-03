import { AsyncStorage } from 'react-native'
import OneSignal from 'react-native-onesignal';

const base_url = "http://agencialazo.com.br/assessorize/app/";

const request = async ({url , error , body , text }) => {
    var data = null;
    let post = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }
    await fetch(base_url + url , body ? post : null)
    .then((response) => text ? response.text() : response.json() )
    .then(async res => {
        data = res;
    }).catch(err => {
        error(err);
        data = null;
    });
    return data;
};

const LoginApi = async (users , password) => {
    var data = await request({
        url: 'login',
        error: (err) => {
            console.log(err);
            alert('Conecte a internet!');
        },
        body: {
            user: users,
            password: password
        },
        // text: true
    });
    console.log(data);
    if(data.user){
        await AsyncStorage.setItem('user', JSON.stringify(data.user) );
        OneSignal.setExternalUserId(data.user.user);
        return true
    }else{
        if(data.hora){
            alert('Fora do horário de expediente!');
        }
        return false;
    }
}

const LoginApiUpdate = async (id) => {
    var data = await request({
        url: 'login/' +id,
        error: (err) => {
            console.log(err);
        },
        // text: true
    });
    if(data.user){
        await AsyncStorage.setItem('user', JSON.stringify(data.user) );
        OneSignal.setExternalUserId(data.user.user);
        return true
    }else{
        return false
    }
}

const Setores = async () => {
    var setores = await AsyncStorage.getItem('setores');
    var data = await request({
        url: 'setores',
        error: (err) => {
            console.log(err); 
        }
    });
    if(data){
        await AsyncStorage.setItem('setores', JSON.stringify(data));
        return data
    }else{
        if(setores){
            return JSON.parse(setores);
        }else{
            alert('Conecte à Internet!');
        }
    }
}

const RccSubmit = async ( body , responsavel ) => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    let segment = responsavel ? responsavel : '';
    if(responsavel){
        body['concluinte'] = user.id;
    }else{
        body['requisitante'] = user.id;
    }
    body['userId'] = user.id;
    var data = await request({
        url: 'rcc/' + segment,
        error: (err) => {
            console.log(err);
            alert('Falha no envio de dados tente novamente!');
        },
        body: body,
        // text: true
    });
    return data
}

const RccSubmitParcial = async ( body ) => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    body['concluinte'] = user.id;
    body['userId'] = user.id;
    var data = await request({
        url: 'parcial',
        error: (err) => {
            console.log(err);
            alert('Falha no envio de dados tente novamente!');
        },
        body: body,
        // text: true
    });
    return data
}

const RegistrosPorUser = async () =>{
    let user = await AsyncStorage.getItem('user');
    let registros = await AsyncStorage.getItem('registros');
    user = JSON.parse(user);
    var data = await request({
        url: 'registros/' + user.id,
        error: (err) => {
            console.log(err); 
        },
    });
    if(data){
        await AsyncStorage.setItem('registros' , JSON.stringify(data));
        return data;
    }else{
        if(registros){
            return JSON.parse(registros);
        }else{
            alert('Conecte à Internet!');
        }
    }
}

const registrosAtendidos = async () => {
    let user = await AsyncStorage.getItem('user');
    let atendidas = await AsyncStorage.getItem('atendidas');
    user = JSON.parse(user);
    var data = await request({
        url: 'atendidos/'+ user.id,
        error: (err) => {
            console.log(err);
        },
    });
    if(data){
        await AsyncStorage.setItem('atendidas' , JSON.stringify(data));
        return data;
    }else{
        if(atendidas){
            return JSON.parse(atendidas);
        }else{
            alert('Conecte à Internet!');
        }
    }
}


export { 
    LoginApi, 
    Setores, 
    RccSubmit, 
    RccSubmitParcial,
    RegistrosPorUser,
    LoginApiUpdate,
    registrosAtendidos
}