import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { colors, globalStyles } from '../../../theme/theme';
import { formatCurrencyMX } from '../../../utils/generalsValues';

interface Props {
    data: any;
    index: number;
}

const TransactionInformation = ({ data, index }: Props) => (
    <View key={index} style={styles.container}>
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.text}>Monto: {formatCurrencyMX(data.amount)}</Text>
                <Text style={styles.text}>Fecha: {data.date}</Text>
            </View>
            <Text style={[styles.textChildren, { fontWeight: '700' }]}>Tipo:
                <Text style={styles.textChildren}> {data.type}</Text>
            </Text>
            <Text style={[styles.textChildren, { fontWeight: '700' }]}>Descripcion: </Text>
            <Text style={styles.textChildren}>{data.description}</Text>
        </View>
    </View>
);

export default React.memo(TransactionInformation);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 15,
        flex: 1,
        flexDirection: 'row',
        padding: 10,
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
        lineHeight: 23
    },
});
