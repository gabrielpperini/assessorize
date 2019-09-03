import { StyleSheet , Dimensions } from "react-native"

const dim = Dimensions.get("window");

export default styles = {
    default: StyleSheet.create({
        imageBackground: {
            position: "absolute",
            left: 0,
            top: 0,
            height: dim.height,
            width: dim.width,
            alignItems: 'center',          
        },
    }),
    login: StyleSheet.create({
        image: {
            width: 260,
            height: 115,
        },
        view: {
            flexDirection :'row',
            height: 60,
            width: dim.width * .8,
            borderColor: '#721e24',
            borderWidth: 3,
            borderRadius: 30,
            alignItems: 'center',
            backgroundColor: 'white'
        },
        textInput: {
            marginTop: 8,
            width: (dim.width*.8) - 50, 
            height: 60,
            marginLeft: 50,
            fontSize: 25,
            textAlignVertical: 'center',
            color: '#094162',
        },
        icon: {
            position: 'absolute',
            paddingHorizontal: 15,
        },
        button: {
            paddingVertical :10,
            paddingHorizontal: 40,
            backgroundColor: '#721e24',
            borderRadius: 30,
        },
        buttonText: {
            color: "#c97334",
            textTransform: 'uppercase',
            fontSize: 24,
        },
    }),

    home: StyleSheet.create({
        button: {
            backgroundColor: '#721e24',
            width: dim.width - 120,
            height: 60,
            borderRadius: 30,
        },
        buttonText: {
            color: "#c97334",
            textTransform: 'uppercase',
            fontSize: 24,
            textAlignVertical: 'center',
            textAlign: 'center',
            height: 60
        },
    }),

    form : StyleSheet.create({
        bg:{
            flex: 1,
            backgroundColor: 'white',
        },
        button: {
            height: 60,
            width: dim.width - 120,
            backgroundColor: '#721e24',
            borderRadius: 30,
            alignSelf: 'center',
            marginVertical: 10,
        },
        buttonText: {
            color: "#c97334",
            textTransform: 'uppercase',
            fontSize: 24,
            textAlign: 'center',
            textAlignVertical:  'center',
            height: 60
        },
    }),

    fieldComponent: StyleSheet.create({
        view: {
            marginVertical: 10,
            backgroundColor: 'white'
        },
        title: {
            marginHorizontal: 60,
            color: 'black',
            fontSize: 20,
            marginBottom: 5
        },
        textInput: {
            backgroundColor: '#bdbebf',
            width: dim.width - 60,
            height: 60,
            borderRadius: 30,
            textAlignVertical: 'center',
            paddingHorizontal: 30,
            fontSize: 20,
            color: '#404040',
        },
        picker: {
            height: 60, 
            borderColor: '#bdbebf',
            borderWidth: 2,
            borderRadius: 30,
        },
        InputGroup:{
            display: 'none'
        },
        DropdownMenu:{
            width: dim.width - 60,
            alignSelf: 'center',
            marginVertical: 25,
        },
        pickerList: {
            
        },
        pickerContainer: {
            width: dim.width - 60,
            alignSelf: 'center'
        },
        SelectorContainer: {
            borderColor: '#bdbebf',
            borderWidth: 2,
            width: dim.width - 60,
            alignSelf: 'center',
        },
        TextDropdown: {
            paddingLeft: 15
        }
    }),

    registros: StyleSheet.create({
        flatList: {
            alignItems: 'center',
            width: dim.width,
        },
        header: {
            width: dim.width,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "#c97334"
        },
        tabStyle:{
            borderColor: '#721e24',
            backgroundColor:"#c97334"
        },
        tabTextStyle:{
            color: '#721e24'
        },
        activeTabStyle:{
            borderColor: '#721e24' ,
            backgroundColor: '#721e24',
        },
        activeTabTextStyle:{
            color: "#c97334"
        },
        button: {
            backgroundColor: '#721e24',
            width: dim.width - 120,
            height: 60,
            borderRadius: 30,
            marginVertical: 20
        },
        buttonText: {
            color: "#c97334",
            textTransform: 'uppercase',
            fontSize: 24,
            textAlignVertical: 'center',
            textAlign: 'center',
            height: 60
        },
    }),

    user: StyleSheet.create({
        view:{
            backgroundColor: 'white',
            width: '80%',
            marginHorizontal: '10%',
            height: '65%',
            marginTop: '10%',
            paddingHorizontal: 30,
            paddingVertical: 10, 
            borderRadius: 10,
        },
        info:{
            marginVertical: 5
        },
        infoTitle: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        infoText:{
            fontSize: 18,
            marginLeft: 30,
        },
        setores: {
            marginTop: 10
        },
        flatList:{
            marginTop: 5,
            height: '42%',
            marginLeft: 10,
            width: '100%'
        },
        itemSetores: {
            fontSize: 16,
            marginVertical:5,
            marginRight: 5,
            overflow: 'hidden',
            width: 115,
        }
    }),


    atendidas: StyleSheet.create({
        flatList: {
            width: dim.width,
        },
        Item: {
            backgroundColor: '#ececec',
            height: 50,
            width: dim.width,
            marginVertical: 5,
            flexDirection: 'row',
            paddingHorizontal: 25,
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        icon: {
            height:30,
            width:30
        },
        text: {
            fontSize: 20,
            textDecorationLine: 'underline',
        },
        viewFilter: {
            width: dim.width,
            backgroundColor: '#721e24',
        },
        filtersButton: {
            paddingHorizontal:  40,
            paddingVertical: 10,
            flexDirection: 'row',
        },
        filtersText: {
            fontSize: 22,
            textTransform: 'uppercase',
            color: "#c97334",
            textAlignVertical: 'top',
            marginTop: -5,
            marginLeft: 10
        },
        search: {
            backgroundColor: '#FFFFFF',
            width: dim.width - 60,
            height: 30,
            borderRadius: 15,
            paddingHorizontal: 30,
            fontSize: 18,
            color: '#404040', 
            alignSelf: 'center',
            paddingVertical: 6,
            marginTop: 15,
            marginBottom: 5
        }
    })
}