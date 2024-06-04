import React from 'react';
import { colors, theme } from '../theme/theme';
import { View, StyleSheet, Image } from 'react-native';

export const Background = () => {
    return (
        <View style={styles.container}>
            <View style={[styles.circle, styles.yellowCircle, { left: 260, top: -135 }]} />
            <View style={[styles.borderCircle, styles.blueBorderCircle, { left: -270, top: -220 }]} />
            <View style={[styles.borderCircle, styles.yellowBorderCircle, { left: 200, top: 450 }]} />
            <View style={[styles.circle, styles.blueCircle, { left: -120, top: 680 }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    borderCircle: {
        borderWidth: 50,
        height: 480,
        position: 'absolute',
        width: 504,
    },
    blueCircle: {
        backgroundColor: colors.secondaryPurple,
    },
    blueBorderCircle: {
        borderColor: colors.secondaryPurple,
    },
    circle: {
        height: 281,
        position: 'absolute',
        width: 281,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        opacity: 0.5,
        position: 'absolute',
    },
    yellowCircle: {
        backgroundColor: theme.colors.primary,
    },
    yellowBorderCircle: {
        borderColor: theme.colors.primary,
    },
});
