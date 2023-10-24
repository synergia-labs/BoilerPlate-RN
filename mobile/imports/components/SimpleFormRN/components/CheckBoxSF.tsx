import { Checkbox } from 'react-native-paper';
import { ISFComponent } from '../ISFComponent';
import { SimpleLabel } from '../../../paper/components/SimpleLabel/SimpleLabel';

interface ICheckBoxSF extends ISFComponent {
	value?: boolean;
	onChange?: () => void;
}

export const CheckBoxSF = (props: ICheckBoxSF) => {
	const { label, name, value, onChange, ...otherProps } = props;

	return (
		<>
			<SimpleLabel>{label}</SimpleLabel>
			<Checkbox {...otherProps} data-name={name} status={value ? 'checked' : 'unchecked'} onPress={onChange} />
		</>
	);
};
