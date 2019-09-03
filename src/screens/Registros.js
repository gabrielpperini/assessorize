import React, {Component} from 'react';
import {Text, 
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    AsyncStorage,
    Dimensions,
    ActivityIndicator,
    FlatList,
    RefreshControl
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import assets from '../../assets';
import styles from '../styles'
import { Setores, RegistrosPorUser }  from '../../Api'
import RegistroBtn from '../components/RegistroBtn';
import { NavigationEvents } from 'react-navigation';

const netArr = [{id: '1' , assuntoNome: 'Conecte à Internet!' , nada: true}]

export default class Registros extends Component {
    
    constructor(props){
        super(props);
    }

    state={
        refreshing: false,
        init: true,
        load: false,
        mode: 0,
        registros: [],
        setores: [],
        novas: true
    }

    static navigationOptions = {
        headerTitle: <Text style={{
            textAlign: 'center',
            fontSize: 20,
            color: "#c97334"
        }}>Registros</Text>,

    };

    async componentDidMount(){
        this.setState({load: true});
        var setores = await Setores();
        var registros = await RegistrosPorUser();
        this.setState({registros,setores});
        this.setState({load: false,init: false});
    }


    onRefresh = async () => {
        this.setState({refreshing: true});
        var setores = await Setores();
        console.log(setores);
        var registros = await RegistrosPorUser();
        this.setState({registros,setores});
        this.setState({refreshing: false});
    }

    onFocus = async () => {
        if(!this.state.init){
            var setores = await Setores();
            var registros = await RegistrosPorUser();
            this.setState({registros,setores});
        }
    }

    render() {
        return (
            <ImageBackground style={styles.default.imageBackground}
            source={assets.bgLogin}
            >
                <NavigationEvents
                onDidFocus={this.onFocus}
                />
                <View style={styles.registros.header}>
                    <SegmentedControlTab
                    values={["Novas", "Enviadas"]}
                    selectedIndex={this.state.mode}
                    onTabPress={mode => {
                        console.log(mode);
                        let novas = true;
                        if(mode === 0){
                            novas = true;
                        }else{
                            novas = false;
                        }
                        this.setState({mode,novas});
                    }}
                    tabStyle={styles.registros.tabStyle}
                    tabTextStyle={styles.registros.tabTextStyle}
                    activeTabStyle={styles.registros.activeTabStyle}
                    activeTabTextStyle={styles.registros.activeTabTextStyle}
                    />
                </View>
                <ActivityIndicator style={{
                    display: this.state.load ? 'flex'  : 'none',
                    marginTop: 75
                }} size={100} color={'#721e24'} />
                <FlatList
                refreshControl={
                    <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    />
                }
                data={this.state.registros ? this.state.registros[this.state.mode] : netArr}
                contentContainerStyle={styles.registros.flatList}
                renderItem={({ item }) => (
                    <RegistroBtn 
                    data={item}
                    onPress={()=>{
                        if(!item.nada){
                            
                            let params = {
                                item: item , 
                                setores: this.state.setores, 
                            }
                        
                            let route = '';

                            switch (this.state.mode) {
                                case 0:
                                    route = 'RccRes'
                                break;
                                
                                case 1:
                                    route = 'RccView'
                                    params.respondidas = false;
                                break;
                            }
                            // console.log(params);
                            this.props.navigation.navigate(route,params);
                        }
                    }}
                    />
                )}
                keyExtractor={item => item.id}
                extraData={this.state.registros ? this.state.registros[this.state.mode] : netArr}
                />
            </ImageBackground>
        );
    }
}
