import React, {Component} from 'react';
import { Setores, RccSubmit }  from '../../Api'
import FormRcc from '../components/FormRcc';


export default class Rcc extends Component {
    
    constructor(props){
        super(props);
    }

    state={
        setores: [],
    }

    async componentDidMount(){
        var setores = await Setores();
        this.setState({setores});
        // console.log(setores);
    }

    render() {
        return (
            <FormRcc
            setores={this.state.setores} 
            cancel={()=>{
                this.props.navigation.goBack();
            }}
            send={async (data) =>{
                let r = await RccSubmit(data);
                console.log(r);
                if(r.request){
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
