import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


export default BurgerMenuStyle = StyleSheet.create({
    burgerMenu: {
        backgroundColor:'#fff',
        width:50,
        height:50,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
        top: 30,
        right: 20,
    },
});