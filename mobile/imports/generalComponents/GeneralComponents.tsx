import React, { createContext, ReactElement, useState } from 'react';
import { DialogRN, IDialogRN } from './DialogRN';
import { IModalRN, ModalRN } from './ModalRN';
import { ISnackBarRN, SnackBarRN } from './SnackbarRN';
import { Dimensions } from 'react-native';

interface IGeneralComponents {
	children: ReactElement | ReactElement[];
}

interface IGeneralComponentsState {
	snackBarOptions: ISnackBarOptions | null;
	dialogOptions: IDialogOptions | null;
	modalOptions: IModalOptions | null;
	modalSecondaryOptions: IModalSecondaryOptions | null;
}

export interface IGeneralComponentsContext {
	showSnackBar: (options: ISnackBarOptions) => void;
	showDialog: (options: IDialogOptions) => void;
	showModal: (options: IModalOptions) => void;
	showModalSecondary: (options: IModalSecondaryOptions) => void;
	getDimensions: () => number[];
}

export interface ISnackBarOptions {
	texto: string;
	visible?: boolean;
	onDismiss?: () => void;
	duration?: number;
}

interface IDialogOptions {
	textoHeader?: string;
	textoCorpo: string;
	visible?: boolean;
	onDismiss?: () => void;
	onConfirm?: () => void;
}

interface IModalSecondaryOptions {
	textoHeader?: string;
	textoCorpo: string;
	visible?: boolean;
	onDismissSecondary?: () => void;
	onConfirm?: () => void;
}

export type RenderableComponent = React.ReactElement | React.ElementType | React.ReactNode | Element;

interface IModalOptions {
	renderedComponent: RenderableComponent | ((props: { [key: string]: any }) => RenderableComponent);
	visible?: boolean;
	isFullScreen?: boolean;
	onDismiss?: () => void;
}

export const GeneralComponentsContext = createContext<IGeneralComponentsContext | null>(null);

export const GeneralComponents = (props: IGeneralComponents) => {
	const [stateDialog, setStateDialog] = useState<IGeneralComponentsState>({ dialogOptions: null });
	const [stateSnackBar, setStateSnackBar] = useState<IGeneralComponentsState>({ snackBarOptions: null });
	const [stateModal, setStateModal] = useState<IGeneralComponentsState>({ modalOptions: null });
	const [stateModalSecondary, setStateModalSecondary] = useState<IGeneralComponentsState>({
		modalSecondaryOptions: null
	});

	const [updateDimension, setUpdateDimension] = useState<Date | null>(null);

	const deviceDimensions = React.useRef([0, 0]);

	const updateWidthHeight = () => {
		const { width, height } = Dimensions.get('window');
		deviceDimensions.current = [width, height];
		setUpdateDimension(new Date());
	};

	React.useEffect(() => {
		// Event Listener for orientation changes
		updateWidthHeight();
		Dimensions.addEventListener('change', updateWidthHeight);
	}, []);

	const { snackBarOptions } = stateSnackBar;
	const { modalOptions } = stateModal;
	const { dialogOptions } = stateDialog;
	const { modalSecondaryOptions } = stateModalSecondary;

	const { Provider } = GeneralComponentsContext;

	const showSnackBar = (options: ISnackBarOptions) => {
		setStateSnackBar({ ...stateSnackBar, snackBarOptions: { ...options, visible: true, onDismiss: dismissSnackbar } });
	};

	const dismissSnackbar = () => {
		setStateSnackBar({ ...stateSnackBar, snackBarOptions: null });
	};

	const showDialog = (options: IDialogOptions) => {
		setStateDialog({
			...stateDialog,
			dialogOptions: {
				...options,
				visible: true,
				onDismiss: (e) => {
					options && options.onDismiss && options.onDismiss(e);
					dismissDialog(e);
				},
				onConfirm: async () => {
					if (options.onConfirm) {
						await options.onConfirm();
					}
					dismissDialog();
				}
			}
		});
	};

	const dismissDialog = () => {
		setStateDialog({ ...stateDialog, dialogOptions: null });
	};

	const showModal = (options: IModalOptions) => {
		setStateModal({ ...stateModal, modalOptions: { ...options, visible: options.visible ?? true, onDismiss: dismissModal } });
	};

	const dismissModal = () => {
		setStateModal({ ...stateModal, modalOptions: null });
	};

	const showModalSecondary = (options: IModalSecondaryOptions) => {
		setStateModalSecondary({
			...stateModalSecondary,
			modalSecondaryOptions: { ...options, visible: true, onDismissSecondary: dismissModalSecondary }
		});
	};

	const dismissModalSecondary = () => {
		setStateModalSecondary({ ...stateModalSecondary, modalSecondaryOptions: null });
	};

	const getDimensions = () => {
		return deviceDimensions.current;
	};

	return (
		<Provider value={{ showSnackBar, showDialog, showModal, showModalSecondary, getDimensions }}>
			{props.children}
			{dialogOptions && <DialogRN {...(dialogOptions as IDialogRN)} />}
			{snackBarOptions && <SnackBarRN {...(snackBarOptions as ISnackBarRN)} />}
			{modalOptions && <ModalRN {...(modalOptions as IModalRN)} deviceDimensions={deviceDimensions.current} />}
			{modalSecondaryOptions && (
				<ModalRN {...(modalSecondaryOptions as IModalRN)} deviceDimensions={deviceDimensions.current} />
			)}
		</Provider>
	);
};
