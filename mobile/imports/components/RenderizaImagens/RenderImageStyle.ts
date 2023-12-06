import { StyleSheet } from 'react-native';
import { shadows } from '../../paper/shadows';


export const renderImageStyle = (colors: any) => StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.branco
	},
	headerContainer: {
		flexDirection: 'column',
		width: '100%',
		backgroundColor: colors.verdeVale
	},
	iconsRow: {
		flexDirection: 'row'
	},
	tituloContainer: {
		flexDirection: 'row',
		marginLeft: 16,
		paddingBottom: 16,
		alignItems: 'center'
	},
	titulosDaDescricao: {
		marginBottom: 4,
		paddingLeft: 8,
		color: colors.branco
	},
	tituloPagina: {
		color: colors.cinza20
	},
	closeButton: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	pageContainer: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 16,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16
	},
	mapa: {
		marginBottom: 16,
		borderRadius: 16
	},
	tituloDescricao: {
		color: colors.cinza40
	},
	valorDescricao: {
		color: colors.primary,
		marginTop: 4
	},
	natureza: { flexDirection: 'row', alignItems: 'center' },
	textAlterarNaturezaEvento: {
		marginTop: 8,
		color: colors.verdeVale,
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 17,
		textDecorationLine: 'underline'
	},
	input: {
		backgroundColor: 'transparent',
		paddingHorizontal: 16,
		borderColor: '#CCCCCC',
		borderWidth: 1
	},
	textInputContainer: {
		width: '100%',
		marginBottom: 24,
		paddingHorizontal: 16
	},
	subtitulo: {
		color: colors.preto,
		marginBottom: 16
	},
	novoAudio: {
		flex: 1,
		maxWidth: 120,
		borderRadius: 4,
		borderColor: colors.verdeVale,
		marginTop: 8,
		marginRight: 16
	},
	renderAudio: {
		marginRight: 16,
		marginBottom: 16
	},
	emptyStateAudio: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	botoesFoto: {
		flexDirection: 'row',
		marginTop: 8
	},
	botaoTirarFoto: {
		width: '40%'
	},
	botaoAnexarFoto: {
		width: '36%',
		marginLeft: 16
	},
	renderImagem: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		flex: 1,
		marginBottom: 32
	},
	novaFoto: {
		flex: 1,
		maxWidth: 120,
		borderRadius: 4,
		borderColor: colors.verdeVale
	},
	anexarImagem: {
		flex: 1,
		maxWidth: 120,
		borderRadius: 4,
		borderColor: colors.verdeVale,
		marginLeft: 16
	},

	cancelarConfirmarContainer: {
		paddingHorizontal: 16,
		paddingVertical: 16,
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	alterar: { borderRadius: 4, borderColor: colors.verdeVale, height: 40, width: 120 },
	cancelar: { borderRadius: 4, borderColor: colors.verdeVale, height: 44, width: 148 },
	concluir: { borderRadius: 4, backgroundColor: colors.verdeVale, height: 44, width: 148 },
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 4,
		marginVertical: 16
	},
	item: {
		position: 'relative',
		marginRight: 10,
		marginBottom: 10
	},
	deleteButton: {
		margin: -10,
		borderWidth: 1,

	},
	deleteButtonWrapper: {
		position: 'absolute',
		top: -6,
		right: -6,
		zIndex: 1,
		borderRadius: 200,
		backgroundColor: colors.background,
		...shadows.shadow4
	},
	emptyState: { marginTop: 16, flex: 1, alignItems: 'center' },
	localizacaoGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginVertical: 24,
		paddingHorizontal: 16
	},
	localizacaoInputContainer: {
		width: '50%'
	},
	informacoesAdicionais: {
		paddingHorizontal: 16
	},
	audioContainer: {
		marginTop: 16
	},
	imageContainer: {
		marginTop: 16
	},
	bodyDetalhesText: {
		marginTop: 4,
		color: colors.onBackground
	},
	tituloRegistrosAdicionais: {
		color: colors.cinza20,
		marginTop: 16,
		marginBottom: 16
	},
	textoAuxiliar: {
		color: colors.cinza60,
		marginTop: 8,
		marginBottom: 8
	},
	textoEmptyState: {
		color: colors.cinza60,
		marginTop: 44,
		marginBottom: 24,
		alignItems: 'center'
	}
});
