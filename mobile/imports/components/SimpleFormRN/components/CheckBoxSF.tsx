import { Checkbox } from 'react-native-paper';
import { ISFComponent } from '../ISFComponent';
import { SimpleLabel } from '../../../paper/components/SimpleLabel/SimpleLabel';
import { hasValue } from '../../../libs/hasValue';
import { useEffect, useState } from 'react';
import { GestureResponderEvent } from 'react-native';

interface ICheckBoxSF extends ISFComponent {
	value?: boolean;
	readOnly?: boolean;
	onChange?: (v: any) => void;
}

export const CheckBoxSF = (props: ICheckBoxSF) => {
	const { label, name, value, onChange, readOnly,	disabled,
		...otherProps } = props;

	const [checked, setChecked] = useState(value ?? false);

	useEffect(() => {
		handleChange();
	},[checked])
	
	const handleChange = () => {
		if(!readOnly){
			onChange && onChange({ name, target: { name, value: checked }}, { name, value: checked });
		}
	};

	return (
		<>
			<SimpleLabel>{label}</SimpleLabel>
			<Checkbox {...otherProps}  status={value ? 'checked' : 'unchecked'} onPress={() => {
					setChecked(!checked);
				  }	}
				  />
		</>
	);
};
