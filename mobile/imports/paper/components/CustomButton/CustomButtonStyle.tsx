import { StyleSheet } from 'react-native';
import { theme } from '../../themeRN';

export const customButtonPrimaryStyle = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
		paddingHorizontal: 28,
		paddingVertical: 14,
		borderRadius: 50,
		backgroundColor: theme.colors.primary
	},
	conatainerSmall: {
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	containerDisabled: {
		backgroundColor: theme.colors.cinza90
	},
	containerPressed: { backgroundColor: theme.colors.buttonOnHover },
	text: {
		color: theme.colors.onPrimary,
		lineHeight: 24
	},
	textDisabled: { color: theme.colors.cinza50 }
});

export const customButtonSecondaryStyle = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
		paddingHorizontal: 27,
		paddingVertical: 13,
		borderRadius: 50,
		borderColor: theme.colors.primary,
		borderWidth: 1
	},
	conatainerSmall: {
		paddingHorizontal: 19,
		paddingVertical: 9
	},
	containerDisabled: {
		borderColor: theme.colors.cinza80
	},
	containerPressed: { backgroundColor: theme.colors.primaryOnHover },
	text: {
		color: theme.colors.primary,
		lineHeight: 24
	},
	textDisabled: { color: theme.colors.cinza50 }
});
