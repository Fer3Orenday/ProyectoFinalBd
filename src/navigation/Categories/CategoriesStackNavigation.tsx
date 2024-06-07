import { CategoriesRootParamas } from './categoriesRootParams';
import { createStackNavigator } from '@react-navigation/stack';
import { MovieScreen } from '../../modules/Categories/MoviesCategoriesScreen';
import { SeriesScreen } from '../../modules/Categories/SeriesCategoriesScreen';
import { MusicScreen } from '../../modules/Categories/MusicCategoriesScreen';
import { MatchScreen } from '../../modules/Match/MatchScreen';

const Stack = createStackNavigator<CategoriesRootParamas>();

export const CategoriesStackNavigation = (props: any) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                },
            }}>
            <Stack.Screen name="MovieScreen" options={{ headerShown: false, title: 'Movie', }} component={MovieScreen} />
            <Stack.Screen name="MusicScreen" options={{ headerShown: false, title: 'Music', }} component={MusicScreen} />
            <Stack.Screen name="SeriesScreen" options={{ headerShown: false, title: 'Series', }} component={SeriesScreen} />
            <Stack.Screen name="MatchScreen" options={{ headerShown: true, title: '¡Busca tu Match!', }} component={MatchScreen} />
        </Stack.Navigator>
    );
}