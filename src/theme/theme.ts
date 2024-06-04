import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const theme: Theme = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        border: '#979797',
        card: '#5898E9',
        notification: '#0A84FF',
        primary: '#AB0707',
        text: '#FFFFFF',
    },
};

export const colors = {
    black: '#000',
    blueKing: '#336388',
    golden: '#F7B801',
    greyLigth: '#B9B9B9',
    greyMoreLigth: '#DADADA',
    pink: '#E57171',
    red: '#C62C09',
    secondary: '#b6bab1',
    secondaryPurple: '#3B07AB',
    transparent: 'rgba(52, 52, 52, 0.5)',
    white: '#FFFFFF',
    whiteBrown: '#8d8379',
}

export const globalStyles = StyleSheet.create({
    globalInput: {
        borderColor: colors.secondaryPurple,
        borderRadius: 20,
        borderWidth: 1,
        color: colors.black,
        flexDirection: 'row',
        height: 41.141,
        justifyContent: 'space-between',
        marginHorizontal: 35,
        marginTop: 30,
        alignItems: 'center',
        fontSize: 16,
        paddingLeft: 25,
        backgroundColor: colors.white
    },
    globalShadow: {
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    globalShadowAlert: {
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
});
