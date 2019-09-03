import React, {Component} from 'react'
import { View  , TextInput  , Text } from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import DatePicker from 'react-native-datepicker'
import MultiSelect from 'react-native-multiple-select';
import styles from '../styles'


export default class FieldComponent extends Component {

    constructor(props){
        super(props);
    }

    static defaultProps = {
        editable: true,
        keyboardType: 'default'
    }

    state = {
        value: this.props.value ? this.props.value : '',
        load: false,
        text: '',
        multi: []
    }

    
    render(){
        return(
            <View style={styles.fieldComponent.view}>
                <Text style={[styles.fieldComponent.title]}>{this.props.titulo}<Text style={{color: 'red'}}>{this.props.required ? '*' : null}</Text></Text>
                {(this.props.radioInput || this.props.pickerInput || this.props.date) ?
                    this.props.date ? 
                    <DatePicker
                    style={{
                        width: 200 , 
                        alignSelf: 'center'
                    }}
                    date={this.state.value}
                    mode={this.props.dateMode}
                    placeholder={this.props.placeholder}
                    format={this.props.format}
                    minDate={new Date}
                    confirmBtnText="Confirmar"
                    cancelBtnText="Cancelar"
                    customStyles={{
                      dateIcon: {
                        display: 'none'
                      }
                    }}
                    onDateChange={(value) => {
                        this.setState({value});
                        this.props.onChangeText(value , this.props.keyData)
                    }}
                    />   
                    :
                    this.props.radioInput?
                    <RadioForm
                    ref='radioForm'
                    radio_props={this.props.props}
                    initial={this.state.value ? this.state.value : -1}
                    onPress={(value) => this.props.onChangeText(value, this.props.keyData)}
                    buttonColor={'#721e24'}
                    selectedButtonColor={'#721e24'}
                    formHorizontal={true}
                    labelHorizontal={false}
                    style={{
                        alignSelf: 'center',
                        marginVertical: 25,
                    }}
                    />
                    :
                    <MultiSelect
                    hideTags
                    items={this.props.props}
                    uniqueKey="id"
                    onSelectedItemsChange={(multi) => {this.setState({multi}); this.props.onChangeText(multi, this.props.keyData)}}
                    selectedItems={this.state.multi}
                    style={styles.fieldComponent.picker}
                    selectText="Escolha os Setores"
                    selectedItemTextColor="#CCC"
                    itemTextColor="#000"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#CCC"
                    submitButtonText="Confirmar"
                    styleDropdownMenu={styles.fieldComponent.DropdownMenu}
                    styleItemsContainer={styles.fieldComponent.pickerContainer}
                    styleListContainer={styles.fieldComponent.pickerList}
                    styleSelectorContainer={styles.fieldComponent.SelectorContainer}
                    styleDropdownMenuSubsection={styles.fieldComponent.picker}
                    styleTextDropdown={styles.fieldComponent.TextDropdown}
                    styleTextDropdownSelected={styles.fieldComponent.TextDropdown}
                    />
                :
                <View>
                <TextInput style={[styles.fieldComponent.textInput, {
                    marginHorizontal: 30,
                    height: this.props.textArea ? 210 : 60,
                    display: this.state.load ? 'none' : 'flex',
                }]}
                placeholder={this.props.placeholder}
                multiline = {this.props.textArea}
                numberOfLines = {10}
                onChangeText={(value) => { this.props.onChangeText(value, this.props.keyData); this.setState({value}) } }
                value={this.state.value}
                editable={this.props.editable}
                keyboardType={this.props.keyboardType}
                />
                </View>}
            </View>
        )
    }
}