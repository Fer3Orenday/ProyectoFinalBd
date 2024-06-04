import React, { useEffect, useRef } from 'react';
import { colors, theme } from '../../theme/theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DocumentIcon, HomeIcon, TranstactionIcon } from '../../assets';
import { HomeStackNavigation } from '../Home/HomeStackNavigation';
import { StatementAccountStackNavigation } from '../StatementAccount/StatementAccountStackNavigation';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { TransactionsStackNavigation } from '../Transactions/TransactionsStackNavigation';
import * as Animatable from 'react-native-animatable';

const tabs = [
    { route: 'HomeStackNavigation', icon: <HomeIcon width={25} height={25} fill={colors.greyLigth} />, component: HomeStackNavigation },
    // { route: 'StatementAccountStackNavigation', icon: <DocumentIcon width={25} height={25} fill={colors.greyLigth} />, component: StatementAccountStackNavigation },
    // { route: 'TransactionsStackNavigation', icon: <TranstactionIcon width={25} height={25} fill={colors.greyLigth} />, component: TransactionsStackNavigation },
];

const Tab = createBottomTabNavigator();

const TabButton = (props: any) => {
    const { item, onPress, accessibilityState } = props;
    const circleRef = useRef(null);
    const focused = accessibilityState.selected;

    useEffect(() => {
    }, [focused]);

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}
        >
            <>
                {focused ?
                    <Animatable.View ref={circleRef} style={styles.focusedAnimatedView}>
                        {item.icon}
                    </Animatable.View>
                    : <Animatable.View ref={circleRef} style={styles.animatedView} >
                        {item.icon}
                    </Animatable.View>
                }
            </>
        </TouchableOpacity>
    );
}

export const TabsHome = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabContainer
            }}
        >
            {tabs.map((item, index): any => (
                <Tab.Screen key={index} name={item.route} component={item.component}
                    options={{ tabBarShowLabel: false, tabBarButton: (props: any) => <TabButton {...props} item={item} /> }} />
            ))}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    animatedView: {
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    focusedAnimatedView: {
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: 100,
        height: 40,
        justifyContent: 'center',
        shadowColor: colors.black,
        width: 40,
        shadowOffset: {
            height: 4,
            width: 0,
        },
        elevation: 8,
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
    },
    image: {
        height: 30,
        width: 30,
    },
    tabContainer: {
        alignItems: 'center',
        height: '9.8%',
        justifyContent: 'center',
        paddingTop: 2,
    },
});
