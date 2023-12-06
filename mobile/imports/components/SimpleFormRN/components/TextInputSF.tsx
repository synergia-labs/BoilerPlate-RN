import React from 'react';
import { Text, TextInput } from 'react-native-paper';
import { ISFComponent } from '../ISFComponent';
import { Mask, useMaskedInputProps } from 'react-native-mask-input';
import { KeyboardTypeOptions, StyleProp, TextStyle } from 'react-native';
import { hasValue } from '../../../libs/hasValue';
import { TextFieldRN } from '../../../paper/components/TextFieldRN/TextFieldRN';

interface ITextInputSF extends ISFComponent {
	mask?: Mask;
	onChange?: (text: string) => void;
	value?: string;
	defaultValue?: string;
	style?: StyleProp<TextStyle>;
	placeholder?: string;
	multiline?: boolean;
	numberOfLines?: number;
	maxLength?: number;
	placeholderTextColor?: string;
	keyboardType?: KeyboardTypeOptions;
	error?: boolean;
	activeUnderlineColor?: string;
}

export const TextInputSF = (props: ITextInputSF) => {
	const { name, label, disabled, mask, style, placeholderTextColor, error, ...otherProps } = props;

	const { onChange, onChangeText, value } = otherProps;

	const onInputChange = (text) => {
		const value = hasValue(text) ? text : '';
		if (onChange) {
			onChange({ name, target: { name, value } });
		} else if (onChangeText) {
			onChangeText(text);
		}
	};

	const maskedInputProps = mask
		? useMaskedInputProps({
				value: value as string,
				onChange,
				mask
		  })
		: null;

	return (
		<>
			<TextFieldRN
				{...otherProps}
				{...(maskedInputProps || {})}
				onChangeText={onInputChange}
				label={label}
				data-name={name}
				error={error}
				editable={!disabled}
			/>
		</>
	);
};
