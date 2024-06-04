import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { PdfIcon, XmlIcon } from '../../../assets';
import { colors, globalStyles, theme } from '../../../theme/theme';
import { formatCurrencyMX } from '../../../utils/generalsValues';

const TransactionItem = ({ item, index }: any) => {
    const openURL = async (link: string) => {
        await Linking.openURL(link);
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <Text style={styles.text}>Monto: {formatCurrencyMX(item.amount)}</Text>
                    <Text style={styles.text}>Fecha: {item.date}</Text>
                </View>
                <Text style={styles.textChildren}>Tipo: {item.type}</Text>
                <Text style={[styles.textChildren, { fontWeight: '700' }]}>Descripcion: </Text>
                <Text style={styles.textChildren}>{item.description}</Text>
            </View>
        </View>
    );
}

export default React.memo(TransactionItem);

const styles = StyleSheet.create({
    container: {
        ...globalStyles.globalShadow,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 15,
        flex: 1,
        flexDirection: 'row',
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
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 20,
    },
    textChildren: {
        color: colors.secondary,
        fontSize: 16,
        fontWeight: '400',
    },
});
