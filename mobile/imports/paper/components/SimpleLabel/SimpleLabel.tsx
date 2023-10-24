import React from 'react';
import { Text, TextProps } from 'react-native-paper';
import { theme } from '../../../paper/themeRN';

interface ISimpleLabel extends TextProps<any> {}

export const SimpleLabel = (props: ISimpleLabel) => {
	const { children } = props;
	return (
		<Text variant="bodyMedium" style={{paddingBottom: 3}}>
			{children}
		</Text>
	);
};
