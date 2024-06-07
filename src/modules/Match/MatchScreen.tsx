import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import { theme } from '../../theme/theme';
import { Background } from '../../component/Background';

interface Category {
    name: string;
    subFilters: string[];
}

const categories: Category[] = [
    { name: 'Música', subFilters: ['Género Musical', 'Artista', 'Álbum'] },
    { name: 'Series', subFilters: ['Género', 'Año de Estreno'] },
    { name: 'Películas', subFilters: ['Género', 'Año de Estreno', 'Director'] },
];

export const MatchScreen: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [subFilters, setSubFilters] = useState<string[]>([]);
    const [selectedSubFilters, setSelectedSubFilters] = useState<string[]>([]);

    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category.name);
        setSubFilters(category.subFilters);
        setSelectedSubFilters([]);
        setModalVisible(false);
    };

    const handleSubFilterSelect = (subFilter: string) => {
        setSelectedSubFilters((prevSelectedSubFilters) =>
            prevSelectedSubFilters.includes(subFilter)
                ? prevSelectedSubFilters.filter((item) => item !== subFilter)
                : [...prevSelectedSubFilters, subFilter]
        );
    };

    const handleMatchSearch = () => {
        Alert.alert(
            'Resultados del Match',
            `Categoría: ${selectedCategory}\nSubFiltros: ${selectedSubFilters.join(', ')}`
        );
    };

    return (
        <>
            <Background />
            <View style={styles.container}>
                <Text style={styles.nameTitle}>SoundSoulmates</Text>
                <Text style={styles.title}>Seleccione una Categoría</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.buttonText}>
                        {selectedCategory ? selectedCategory : 'Elegir Categoría'}
                    </Text>
                </TouchableOpacity>

                {selectedCategory && (
                    <>
                        <Text style={styles.subtitle}>SubFiltros para {selectedCategory}</Text>
                        {subFilters.map((subFilter) => (
                            <TouchableOpacity
                                key={subFilter}
                                style={[
                                    styles.subFilterButton,
                                    selectedSubFilters.includes(subFilter) && styles.selectedSubFilterButton,
                                ]}
                                onPress={() => handleSubFilterSelect(subFilter)}
                            >
                                <Text style={styles.subFilterText}>{subFilter}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.matchButton}
                            onPress={handleMatchSearch}
                        >
                            <Text style={styles.matchButtonText}>Buscar Match</Text>
                        </TouchableOpacity>
                    </>
                )}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <FlatList
                                data={categories}
                                keyExtractor={(item) => item.name}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.modalItem}
                                        onPress={() => handleCategorySelect(item)}
                                    >
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: 'black',
        fontWeight: '700',
    },
    button: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    subtitle: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
        fontWeight: '700',
        color: 'black'
    },
    subFilterButton: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginVertical: 5,
    },
    selectedSubFilterButton: {
        backgroundColor: '#007bff',
    },
    subFilterText: {
        color: '#000',
    },
    matchButton: {
        padding: 10,
        backgroundColor: '#28a745',
        borderRadius: 5,
        marginTop: 20,
    },
    matchButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalItem: {
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    nameTitle: {
        alignSelf: 'center',
        color: theme.colors.primary,
        fontSize: 50,
        fontWeight: '700',
        marginBottom: 10,
    },
});
