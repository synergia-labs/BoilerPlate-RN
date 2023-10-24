const prometo = 'Prometo';

const variants = {
	displayLarge: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 48,
		lineHeight: 58,
		letterSpacing: -0.02
	},
	displayMedium: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 40,
		lineHeight: 48,
		letterSpacing: -0.02
	},
	displaySmall: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 32,
		lineHeight: 38,
		letterSpacing: -0.015
	},
	headlineLarge: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 32,
		lineHeight: 38
	},
	headlineMedium: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 28,
		lineHeight: 34
	},
	headlineSmall: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 24,
		lineHeight: 29
	},
	titleLarge: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 20,
		lineHeight: 24,
	},
	titleMedium: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 18,
		lineHeight: 22
	},
	titleSmall: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 18,
		lineHeight: 22
	},
	labelLarge: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 16,
		lineHeight: 19,
		letterSpacing: 0.005
	},

	labelMedium: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 14,
		lineHeight: 17,
		letterSpacing: 0.015
	},
	labelSmall: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: 12,
		lineHeight: 14,
		letterSpacing: 0.02
	},
	bodyLarge: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 19,
		letterSpacing: 0.01
	},
	bodyMedium: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 17,
		letterSpacing: 0.015
	},
	bodySmall: {
		fontFamily: prometo,
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 12,
		lineHeight: 14,
		letterSpacing: 0.02
	}
};

export const fontConfig = {
	fontFamily: prometo,
	...variants,
	android: variants,
	ios: variants
};