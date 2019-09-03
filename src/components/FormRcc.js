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



export default class FormRcc extends Component {
    
    constructor(props){
        super(props);
    }

    state={
        data: this.props.data ? this.props.data : {},
        load: false
    }

    formData = (text , key) => {
        let data = this.state.data;
        data[key] = text;   
        this.setState({data});
        console.log(data, 'dataForm');
    }

    render() {
        return (
            <ScrollView style={styles.form.bg}>
                <FieldComponent 
                titulo="1) Nome da Empresa / Pessoa de Contato / Assunto" 
                placeholder="" 
                keyData='assuntoNome'
                onChangeText={( text, key ) => this.formData(text, key)}
                />
                <FieldComponent 
                titulo="Telefone para retorno" 
                placeholder="00 00000-0000" 
                keyData='telefone'
                onChangeText={( text, key ) => this.formData(text, key)}
                keyboardType={'numeric'}
                />
                <FieldComponent 
                titulo="E-mail" 
                placeholder="E-mail" 
                keyData='email'
                onChangeText={( text, key ) => this.formData(text, key)}
                />
                <FieldComponent 
                titulo="2) Classificação do RCC"  
                keyData='classificacao'
                onChangeText={( text, key ) => this.formData(text, key)}
                radioInput
                props={[
                    {label: 'Retrabalho', value: 0 },
                    {label: 'Solicitação', value: 1 },
                    {label: 'Reclamação', value: 2 },
                ]}
                />
                <FieldComponent 
                titulo="Motivo da Classificação"  
                keyData='motivoClassificacao'
                onChangeText={( text, key ) => this.formData(text, key)}
                radioInput
                props={[
                    {label: 'Interna (escritório)', value: 0 },
                    {label: 'Externa (Cliente)' , value: 1 },
                ]}
                />
                <FieldComponent 
                titulo="3) Setor" 
                placeholder="Setor" 
                keyData='setor'
                onChangeText={( text, key ) => this.formData(text, key)}
                pickerInput
                props={this.props.setores}
                />
                <FieldComponent 
                titulo="4) Descrição do Atendimento" 
                placeholder="Descrição" 
                keyData='descricao'
                onChangeText={( text, key ) => this.formData(text, key)}
                textArea={true} 
                />
                <FieldComponent 
                titulo="Prazo para Solução" 
                placeholder="Selecione a data" 
                keyData='dataPrazo'
                onChangeText={( text, key ) => this.formData(text, key)}
                date
                dateMode={'datetime'}
                format={"YYYY-MM-DD HH:mm:ss"}
                />
                <TouchableOpacity style={styles.form.button}
                onPress={async () => {
                    this.setState({load: true});
                    await this.props.send(this.state.data);
                    this.setState({load: false});
                }}
                >
                    <Text style={[styles.form.buttonText,{display: this.state.load ? 'none' : 'flex'}]}>
                        {this.state.responsavel ? 'Concluir' : 'Enviar'}
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
