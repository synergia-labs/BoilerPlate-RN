import { Checkbox } from 'react-native-paper';
import { ISFComponent } from '../ISFComponent';
import { SimpleLabel } from '../../../paper/components/SimpleLabel/SimpleLabel';
import { hasValue } from '../../../libs/hasValue';
import { useState } from 'react';

interface ICheckBoxSF extends ISFComponent {
	value?: boolean;
	readOnly?: boolean;
	onChange?: (v: any) => void;
}

export const CheckBoxSF = (props: ICheckBoxSF) => {
	const { label, name, value, onChange, readOnly, 	
		...otherProps } = props;
	

	const handleChange = (event) => {
		if(!readOnly){
			onChange && onChange({ name, target: { name, value: !value }});
		}
	};

	return (
		<>
				<SimpleLabel>{label}</SimpleLabel>
				<Checkbox {...otherProps}  status={value ? 'checked' : 'unchecked'} onPress={handleChange} />
		</>
	);
};
