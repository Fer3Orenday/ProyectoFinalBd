import { StyleSheet } from "react-native";
import { colors, theme } from "../../../theme/theme";

export const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.secondaryPurple,
        borderColor: colors.white,
        borderRadius: 20,
        borderWidth: 1,
        marginVertical: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: 150,
    },
    container: {
        flex: 1,
    },
    image: {
        alignSelf: 'center',
        height: 350,
        width: 350,
        borderRadius: 10,
    },
    privacityText: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.white,
        alignSelf: 'center',
    },
    subContainer: {
        backgroundColor: theme.colors.primary,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        flex: 1,
        marginVertical: 10,
    },
    textButton: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
    textTitle: {
        alignSelf: 'center',
        color: theme.colors.primary,
        fontSize: 32,
        fontWeight: '700',
        marginTop: 15,
    },
    title: {
        alignSelf: 'center',
        color: theme.colors.primary,
        fontSize: 50,
        fontWeight: '700',
        marginBottom: 10,
    },
});
