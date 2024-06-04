import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Modal, TouchableOpacity } from 'react-native';
import { styles } from '../styles/statementAccountScreenStyles';
import StatemetItem from '../components/StatemetItem';
import { InformationModal } from '../../../component/InformationModal';
import { Background } from '../../../component/Background';
import { ArrowBackIcon } from '../../../assets';
import { StackScreenProps } from '@react-navigation/stack';
import { StatementAccountRootParamas } from '../../../navigation/StatementAccount/StatementAccountRootParams';

interface Props extends StackScreenProps<StatementAccountRootParamas, any> { };

const data = [
  {
    "idCliente": 0,
    "nombreCliente": 'Leonardo Muñoz',
    "emailCliente": 'leonardo.munoz@ejemplo.com',
    "telefonoCliente": '4491234567',
    "fechaEstadoCuenta": '10/02/2024',
    "folio": '353DJD8',
    "proyecto": 'ONDigital',
    "etapa": 'Etapa 34',
    "fase": 'Fase Beta',
    "unidad": '65 B',
    "loteM2": 2501.75,
    "saldoVencido": 35.98,
    "pagosProximosVencer": [{ fecha: '29/02/2024', monto: 45.90 }],
    "plazo": 26,
    "referencia": '6484998378363763',
    "precioLista": 779.611,
    "precioFinal": 800.00,
    "importePagado": 200.98,
    "saldoTotal": 599.01,
  }
]

export const StatementAccountScreen = ({ navigation, route }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [collaborator, setCollaborator] = useState();

  const handledOnSelectedColaborator = (collaborator: any) => {
    setCollaborator(collaborator);
    setModalVisible(true);
  }

  const renderItem = ({ item, index }: any) => (
    <StatemetItem item={item} index={index} handledOnSelectedColaborator={handledOnSelectedColaborator} />
  )

  return (
    <>
      <Background />
      <SafeAreaView style={styles.container}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <InformationModal dropText={false} collaborator={collaborator} setModalVisible={setModalVisible} />
        </Modal>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <ArrowBackIcon width={20} height={20} />
          </TouchableOpacity>
          <Text style={styles.title}>Conoce tus estados de cuenta</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </>
  )
}
