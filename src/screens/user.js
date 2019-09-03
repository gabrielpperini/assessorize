import React, {Component} from 'react';
import {Text, 
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    AsyncStorage,
    Keyboard,
    ActivityIndicator,
    FlatList,
    ScrollView
} from 'react-native';
import assets from '../../assets';
import styles from '../styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import HomeBtn from '../components/HomeBtn';



export default class User extends Component {
    
    constructor(props){
        super(props);
    }

    state={
        user: {}
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <Text style={{
                textAlign: 'center',
                fontSize: 20,
                color: "#c97334"
            }}>{navigation.getParam('nameUser')}</Text>,
            headerRight: null,
            headerTitleContainerStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                left: 0
            },
        }
    };
    
    async componentDidMount(){
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        this.setState({user});
        this.props.navigation.setParams({nameUser: user.nome + ' ' + user.sobrenome});
    }

    info = (key,value) => (
        <View style={styles.user.info}>
            <Text style={styles.user.infoTitle}>{key}</Text>
            <Text style={styles.user.infoText}>{value}</Text>
        </View>
    )

    render() {
        return (
            <ImageBackground style={styles.default.imageBackground}
            source={assets.bgLogin}>
            <View style={styles.user.view}>
                <Icon
                name="user"
                color="#c97334"
                size={40}
                style={{
                    textAlign: 'center',
                }}
                />
                {this.info('Conectado como:', this.state.user.nome + ' ' + this.state.user.sobrenome)}
                {this.info('Usuário:',this.state.user.user )}
                {this.state.user.responsabilidade ?
                <View style={styles.user.setores}>
                    <Text style={styles.user.infoTitle}>Responsável pelo(s) Setores:</Text>
                    <FlatList
                    data={this.state.user.responsabilidade}
                    style={styles.user.flatList}
                    // horizontal
                    numColumns={2}
                    
                    renderItem={({item}) => {
                        return(
                        <Text style={styles.user.itemSetores}>{item.text}</Text>
                        )
                    }}
                    keyExtractor={item => item.id}
                    />
                </View>:null}
            </View>
            <HomeBtn onPress={async ()=>{
                await AsyncStorage.removeItem('user');
                await AsyncStorage.removeItem('registros');
                this.props.navigation.replace({
                    routeName: 'Login'
                });
            }} text={'Desconectar'}
            styleButton={{
                marginTop: 15
            }}
            />
        </ImageBackground>
        );
    }
}
