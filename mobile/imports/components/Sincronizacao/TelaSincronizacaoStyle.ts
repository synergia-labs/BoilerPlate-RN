import { StyleSheet } from 'react-native';
import { theme } from '../../paper/themeRN';

export const telaSincronizacaoStyle = (colors: any) => StyleSheet.create({
	textSincronizandoDados: {
		marginTop: 8,
		fontFamily: 'Lato',
		fontStyle: 'normal',
		fontWeight: '700',
		fontSize: 16,
		lineHeight: 19,
	},
	viewTelaSincronizacao: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});
