import { StyleSheet } from 'react-native';
import { theme } from '../../../paper/themeRN';

export const audioRecorderSFStyle = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: theme.colors.primaryOnHover,
		marginVertical: 8,
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 16,
		gap: 16
	}
});
