import { ISFComponent } from '../ISFComponent';
import { Switch } from 'react-native-paper';
import { SimpleLabel } from '../../../paper/components/SimpleLabel/SimpleLabel';
import { View } from 'react-native';

interface ISwitchSF extends ISFComponent {
	onChange: (v: boolean) => void;
	value: boolean;
	switchStyle?: object;
	contentContainerStyle?: object;
}

export const SwitchSF = (props: ISwitchSF) => {
	const { label, name, onChange, value, switchStyle, contentContainerStyle, ...otherProps } = props;

	return (
		<View style={contentContainerStyle ? contentContainerStyle : { justifyContent: 'flex-start' }}>
			<SimpleLabel>{label}</SimpleLabel>
			<Switch
				{...otherProps}
				onValueChange={onChange}
				value={value}
				style={switchStyle ? switchStyle : { width: 50 }}
			/>
		</View>
	);
};
