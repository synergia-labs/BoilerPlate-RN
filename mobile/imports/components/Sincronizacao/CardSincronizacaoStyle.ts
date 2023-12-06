import { NONAME } from 'dns';
import { StyleSheet } from 'react-native';
import { theme } from '../../paper/themeRN';

export const cardSincronizacaoStyle = (colors: any) => StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		paddingVertical: 8,
	},
	textoSync: {
		color: colors.primary,
		marginBottom: 2
	}
});
