import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


export default btnStyle = StyleSheet.create({
    creditsButton: {
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginLeft: "auto",
        marginRight: "auto",
        paddingHorizontal: 50
    },
});