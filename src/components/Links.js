import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Image, FlatList } from 'react-native';
import image from '../../assets/no-image1.jpg';
import { dbFirestore } from '../../database/firebase';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const Links = () => {

    const [Links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditLink = async (LinkObject) => {
        try {
            if (currentId === '') {
                await dbFirestore.collection('links').doc().set(LinkObject);
                // toast('New Link added', { type: 'success', autoClose: 2000 })
            } else {
                await dbFirestore.collection('links').doc(currentId).update(LinkObject)
                // toast('Link Updated Successfully', { type: 'info', autoClose: 2000 });
                setCurrentId('')
            }
        } catch (error) {
            console.error(error);
        }
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
            <LinkForm {...{addOrEditLink, currentId, Links}} />
            <FlatList style={{ width: "100%" }}
                data={Links}
                renderItem={({ item }) => (
                    <View style={{ width: "100%", alignItems: 'center', justifyContent: 'center' }} key={item.id} >
                        <View style={styles.card}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 32 }}>{item.name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Feather style={{ paddingHorizontal: 5 }} name="edit" size={32} color="black" />
                                    <MaterialCommunityIcons name="delete-circle" size={32} color="black" />
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
                )}
                keyExtractor={link => link.id}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
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
    }
})


export default Links

