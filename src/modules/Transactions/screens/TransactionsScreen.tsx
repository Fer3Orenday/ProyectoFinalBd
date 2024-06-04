import React from 'react';
import { styles } from '../styles/transactionsScreenStyles';
import { Text, SafeAreaView, FlatList, View, TouchableOpacity } from 'react-native';
import TransactionItem from '../components/TransactionItem';
import { Background } from '../../../component/Background';
import { ArrowBackIcon } from '../../../assets';
import { StackScreenProps } from '@react-navigation/stack';
import { TransactionsRootParamas } from '../../../navigation/Transactions/transactionsRootParams';

interface Props extends StackScreenProps<TransactionsRootParamas, any> { };

const data = [
    { date: '10/11/2024', type: 'Estado de cuenta', description: 'Hola esta es una descripción', amount: 5000 },
    { date: '20/11/2024', type: 'Deuda febrero', description: 'Hola esta es una descripción', amount: 5000 },
    { date: '20/11/2024', type: 'Deuda febrero', description: 'Hola esta es una descripción', amount: 5000 },
    { date: '20/11/2024', type: 'Deuda febrero', description: 'Hola esta es una descripción', amount: 5000 },
    { date: '20/11/2024', type: 'Deuda febrero', description: 'Hola esta es una descripción', amount: 5000 },
    { date: '20/11/2024', type: 'Deuda febrero', description: 'Hola esta es una descripción', amount: 5000 },
    { date: '20/11/2024', type: 'Deuda febrero', description: 'Hola esta es una descripción', amount: 5000 },
    { date: '20/11/2024', type: 'Deuda febrero', description: 'Hola esta es una descripción', amount: 5000 },
    { date: '20/11/2024', type: 'Deuda febrero', description: 'Hola esta es una descripción', amount: 5000 },
]

export const TransactionsScreen = ({ navigation, route }: Props) => {
    const renderItem = ({ item, index }: any) => (
        <TransactionItem item={item} index={index} />
    )

    return (
        <>
            <Background />
            <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <ArrowBackIcon width={20} height={20} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Conoce tus transacciones</Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        </>
    )
}
