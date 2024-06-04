import { createStackNavigator } from '@react-navigation/stack';
import { HomeRootParamas } from './homeRootParams';
import { HomeScreen } from '../../modules/Home/screens/HomeScreen';
import { TransactionsStackNavigation } from '../Transactions/TransactionsStackNavigation';
import { StatementAccountStackNavigation } from '../StatementAccount/StatementAccountStackNavigation';
import { colors } from '../../theme/theme';

const Stack = createStackNavigator<HomeRootParamas>();

export const HomeStackNavigation = (props: any) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                },
            }}>
            <Stack.Screen name="HomeScreen" options={{ headerShown: false,  title: 'Home', }} component={HomeScreen} />
            <Stack.Screen name="TransactionsStackNavigation"
                options={{
                    title: 'Transacciones',
                    headerTransparent: true,
                    headerTintColor: colors.black,
                    headerStyle: { backgroundColor: 'transparent' }
                }}
                component={TransactionsStackNavigation} />
            <Stack.Screen name="StatementAccountStackNavigation"
                options={{
                    title: 'Estados de cuenta',
                    headerTransparent: true,
                    headerTintColor: colors.black,
                    headerStyle: { backgroundColor: colors.secondaryPurple }
                }}
                component={StatementAccountStackNavigation} />
        </Stack.Navigator>
    );
}