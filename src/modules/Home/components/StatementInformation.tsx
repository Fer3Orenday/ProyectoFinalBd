import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from "react-native";
import { colors, theme } from '../../../theme/theme';
import { formatCurrencyMX } from '../../../utils/generalsValues';

interface Props {
    data: any;
}

export const StatementInformation = ({ data }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // handledOnGetdata();
    }, [])

    // const handledOnGetdata = async () => {
    //     setIsLoading(true);
    //     const result = await getInformationdata(dataId);
    //     if (result !== null) {
    //         setdata(result);
    //     }
    //     setIsLoading(false);
    // }

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                {isLoading ?
                    <ActivityIndicator size={'small'} color={theme.colors.primary} /> :
                    <>
                        <ScrollView style={{ paddingHorizontal: 20 }}>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Fecha: </Text>
                                <Text style={styles.textDescription}>{data?.fechaEstadoCuenta}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Folio: </Text>
                                <Text style={styles.textDescription}>{data?.folio}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Proyecto: </Text>
                                <Text style={styles.textDescription}>{data?.proyecto}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Etapa: </Text>
                                <Text style={styles.textDescription}>{data?.etapa}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Fase: </Text>
                                <Text style={styles.textDescription}>{data?.fase}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Unidad: </Text>
                                <Text style={styles.textDescription}>{data?.unidad}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Lote M2: </Text>
                                <Text style={styles.textDescription}>{formatCurrencyMX(data?.loteM2!)}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Saldo vencido: </Text>
                                <Text style={styles.textDescription}>{formatCurrencyMX(data?.saldoVencido)}</Text>
                            </View>
                            {data?.pagosProximosVencer.map((item: any) => (
                                <View style={styles.containerDescription}>
                                    <Text style={styles.text}>Monto a pagar: </Text>
                                    <Text style={styles.textDescription}>{formatCurrencyMX(item.monto)}</Text>
                                </View>
                            ))}
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Plazo: </Text>
                                <Text style={styles.textDescription}>{data?.plazo}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Referencia: </Text>
                                <Text style={styles.textDescription}>{data?.referencia}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Precio de lista: </Text>
                                <Text style={styles.textDescription}>{formatCurrencyMX(data?.precioLista)}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Precio final: </Text>
                                <Text style={styles.textDescription}>{formatCurrencyMX(data?.precioFinal)}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Importe pagado: </Text>
                                <Text style={styles.textDescription}>{formatCurrencyMX(data?.importePagado)}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Saldo total: </Text>
                                <Text style={styles.textDescription}>{formatCurrencyMX(data?.saldoTotal)}</Text>
                            </View>
                        </ScrollView>
                    </>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.golden,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    closeButton: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderColor: colors.greyMoreLigth,
        borderRadius: 6,
        borderWidth: 1,
        marginHorizontal: 100,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    container: {
        alignContent: 'center',
        alignItems: 'center',
        height: 250,
        justifyContent: 'center',
    },
    containerButtons: {
        marginTop: 72,
        marginBottom: 22,
    },
    containerDescription: {
        borderBottomColor: colors.greyMoreLigth,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 17,
    },
    modalContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical: 15,
        width: '100%',
    },
    separator: {
        backgroundColor: colors.secondary,
        height: 1,
        marginBottom: 10,
        marginTop: 28,
        width: 345,
    },
    text: {
        color: colors.black,
        fontSize: 14,
        fontWeight: '500',
    },
    textButton: {
        color: theme.colors.primary,
        fontSize: 14,
        fontWeight: '700',
    },
    textDescription: {
        color: colors.black,
        fontSize: 14,
        fontWeight: '400',
    },
    textName: {
        color: colors.secondaryPurple,
        fontSize: 20,
        fontWeight: '600',
        paddingHorizontal: 38,
    },
});
