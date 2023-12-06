import { StyleSheet } from 'react-native';
import { theme } from '../paper/themeRN';

export const dialogRNStyles = (colors:any) => StyleSheet.create({
	actions: { width: '100%', alignItems: 'center', justifyContent: 'space-around' },
	dismissButton: {
		paddingHorizontal: 16,
		paddingVertical: 10,
		color: colors.accentClaro,
		borderRadius: 4
	},
	confirmButton: {
		paddingHorizontal: 16,
		paddingVertical: 10,
		color: colors.accentClaro,
		borderRadius: 4
	}
});
