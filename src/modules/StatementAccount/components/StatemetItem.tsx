import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { PdfIcon, XmlIcon } from '../../../assets';
import { colors, globalStyles, theme } from '../../../theme/theme';

const StatemetItem = ({ item, index, handledOnSelectedColaborator }: any) => {

    return (
        <TouchableOpacity style={styles.container} onPress={() => handledOnSelectedColaborator(item)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Text style={styles.text}>Fecha: {item.fechaEstadoCuenta}</Text>
                <Text style={styles.text}>Folio: {item.folio}</Text>
            </View>
            <Text style={styles.textChildren}>Proyecto: {item.proyecto}</Text>
        </TouchableOpacity>
    );
}

export default React.memo(StatemetItem);

const styles = StyleSheet.create({
    container: {
        ...globalStyles.globalShadow,
        backgroundColor: colors.white,
        borderRadius: 15,
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
    },
    containerButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    text: {
        color: colors.secondaryPurple,
        fontSize: 18,
        fontWeight: '700',
    },
    textChildren: {
        color: colors.secondary,
        fontSize: 16,
        fontWeight: '400',
    },
});
