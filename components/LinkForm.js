import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { dbFirestore, dbStorage } from '../database/firebase';
import image from '../assets/no-image1.jpg'
import { TextInput } from 'react-native-gesture-handler';
import mcsStyles from '../Styles/mcsStyles';
import * as ImagePicker from 'expo-image-picker';

const LinkForm = (props) => {
    const initialStateValues = {
        url: '',
        name: '',
        description: '',
        file: '',
    }
    const [fileUrl, setFileUrl] = React.useState(null);
    const [values, setValues] = useState(initialStateValues);

    const onFileChange = async () => {

        let result = await ImagePicker.launchImageLibraryAsync();
        //console.log(result);
        if (!result.cancelled) {
            const respnd = await fetch(result.uri);
            const file = await respnd.blob();
            const filename = result.uri.split('/').pop();
            const storageRef = dbStorage.ref()
            const fileRef = storageRef.child(filename)
            await fileRef.put(file)
            setValues({ ...values, file: await fileRef.getDownloadURL() })
        }
    }

    const handleInputChange = async (e, u) => {
        const value = e;
        const name = u;
        console.log(u, e)
        setValues({ ...values, [name]: value })
    };

    const handleSubmit = () => {
        props.addOrEditLink(values);
        setValues({ ...initialStateValues })
        props.modalEdit(false);
    }

    const getLinkById = async (id) => {
        const doc = await dbFirestore.collection('links').doc(id).get();
        setValues({ ...doc.data() })
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({ ...initialStateValues })
        } else {
            getLinkById(props.currentId);
        }
    }, [props.currentId])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onFileChange()} style={{ alignSelf: 'center' }}>
                <Image source={values.file ? { uri: values.file } : require = (image)} style={{ width: 250, height: 250 }} ></Image>
            </TouchableOpacity>
            <View>
                <TextInput
                    style={mcsStyles.textInput}
                    placeholder="https://someurl.com"
                    name="url"
                    onChangeText={text => { handleInputChange(text, 'url') }}
                    value={values.url} />
            </View>
            <View>
                <TextInput
                    style={mcsStyles.textInput}
                    placeholder="Website name"
                    onChangeText={text => { handleInputChange(text, 'name') }}
                    value={values.name} />
            </View>
            <View>
                <TextInput
                    style={mcsStyles.textInput}
                    placeholder="Write a description"
                    onChangeText={text => { handleInputChange(text, 'description') }}
                    value={values.description} />
            </View>
            <TouchableOpacity style={[styles.button, styles.buttonOpen]} onPress={() => handleSubmit()}><Text style={{ textAlign:'center' ,color:'white'}}>{props.currentId === '' ? 'Save' : 'Update'}</Text></TouchableOpacity>
        </View>
    )
}

export default LinkForm

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20,
        width:100,
    },
    buttonOpen: {
        backgroundColor: '#2196F3',
        alignSelf: 'center',
    },
})