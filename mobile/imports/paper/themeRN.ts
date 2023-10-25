import {  MD3LightTheme as LightTheme, configureFonts } from 'react-native-paper';
import { fontConfig } from './fontConfig';

export const theme = {
	...LightTheme,
	fonts: configureFonts({ config: fontConfig, isV3: true}),
	colors: {
		primary: '#6768f2',
		onPrimary: '#FFFFFF',
		primaryContainer: '#6768f2',
		onPrimaryContainer: '#6768f2',
		primaryOnHover: 'rgba(0, 126, 122, 0.1)',

		secondary: '#00e280',
		onSecondary: '#FFFFFF',
		secondaryContainer: '#00e280',
		onSecondaryContainer: '#00e280',
		secondaryOnHover: 'rgba(236, 177, 31, 0.2)',

		error: '#B30501',
		onError: '#FFFFFF',
		errorContainer: '#F7C0BF',
		onErrorContainer: '#B30501',

		onBackground: '#404040',
		buttonOnHover: '#006B68',

		secondaryButtonOnHover: '#BD8E19',
		lightButtonOnHover: '#CCE5E4',
		greenBackground: 'rgba(3, 73, 68, 0.85)',
		lightHover: 'rgba(255, 255, 255, 0.1)',
		surface: '#FFFFFF',
		onSurface: '#404040',
		surfaceVariant: '#DAE5E3',
		onSurfaceVariant: 'rgb(70, 70, 70)',
		outline: '#6F7978',
		elevation: {
			level0: 'transparent',
			level1: '#f1faf1',
			level2: '#edf1ff',  //cor da bottom bar
			level3: '#e6f4e4',
			level4: '#e3f3e2',
			level5: '#ebebeb'
		},

		//cinzas
		preto: '#000000',
		quasePreto: '#2f2f2f',
		cinza10: '#1C1C1C',
		cinza20: '#282828',
		cinza30: '#404040',
		cinza40: '#555555',
		cinza50: '#777777',
		cinza60: '#909090',
		cinza70: '#ACACAC',
		cinza80: '#BCBEC0',
		cinza90: '#E6E7E8',
		cinza95: '#EFF1F0',
		cinza98: '#F7FBF9',

		//primarias
		novoVerde: '#00e280',
		verdeNeon: '#14f4c9',
		lilas: '#6768f2',
		roxo: '#5945b6',
		verdeReleitura: '#53b96f',
		verdeEsmeralda: '#2db794',
		verdeCubo: '#2bc17a',
		roxoPastel: '#6468b0',
		escuro: '#222a31',
		branco: '#FFFFFF',


		//secundarias
		verdeEscuro: '#034944',
		aquaClaro: '#9DE4D6',
		azulEscuro: '#1c1c7a',
		amareloClaro: '#FFDD99',
		vermelho: 'rgb(201, 0, 25)',
		marrom: '#7e511d',
		laranja: '#d86a10',
		amarelo: '#a1981a',
		cinzaMedio: '#BCBEC0',
		quaseBranco: '#f3f3f3',

	}
};

export const accentColors = {
	accent: '#00e280',
	accentClaro: 'rgb(201, 0, 25)',
	accentOpaco: 'rgba(201, 0, 25, 0.2)',
	accentOpacoDark: 'rgba(201, 0, 25,0.5)',
}

export const temaLight = {
		//cores dinamicas
		background: '#FFFFFF',
		barraNavegacao: '#eeeeff',
		navegacaoAtiva: '#000000',
		secondaryContainer: 'rgba(103, 103, 242, 0.3)',
		navegacaoInativa: '#747474',
		iconeNavegacaoAtiva: '#000000',
		iconeNavegacaoInativa: '#777777',
		chipAtivado: 'rgb(101, 0, 0)',
		chipDesativado: 'rgba(153, 153, 153, 0.2)',
		divisorVertical: '#555555',
		cardDisciplinasTemaLight: 'rgba(201, 0, 0, 0.1)',
		corTextoChipAtivado: '#FFFFFF',
		corTextoChipDesativado: '#000000',
};

export const temaDark = {
	//cores dinamicas
	background: '#131314',
	onSurface: theme.colors.cinza95, //usa a fonte titleMedium, bodyMedium, labelMedium, headlineSmall
	accent: 'rgba(101, 0, 0, 0.9)',
	barraNavegacao: '#1f1f1f',
	navegacaoAtiva: 'rgb(255, 255, 255)',
	secondaryContainer: 'rgba(103, 103, 242, 0.2)', //altera a cor da elipse da barra de navegação
	navegacaoInativa: 'rgb(172, 172, 172)',
	iconeNavegacaoAtiva: 'rgb(214, 214, 214)',
	iconeNavegacaoInativa: 'rgb(172, 172, 172)',
	chipAtivado: 'rgb(101, 0, 0)',
	chipDesativado: 'rgb(70, 70, 70)',
	divisorVertical: '#E6E7E8',
	corTextoChipAtivado: '#FFFFFF',
	corTextoChipDesativado: '#FFFFFF',


};