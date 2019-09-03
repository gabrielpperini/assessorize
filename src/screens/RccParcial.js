import React, {Component} from 'react';
import FormRccParcial from '../components/FormRccParcial';
import { RccSubmitParcial } from '../../Api';

export default class RccParcial extends Component {
    
    constructor(props){
        super(props);
    }

    state={
        setores: [],
        item: {}
    }

    render() {
        return (
            <FormRccParcial
            setores={this.props.navigation.getParam('setores')} 
            data={this.props.navigation.getParam('item')}
            respondidas={this.props.navigation.getParam('respondidas')}
            cancel={()=>{
                this.props.navigation.goBack();
            }}
            send={async (data) =>{
                let t = await RccSubmitParcial(data);
                console.log(t);
                if(t.request){
                    alert('Dados enviados com sucesso!');
                    this.props.navigation.goBack();
                }else{
                    alert('Falha no envio de dados tente novamente!');
                }
            }}
            />
        );
    }
}
