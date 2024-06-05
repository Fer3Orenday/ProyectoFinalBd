import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native';
import { theme } from '../../theme/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { CategoriesRootParamas } from '../../navigation/Categories/categoriesRootParams';

interface Item {
    id: string;
    title: string;
    category: string;
    image: string;
}

const series: Item[] = [
    {
        id: '1',
        title: 'Breaking Bad',
        category: 'Drama',
        image: 'https://link-to-breaking-bad-poster.com/poster.jpg'
    },
    {
        id: '2',
        title: 'Game of Thrones',
        category: 'Fantasy',
        image: 'https://link-to-game-of-thrones-poster.com/poster.jpg'
    },
    {
        id: '3',
        title: 'Stranger Things',
        category: 'Sci-Fi',
        image: 'https://link-to-stranger-things-poster.com/poster.jpg'
    },
    {
        id: '4',
        title: 'The Crown',
        category: 'Drama',
        image: 'https://link-to-the-crown-poster.com/poster.jpg'
    }
];

interface Props extends StackScreenProps<CategoriesRootParamas, any> { };

export const SeriesScreen = ({ navigation, route }: Props) => {
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

    const handleSelectItem = (item: Item) => {
        if (selectedItemIds.includes(item.id)) {
            setSelectedItemIds(selectedItemIds.filter(id => id !== item.id));
        } else {
            setSelectedItemIds([...selectedItemIds, item.id]);
        }
    };

    const handleOnNavigate = () => {
        navigation.navigate('MusicScreen', {});
    }

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
            <Text style={{ color: theme.colors.primary, fontSize: 20, fontWeight: '700', textAlign: 'center' }}>Selecciona tus series favoritas</Text>
            <FlatList
                data={series}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                contentContainerStyle={styles.list}
            />
            <Button title='Listo' onPress={handleOnNavigate} />
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
    }
});
