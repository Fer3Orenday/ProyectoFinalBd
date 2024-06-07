import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import { colors, theme } from '../../theme/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { CategoriesRootParamas } from '../../navigation/Categories/categoriesRootParams';
import { Background } from '../../component/Background';

interface Item {
    id: string;
    title: string;
    category: string;
    image: string;
}

const movies: Item[] = [
    {
        id: '1',
        title: 'Inception',
        category: 'Sci-Fi',
        image: 'https://link-to-inception-poster.com/poster.jpg'
    },
    {
        id: '2',
        title: 'Interstellar',
        category: 'Sci-Fi',
        image: 'https://link-to-interstellar-poster.com/poster.jpg'
    },
    {
        id: '3',
        title: 'The Dark Knight',
        category: 'Action',
        image: 'https://link-to-dark-knight-poster.com/poster.jpg'
    },
    {
        id: '4',
        title: 'Mad Max: Fury Road',
        category: 'Action',
        image: 'https://link-to-mad-max-poster.com/poster.jpg'
    }
];

interface Props extends StackScreenProps<CategoriesRootParamas, any> { };

export const MovieScreen = ({ navigation }: Props) => {
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredMovies, setFilteredMovies] = useState<Item[]>(movies);

    const handleSelectItem = (item: Item) => {
        if (selectedItemIds.includes(item.id)) {
            setSelectedItemIds(selectedItemIds.filter(id => id !== item.id));
        } else {
            setSelectedItemIds([...selectedItemIds, item.id]);
        }
    };

    const handleOnNavigate = () => {
        navigation.navigate('MusicScreen', {});
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const results = movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
        setFilteredMovies(results);
    };

    const renderItem = ({ item }: { item: Item }) => {
        const isSelected = selectedItemIds.includes(item.id);
        return (
            <TouchableOpacity onPress={() => handleSelectItem(item)} style={[styles.card, isSelected && styles.selectedCard]}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.category}>{item.category}</Text>
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
                keyExtractor={item => item.id}
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
        color: '#666'
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
