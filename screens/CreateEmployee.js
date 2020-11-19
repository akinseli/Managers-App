import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
//import * as Permissions from 'permissions'


const CreateEmployee = ({ navigation, route }) => {
    const getDetails = (type) => {
        if (route.params) {
            switch (type) {
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "salary":
                    return route.params.salary
                case "picture":
                    return route.params.picture
                case "position":
                    return route.params.position
            }
        }
        return ""
    }

    const [name, setName] = useState(getDetails("name"))
    const [phone, setPhone] = useState(getDetails("phone"))
    const [email, setEmail] = useState(getDetails("email"))
    const [salary, setSalary] = useState(getDetails("salary"))
    const [picture, setPhoto] = useState(getDetails("picture"))
    const [position, setPosition] = useState(getDetails("position"))
    const [modal, setModal] = useState(false)
    const [enableShift, setenableShift]= useState(false)

    const submitData = () => {
        fetch("https://managersappserver.herokuapp.com/send-data", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
            .then(res => res.json())
            .then(data => {
                Alert.alert(`${data.name} is saved successfully`)
                navigation.navigate("Home")
            }).catch((error) => {
                alert(error);
            })
    }


const updateDetails =()=>{
    fetch("https://managersappserver.herokuapp.com/update", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           
           id:route.params._id,
            name,
            email,
            phone,
            salary,
            picture,
            position 
        })
    })
        .then(res => res.json())
        .then(data => {
            Alert.alert(`${data.name} is updated`)
            navigation.navigate("Home")
        }).catch((err) => {
            Alert.alert("something went wrong");
        })
}

    const launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const uri = response.uri;
                const type = response.type;
                const name = response.fileName;
                const source = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName,
                }
                handleUpload(source)
                Alert.alert("Image accepted")
            }
        });

    }

    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'ManagersApp')
        data.append("cloud_name", "galazy257")
        fetch("https://api.cloudinary.com/v1_1/galazy257/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).
            then(data => {
                setPhoto(data.secure_url)
                setModal(false)
            }).catch(err => {
                Alert.alert("An Error Occured While Uploading")
            })
    }

    const launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',

            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const uri = response.uri;
                const type = response.type;
                const name = response.fileName;
                const source = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName,
                }
                handleUpload(source)
                    && Alert.alert("Image accepted")
            }
        });

    }


    return (
        <KeyboardAvoidingView behaviour="position"  style={styles.root} enabled={enableShift} >
                    <View>
            <TextInput
                label="Name"
                style={styles.inputStyle}
                value={name}
                theme={theme}
                onFocus={()=>setenableShift(false)}
                mode="outlined"
                onChangeText={text => setName(text)}
            />
            <TextInput
                label="Email"
                style={styles.inputStyle}
                value={email}
                theme={theme}
                onFocus={()=>setenableShift(false)}
                mode="outlined"
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label="Phone"
                style={styles.inputStyle}
                value={phone}
                theme={theme}
                onFocus={()=>setenableShift(false)}
                keyboardType="number-pad"
                mode="outlined"
                onChangeText={text => setPhone(text)}
            />
            <TextInput
                label="Salary"
                style={styles.inputStyle}
                value={salary}
                theme={theme}
                onFocus={()=>setenableShift(true)}
                keyboardType="number-pad"
                mode="outlined"
                onChangeText={text => setSalary(text)}
            />
            <TextInput
                label="Position"
                style={styles.inputStyle}
                value={position}
                theme={theme}
                onFocus={()=>setenableShift(true)}
                mode="outlined"
                onChangeText={text => setPosition(text)}
            />
            <Button
                style={styles.inputStyle}
                icon={picture == "" ? "upload" : "check"}
                mode="contained"
                theme={theme}
                onPress={() => setModal(true)}>
                Upload Image
            </Button>
            {route.params ? 
                <Button
                    style={styles.inputStyle}
                    icon="content-save"
                    mode="contained"
                    theme={theme}
                    onPress={() => updateDetails()}>
                Update Details
            </Button>
            :
            <Button
                    style={styles.inputStyle}
                    icon="content-save"
                    mode="contained"
                    theme={theme}
                    onPress={() => submitData()}>
               Save
            </Button>
            }

            <Modal animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => (
                    setModal(false)
                )}>
                <View style={styles.modalView}>
                    <View style={styles.modalButtonView}>
                        <Button
                            icon="camera"
                            theme={theme}
                            mode="contained"
                            onPress={() => launchCamera()}>
                            camera </Button>
                        <Button
                            icon="camera"
                            mode="contained"
                            theme={theme}
                            onPress={() => launchImageLibrary()}>
                            gallery</Button>
                    </View>
                    <Button
                        theme={theme}
                        onPress={() => setModal(false)}>
                        cancel
            </Button>
                </View>
            </Modal>
        </View >
        </KeyboardAvoidingView>

    )
}

const theme = {
    colors: {
        primary: "#006aff"
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    inputStyle: {
        margin: 5
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "white"
    },
    modalButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})

export default CreateEmployee;