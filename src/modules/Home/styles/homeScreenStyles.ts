import { StyleSheet } from "react-native";
import { colors, globalStyles, theme } from "../../../theme/theme";

export const styles = StyleSheet.create({
    accountText: {
        color: colors.white,
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
    },
    background: {
        flex: 1,
        resizeMode: 'contain',
    },
    container: {
        ...globalStyles.globalShadow,
        backgroundColor: colors.white,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 20
    },
    image: {
        alignSelf: 'center',
        borderRadius: 20,
        height: 180,
        marginTop: 10,
        width: 350,
    },
    nameText: {
        color: theme.colors.primary,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
    },
    text: {
        color: theme.colors.primary,
        fontSize: 16,
        fontWeight: '400',
        margin: 10,
    },
    statementAccount: {
        backgroundColor: colors.secondaryPurple,
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
})