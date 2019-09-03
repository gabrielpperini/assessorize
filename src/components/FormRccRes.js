import React, {Component} from 'react';
import {Text, 
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    AsyncStorage,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import assets from '../../assets';
import styles from '../styles'
import Api  from '../../Api'
import FieldComponent from '../components/FieldComponent';



export default class FormRccRes extends Component {
    
    constructor(props){
        super(props);
    }

    state={
        data: this.props.data ? this.props.data : {},
        load: false,
        classificacao: [
            {label: 'Retrabalho', value: 0 },
            {label: 'Solicitação', value: 1 },
            {label: 'Reclamação', value: 2 },
        ],
        motivoClassificacao: [
            {label: 'Interna (escritório)', value: 0 },
            {label: 'Externa (Cliente)' , value: 1 },
        ],
    }

    formData = (text , key) => {
        let data = this.state.data;
        data[key] = text;   
        this.setState({data});
        // console.log(data, 'dataForm');
    }

    
    render() {
        return (
            <ScrollView style={styles.form.bg}>
                <FieldComponent 
                titulo="1) Nome da Empresa / Pessoa de Contato / Assunto" 
                placeholder="" 
                keyData='assuntoNome'
                onChangeText={( text, key ) => {}}
                value={this.state.data.assuntoNome}
                editable={false}
                />
                <FieldComponent 
                titulo="Telefone para retorno" 
                placeholder="(00) 00000-0000" 
                keyData='telefone'
                onChangeText={( text, key ) => {}}
                value={this.state.data.telefone}
                editable={false}
                />
                <FieldComponent 
                titulo="E-mail" 
                placeholder="E-mail" 
                keyData='email'
                onChangeText={( text, key ) => {}}
                value={this.state.data.email}
                editable={false}
                />
                <FieldComponent 
                titulo="2) Classificação do RCC"  
                keyData='classificacao'
                onChangeText={( text, key ) => {}}
                value={this.state.classificacao[parseInt(this.state.data.classificacao)].label}
                editable={false}
                />
                <FieldComponent 
                titulo="Motivo da Classificação"  
                keyData='motivoClassificacao'
                onChangeText={( text, key ) => {}}
                value={this.state.motivoClassificacao[parseInt(this.state.data.motivoClassificacao)].label}
                editable={false}
                />
                <FieldComponent 
                titulo="3) Setor" 
                placeholder="Setor" 
                keyData='setor'
                onChangeText={( text, key ) => {}}
                value={this.state.data.setor}
                editable={false}
                textArea={true}
                />
                <FieldComponent 
                titulo="4) Descrição do Atendimento" 
                placeholder="Descrição" 
                keyData='descricao'
                onChangeText={( text, key ) => {}}
                textArea={true} 
                value={this.state.data.descricao}
                editable={false}
                />
                <FieldComponent 
                titulo="Prazo para Solução" 
                placeholder="Selecione a data" 
                keyData='dataPrazo'
                onChangeText={( text, key ) => {}}
                value={this.props.data.dataPrazo}
                editable={false}
                />
                <View>
                    <Text style={[styles.fieldComponent.title , { fontWeight: 'bold' , marginTop: 20 }]}>5) Informações de resolução do Atendimento</Text>
                    <FieldComponent 
                    titulo="Concluído?"
                    keyData='concluido'
                    onChangeText={( text, key ) => this.formData(text, key)}
                    radioInput
                    props={[
                        {label: 'Não' , value: 0 },
                        {label: 'Sim', value: 1 },
                        {label: 'Parcial', value: 2 },
                    ]}
                    />
                    <FieldComponent 
                    titulo="6) Solução" 
                    placeholder="Solução" 
                    keyData='solucao'
                    onChangeText={( text, key ) => this.formData(text, key)}
                    textArea={true} 
                    />
                </View>
                <TouchableOpacity style={styles.form.button}
                onPress={async () => {
                    this.setState({load: true});
                    await this.props.send(this.state.data);
                    this.setState({load: false});
                }}
                >
                    <Text style={[styles.form.buttonText,{display: this.state.load ? 'none' : 'flex'}]}>
                        Concluir
                    </Text>
                    <ActivityIndicator 
                    style={{
                        display: this.state.load ?'flex'  : 'none', 
                        height: 60 , 
                        alignSelf: 'center'}} 
                    size={40} 
                    color={"#c97334"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.form.button}
                onPress={() => {this.props.cancel()}}
                >
                    <Text style={styles.form.buttonText}>
                        Cancelar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}
