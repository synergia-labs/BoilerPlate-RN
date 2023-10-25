import React from 'react';
import { useState } from 'react';
import { ISFComponent } from '../ISFComponent';
import DatePicker from 'react-native-date-picker';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { theme } from '../../../paper/themeRN';
import { hasValue } from '../../../libs/hasValue';

interface IDatePickerSF extends ISFComponent {
	value?: Date;
	onChange?: (date: Date) => void;
}

export const DateTimePickerSF = (props: IDatePickerSF) => {
	const { name, label, value, onChange, ...otherProps } = props;
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);

	return (
		<>
			<TouchableOpacity onPress={handleOpen}>
				<Text variant="bodyMedium" style={{paddingBottom: 8 }}>
					{label}
				</Text>
				<View style={{ borderWidth: 1, borderColor: theme.colors.cinza90, borderRadius: 8, padding: 16 }}>
					<Text>{(value ?? new Date())?.toLocaleString('pt-br')}</Text>
				</View>
			</TouchableOpacity>
			<DatePicker
				locale="pt-br"
				mode="datetime"
				modal
				open={open}
				date={hasValue(value) ? value : new Date()}
				onConfirm={(date) => {
					setOpen(false);
					onChange && onChange({ name, target: { value: date, name } });
				}}
				onCancel={() => {
					setOpen(false);
				}}
				confirmText="Confirmar"
				cancelText="Cancelar"
				title="Selecione a data"
				{...otherProps}
			/>
		</>
	);
};
