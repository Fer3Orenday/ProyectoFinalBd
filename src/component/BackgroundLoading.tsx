import React from 'react';
import { colors, theme } from '../theme/theme';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';

export const BackgroundLoading = () => {
    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <Image
                    source={require('../assets/LogoBanner.png')}
                    style={styles.image}
                />
                <ActivityIndicator style={{ marginTop: 20 }} size={'large'} color={theme.colors.primary} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    modalContainer: {
        alignItems: 'center',
        borderRadius: 29,
        marginHorizontal: 10,
        paddingVertical: 15,
    },
    image: {
        alignSelf: 'center',
        height: 350,
        width: 350,
    },
});
