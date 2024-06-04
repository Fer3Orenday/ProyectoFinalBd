import React, { useContext, useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, ImageBackground, FlatList } from 'react-native';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { styles } from '../styles/homeScreenStyles';
import { colors, globalStyles, theme } from '../../../theme/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeRootParamas } from '../../../navigation/Home/homeRootParams';
import { StatementInformation } from '../components/StatementInformation';
import TransactionInformation from '../components/TransactionInformation';
import { Background } from '../../../component/Background';

interface Props extends StackScreenProps<HomeRootParamas, any> { };

const statementAccount = {
    "emailCliente": 'leonardo.munoz@ejemplo.com',
    "etapa": 'Etapa 34',
    "fase": 'Fase Beta',
    "fechaEstadoCuenta": '10/02/2024',
    "folio": '353DJD8',
    "idCliente": 0,
    "importePagado": 200.98,
    "loteM2": 2501.75,
    "nombreCliente": 'Leonardo Muñoz',
    "pagosProximosVencer": [{ fecha: '29/02/2024', monto: 45.90 }],
    "plazo": 26,
    "precioFinal": 800.00,
    "precioLista": 779.611,
    "proyecto": 'ONDigital',
    "referencia": '6484998378363763',
    "saldoTotal": 599.01,
    "saldoVencido": 35.98,
    "telefonoCliente": '4491234567',
    "unidad": '65 B',
};

const transaction = [
    {
        amount: 5000,
        date: '10/11/2024',
        description: 'Hola esta es una descripción',
        type: 'Estado de cuenta',
    },
    {
        amount: 5000,
        date: '10/11/2024',
        description: 'Hola esta es una descripción',
        type: 'Estado de cuenta',
    }
];

export const HomeScreen = ({ navigation, route }: Props) => {
    const { user, img } = useContext(AuthContext);

    const renderItem = ({ item, index }: any) => (
        <TransactionInformation data={item} index={index} />
    )

    return (
        <>
            <Background />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 100 }}>
                    <Text style={styles.nameText}>¡Bienvenido {user.name}!</Text>
                    <Text style={[styles.nameText, { fontSize: 18 }]}>Conoce tus últimos movimientos</Text>
                    <View style={styles.container}>
                        <StatementInformation data={statementAccount} />
                        <TouchableOpacity onPress={() => navigation.navigate('StatementAccountStackNavigation', {})}>
                            <Text style={styles.text}>Conoce tus estados de cuenta {'>'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <FlatList
                            data={transaction}
                            renderItem={renderItem}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate('TransactionsStackNavigation', {})}>
                            <Text style={styles.text}>Consulta tus transacciones {'>'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
