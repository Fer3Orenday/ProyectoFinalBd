import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { Background } from '../../component/Background';
import { POST_MATCH_MOVIES, POST_MATCH_MUSICA, POST_MATCH_SERIES, POST_SEND_EMAIL } from '../../server/sources';
import { theme } from '../../theme/theme';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import soundApi from '../../server/server';

interface Category {
    name: string;
    subFilters: string[];
}

interface Usuario {
    Artista: string;
    CancionesFavoritas: string;
    Correo: string;
    Edad: string;
    Genero: string;
    IdMusica: number;
    IdUsuario: number;
    Imagen: string;
    NombreUsuario: string;
    Recomendaciones: string;
    Sexo: string;
    Álbum: string;
}

const categories: Category[] = [
    { name: 'Música', subFilters: ['Genero', 'Artista', 'Album'] },
    {
        name: 'Series', subFilters: ['Genero', 'Año', 'Nombre de serie', 'Duracion', 'Director', 'Productor',
            'Actor principal', 'Actor secundario', 'Trailer']
    },
    {
        name: 'Películas', subFilters: ['Nombre', 'Genero', 'Año', 'Director', 'Duracion', 'Productor', 'Musica',
            'Actor principal', 'Actor Secundario', 'Trailer']
    },
];

const usuarioDataArray: Usuario[] = [
    {
        Artista: "Arctic Monkeys",
        CancionesFavoritas: "Do I Wanna Know?, R U Mine?, 505",
        Correo: "alice.smith@example.com",
        Edad: "30",
        Genero: "Indie Rock",
        IdMusica: 1,
        IdUsuario: 1,
        Imagen: "https://example.com/alicesmith.jpg",
        NombreUsuario: "AliceSmith",
        Recomendaciones: "Why'd You Only Call Me When You're High?, I Bet You Look Good on the Dancefloor",
        Sexo: "Femenino",
        Álbum: "AM"
    },
    {
        Artista: "Ed Sheeran",
        CancionesFavoritas: "Shape of You, Perfect, Thinking Out Loud",
        Correo: "bob.johnson@example.com",
        Edad: "28",
        Genero: "Pop",
        IdMusica: 2,
        IdUsuario: 2,
        Imagen: "https://example.com/bobjohnson.jpg",
        NombreUsuario: "BobJohnson",
        Recomendaciones: "Photograph, Castle on the Hill",
        Sexo: "Masculino",
        Álbum: "Divide"
    },
    {
        Artista: "Billie Eilish",
        CancionesFavoritas: "Bad Guy, Lovely, When the Party's Over",
        Correo: "carol.brown@example.com",
        Edad: "22",
        Genero: "Alternative/Indie",
        IdMusica: 3,
        IdUsuario: 3,
        Imagen: "https://example.com/carolbrown.jpg",
        NombreUsuario: "CarolBrown",
        Recomendaciones: "Everything I Wanted, Ocean Eyes",
        Sexo: "Femenino",
        Álbum: "When We All Fall Asleep, Where Do We Go?"
    }
];

export const MatchScreen: React.FC = () => {
    const { user } = useContext(AuthContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [resultsModalVisible, setResultsModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [subFilters, setSubFilters] = useState<string[]>([]);
    const [selectedSubFilters, setSelectedSubFilters] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [results, setResults] = useState<Usuario[]>(usuarioDataArray);

    const handleMatchSearch = (result: any) => {
        setResults(result);
        setResultsModalVisible(true);
    };

    const handleOnMatchWithMusic = async () => {
        // let result: any;
        // try {
        //     if (selectedCategory === 'Series') {
        //         result = await soundApi.post(POST_MATCH_SERIES, {
        //             tipoBusqueda: selectedSubFilters[0].toLowerCase(),
        //             idUsuario: user.IdUsuario
        //         });
        //     } else if (selectedCategory === 'Música') {
        //         result = await soundApi.post(POST_MATCH_MUSICA, {
        //             tipoBusqueda: selectedSubFilters[0].toLowerCase(),
        //             idUsuario: user.IdUsuario
        //         });
        //     } else {
        //         result = await soundApi.post(POST_MATCH_MOVIES, {
        //             tipoBusqueda: selectedSubFilters[0].toLowerCase(),
        //             idUsuario: user.IdUsuario
        //         });
        //     }
        //     console.log(result.data);

        //     if (result.status === 200) {
        handleMatchSearch(usuarioDataArray);
        //     } else {
        //         Alert.alert(
        //             'Hubo un error inesperado, consulte servidor',
        //         );
        //     }
        // } catch (error: any) {
        //     console.log(error.response);

        //     if (error.response.status === 404) {
        //         Alert.alert(
        //             'No se encontraron coincidencias',
        //         );
        //     } else {
        //         Alert.alert(
        //             'Hubo un error inesperado, consulte servidor',
        //             `${error}`,
        //         );
        //     }
        // }
    }

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

    const sendMatchEmail = async (matchItem: Usuario) => {
        try {
            const result = await soundApi.post(POST_SEND_EMAIL, {
                correoDestino: matchItem.Correo,
                asunto: '¿Quieres hacer match?',
                mensaje: 'Alguien quiere hacer match contigo',
            });
            if (result.status === 200) {
                Alert.alert('Enviar correo', `Se ha enviado un correo a ${matchItem.Correo}`);
            } else {
                Alert.alert('Error al enviar correo', `No se ha enviado un correo a ${matchItem.Correo}`);
            }
        } catch (error) {
            Alert.alert('Error al enviar correo', `No se ha enviado un correo a ${matchItem.Correo} ${error}`);
        }
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
                            onPress={handleOnMatchWithMusic}
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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={resultsModalVisible}
                    onRequestClose={() => setResultsModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Resultados del Match</Text>
                            <FlatList
                                data={results}
                                keyExtractor={(item) => item.IdUsuario.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.resultItem}>
                                        <View>
                                            <Text style={{ color: 'black' }}>{item.NombreUsuario}</Text>
                                            <Text style={{ color: 'black' }}>{item.Sexo}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ color: 'black' }}>{item.Artista}</Text>
                                            <Text style={{ color: 'black' }}>{item.Genero}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.emailButton}
                                            onPress={() => sendMatchEmail(item)}
                                        >
                                            <Text style={styles.emailButtonText}>Enviar Correo</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                style={{ width: 300 }}
                            />
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setResultsModalVisible(false)}
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
        width: '90%',
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
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },
    resultItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    emailButton: {
        padding: 5,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    emailButtonText: {
        color: '#fff',
    },
});

export default MatchScreen;
