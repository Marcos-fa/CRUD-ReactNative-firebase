import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Modal, Image, FlatList, Pressable, Linking, TouchableOpacity } from 'react-native';
import image from '../assets/no-image1.jpg';
import { dbFirestore } from '../database/firebase';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import LinkForm from './LinkForm';
import Toast from 'react-native-toast-message';

const Links = () => {

    const [Links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const modalEdit = (value) => {
        setModalVisible(value);
    }

    const addOrEditLink = async (LinkObject) => {
        try {
            if (currentId === '') {
                await dbFirestore.collection('links').doc().set(LinkObject);
                console.log('Added Successfully');
            } else {
                await dbFirestore.collection('links').doc(currentId).update(LinkObject)
                console.log('Updated Successfully');
                setCurrentId('')
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onDeleteLink = async id => {
        console.log(id);
        await dbFirestore.collection('links').doc(id).delete();
        console.log('Deleted Successfully');
    }

    const getLinks = async () => {
        dbFirestore.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
        });
    }

    useEffect(() => {
        getLinks();
    }, []);

    return (
        <View style={styles.container} >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    //Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.container}>
                    <View style={styles.modalView}>
                        <LinkForm {...{ addOrEditLink, currentId, Links, modalEdit }} />
                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1, width: '100%' }}>
                <FlatList style={{ flex: 1 }}
                    data={Links}
                    renderItem={({ item }) => (
                        <TouchableOpacity  onPress={() => Linking.openURL(item.url)}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} key={item.id} >
                                <View style={styles.card}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ fontSize: 32 }}>{item.name}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => { setCurrentId(item.id), setModalVisible(true) }} >
                                                <Feather style={{ paddingHorizontal: 5 }} name="edit" size={32} color="black" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => onDeleteLink(item.id)} >
                                                <MaterialCommunityIcons name="delete-circle" size={32} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{ alignSelf: 'center' }}>
                                            <Image source={item.file ? { uri: item.file } : require = (image)} style={{ width: 250, height: 250 }} ></Image>
                                        </View>
                                        <Text>{item.description}</Text>
                                        <Text>{item.url}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={link => link.id}
                />
            </View>
            <View style={{ width: '100%', backgroundColor: 'black' }} >
                <TouchableOpacity style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}><Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: 'white' }} >Add link</Text></TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        borderWidth: 2,
        borderColor: 'lightgrey',
        borderRadius: 20,
        width: '90%',
        marginVertical: 20,
        padding: 10
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        width: '100%',
        backgroundColor: 'black',
        alignSelf: 'center',
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
})


export default Links

