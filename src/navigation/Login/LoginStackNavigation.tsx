import { createStackNavigator } from '@react-navigation/stack';
import { LoginRootParams } from "./loginRootParams";
import { LoginScreen } from '../../modules/Login/screens/LoginScreen';

const Stack = createStackNavigator<LoginRootParams>();

export const LoginStackNavigation = (props: any) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                },
            }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    );
}