import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { Background } from '../../component/Background';
import { CategoriesRootParamas } from '../../navigation/Categories/categoriesRootParams';
import { colors, theme } from '../../theme/theme';
import { CommonActions } from '@react-navigation/native';
import { GET_SERIES, POST_PREFERENCIAS } from '../../server/sources';
import { SafeAreaView, View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Button, TextInput, Linking } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import soundApi from '../../server/server';

export interface SerieData {
    ActorPrincipal: string;
    ActorSecundario: string;
    Año: number;
    Director: string;
    DuracionCapitulos: string;
    Genero: string;
    IdSerie: number;
    IdUsuario: null;
    NombreSerie: string;
    Productor: string;
    TrailerSerie: string;
    Imagen: string;
}

const serieDataArray: SerieData[] = [
    {
        ActorPrincipal: "Bryan Cranston",
        ActorSecundario: "Aaron Paul",
        Año: 2008,
        Director: "Vince Gilligan",
        DuracionCapitulos: "47 min",
        Genero: "Crime, Drama, Thriller",
        IdSerie: 1,
        IdUsuario: null,
        NombreSerie: "Breaking Bad",
        Productor: "Vince Gilligan",
        TrailerSerie: "https://www.youtube.com/watch?v=HhesaQXLuRY",
        Imagen: "https://m.media-amazon.com/images/I/51VNBK1UxxL._AC_.jpg"
    },
    {
        ActorPrincipal: "Peter Dinklage",
        ActorSecundario: "Emilia Clarke",
        Año: 2011,
        Director: "David Benioff, D.B. Weiss",
        DuracionCapitulos: "57 min",
        Genero: "Action, Adventure, Drama",
        IdSerie: 2,
        IdUsuario: null,
        NombreSerie: "Game of Thrones",
        Productor: "David Benioff, D.B. Weiss",
        TrailerSerie: "https://www.youtube.com/watch?v=gcTkNV5Vg1E",
        Imagen: "https://m.media-amazon.com/images/I/81KX6P4RPPL._AC_SY679_.jpg"
    },
    {
        ActorPrincipal: "Millie Bobby Brown",
        ActorSecundario: "Finn Wolfhard",
        Año: 2016,
        Director: "The Duffer Brothers",
        DuracionCapitulos: "51 min",
        Genero: "Drama, Fantasy, Horror",
        IdSerie: 3,
        IdUsuario: null,
        NombreSerie: "Stranger Things",
        Productor: "The Duffer Brothers",
        TrailerSerie: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
        Imagen: "https://m.media-amazon.com/images/I/91E7I0H3yYL._AC_SY679_.jpg"
    },
    {
        ActorPrincipal: "David Harbour",
        ActorSecundario: "Winona Ryder",
        Año: 2016,
        Director: "The Duffer Brothers",
        DuracionCapitulos: "51 min",
        Genero: "Drama, Fantasy, Horror",
        IdSerie: 4,
        IdUsuario: null,
        NombreSerie: "Stranger Things",
        Productor: "The Duffer Brothers",
        TrailerSerie: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
        Imagen: "https://m.media-amazon.com/images/I/91E7I0H3yYL._AC_SY679_.jpg"
    },
    {
        ActorPrincipal: "Kevin Spacey",
        ActorSecundario: "Robin Wright",
        Año: 2013,
        Director: "Beau Willimon",
        DuracionCapitulos: "51 min",
        Genero: "Drama",
        IdSerie: 5,
        IdUsuario: null,
        NombreSerie: "House of Cards",
        Productor: "Beau Willimon",
        TrailerSerie: "https://www.youtube.com/watch?v=ULwUzF1q5w4",
        Imagen: "https://m.media-amazon.com/images/I/91Rk0v0NgzL._AC_SY679_.jpg"
    }
];

interface Props extends StackScreenProps<CategoriesRootParamas, any> { };

export const SeriesScreen = ({ navigation }: Props) => {
    const { user } = useContext(AuthContext);

    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [series, setSeries] = useState<SerieData[]>(serieDataArray);
    const [filteredSeries, setFilteredSeries] = useState<SerieData[]>(serieDataArray);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    useEffect(() => {
        // handleOnGetSeries();
    }, []);

    const handleOnGetSeries = async () => {
        const result = await soundApi.get(GET_SERIES);
        if (result.status === 200) {
            setSeries(result.data);
            setFilteredSeries(result.data);
        }
    }

    const handleSelectItem = (item: SerieData) => {
        if (selectedItemIds.includes(item.NombreSerie)) {
            setSelectedItemIds(selectedItemIds.filter(id => id !== item.NombreSerie));
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem.IdContenido !== item.IdSerie));
        } else {
            setSelectedItemIds([...selectedItemIds, item.NombreSerie]);
            setSelectedItems([
                ...selectedItems,
                {
                    IdUsuario: user.IdUsuario,
                    TipoContenido: 'serie',
                    IdContenido: item.IdSerie,
                }
            ]);
        }
    };

    const handleOnNavigate = async () => {
        // const result = await soundApi.post(POST_PREFERENCIAS, {
        //     preferencias: selectedItems
        // });
        // if (result.status === 201) {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'MatchScreen' },
                ],
            })
        );
        // }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const results = series.filter(serie => serie.NombreSerie.toLowerCase().includes(query.toLowerCase()));
        setFilteredSeries(results);
    };

    const openUrl = async (url: string) => {
        await Linking.openURL(url);
    };

    const renderItem = ({ item }: { item: SerieData }) => {
        const isSelected = selectedItemIds.includes(item.NombreSerie);
        return (
            <TouchableOpacity onPress={() => handleSelectItem(item)} style={[styles.card, isSelected && styles.selectedCard]}>
                <Image source={{ uri: item.Imagen }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.NombreSerie}</Text>
                    <Text style={styles.category}>Genero: {item.Genero}</Text>
                    <Text style={styles.category}>Actor principal: {item.ActorPrincipal}</Text>
                    <Text style={styles.category}>Actor secundario: {item.ActorSecundario}</Text>
                    <Text style={styles.category}>Año de lanzamiento{item.Año}</Text>
                    <Text style={styles.category}>Director: {item.Director}</Text>
                    <Text style={styles.category}>Productor: {item.Productor}</Text>
                    <TouchableOpacity onPress={() => openUrl(item.TrailerSerie)}>
                        <Text style={[styles.category, { color: 'blue', textDecorationLine: 'underline' }]}>Da click aqui para ver el trailer</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Background />
            <Text style={{ color: theme.colors.primary, fontSize: 20, fontWeight: '700', textAlign: 'center' }}>Selecciona tus series favoritas</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar serie"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredSeries}
                renderItem={renderItem}
                horizontal
                contentContainerStyle={styles.list}
            />
            <Button title='Listo' color={colors.secondaryPurple} onPress={handleOnNavigate} />
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
