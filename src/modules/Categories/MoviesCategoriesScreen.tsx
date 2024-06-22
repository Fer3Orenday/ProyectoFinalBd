import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { Background } from '../../component/Background';
import { CategoriesRootParamas } from '../../navigation/Categories/categoriesRootParams';
import { colors, theme } from '../../theme/theme';
import { GET_PELICULAS, POST_PREFERENCIAS } from '../../server/sources';
import { SafeAreaView, View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Button, TextInput, Alert, Linking } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import soundApi from '../../server/server';
import Video from 'react-native-video';

export interface StatementData {
    ActorPrincipal: string;
    ActorSecundario: string;
    Año: number;
    Director: string;
    Duracion: string;
    Genero: string;
    IdPelicula: number;
    IdUsuario: null;
    Musica: string;
    NombrePelicula: string;
    Productor: string;
    TrailerPelicula: string;
    Imagen: string;
}

const statementDataArray: StatementData[] = [
    {
        ActorPrincipal: "Leonardo DiCaprio",
        ActorSecundario: "Joseph Gordon-Levitt",
        Año: 2010,
        Director: "Christopher Nolan",
        Duracion: "148 min",
        Genero: "Sci-Fi, Thriller",
        IdPelicula: 1,
        IdUsuario: null,
        Musica: "Hans Zimmer",
        NombrePelicula: "Inception",
        Productor: "Emma Thomas",
        TrailerPelicula: "https://www.youtube.com/watch?v=YoHD9XEInc0",
        Imagen: "https://m.media-amazon.com/images/I/51xbzGw1ikL._AC_.jpg"
    },
    {
        ActorPrincipal: "Robert Downey Jr.",
        ActorSecundario: "Chris Evans",
        Año: 2019,
        Director: "Anthony Russo, Joe Russo",
        Duracion: "181 min",
        Genero: "Action, Adventure, Drama",
        IdPelicula: 2,
        IdUsuario: null,
        Musica: "Alan Silvestri",
        NombrePelicula: "Avengers: Endgame",
        Productor: "Kevin Feige",
        TrailerPelicula: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
        Imagen: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg"
    },
    {
        ActorPrincipal: "Marlon Brando",
        ActorSecundario: "Al Pacino",
        Año: 1972,
        Director: "Francis Ford Coppola",
        Duracion: "175 min",
        Genero: "Crime, Drama",
        IdPelicula: 3,
        IdUsuario: null,
        Musica: "Nino Rota",
        NombrePelicula: "The Godfather",
        Productor: "Albert S. Ruddy",
        TrailerPelicula: "https://www.youtube.com/watch?v=sY1S34973zA",
        Imagen: "https://m.media-amazon.com/images/I/51UMtkxVFTL._AC_.jpg"
    },
    {
        ActorPrincipal: "Keanu Reeves",
        ActorSecundario: "Laurence Fishburne",
        Año: 1999,
        Director: "Lana Wachowski, Lilly Wachowski",
        Duracion: "136 min",
        Genero: "Action, Sci-Fi",
        IdPelicula: 4,
        IdUsuario: null,
        Musica: "Don Davis",
        NombrePelicula: "The Matrix",
        Productor: "Joel Silver",
        TrailerPelicula: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
        Imagen: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg"
    },
    {
        ActorPrincipal: "Tom Hanks",
        ActorSecundario: "Robin Wright",
        Año: 1994,
        Director: "Robert Zemeckis",
        Duracion: "142 min",
        Genero: "Drama, Romance",
        IdPelicula: 5,
        IdUsuario: null,
        Musica: "Alan Silvestri",
        NombrePelicula: "Forrest Gump",
        Productor: "Wendy Finerman",
        TrailerPelicula: "https://www.youtube.com/watch?v=bLvqoHBptjg",
        Imagen: "https://m.media-amazon.com/images/I/41c8P3yG6XL._AC_.jpg"
    }
];

interface Props extends StackScreenProps<CategoriesRootParamas, any> { };

export const MovieScreen = ({ navigation }: Props) => {
    const { user } = useContext(AuthContext);

    const [filteredMovies, setFilteredMovies] = useState<StatementData[]>(statementDataArray);
    const [movies, setMovies] = useState<StatementData[]>(statementDataArray);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    useEffect(() => {
        // handleOnGetMovies();
    }, []);

    const handleOnGetMovies = async () => {
        const result = await soundApi.get(GET_PELICULAS);
        if (result.status === 200) {
            setMovies(result.data);
            setFilteredMovies(result.data);
        }
    }

    const handleSelectItem = (item: StatementData) => {
        if (selectedItemIds.includes(item.NombrePelicula)) {
            setSelectedItemIds(selectedItemIds.filter(id => id !== item.NombrePelicula));
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem.IdContenido !== item.IdPelicula));
        } else {
            setSelectedItemIds([...selectedItemIds, item.NombrePelicula]);
            setSelectedItems([
                ...selectedItems,
                {
                    IdUsuario: user.IdUsuario,
                    TipoContenido: 'pelicula',
                    IdContenido: item.IdPelicula,
                }
            ]);
        }
    };

    const handleOnNavigate = async () => {
        // try {
        //     const result = await soundApi.post(POST_PREFERENCIAS, {
        //         preferencias: selectedItems
        //     });
        //     console.log(result.status);

        //     if (result.status === 201) {
        navigation.navigate('MusicScreen', {});
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const results = movies.filter(movie => movie.NombrePelicula.toLowerCase().includes(query.toLowerCase()));
        setFilteredMovies(results);
    };

    const openUrl = async (url: string) => {
        await Linking.openURL(url);
    };

    const renderItem = ({ item }: { item: StatementData }) => {
        const isSelected = selectedItemIds.includes(item.NombrePelicula);
        return (
            <TouchableOpacity onPress={() => handleSelectItem(item)} style={[styles.card, isSelected && styles.selectedCard]}>
                <Image source={{ uri: item.Imagen }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.NombrePelicula}</Text>
                    <Text style={styles.category}>Genero: {item.Genero}</Text>
                    <Text style={styles.category}>Actor principal: {item.ActorPrincipal}</Text>
                    <Text style={styles.category}>Actor secundario: {item.ActorSecundario}</Text>
                    <Text style={styles.category}>Año: {item.Año}</Text>
                    <Text style={styles.category}>Director: {item.Director}</Text>
                    <Text style={styles.category}>Duracion: {item.Duracion}</Text>
                    <Text style={styles.category}>Productor: {item.Productor}</Text>
                    <TouchableOpacity onPress={() => openUrl(item.TrailerPelicula)}>
                        <Text style={[styles.category, { color: 'blue', textDecorationLine: 'underline' }]}>Da click aqui para ver el trailer</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Background />
            <Text style={{ color: theme.colors.primary, fontSize: 20, fontWeight: '700', textAlign: 'center' }}>Selecciona tus peliculas favoritas</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar película"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredMovies}
                renderItem={renderItem}
                horizontal
                contentContainerStyle={styles.list}
            />
            <Button title='Siguiente categoria' color={colors.secondaryPurple} onPress={handleOnNavigate} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    list: {
        padding: 10
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 20,
        marginRight: 10,
        overflow: 'hidden',
        elevation: 5
    },
    selectedCard: {
        borderColor: 'blue',
        borderWidth: 2
    },
    image: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').width * 0.4
    },
    info: {
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    category: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingLeft: 10
    },
    video: {
        width: '100%',
        height: 200,
        backgroundColor: 'red',
        marginTop: 10,
    },
});
