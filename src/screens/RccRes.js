import React, {Component} from 'react';
import { RccSubmit }  from '../../Api'
import FormRccRes from '../components/FormRccRes';

export default class RccRes extends Component {
    
    constructor(props){
        super(props);
    }

    state={
        setores: [],
        item: {}
    }

    render() {
        return (
            <FormRccRes
            setores={this.props.navigation.getParam('setores')} 
            data={this.props.navigation.getParam('item')}
            cancel={()=>{
                this.props.navigation.goBack();
            }}
            send={async (data) =>{
                let t = await RccSubmit(data, 'responsavel');
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
