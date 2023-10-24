import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { NativeSyntheticEvent, Text, TextInputChangeEventData, View, ViewProps } from 'react-native';
import { Button } from 'react-native-paper';
import { ILabelValuePair } from '../../typings/GeneralTypings';
import { ISchema } from '../../typings/ISchema';

type ITipoVariavel = 'string' | 'number' | 'boolean' | 'object' | 'undefined' | 'bigint' | 'symbol' | 'function';
interface IReactElementEstendido extends ReactElement {
	name?: string;
	label?: string;
}

interface ISimpleFormRN {
	screenState: string;
	children: ReactNode[] | ReactNode | ReactElement[];
	doc: { [key: string]: any };
	setDoc: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
	schema: { [key: string]: ISchema };
	onSubmit?: (doc: any) => void;
	style?: ViewProps;
	useDefaultSubmit?: boolean;
}

/* @Comentários
  - O Componente recebe como 'children' componentes não-controlados e os torna controlados baseando-se no schema informado.
*/

export const SimpleFormRN_old = (props: ISimpleFormRN) => {
	const { screenState, doc, setDoc, schema, children, onSubmit, style, useDefaultSubmit } = props;

	const [invalidForm, setInvalidForm] = useState(false);
	const [invalidFields, setInvalidFields] = useState({});

	const isViewMode = screenState === 'view';

	useEffect(() => {
		if (screenState === 'create') setDoc(initializeDocValues());
		if (screenState !== 'view') initFieldStatus();
	}, []);

	useEffect(() => {
		if (screenState !== 'view') validaDoc();
	}, [doc]);

	const initFieldStatus = () => {
		const fieldStatusObj = Object.keys(schema).reduce((acc, key) => {
			return { ...acc, [key]: false };
		}, {});
		setInvalidFields(fieldStatusObj);
	};

	// Retorna 'true' se o campo está inválido
	const validaField = (key: string, value: typeof tipo, tipo: ITipoVariavel) => {
		const fieldSchema = schema[key];
		if (!fieldSchema) {
			// campo está no doc, porém não pertence ao schema. pode acontecer quando o método que traz os dados do backend não respeita o schema informado. pode ter dados a mais.
			return false;
		}
		switch (tipo) {
			case 'object':
				if (!((value as any) instanceof fieldSchema.type)) return true;
				return false;
			default:
				if (tipo !== fieldSchema.type.name.toLowerCase()) return true;
				return false;
		}
	};

	const validaDoc = () => {
		let novoInvalidFields = {};
		let algumFieldInvalido = false;
		if (Object.keys(doc).length > 0 && !isViewMode) {
			for (const [key, value] of Object.entries(doc)) {
				const isFieldValid = validaField(key, value, typeof value);
				novoInvalidFields = { ...novoInvalidFields, [key]: isFieldValid };
				algumFieldInvalido = algumFieldInvalido || isFieldValid;
			}
		}
		if (algumFieldInvalido) {
			setInvalidFields(novoInvalidFields);
			setInvalidForm(true);
		}
	};

	const obtemFuncaoChangeHandler = (name: string, fieldSchema: ISchema, tipoElemento: string, mask: string) => {
		switch (tipoElemento) {
			case 'String': {
				if (fieldSchema?.options)
					return (selectedItem: ILabelValuePair, index: number) => handleSelect(selectedItem, index, name);
				if (fieldSchema?.isAudio || fieldSchema?.isImage)
					return (base64String: string) => handleChangeBase64Input(base64String, name);
				else
					return mask
						? (maskedText: string, unmaskedText: string, obfuscatedText: string) =>
								handleChangeMaskedTextInput(unmaskedText, name)
						: (e: NativeSyntheticEvent<TextInputChangeEventData>) => handleChangeTextInput(e, name);
			}
			case 'Boolean': {
				return fieldSchema.frontEndComponent === 'checkbox'
					? () => handleChangeCheckbox(name)
					: () => handleChangeSwitch(name);
			}
			case 'Date': {
				return (data: Date) => handleChangeDate(data, name);
			}
		}
	};

	const obtemPropsAdicionais = (props: { [key: string]: any }) => {
		const { name, label, mask } = props;
		const fieldSchema = schema[name];
		const tipoElemento = fieldSchema?.type?.name?.toString();
		const customLabel = label ?? fieldSchema?.label;
		const fnChange = obtemFuncaoChangeHandler(name, fieldSchema, tipoElemento, mask);
		let propsAdicionais: { [key: string]: any } = {
			key: name,
			value: doc ? doc[name] : undefined,
			label: customLabel,
			disabled: isViewMode,
			screenState
		};
		propsAdicionais = mask
			? { ...propsAdicionais, onChangeText: fnChange }
			: { ...propsAdicionais, onChange: fnChange };
		return fieldSchema
			? fieldSchema?.options
				? { ...propsAdicionais, data: fieldSchema?.options }
				: propsAdicionais
			: {};
	};

	const recursiveMap = (children: IReactElementEstendido[]): IReactElementEstendido[] => {
		return React.Children.map(children, (child) => {
			if (!React.isValidElement(child)) {
				return child;
			}
			const { props } = child;
			const propsAdicionais = obtemPropsAdicionais(props);
			if (child.props.children) {
				return React.cloneElement(child, {
					...propsAdicionais,
					children: recursiveMap(child.props.children)
				});
			}
			return React.cloneElement(child, { ...propsAdicionais });
		});
	};

	const obtemValorInicialParaCampo = (fieldType: string) => {
		switch (fieldType) {
			case 'String':
				return '';
			case 'Boolean':
				return false;
			case 'Date':
				return new Date();
			default:
				return undefined;
		}
	};

	const initializeDocValues = () => {
		const docInicializado = Object.keys(schema).reduce((prev, key) => {
			const fieldType = schema[key].type?.name?.toString();
			return {
				...prev,
				[key]: schema[key].defaultValue ?? obtemValorInicialParaCampo(fieldType)
			};
		}, {});
		return docInicializado;
	};

	const handleSubmit = () => {
		// console.log(doc);
		onSubmit && onSubmit(doc);
	};

	const handleChangeTextInput = (e: NativeSyntheticEvent<TextInputChangeEventData>, targetName: string) => {
		const { nativeEvent } = e;
		const { text } = nativeEvent;
		setDoc({ ...doc, [targetName]: text });
	};

	const handleChangeBase64Input = (base64String: string, targetName: string) => {
		setDoc({ ...doc, [targetName]: base64String });
	};

	const handleChangeMaskedTextInput = (text: string, targetName: string) => {
		setDoc({ ...doc, [targetName]: text });
	};

	const handleChangeCheckbox = (targetName: string) => {
		const { [targetName]: valorAntigo } = doc;
		setDoc({ ...doc, [targetName]: !valorAntigo });
	};

	const handleChangeSwitch = (targetName: string) => {
		const { [targetName]: valorAntigo } = doc;
		setDoc({ ...doc, [targetName]: !valorAntigo });
	};

	const handleSelect = (selectedItem: ILabelValuePair, index: number, targetName: string) => {
		const { label, value } = selectedItem;
		setDoc({ ...doc, [targetName]: value });
	};

	const handleChangeDate = (data: Date, targetName: string) => {
		setDoc({ ...doc, [targetName]: data });
	};

	return (
		<View style={style ?? {}}>
			<View>{recursiveMap(children as ReactElement[])}</View>
			{!isViewMode && invalidForm && <Text> Erro no formulário! </Text>}
			<View>
				{!isViewMode && !!useDefaultSubmit && (
					<Button
						onPress={handleSubmit}
						style={{ width: '50%', borderRadius: 10, alignSelf: 'center', marginTop: '50%' }}
						disabled={invalidForm}
						mode="contained"
						icon="content-save">
						Salvar
					</Button>
				)}
			</View>
		</View>
	);
};
