import { StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#003f5c",
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    logo:{
        fontWeight: 'bold',
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40
    },

    logoRegis:{
        fontWeight: 'bold',
        fontSize: 40,
        color: "#fb5b5a",
        marginBottom: 10
    },

    inputView:{
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20
    },

    inputPW:{
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    eye:{
        paddingTop: 12,
        paddingRight: 5
    },

    inputText:{
        height: 50,
        color: 'white',
    },

    LoginBtn:{
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 20
    },

    LoginText:{
        color: 'white'
    }
})

export default styles;