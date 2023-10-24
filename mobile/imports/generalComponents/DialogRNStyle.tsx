import { StyleSheet } from 'react-native';
import { theme } from '../paper/themeRN';

export const dialogRNStyles = StyleSheet.create({
	actions: { width: '100%', alignItems: 'center', justifyContent: 'center' },
	dismissButton: {
		borderColor: theme.colors.verdeEscuro,
		borderWidth: 1,
		paddingHorizontal: 16,
		paddingVertical: 10,
		color: theme.colors.verdeEscuro,
		borderRadius: 4
	},
	confirmButton: {
		backgroundColor: theme.colors.verdeEscuro,
		paddingHorizontal: 16,
		paddingVertical: 10,
		color: theme.colors.branco,
		borderRadius: 4
	}
});
