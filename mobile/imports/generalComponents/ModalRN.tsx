import React from 'react';
import { Portal, Modal, Text } from 'react-native-paper';
import { theme } from '../paper/themeRN';
import { RenderableComponent } from './GeneralComponents';

export interface IModalRN {
	renderedComponent: RenderableComponent | ((props: { [key: string]: any }) => RenderableComponent);
	deviceDimensions: number[];
	visible: boolean;
	onDismiss: () => void;
	isFullScreen?: boolean;
	isModalRoute?: boolean;
}

/* renderedComponent espera que seja informado um elemento JSX válido. */
export const ModalRN = (props: IModalRN) => {
	const { visible, onDismiss, renderedComponent, deviceDimensions, ...others } = props;

	const containerStyle: { [key: string]: any } = {
		backgroundColor: theme.colors.branco,
		padding: others.isModalRoute ? 0 : 20,
		margin: others.isModalRoute ? 0 : 20,
		borderRadius: 20
	};

	if (others.isFullScreen) {
		containerStyle.width = deviceDimensions[0];
		containerStyle.height = '100%';
		containerStyle.margin = 0;
		containerStyle.borderRadius = 0;
	}

	const RenderedComponent = (renderedComponent as React.ReactNode)
		? renderedComponent
		: (_props: { [key: string]: any }) => <Text> {`Modal visível: ${_props.visible}`} </Text>;

	return (
		<Portal>
			<Modal
				theme={{
					colors: {
						backdrop: '#00000080'
					}
				}}
				dismissable={false}
				visible={visible}
				onDismiss={onDismiss}
				contentContainerStyle={containerStyle}>
				<RenderedComponent {...others} {...{ visible, onDismiss }} />
			</Modal>
		</Portal>
	);
};
