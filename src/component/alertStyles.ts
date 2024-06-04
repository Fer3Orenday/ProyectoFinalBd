import { colors, theme } from "../theme/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    backButton: {
        borderColor: colors.secondary,
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 28,
        paddingVertical: 11,
    },
    button: {
        backgroundColor: colors.golden,
        borderRadius: 20,
        paddingHorizontal: 28,
        paddingVertical: 11,
    },
    cancelButton: {
        backgroundColor: colors.pink,
        borderColor: colors.secondary,
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 22,
        paddingHorizontal: 16,
        paddingVertical: 11,
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginRight: 25,
    },
    container: {
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.transparent,
        flex: 1,
        justifyContent: 'center',
    },
    containerButtons: {
        flexDirection: 'row',
    },
    modalContainer: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 29,
        marginHorizontal: 10,
        paddingVertical: 15,
    },
    separator: {
        backgroundColor: colors.secondary,
        height: 1,
        marginBottom: 10,
        marginTop: 28,
        width: 345,
    },
    text: {
        color: colors.black,
        fontSize: 14,
        fontWeight: '400',
        paddingHorizontal: 38,
        textAlign: 'center'
    },
    textButton: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
    underlineText: {
        color: theme.colors.primary,
        fontWeight: '500',
    },
});
