import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Button, TextInput } from 'react-native';
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

const music: Item[] = [
    {
        id: '1',
        title: 'Bohemian Rhapsody',
        category: 'Rock',
        image: 'https://link-to-bohemian-rhapsody-cover.com/cover.jpg'
    },
    {
        id: '2',
        title: 'Imagine',
        category: 'Pop',
        image: 'https://link-to-imagine-cover.com/cover.jpg'
    },
    {
        id: '3',
        title: 'Smells Like Teen Spirit',
        category: 'Grunge',
        image: 'https://link-to-smells-like-teen-spirit-cover.com/cover.jpg'
    },
    {
        id: '4',
        title: 'Stairway to Heaven',
        category: 'Rock',
        image: 'https://link-to-stairway-to-heaven-cover.com/cover.jpg'
    }
];

interface Props extends StackScreenProps<CategoriesRootParamas, any> { };

export const MusicScreen = ({ navigation }: Props) => {
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredMusic, setFilteredMusic] = useState<Item[]>(music);

    const handleSelectItem = (item: Item) => {
        if (selectedItemIds.includes(item.id)) {
            setSelectedItemIds(selectedItemIds.filter(id => id !== item.id));
        } else {
            setSelectedItemIds([...selectedItemIds, item.id]);
        }
    };

    const handleOnNavigate = () => {
        navigation.navigate('SeriesScreen', {});
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const results = music.filter(song => song.title.toLowerCase().includes(query.toLowerCase()));
        setFilteredMusic(results);
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
