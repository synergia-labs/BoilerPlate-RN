import { StyleSheet } from 'react-native';

export const homeHeaderStyle = (colors: any) =>  StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		backgroundColor: colors.background,
	},
	usuario: {
		paddingTop: 8,
	},

	avatar: {
		display: 'flex',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	botaoMenu: {
		borderRadius: 24,
		overflow: 'hidden'
	},
	menuOpcoes: {
		backgroundColor: colors.background,
		borderRadius: 24,
	},
	opcaoLogout: {
		marginTop: 10,
		alignItems: 'center',
		marginBottom: 4
	}
});
