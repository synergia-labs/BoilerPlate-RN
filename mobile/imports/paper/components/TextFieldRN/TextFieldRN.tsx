import { StyleProp, TextStyle, View, useColorScheme } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import { SimpleLabel } from '../SimpleLabel/SimpleLabel';
import { theme } from '../../themeRN';

interface ITextFieldRN extends TextInputProps {
	label?: string;
}

export const TextFieldRN = (props: ITextFieldRN) => {
	const { label, underlineColor, placeholder, disabled, multiline, ...rest } = props;
	const colorScheme = useColorScheme();
	
	const defaulValuestStyle = {
		...(multiline ? {} : { height: 52 }),
		width: '100%',
		backgroundColor: colorScheme === 'dark' ? theme.colors.cinza95 : theme.colors.branco,
		color: theme.colors.cinza60,
		borderRadius: 8
	};

	const defaultStyle = {
		...defaulValuestStyle
	};

	const disabledStyle = {
		...defaulValuestStyle,
		backgroundColor: theme.colors.cinza90
	};

	return (
		<View>
			{label && <SimpleLabel>{label}</SimpleLabel>}
			<TextInput
				{...rest}
				mode="outlined"
				multiline={multiline}
				style={(disabled ? disabledStyle : defaultStyle) as StyleProp<TextStyle>}
				disabled={disabled}
				cursorColor={theme.colors.preto}
				underlineColor="transparent"
				placeholder={placeholder ?? ''}
				placeholderTextColor={theme.colors.cinza60}
				textColor={disabled ? theme.colors.cinza60 : theme.colors.preto}
				activeOutlineColor={disabled ? theme.colors.cinza90 : theme.colors.preto}
				outlineStyle={{ borderWidth: 1, borderRadius: 8, ...(disabled ? { borderColor: theme.colors.cinza90 } : {}) }}
			/>
		</View>
	);
};
