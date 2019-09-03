import React, {Component} from 'react';
import {Text, 
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    AsyncStorage,
    RefreshControl,
    ActivityIndicator,
    FlatList,
    Modal,
    Animated,
    Dimensions
} from 'react-native';
import assets from '../../assets';
import styles from '../styles'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/FontAwesome'
import { registrosAtendidos, Setores } from '../../Api';
import { NavigationEvents } from 'react-navigation';

const dim = Dimensions.get('screen');

Filters = [
    {
        id: 'classificacao',
        name: 'Classificação Rcc',
        children: [
            {name: 'Retrabalho', id: 'classificacao/0' },
            {name: 'Solicitação', id: 'classificacao/1' },
            {name: 'Reclamação', id: 'classificacao/2' },
        ]
    },
    {
        id: 'motivoClassificacao',
        name: 'Motivo Classificação Rcc',
        children: [
            {name: 'Interna (escritório)', id: 'motivoClassificacao/0' },
            {name: 'Externa (Cliente)' , id: 'motivoClassificacao/1' },
        ]
    },
    {
        id: 'participacao',
        name: 'Participação',
        children: [
            {name: 'Requisitante' , id: 'participacao/requisitante'},
            {name: 'Concluinte' , id: 'participacao/concluinte'}
        ]
    },
    {
        id: 'concluido',
        name: 'Concluído',
        children: [
            {name: 'Não' , id: 'concluido/0'},
            {name: 'Sim' , id: 'concluido/1'},
            {name: 'Parcial' , id: 'concluido/2'},
        ]
    },
    {
        id: 'setorIndex',
        name: 'Setores',
        children: []
    },
]

export default class Atendidas extends Component {
    
    constructor(props){
        super(props);
        this.list = null;
        this.SectionedMultiSelect= null;
    }

