import { Pressable, PressableProps } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { customFabPrimaryStyle, customFabSecondaryStyle } from './CustomFabStyle';
import { useState } from 'react';

interface ICustomFab extends PressableProps {
	size?: 'small' | 'medium';
	variant?: 'primary' | 'secondary';
	startIcon?: string;
	endIcon?: string;
	text?: string;
	disabled?: boolean;
	onPress?: () => void;
}

export const CustomFab = (props: ICustomFab) => {
	const { size = 'medium', variant = 'primary', startIcon, endIcon, text, disabled = false, onPress, style } = props;
	const [isPressed, setIsPressed] = useState(false);
	const isSecondary = variant === 'secondary';
	const isSmall = size === 'small';
	const styles = isSecondary ? customFabSecondaryStyle : customFabPrimaryStyle;
	const containerStyle = {
		...styles.container,
		...(isSmall ? styles.conatainerSmall : {}),
		...(isPressed ? styles.containerPressed : {}),
		...(disabled ? styles.containerDisabled : {})
	};
	const textStyle = {
		...styles.text,
		...(disabled ? styles.textDisabled : {})
	};

	return (
		<Pressable
			{...props}
			style={{ ...containerStyle, ...(typeof style === 'object' ? style : {}) }}
			disabled={disabled}
			onPress={onPress}
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
			accessibilityRole="button">
			{startIcon && <Icon size={24} source={startIcon} color={textStyle.color} />}
			{text && (
				<Text variant={'labelLarge'} style={textStyle}>
					{text}
				</Text>
			)}
			{endIcon && <Icon size={24} source={endIcon} color={textStyle.color} />}
		</Pressable>
	);
};