/*!
 
 =========================================================
 * Material Dashboard React - v1.0.0 based on Material Dashboard - v1.2.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

import React from 'react';

/////////////////////////////////////////////// Paleta de cores do prototipo de alta /////////////////////////////////
const primary = '#007E7A';
const onPrimary = '#FFFFFF';
const primaryContainer = '#9DE4D6';
const onPrimaryContainer = '#034944';
const primaryOnHover = 'rgba(0, 126, 122, 0.1)';

const secondary = '#ECB11F';
const onSecondary = '#034944';
const secondaryContainer = '#FFDD99';
const onSecondaryContainer = '#034944';
const secondaryOnHover = 'rgba(236, 177, 31, 0.2)';
const orangeContainer = '#FFEDE0';

const error = '#B30501';
const onError = '#FFFFFF';
const errorContainer = '#F9E6E6';
const onErrorContainer = '#B30501';

const background = '#FFFFFF';
const onBackground = '#404040';
const buttonOnHover = '#006B68';

const primaryGradient = 'linear-gradient(180deg, #0ABB98 0%, #08AE92 45.83%, #06A28B 69.27%, #007E7A 100%)';
const secondaryGradient = 'linear-gradient(180deg, #034944 0%, #007E7A 100%)';

const greenBackground = 'rgba(3, 73, 68, 0.75)';
const activeBackground = 'rgba(0, 126, 122, 0.25)';
const lightHover = 'rgba(255, 255, 255, 0.2)';
const surface = '#FFFFFF';
const onSurface = '#404040';
const surfaceVariant = '#DAE5E3';
const onSurfaceVariant = '#303030';
const outline = '#6F7978';

//cinzas
const preto = '#000000';
const cinza10 = '#1C1C1C';
const cinza20 = '#282828';
const cinza30 = '#404040';
const cinza40 = '#555555';
const cinza50 = '#777777';
const cinza60 = '#909090';
const cinza70 = '#ACACAC';
const cinza80 = '#BCBEC0';
const cinza90 = '#E6E7E8';
const cinza95 = '#EFF1F0';
const cinza98 = '#F7FBF9';

//primarias
const aquaVale = '#0ABB98';
const amareloVale = '#ECB11F';
const cerejaVale = '#C0305E';
const laranjaVale = '#E37222';
const azulVale = '#3CB5E5';
const cinzaEscuro = '#555555';
const branco = '#FFFFFF';
const verdeEscuro = '#007E7A';

//secundarias
const verdeEscuro = '#034944';
const aquaClaro = '#9DE4D6';
const azulEscuro = '#2626D1';
const amareloClaro = '#FFDD99';
const cerejaEscuro = '#991310';
const cerejaClaro = '#E191C5';
const cinzaClaro = '#E6E7E8';
const cinzaMedio = '#BCBEC0';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////// Tipografia /////////////////////////////////////////////////////

//Família de Fontes
const fontFamily = "'ValeSans', sans-serif";

// Tipografia
const displayLarge = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '3rem',
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '-0.02em'
});

const displayMedium = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '2.5rem',
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '-0.02em'
});

const displaySmall = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '2rem',
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '-0.015em'
});

const headlineLarge = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '2rem',
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '-0.01em'
});

const headlineMedium = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '1.75rem',
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal'
});

const headlineSmall = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '1.5rem',
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal'
});

const titleLarge = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '1.25rem',
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal'
});

const titleMedium = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '1.125rem',
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal'
});

const titleSmall = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '1.125rem',
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal'
});

const labelLarge = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '1rem',
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '0.005em'
});

const labelMedium = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '0.875rem',
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '0.015em'
});

const labelSmall = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '0.75rem',
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '0.02em'
});

const bodyLarge = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '1rem',
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '0.01em'
});

const bodyMedium = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '0.875rem',
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '0.015em'
});

const bodySmall = (_fontScale: number) => ({
	fontFamily: fontFamily,
	fontSize: '0.75rem',
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '0.02em'
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Sombras
const cardShadow = '0px 2px 5px 1px rgba(0, 0, 0, 0.1)';
const appbarShadow = '0px 1px 3px rgba(0, 0, 0, 0.1)';

// Outros
const containerHome = {
	marginTop: '2em'
};

const row = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap'
};

const form = {
	display: 'flex',
	flexDirection: 'column',
	paddingTop: 20, //isMobile ? 40 : 40,
	marginBottom: 40,
	paddingBottom: 100
};

const logo = {
	maxWidth: 100
};

const column = {
	flex: 0.5
};

const fieldContainer: React.CSSProperties = {
	padding: 0,
	paddingBottom: 0
};

export {
	//Paleta
	primary,
	onPrimary,
	primaryContainer,
	onPrimaryContainer,
	primaryOnHover,
	secondary,
	onSecondary,
	secondaryContainer,
	onSecondaryContainer,
	secondaryOnHover,
	orangeContainer,
	error,
	onError,
	errorContainer,
	onErrorContainer,
	background,
	onBackground,
	buttonOnHover,
	primaryGradient,
	secondaryGradient,
	greenBackground,
	activeBackground,
	lightHover,
	surface,
	onSurface,
	surfaceVariant,
	onSurfaceVariant,
	outline,

	//cinzas
	preto,
	cinza10,
	cinza20,
	cinza30,
	cinza40,
	cinza50,
	cinza60,
	cinza70,
	cinza80,
	cinza90,
	cinza95,
	cinza98,

	//primarias
	aquaVale,
	amareloVale,
	cerejaVale,
	laranjaVale,
	azulVale,
	cinzaEscuro,
	branco,
	verdeEscuro,

	//secundarias
	verdeEscuro,
	aquaClaro,
	azulEscuro,
	amareloClaro,
	cerejaEscuro,
	cerejaClaro,
	cinzaClaro,
	cinzaMedio,

	//Tipografia
	fontFamily,
	displayLarge,
	displayMedium,
	displaySmall,
	headlineLarge,
	headlineMedium,
	headlineSmall,
	titleLarge,
	titleMedium,
	titleSmall,
	labelLarge,
	labelMedium,
	labelSmall,
	bodyLarge,
	bodyMedium,
	bodySmall,

	//Sombras
	cardShadow,
	appbarShadow,

	//Outros
	containerHome,
	row,
	column,
	form,
	logo,
	fieldContainer
};
