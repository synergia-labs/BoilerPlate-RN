import { StyleSheet } from 'react-native';
import { theme } from '../../themeRN';
import { shadows } from '../../shadows';

export const customFabPrimaryStyle = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
		paddingHorizontal: 28,
		paddingVertical: 14,
		borderRadius: 100,
		backgroundColor: theme.colors.background,
		...shadows.shadow4
	},
	conatainerSmall: {
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	containerDisabled: {
		backgroundColor: theme.colors.cinza90
	},
	containerPressed: { backgroundColor: theme.colors.lightButtonOnHover },
	text: {
		color: theme.colors.primary,
		lineHeight: 24
	},
	textDisabled: { color: theme.colors.cinza50 }
});

export const customFabSecondaryStyle = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
		paddingHorizontal: 28,
		paddingVertical: 14,
		borderRadius: 100,
		backgroundColor: theme.colors.secondary,
		...shadows.shadow4
	},
	conatainerSmall: {
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	containerDisabled: {
		backgroundColor: theme.colors.cinza90
	},
	containerPressed: { backgroundColor: theme.colors.secondaryButtonOnHover },
	text: {
		color: theme.colors.onSecondary,
		lineHeight: 24
	},
	textDisabled: { color: theme.colors.cinza50 }
});
