import { StyleSheet } from 'react-native';
import { ThemeProvider } from 'react-native-paper';
import { theme } from '../../../paper/themeRN';

export const homeHeaderStyle = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		backgroundColor: theme.colors.branco,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowOpacity: 1,
		shadowRadius: 2.62,
		elevation: 5,
		zIndex: 1
	},
	titulo: {
		color: theme.colors.cinza20
	},
	botaoLogout: {
		borderRadius: 5,
		margin: 0,
		borderColor: theme.colors.verdeEscuro
	},
	botaoLogoutDisable: {
		borderRadius: 5,
		margin: 0,
		borderColor: theme.colors.cinza90,
		backgroundColor: theme.colors.cinza90
	},
	textButton: {
		color: theme.colors.verdeEscuro
	},
	usuario: {
		marginLeft: 4,
		marginTop: 16,
		paddingBottom: 8
	},
	matricula: {
		marginTop: -40,
		marginLeft: 4
	},
	itemMenu: {
		marginLeft: -5
	},
	avatar: {
		display: 'flex',
		backgroundColor: theme.colors.branco,
		borderWidth: 1,
		borderColor: theme.colors.primary,
		alignItems: 'center',
		justifyContent: 'center'
	},
	menu: {
		background: theme.colors.branco,
		backgroundColor: '#FFF'
	},
	botaoMenu: {
		borderRadius: 24,
		overflow: 'hidden'
	},
	menuOpcoes: {
		backgroundColor: theme.colors.branco,
		borderRadius: 24,
		width: 200
	},
	opcaoTrocaSenha: {
		height: 40,
		marginTop: 8,
		paddingLeft: 20
	},
	opcaoLogout: {
		height: 40,
		paddingLeft: 20,
		marginBottom: 4
	}
});
