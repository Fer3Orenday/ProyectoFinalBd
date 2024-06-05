import { CategoriesRootParamas } from './categoriesRootParams';
import { createStackNavigator } from '@react-navigation/stack';
import { MovieScreen } from '../../modules/Categories/MoviesCategoriesScreen';
import { SeriesScreen } from '../../modules/Categories/SeriesCategoriesScreen';
import { MusicScreen } from '../../modules/Categories/MusicCategoriesScreen';

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
            <Stack.Screen name="MovieScreen" options={{ headerShown: false, title: 'Home', }} component={MovieScreen} />
            <Stack.Screen name="MusicScreen" options={{ headerShown: false, title: 'Home', }} component={MusicScreen} />
            <Stack.Screen name="Seriescreen" options={{ headerShown: false, title: 'Home', }} component={SeriesScreen} />
        </Stack.Navigator>
    );
}