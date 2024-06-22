import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { Background } from '../../component/Background';
import { CategoriesRootParamas } from '../../navigation/Categories/categoriesRootParams';
import { colors, theme } from '../../theme/theme';
import { GET_MUSICA, POST_PREFERENCIAS } from '../../server/sources';
import { SafeAreaView, View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Button, TextInput } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import soundApi from '../../server/server';

export interface MusicData {
    Artista: string;
    CancionesFavoritas: string;
    Genero: string;
    IdMusica: number;
    IdUsuario: null;
    Recomendaciones: string;
    Álbum: string;
    Imagen: string;
}

const musicDataArray: MusicData[] = [
    {
        Artista: "The Beatles",
        CancionesFavoritas: "Hey Jude, Let It Be, Yesterday",
        Genero: "Rock",
        IdMusica: 1,
        IdUsuario: null,
        Recomendaciones: "Come Together, Something",
        Álbum: "Abbey Road",
        Imagen: "https://m.media-amazon.com/images/I/71lQ7EgB6vL._AC_SL1425_.jpg"
    },
    {
        Artista: "Michael Jackson",
        CancionesFavoritas: "Billie Jean, Thriller, Beat It",
        Genero: "Pop",
        IdMusica: 2,
        IdUsuario: null,
        Recomendaciones: "Smooth Criminal, Black or White",
        Álbum: "Thriller",
        Imagen: "https://m.media-amazon.com/images/I/71UimO6-MjL._AC_SL1425_.jpg"
    },
    {
        Artista: "Beyoncé",
        CancionesFavoritas: "Halo, Single Ladies, Crazy in Love",
        Genero: "Pop, R&B",
        IdMusica: 3,
        IdUsuario: null,
        Recomendaciones: "Formation, Drunk in Love",
        Álbum: "Lemonade",
        Imagen: "https://m.media-amazon.com/images/I/71u6gdz-yDL._AC_SL1200_.jpg"
    },
    {
        Artista: "Queen",
        CancionesFavoritas: "Bohemian Rhapsody, Don't Stop Me Now, We Will Rock You",
        Genero: "Rock",
        IdMusica: 4,
        IdUsuario: null,
        Recomendaciones: "Somebody to Love, Under Pressure",
        Álbum: "A Night at the Opera",
        Imagen: "https://m.media-amazon.com/images/I/71lnUtYFo-L._AC_SL1300_.jpg"
    },
    {
        Artista: "Taylor Swift",
        CancionesFavoritas: "Love Story, Shake It Off, Blank Space",
        Genero: "Pop, Country",
        IdMusica: 5,
        IdUsuario: null,
        Recomendaciones: "You Belong with Me, Bad Blood",
        Álbum: "1989",
        Imagen: "https://m.media-amazon.com/images/I/71Y5kHI9dzL._AC_SL1200_.jpg"
    }
];

interface Props extends StackScreenProps<CategoriesRootParamas, any> { };

export const MusicScreen = ({ navigation }: Props) => {
    const { user } = useContext(AuthContext);

    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [music, setMusic] = useState<MusicData[]>(musicDataArray);
    const [filteredMusic, setFilteredMusic] = useState<MusicData[]>(musicDataArray);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    useEffect(() => {
        // handleOnGetMusic();
    }, []);

    const handleOnGetMusic = async () => {
        const result = await soundApi.get(GET_MUSICA);
        if (result.status === 200) {
            setMusic(result.data);
            setFilteredMusic(result.data);
        }
    }

    const handleSelectItem = (item: MusicData) => {
        if (selectedItemIds.includes(item.Artista)) {
            setSelectedItemIds(selectedItemIds.filter(id => id !== item.Artista));
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem.IdContenido !== item.IdMusica));
        } else {
            setSelectedItemIds([...selectedItemIds, item.Artista]);
            setSelectedItems([
                ...selectedItems,
                {
                    IdUsuario: user.IdUsuario,
                    TipoContenido: 'musica',
                    IdContenido: item.IdMusica,
                }
            ]);
        }
    };

    const handleOnNavigate = async () => {
        // const result = await soundApi.post(POST_PREFERENCIAS, {
        //     preferencias: selectedItems
        // });
        // if (result.status === 201) {
        navigation.navigate('SeriesScreen', {});
        // }
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const results = music.filter(song => song.Artista.toLowerCase().includes(query.toLowerCase()));
        setFilteredMusic(results);
    };

    const renderItem = ({ item }: { item: MusicData }) => {
        const isSelected = selectedItemIds.includes(item.Artista);
        return (
            <TouchableOpacity onPress={() => handleSelectItem(item)} style={[styles.card, isSelected && styles.selectedCard]}>
                <Image source={{ uri: 'https://cdn.pixabay.com/photo/2016/10/22/00/15/spotify-1759471_1280.jpg' }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title}>Artista: {item.Artista}</Text>
                    <Text style={styles.category}>Album: {item.Álbum}</Text>
                    <Text style={styles.category}>Genero: {item.Genero}</Text>
                    <Text style={styles.category}>Recomendaciones: {item.Recomendaciones}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Background />
            <Text style={{ color: theme.colors.primary, fontSize: 20, fontWeight: '700', textAlign: 'center' }}>Selecciona tus canciones favoritas</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar canción"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredMusic}
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
    }
});
