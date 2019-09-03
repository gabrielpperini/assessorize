import React, {Component} from 'react';
import FormRccView from '../components/FormRccView';

export default class RccView extends Component {
    
    constructor(props){
        super(props);
    }

    state={
        setores: [],
        item: {}
    }

    render() {
        return (
            <FormRccView
            setores={this.props.navigation.getParam('setores')} 
            data={this.props.navigation.getParam('item')}
            respondidas={this.props.navigation.getParam('respondidas')}
            cancel={()=>{
                this.props.navigation.goBack();
            }}
            />
        );
    }
}
