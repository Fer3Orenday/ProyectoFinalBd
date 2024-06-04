import { StyleSheet } from "react-native";
import { theme } from "../../../theme/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        alignSelf: 'center',
        color: theme.colors.primary,
        fontSize: 24,
        fontWeight: '700',
    }
})
