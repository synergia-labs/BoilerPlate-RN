import { StyleSheet } from 'react-native';
import { theme } from '../../paper/themeRN';

export const homeStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	sincronizando: {
		height: '100%',
		width: '100%',
		display: 'flex',
		position: 'absolute',
		zIndex: 999,
		backgroundColor: '#EFF5EE',
		opacity: 0.5
	},
	activityIndicator: {
		top: '50%',
		alignItems: 'center'
	},
	listContainer: {
		marginTop: 24,
		flex: 1,
		borderTopEndRadius: 24,
		borderTopLeftRadius: 24,
		backgroundColor: theme.colors.verdeEscuro
	},
	linearGradientStyle: {
		flex: 1,
		paddingTop: 24,
		paddingRight: 16,
		paddingLeft: 16,
		borderRadius: 24
	},
	tituloListCaminhamentos: {
		fontFamily: 'Lato',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 24,
		lineHeight: 29,
		color: theme.colors.branco
	}
});
