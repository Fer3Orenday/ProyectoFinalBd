import { createStackNavigator } from '@react-navigation/stack';
import { TransactionsRootParamas } from './transactionsRootParams';
import { TransactionsScreen } from '../../modules/Transactions/screens/TransactionsScreen';

const Stack = createStackNavigator<TransactionsRootParamas>();

export const TransactionsStackNavigation = (props: any) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                },
            }}>
            <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />
        </Stack.Navigator>
    );
}