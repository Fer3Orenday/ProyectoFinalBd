import React, { useContext, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { styles } from '../styles/loginScreenStyles';
import { colors, globalStyles } from '../../../theme/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { WarningErrorLoginAlert } from '../../../component/WarningErrorLoginAlert';

export const LoginScreen = () => {
    const { loginEmail, showModal, isModalVisible, typeModal } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleOnLogin = async () => {
        setIsLoading(true);
        await loginEmail(email, password);
        setIsLoading(false);
    }

    const validateForm = () => {
        if (email !== '' && password !== '') {
            return false;
        } else {
            return true;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    !isModalVisible;
                }}
            >
                {typeModal === 'errorLogin' && <WarningErrorLoginAlert setModalVisible={showModal} />}
            </Modal>
            <View style={styles.container}>
                <Text style={styles.title}>SoundSoulmates</Text>
                <Image
                    source={require('../../../assets/LogoBanner.png')}
                    style={styles.image}
                />
                <KeyboardAwareScrollView style={styles.subContainer}>
                    <TextInput
                        onChangeText={setEmail}
                        placeholder='Correo electronico'
                        placeholderTextColor={colors.black}
                        style={globalStyles.globalInput}
                        value={email}
                        autoCapitalize='none'
                    />
                    <TextInput
                        onChangeText={setPassword}
                        placeholder='Contraseña'
                        placeholderTextColor={colors.black}
                        secureTextEntry={true}
                        style={globalStyles.globalInput}
                        value={password}
                    />
                    <TouchableOpacity disabled={validateForm()} onPress={() => handleOnLogin()}
                        style={[styles.button, { opacity: validateForm() ? 0.50 : undefined }]}>
                        {isLoading ?
                            <ActivityIndicator size={'small'} color={colors.white} /> :
                            <Text style={styles.textButton}>Ingresar</Text>
                        }
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    )
}