    state={
        atendidas: [],
        loading: false,
        refreshing: false,
        filterText: '',
        filterItems: [],
        setores: []
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <Text style={{
                textAlign: 'center',
                fontSize: 20,
                color: "#c97334"
            }}>Atendidas</Text>,
            headerTitleContainerStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                left: 50
            },
        }
    };
    
    async componentDidMount(){
        this.setState({loading: true});
        let atendidas = await registrosAtendidos();
        let setoresN = await Setores();
        let setores = setoresN;
        for (const setor of setoresN) {
            setor.id = 'setorIndex/'+setor.id;
        }
        Filters[4].children = setoresN;
        this.setState({loading: false, atendidas,setores});
    }

    renderItem = ({item}) => {
        let image = null;
        let route = 'RccView';
        switch (item.concluido) {
            case '0':
                image = assets.error
                break;
            case '1':
                image = assets.check
                break;
            case '2':
                image = assets.warning;
                route = 'RccParcial'
                break;
        }
        return(
            <TouchableOpacity style={styles.atendidas.Item}
            onPress={() => {
                if(!item.nada){
                    let params = {
                        item: item , 
                        setores: this.state.setores, 
                        respondidas: true
                    }
                    this.props.navigation.navigate(route,params);
                }
            }}
            >
                <Text style={styles.atendidas.text}>{item.assuntoNome}</Text>
                <Image
                source={image}
                style={styles.atendidas.icon}
                />
            </TouchableOpacity>
        )
    }

    onFilterItemsChange = (filterItems) => {
        this.setState({ filterItems });
        // console.log(filterItems);
    };

    onRefresh = async () => {
        this.setState({refreshing: true});
        let atendidas = await registrosAtendidos();
        this.setState({refreshing: false, atendidas});
    }
    onFocus = async () => {
        let atendidas = await registrosAtendidos();
        this.setState({atendidas});
    }

    filterData = item => {
        var filterRegex = new RegExp(String(this.state.filterText),'i'); 
        var text = false;
        var filter = false;
        let filters = {};
        if(this.state.filterItems.length > 0 || this.state.filterText){
            if(this.state.filterItems.length > 0){
                // console.log(this.state.filterItems, 'filter antes');
                filters.classificacao = [];
                filters.motivoClassificacao = [];
                filters.participacao = [];
                filters.concluido = [];
                filters.setorIndex = [];
                for (const filter of this.state.filterItems) {
                    let arr = filter.split('/');
                    filters[arr[0]].push(arr[1]);
                }
                // console.log(filters, 'filter dps');

                var newFilters = [];
                for (const k in filters) {
                    if(filters[k].length !== 0){
                        newFilters[k] = filters[k];
                    }
                }
                // console.log(newFilters, 'new filter dps');
                let arrayF = []

                for (const key in newFilters) {
                    arrayF[key] = [];
                    if(key === 'setorIndex'){
                        for (const setor of item[key]) {
                            if(newFilters[key].indexOf(setor) !== -1){
                                arrayF[key].push(true);
                            }else{
                                arrayF[key].push(false);
                            }
                        }
                    }else if(key === 'participacao'){
                        for (let part of newFilters[key]) {
                            arrayF[key].push(item[key][part]);
                        }
                    }else{
                        if(newFilters[key].indexOf(item[key]) !== -1){
                            arrayF[key].push(true);
                        }else{
                            arrayF[key].push(false);
                        }
                    }


                }

                let newArrF = []

                for (const k in arrayF) {
                    if(arrayF[k].indexOf(true) !== -1){ newArrF.push(true) }else{ newArrF.push(false) };
                }

                filter = (newArrF.indexOf(false) !== -1) ? false : true ;
                // console.log(newArrF.indexOf(false) , 'teste');
                // console.log(newArrF,'arrayf');
                // console.log(filter, 'filter');
                // console.log('///////////////////////////////');
            }
            if(this.state.filterText){
                text = filterRegex.test(item.assuntoNome) || filterRegex.test(item.solucao) || filterRegex.test(item.descricao);
            }
            if(this.state.filterItems.length > 0 && this.state.filterText){ return text && filter; }else
            if(this.state.filterItems.length > 0){return filter;}else
            if(this.state.filterText){return text;}
        }else{
            return true
        }
        
    }

    render() {
        const filteredData = this.state.atendidas.filter(this.filterData);
        return (
            <View>
                <NavigationEvents
                onDidFocus={this.onFocus}
                />
                <View style={styles.atendidas.viewFilter}>
                    <TextInput 
                    value={this.state.filterText}
                    onChangeText={filterText => this.setState({filterText})}
                    style={styles.atendidas.search} 
                    placeholder="Busque..."
                    clearButtonMode="always"
                    />
                    <TouchableOpacity
                    onPress={() => this.SectionedMultiSelect._toggleSelector()}
                    style={styles.atendidas.filtersButton}
                    >
                        <Icon
                        name='th-list'
                        color="#c97334"
                        size={22}
                        />
                        <Text style={styles.atendidas.filtersText}>Filtros ({filteredData.length})</Text>
                    </TouchableOpacity>
                    { (this.state.filterItems.length > 0) ? 
                    <TouchableOpacity
                    onPress={() => this.setState({filterText: '',filterItems: []})}
                    style={styles.atendidas.filtersButton}
                    >
                        <Icon
                        name='filter'
                        color="#c97334"
                        size={22}
                        />
                        <Text style={styles.atendidas.filtersText}>Limpar Filtros</Text>
                    </TouchableOpacity>
                    : null}
                    <SectionedMultiSelect
                    ref={(ref) => this.SectionedMultiSelect = ref }
                    items={Filters}
                    uniqueKey="id"
                    subKey="children"
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={this.onFilterItemsChange}
                    selectedItems={this.state.filterItems}
                    showChips={false}
                    hideSearch
                    hideSelect
                    confirmText="Confirmar"
                    colors={{
                        primary: '#721e24'
                    }}
                    styles={{
                        button:{
                            backgroundColor: '#721e24'
                        },
                        confirmText: {
                            fontSize: 22,
                            color: "#c97334",
                        },
                        itemText: {
                            textTransform: 'capitalize',
                            fontSize: 20
                        },
                        subItemText: {
                            textTransform: 'capitalize',
                            fontSize: 18,
                            marginLeft: 20
                        }
                    }}
                    />
                </View>
                
                <FlatList
                ref={ref=>{this.list = ref}}
                refreshControl={
                    <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    />
                }
                // data={this.state.atendidas}
                data={filteredData}
                ListEmptyComponent={this.renderItem({
                    item: {assuntoNome:'Nenhum resultado encontrado!', nada: true}
                })}
                style={[styles.atendidas.flatList
                    ,{height: (this.state.filterItems.length > 0) ? '74.5%' : '83%'}
                ]}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                extraData={filteredData}
                />
                <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.loading}
                presentationStyle={'overFullScreen'}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <ActivityIndicator
                    size={100} color={"#FFFFFF"}
                    />
                    </View>
                </Modal>
            </View>
        );
    }
}
