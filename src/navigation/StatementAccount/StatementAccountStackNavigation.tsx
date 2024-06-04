import { createStackNavigator } from '@react-navigation/stack';
import { StatementAccountRootParamas } from './StatementAccountRootParams';
import { StatementAccountScreen } from '../../modules/StatementAccount/screen/StatementAccountScreen';

const Stack = createStackNavigator<StatementAccountRootParamas>();

export const StatementAccountStackNavigation = (props: any) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                },
            }}>
            <Stack.Screen name="StatementAccountScreen" component={StatementAccountScreen} />
        </Stack.Navigator>
    );
}