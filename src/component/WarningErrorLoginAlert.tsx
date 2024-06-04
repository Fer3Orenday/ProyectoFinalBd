import React from 'react';
import { colors, theme } from '../theme/theme';
import { styles } from './alertStyles';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    message?: string;
    setModalVisible: any;
    underlined?: string;
}

export const WarningErrorLoginAlert = ({ message, setModalVisible, underlined }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible()}>
                    <Text style={{ color: colors.greyLigth, fontSize: 16 }}>X</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Hubo un
                    <Text style={styles.underlineText}> error con la acción </Text>
                    realizada. Corrobore con un administrador que su usuario esté registrado y vuelva a ejecutar la acción.
                </Text>
                <View style={styles.separator} />
                <TouchableOpacity onPress={() => setModalVisible()} style={styles.backButton}>
                    <Text style={[styles.textButton, { color: theme.colors.primary }]}>Salir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
