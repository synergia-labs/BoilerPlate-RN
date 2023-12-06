import { ISFComponent } from '../ISFComponent';
import { Switch } from 'react-native-paper';
import { SimpleLabel } from '../../../paper/components/SimpleLabel/SimpleLabel';
import { View } from 'react-native';

interface ISwitchSF extends ISFComponent {
	onChange?: (v: {[key:string]: any}) => void;
	value?: boolean;
	readOnly?: boolean;
	switchStyle?: object;
	contentContainerStyle?: object;
}

export const SwitchSF = (props: ISwitchSF) => {
	const { label, name, onChange, value, switchStyle, contentContainerStyle, readOnly, disabled, ...otherProps } = props;
	const handleChangeSwitch = (event: any) => {
		if (!readOnly) {
			onChange && onChange({ name, target: { name, value: event }}, { name, value: event });
		}
	};

	return (
		<View style={contentContainerStyle ? contentContainerStyle : { justifyContent: 'flex-start' }}>
			<SimpleLabel>{label}</SimpleLabel>
			<Switch
				{...otherProps}
				onValueChange={handleChangeSwitch}
				value={value}
				style={switchStyle ? switchStyle : { width: 50 }}
				// disabled={false}
			/>
		</View>
	);
};
