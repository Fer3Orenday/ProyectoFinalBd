import { AuthContext } from '../context/AuthContext/AuthContext';
import { BackgroundLoading } from '../component/BackgroundLoading';
import { LoginStackNavigation } from './Login/LoginStackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { TabsHome } from './Tabs/TabsHome';
import { theme } from '../theme/theme';
import { useContext, useEffect, useState } from 'react';
import { CategoriesStackNavigation } from './Categories/CategoriesStackNavigation';

export const RootStackNavigation = (props: any) => {
    const { status } = useContext(AuthContext);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const splashTimer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);

        return () => clearTimeout(splashTimer);
    }, []);

    if (showSplash) {
        return <BackgroundLoading />;
    }

    return (
        <NavigationContainer>
            {status !== 'autheticated' ?
                <LoginStackNavigation /> :
                <>
                    <StatusBar backgroundColor={theme.colors.primary} />
                    <CategoriesStackNavigation />
                </>
            }
        </NavigationContainer>
    );
}