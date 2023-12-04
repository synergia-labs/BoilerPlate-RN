import { ISFComponent } from '../ISFComponent';
import SelectDropdown from 'react-native-select-dropdown';
import { ILabelValuePair } from '../../../typings/GeneralTypings';
import { SimpleLabel } from '../../../paper/components/SimpleLabel/SimpleLabel';

interface ISelectInputSF extends ISFComponent {
	options?: ILabelValuePair[];
	onChange?: (selected: { [key: string]: any }) => void;
	value?: string;
}

export const SelectInputSF = (props: ISelectInputSF) => {
	const { label, name, data, options, value, onChange,readOnly, ...otherProps } = props;

	const onChangeSelect = (event) => {
		if (event.value === '#-#') {
			onChange && onChange({ name, target: { name, value: undefined } }, { name, value: undefined });
			return;
		}
		if (!readOnly) {
			onChange && onChange({ name, target: { name, value: event.value } }, { name, value: event.value });
		}
	};

	return (
		<>
			<SimpleLabel>{label}</SimpleLabel>
			<SelectDropdown
				{...otherProps}
				data={options as ILabelValuePair[]}
				onSelect={onChangeSelect}
				buttonTextAfterSelection={(selectedItem, index) => selectedItem.label}
				rowTextForSelection={(item, index) => item.label}
				defaultButtonText="Escolha uma opção"
				defaultValue={options?.find((x) => x.value === value)}
			/>
		</>
	);
};
