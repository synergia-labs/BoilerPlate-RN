import { ISFComponent } from '../ISFComponent';
import SelectDropdown from 'react-native-select-dropdown';
import { ILabelValuePair } from '../../../typings/GeneralTypings';
import { SimpleLabel } from '../../../paper/components/SimpleLabel/SimpleLabel';

interface ISelectInputSF extends ISFComponent {
	data?: ILabelValuePair[];
	onChange?: (selected: { [key: string]: any }) => void;
	value?: string;
}

export const SelectInputSF = (props: ISelectInputSF) => {
	const { label, name, data, value, onChange, ...otherProps } = props;

	return (
		<>
			<SimpleLabel>{label}</SimpleLabel>
			<SelectDropdown
				{...otherProps}
				data={data as ILabelValuePair[]}
				onSelect={onChange as (selected: { [key: string]: any }) => void}
				buttonTextAfterSelection={(selectedItem, index) => selectedItem.label}
				rowTextForSelection={(item, index) => item.label}
				defaultButtonText="Escolha uma opção"
				defaultValue={data?.find((x) => x.value === value)}
			/>
		</>
	);
};
