import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from "react-native";
import { colors, theme } from '../theme/theme';
import { formatCurrencyMX } from '../utils/generalsValues';

interface Props {
    collaborator: any;
    dropText: boolean;
    setModalVisible: any;
}

export const InformationModal = ({ collaborator, dropText, setModalVisible }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // handledOnGetCollaborator();
    }, [])

    // const handledOnGetCollaborator = async () => {
    //     setIsLoading(true);
    //     const result = await getInformationCollaborator(collaboratorId);
    //     if (result !== null) {
    //         setcollaborator(result);
    //     }
    //     setIsLoading(false);
    // }

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                {isLoading ?
                    <ActivityIndicator size={'small'} color={theme.colors.primary} /> :
                    <>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.textName}>{collaborator?.nombreCliente}</Text>
                            <Text style={styles.textDescription}>{collaborator?.emailCliente}</Text>
                            <Text style={styles.textDescription}>Telefono: {collaborator?.telefonoCliente}</Text>
                        </View>
                        <ScrollView style={{ paddingHorizontal: 20 }}>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Fecha: </Text>
                                <Text style={styles.textDescription}>{collaborator?.fechaEstadoCuenta}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Folio: </Text>
                                <Text style={styles.textDescription}>{collaborator?.folio}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Proyecto: </Text>
                                <Text style={styles.textDescription}>{collaborator?.proyecto}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Etapa: </Text>
                                <Text style={styles.textDescription}>{collaborator?.etapa}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Fase: </Text>
                                <Text style={styles.textDescription}>{collaborator?.fase}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Unidad: </Text>
                                <Text style={styles.textDescription}>{collaborator?.unidad}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Lote M2: </Text>
                                <Text style={styles.textDescription}>{formatCurrencyMX(collaborator?.loteM2!)}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Saldo vencido: </Text>
                                <Text style={styles.textDescription}>{formatCurrencyMX(collaborator?.saldoVencido)}</Text>
                            </View>
                            {collaborator?.pagosProximosVencer.map((item: any) => (
                                <View style={styles.containerDescription}>
                                    <Text style={styles.text}>Monto a pagar: </Text>
                                    <Text style={styles.textDescription}>{formatCurrencyMX(item.monto)}</Text>
                                </View>
                            ))}
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Plazo: </Text>
                                <Text style={styles.textDescription}>{collaborator?.plazo}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Referencia: </Text>
                                <Text style={styles.textDescription}>{collaborator?.referencia}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Precio de lista: </Text>
                                <Text style={styles.textDescription}>{formatCurrencyMX(collaborator?.precioLista)}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Precio final: </Text>
                                <Text style={styles.textDescription}>{formatCurrencyMX(collaborator?.precioFinal)}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Importe pagado: </Text>
                                <Text style={styles.textDescription}>{formatCurrencyMX(collaborator?.importePagado)}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.text}>Saldo total: </Text>
                                <Text style={styles.textDescription}>{formatCurrencyMX(collaborator?.saldoTotal)}</Text>
                            </View>
                        </ScrollView>
                        <View style={styles.containerButtons}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.textButton}>CERRAR</Text>
                            </TouchableOpacity>
                        </View>
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
        backgroundColor: colors.transparent,
        flex: 1,
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
        height: '70%',
        width: '95%',
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
