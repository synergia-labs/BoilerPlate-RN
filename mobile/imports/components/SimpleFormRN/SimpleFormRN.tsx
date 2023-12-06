import React, { Component } from 'react';

import { hasValue, isBoolean } from '../../libs/hasValue';
// @ts-ignore
import _ from 'lodash';
// @ts-ignore
import shortid from 'shortid';

import {
	View as FormGroup,
	View,
	Text,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	Pressable
} from 'react-native';
import { Button, Card, FAB, IconButton, Modal, Portal } from 'react-native-paper';
import { theme } from '../../paper/themeRN';
// import SimpleLabelView from "../SimpleLabelView/SimpleLabelView";

let isDate = function (date) {
	return new Date(date) !== 'Invalid Date' && !isNaN(new Date(date));
};

interface ISubFormArrayComponent {
	reactElement: any;
	childrensElements: any;
	name: string;
	mode: string;
	fieldSchema: object;
	initialValue?: any;
	setDoc: ({}) => void;
	setFieldMethods: ({}) => any;
}

const SubFormArrayComponent = ({
	reactElement,
	childrensElements,
	name,
	initialValue,
	...props
}: ISubFormArrayComponent) => {
	const [error, setError] = React.useState(false);
	const [value, setValue] = React.useState(initialValue || []);
	//const [stringValue,setStringValue] = React.useState('')
	const [mode, setMode] = React.useState(props.mode || 'edit');
	const [showModal, setShowModal] = React.useState(false);
	const [changeByUser, setChangeByUser] = React.useState(false);

	

	const closeModal = () => {
		setShowModal(false);
	};

	const handleOpenModal = (dataAction) => {
		if (dataAction.action === 'insert') {
			const id = shortid.generate();
			setShowModal({ _id: id, id });
		} else {
			setShowModal({ ...(dataAction.doc || {}) });
		}
	};

	const formRefs = {};

	React.useEffect(() => {
		if (
			!changeByUser &&
			(!value || value.length === 0 || !_.isEqual(value, initialValue)) &&
			(initialValue || []).length > 0
		) {
			setValue(initialValue);
		}
		if (mode !== props.mode) {
			setMode(props.mode);
			if (props.mode === 'view') {
				setChangeByUser(false);
			}

			if (props.mode === 'view' && error) {
				setError(false);
			}
		}
	});

	props.setFieldMethods({
		validateRequired: (hasError: boolean) => {
			if (!hasValue(value)) {
				setError(true);
				return false;
			}
			return true;
		},
		validateRequiredSubForm: () => {
			let result = true;
			Object.keys(formRefs).forEach((key) => {
				const subFormRef = formRefs[key];
				if (!subFormRef.validate()) {
					setError(true);
					result = false;
				}
			});

			return result;
		},
		setValue: (newValue: any) => {
			if (hasValue(newValue)) {
				setValue(newValue);
				return true;
			}
			return false;
		},
		setMode: (newMode: string) => {
			if (newMode !== mode) {
				setMode(newMode);
				return true;
			}
			return false;
		},
		setError: (value) => {
			setError(value);
		}
	});

	const onChange = (e, fieldData = {}) => {
		const field = {
			...(props.fieldSchema ? props.fieldSchema : {}),
			...(e ? e.target : {}),
			...(fieldData && fieldData.name ? fieldData : {})
		};

		if (props.fieldSchema && props.fieldSchema.type === Boolean && isBoolean(field.checked)) {
			setValue(field.checked);
			props.setDoc({ [name]: field.checked });
			if (!changeByUser && (field.value || []).length > 0) {
				setChangeByUser(true);
			}
			if (reactElement.props.onChange) {
				reactElement.props.onChange(e, { ...field, value: field.checked });
			}
		} else {
			setValue(field.value);
			props.setDoc({ [name]: field.value });
			if (!changeByUser && (field.value || []).length > 0) {
				setChangeByUser(true);
			}
			if (reactElement.props.onChange) {
				reactElement.props.onChange(e, field);
			}
		}

		if (hasValue(field.value)) {
			setError(false);
		}
	};

	const onFormChangeHandle = (doc) => {
		const oldDoc = (value || []).find((d) => !!doc && d._id === doc._id);
		if (!oldDoc) {
			onChange({
				target: {
					value: [...(value || []), doc]
				}
			});
		} else {
			const updatedDocs = (value || []).map((subDoc) => {
				if (subDoc._id === doc._id || subDoc.id === doc.id) {
					subDoc = { ...subDoc, ...doc };
				}
				delete subDoc.chosen;
				return subDoc;
			});

			onChange({
				target: {
					value: updatedDocs
				}
			});
		}
		closeModal();
	};

	const onSortDocs = (newList) => {
		const list = newList.map((l) => {
			delete l.chosen;
			return l;
		});
		setValue(list);
		onChange({
			target: {
				value: list
			}
		});
	};

	const onPressDelete = (formId) => (doc) => {
		let newDoc = (value || []).filter((subDoc) => subDoc.id !== formId && subDoc._id !== formId);
		setValue(newDoc);
		onChange({
			target: {
				value: newDoc
			}
		});
	};

	const label = reactElement.props.label || (props.fieldSchema ? props.fieldSchema.label : undefined);

	return (
		<View
			key={name}
			style={{ marginTop: 5, backgroundColor: error ? '#e4e9ff' : undefined, ...styles.containerLabel, minHeight: 80 }}>
			<Portal>
				<Modal
					visible={!!showModal}
					onDismiss={closeModal}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
					<Card
						style={{
							padding: 20
						}}>
						{props.title && (
							<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
								<Text>{props.title}</Text>
							</View>
						)}
						<SimpleFormRN
							isSubForm={true}
							key={'newItem'}
							mode={mode}
							schema={props.fieldSchema && props.fieldSchema.subSchema ? props.fieldSchema.subSchema : undefined}
							doc={showModal || {}}
							style={{ ...props.formStyle, flexDirection: 'column' }}
							onSubmit={onFormChangeHandle}>
							{childrensElements}
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'flex-end',
									alignItems: 'center',
									marginTop: 15,
									paddingRight: 50,
									minHeight: 100
								}}>
								<Button mode="contained" color={'#FAA'} onPress={closeModal} style={{ marginRight: 20 }}>
									{'Cancelar'}
								</Button>
								<Button mode={'contained'} color={theme.colors.primary} submit={true}>
									{(value || []).find((d) => !!showModal && d._id === showModal._id) ? 'Atualizar' : 'Adicionar'}
								</Button>
							</View>
						</SimpleFormRN>
					</Card>
				</Modal>
			</Portal>
			<Text>{label}</Text>
			{/*<SimpleLabelView error={!!error||props.error} label={label} />*/}
			<View style={styles.containerForm}>
				{(value || []).map((subForm, subFormIndex) => {
					if (subForm && (subForm.id || subForm._id)) {
						return (
							<View key={subForm.id || subForm._id} style={styles.containerSubForm}>
								<View style={{ width: '100%', maxWidth: '100%' }}>
									<SimpleFormRN
										isSubForm={true}
										key={subForm.id || subForm._id}
										mode={'view'}
										schema={props.fieldSchema && props.fieldSchema.subSchema ? props.fieldSchema.subSchema : undefined}
										doc={subForm}
										style={{
											width: '100%',
											display: 'flex',
											flexDirection: 'row',
											flexWrap: 'wrap',
											...(props.formStyle || {})
										}}>
										{childrensElements}
									</SimpleFormRN>
								</View>
								{mode !== 'view' ? (
									<View
										style={{
											position: 'absolute',
											top: 0,
											right: 0,
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'flex-end',
											alignItems: 'center'
										}}>
										<Pressable
											onPress={onPressDelete(subForm.id || subForm._id)}
											style={({ pressed }) => ({
												opacity: pressed ? 0.5 : 1,
												cursor: 'pointer',
												marginRight: 16
											})}>
											<Text>{'Remove'}</Text>
										</Pressable>
										<Pressable
											onPress={() => handleOpenModal({ action: 'edit', doc: subForm })}
											style={({ pressed }) => ({
												opacity: pressed ? 0.5 : 1,
												cursor: 'pointer'
											})}>
											<Text>{'Edit'}</Text>
										</Pressable>
									</View>
								) : null}
							</View>
						);
					} else {
						return <View key={'el' + subFormIndex} />;
					}
				})}
				<View style={styles.containerItens}>
					{!value || value.length === 0 || Object.keys(value[0]).length === 0 ? (
						<View>
							<Text style={styles.containerEmptyItens}>{'Não há itens'}</Text>
						</View>
					) : null}
				</View>
			</View>
			{mode !== 'view' && (
				<View style={{ width: '100%' }}>
					<Button
						mode={'contained'}
						color={theme.colors.primary}
						style={{ margin: 15 }}
						onPress={() => handleOpenModal({ action: 'insert' })}>
						{'Adicionar'}
					</Button>
				</View>
			)}
		</View>
	);
};

interface ISubFormComponent {
	reactElement: any;
	childrensElements: any;
	name: string;
	mode: string;
	fieldSchema: object;
	initialValue?: any;
	setDoc: ({}) => void;
	setFieldMethods: ({}) => any;
}

const SubFormComponent = ({ reactElement, childrensElements, name, ...props }: ISubFormComponent) => {
	const [error, setError] = React.useState(false);
	const [value, setValue] = React.useState(props.initialValue || {});
	const [mode, setMode] = React.useState(props.mode || 'edit');
	const [changeByUser, setChangeByUser] = React.useState(false);

	

	let formRef = {};

	React.useEffect(() => {
		if (!changeByUser && (!hasValue(value) || value !== props.initialValue) && !!hasValue(props.initialValue)) {
			setValue(props.initialValue);
		}

		if (mode !== props.mode) {
			setMode(props.mode);

			if (props.mode === 'view') {
				setChangeByUser(false);
			}
			if (props.mode === 'view' && error) {
				setError(false);
			}
		}
	});

	props.setFieldMethods({
		validateRequired: () => {
			if (!hasValue(value)) {
				setError(true);
				return false;
			}
			return true;
		},
		validateRequiredSubForm: () => {
			let result = true;

			if (!formRef.validate()) {
				setError(true);
				result = false;
			}

			return result;
		},
		setValue: (newValue: any) => {
			if (hasValue(newValue)) {
				setValue(newValue);
				return true;
			}
			return false;
		},
		setMode: (newMode: string) => {
			if (newMode !== mode) {
				setMode(newMode);
				return true;
			}
			return false;
		},
		setError: (value) => {
			setError(value);
		}
	});

	const onChange = (e, fieldData = {}) => {
		const field = {
			...(props.fieldSchema ? props.fieldSchema : {}),
			...(e ? e.target : {}),
			...(fieldData && fieldData.name ? fieldData : {})
		};

		if (props.fieldSchema && props.fieldSchema.type === Boolean && isBoolean(field.checked)) {
			setValue(field.checked);
			props.setDoc({ [name]: field.checked });
			if (!changeByUser) {
				setChangeByUser(true);
			}
			if (reactElement.props.onChange) {
				reactElement.props.onChange(e, { ...field, value: field.checked });
			}
		} else {
			setValue(field.value);
			props.setDoc({ [name]: field.value });
			if (!changeByUser) {
				setChangeByUser(true);
			}
			if (reactElement.props.onChange) {
				reactElement.props.onChange(e, field);
			}
		}

		if (hasValue(field.value)) {
			setError(false);
		}
	};

	const onFormChangeHandle = (doc) => {
		onChange({
			target: {
				value: doc
			}
		});
	};

	const label = reactElement.props.label || (props.fieldSchema ? props.fieldSchema.label : undefined);
	return (
		<View key={name} style={styles.containerLabel}>
			<Text>{label}</Text>
			<View style={styles.containerChildrenElements}>
				<SimpleFormRN
					isSubForm={true}
					ref={(fRef) => (formRef = fRef)}
					mode={mode}
					schema={props.fieldSchema && props.fieldSchema.subSchema ? props.fieldSchema.subSchema : undefined}
					doc={value}
					onFormChange={onFormChangeHandle}>
					{childrensElements}
				</SimpleFormRN>
			</View>
		</View>
	);
};

interface IFieldComponent {
	reactElement: any;
	name: string;
	mode: string;
	elementProps: object;
	fieldSchema: object;
	initialValue?: any;
	setDoc: ({}) => void;
	setFieldMethods: ({}) => any;
}
const FieldComponent = ({ reactElement, name, elementProps, ...props }: IFieldComponent) => {
	const [error, setError] = React.useState(false);
	const [value, setValue] = React.useState(props.initialValue || '');
	const [mode, setMode] = React.useState(props.mode || 'edit');
	const [changeByUser, setChangeByUser] = React.useState(false);

	React.useEffect(() => {
		if (!changeByUser && (!hasValue(value) || value !== props.initialValue) && !!hasValue(props.initialValue)) {
			setValue(props.initialValue);
		}

		if (mode !== props.mode) {
			setMode(props.mode);
			if (props.mode === 'view') {
				setChangeByUser(false);
			}

			if (props.mode === 'view' && error) {
				setError(false);
			}
		}
	}, [props.mode, props.initialValue]);

	props.setFieldMethods({
		validateRequired: () => {
			if (!hasValue(value)) {
				setError(true);
				return false;
			}
			return true;
		},
		setValue: (newValue: any) => {
			
			try {
				setValue(newValue);
				props.getDoc()[name] !== newValue && props.setDoc({ [name]: newValue });
				return true;
			} catch (e) {
				console.log('Error', e);
				return false;
			}
		},
		clear: () => {
			setChangeByUser(true);
			setValue('');
			return true;
		},
		setMode: (newMode: string) => {
			if (newMode !== mode) {
				setMode(newMode);
				return true;
			}
			return false;
		},
		setError: (value) => {
			setError(value);
		},
		getOptions: () => {
			return elementProps.options ? elementProps.options : props.fieldSchema ? props.fieldSchema.options || [] : [];
		}
	});

	const onChange = (e, fieldData = {}) => {

		const field = {
			...(props.fieldSchema ? props.fieldSchema : {}),
			...(e ? e.target : {}),
			...(fieldData && fieldData.name ? fieldData : {})
		};

		if (props.fieldSchema && props.fieldSchema.type === Boolean && isBoolean(field.checked)) {
			setValue(field.checked);
			props.setDoc({ [name]: field.checked });
			if (!changeByUser) {
				setChangeByUser(true);
			}
			if (reactElement.props.onChange) {
				reactElement.props.onChange(e, { ...field, value: field.checked });
			}
		} else {
			setValue(field.value);
			props.setDoc({ [name]: field.value });
			if (!changeByUser) {
				setChangeByUser(true);
			}
			if (reactElement.props.onChange) {
				reactElement.props.onChange(e, field);
			}
		}
		if (hasValue(field.value)) {
			setError(false);
		}
	};

	return React.cloneElement(reactElement, {
		...elementProps,
		value,
		onChange,
		error: error && (!value || value.length === 0) ? true : undefined,
		labelStyle: error && (!value || value.length === 0) ? { color: 'red' } : undefined,
		label: elementProps.label || (props.fieldSchema ? props.fieldSchema.label : undefined),
		disabled: mode === 'view' || !!elementProps.readOnly,
		readOnly: mode === 'view' || !!elementProps.readOnly,
		schema: props.fieldSchema,
		checked: props.fieldSchema && props.fieldSchema.type === Boolean ? value : undefined,
		...props.fieldSchema,
		...elementProps
	});
};

interface ISimpleFormProps {
	schema: [] | {};
	onSubmit?: (submit: () => void) => void;
	isSubForm?: boolean;
	mode?: string;
	children?: object[];
	doc?: object;
	loading?: boolean;
	styles?: object;
	onFormChange: (onChange: () => void) => void;
}

class SimpleFormRN extends Component<ISimpleFormProps> {
	docValue = {};
	fields = {};
	hiddenFields = {};
	state = {
		error: null,
		mode: this.props.mode || 'edit',
		formElements: null,
		fieldsRequired: true
	};

	clearForm = () => {
		const self = this;
		this.docValue = {};
		Object.keys(this.fields).forEach((field) => {
			if (this.fields[field].clear) {
				const clear = this.fields[field].clear();
			}
		});
		this.initFormElements(true);
	};

	cancel = () => {
		const self = this;
		this.docValue = {};
		const originalDoc = this.props.doc || {};
		Object.keys(this.fields).forEach((field) => {
			if (this.fields[field].setValue) {
				this.fields[field].setValue(originalDoc[field]);
			}
		});
		this.initFormElements(true);
	};

	setDoc = (newDoc) => {
		const self = this;
		this.docValue = { ...this.docValue, ...newDoc };

		let hasVisibilityUpdate = false;

		Object.keys(this.hiddenFields).forEach((field) => {
			if (this.props.schema[field] && this.props.schema[field].visibilityFunction(this.docValue)) {
				hasVisibilityUpdate = true;
				this.fields[field] = this.hiddenFields[field];
				delete this.hiddenFields[field];
			}
		});
		Object.keys(this.fields).forEach((field) => {
			if (
				this.props.schema[field] &&
				this.props.schema[field].visibilityFunction &&
				!this.props.schema[field].visibilityFunction(this.docValue)
			) {
				hasVisibilityUpdate = true;
				this.hiddenFields[field] = this.fields[field];
				delete this.fields[field];
			}

			if (field in newDoc && this.props.schema[field] && this.props.schema[field].changeFieldOnChange) {
				this.props.schema[field].changeFieldOnChange({ ...this.docValue }, this.fields);
			}
		});
		if (hasVisibilityUpdate) {
			this.formElements = this.initFormElements(true);
			if (self.props.onFormChange) {
				const newDoc = { ...self.docValue };
				if (self.props.submitVisibleFields) {
					const visibleFiedls = Object.keys(self.fields);
					Object.keys(newDoc).forEach((field) => {
						if (visibleFiedls.indexOf(field) === -1) {
							delete newDoc[field];
						}
					});
				}

				this.docValue = { ...newDoc };
				self.props.onFormChange(newDoc, this);
			}
		} else {
			if (this.props.onFormChange) {
				this.props.onFormChange(this.docValue, this);
			}
		}

		let change = !!this.fieldsRequired;
		this.fieldsRequired = true;
		Object.keys(this.fields).forEach((field) => {
			if (this.props.schema[field] && !this.props.schema[field].optional && !hasValue(this.docValue[field])) {
				this.fieldsRequired = false;
			}
		});

		if (this.fieldsRequired !== change) {
			this.initFormElements(true);
		}
	};

	getDoc = () => {
		return { ...(this.docValue || {}) };
	};

	initialValueDefault = (schema) => {
		if (schema && schema.defaultValue) {
			return schema.defaultValue;
		}
		if (schema && schema.type === Date) {
			return '';
		}
		return '';
	};

	wrapElement = (element, index) => {
		const self = this;

		if (!element) {
			return null;
		}

		if (!element.props || element.props.simpleFormIgnore) {
			return element;
		}

		let elementName =
			element && element.type && element.type.render && element.type.render.displayName
				? element.type.render.displayName
				: null;
		if (!elementName && !!element.type) {
			elementName = element.type.displayName;
		}
		if (!elementName && !!element.type) {
			elementName = element.type.name;
		}

		if (element.props && element.props.submit) {
			return React.cloneElement(element, {
				onPress: this.onSubmitForm,
				//disabled: !this.fieldsRequired,
				color: !this.fieldsRequired ? '#ccc' : theme.colors.primary
			});
		} else if (elementName && (elementName.indexOf('Button') !== -1 || elementName === 'Text')) {
			return element;
		}

		if (
			self.props.schema &&
			element.props &&
			self.props.schema[element.props.name] &&
			self.props.schema[element.props.name].visibilityFunction
		) {
			if (!self.props.schema[element.props.name].visibilityFunction(self.getDoc())) {
				delete self.fields[element.props.name];
				self.hiddenFields[element.props.name] = {
					name: element.props.name,
					type: element.type && element.type.name,
					element: element,
					index: index
				};
				return null;
			} else {
				delete self.hiddenFields[element.props.name];
			}
		}

		self.fields[element.props.name] = { type: elementName };

		if (element.props.isSubForm && !!element.props.name) {
			
			return (
				<SubFormComponent
					{...element.props}
					name={element.props.name}
					childrensElements={element.props.children}
					key={element.props.name ? element.props.name : 'el' + index}
					fieldSchema={self.props.schema ? self.props.schema[element.props.name] : undefined}
					initialValue={self.props.doc ? self.props.doc[element.props.name] : ''}
					reactElement={element}
					setDoc={this.setDoc}
					mode={self.props.mode}
					setFieldMethods={(methods) =>
						(self.fields[element.props.name] = { ...self.fields[element.props.name], ...methods })
					}
				/>
			);
		} else if (element.props.isSubFormArray && !!element.props.name) {
			
			return (
				<SubFormArrayComponent
					{...element.props}
					name={element.props.name}
					childrensElements={element.props.children}
					key={element.props.name ? element.props.name : 'el' + index}
					fieldSchema={self.props.schema ? self.props.schema[element.props.name] : undefined}
					initialValue={self.props.doc ? self.props.doc[element.props.name] : ''}
					reactElement={element}
					setDoc={this.setDoc}
					mode={self.props.mode}
					setFieldMethods={(methods) =>
						(self.fields[element.props.name] = { ...self.fields[element.props.name], ...methods })
					}
				/>
			);
		} else if (
			(elementName && elementName.indexOf('FormGroup') !== -1) ||
			(elementName && elementName.indexOf('Segment') !== -1) ||
			React.Children.toArray(element.props.children).length > 0
		) {
			const subElements = React.Children.toArray(element.props.children).map((element, index) => {
				return self.wrapElement(element, index);
			});
			const newElement = React.cloneElement(element, { key: 'el' + index, children: subElements });
			return newElement;
		} else if (!element || !element.props || !element.props.name) {
			return element;
		} else {
			return (
				<FieldComponent

					elementProps={element.props || {}}
					name={element.props.name}
					key={element.props.name ? element.props.name : 'el' + index}
					fieldSchema={self.props.schema ? self.props.schema[element.props.name] : undefined}
					initialValue={self.props.doc ? self.props.doc[element.props.name] : ''}
					reactElement={element}
					setDoc={self.setDoc}
					getDoc={self.getDoc}
					mode={self.props.mode}
					setFieldMethods={(methods) =>
						(self.fields[element.props.name] = { ...self.fields[element.props.name], ...methods })
					}
				/>
			);
		}
	};

	initFormElements = (update = false) => {
		const self = this;

		if (!update && this.formElements) {
			return this.formElements;
		}

		this.formElements = null;

		let elements = React.Children.toArray(this.props.children);
		const ListaOfElements = elements.map((element, index) => {
			return this.wrapElement(element, index);
		});
		setTimeout(() => {
			if (!this.unMount) {
				update && self.setState({ lastUpdate: new Date() });
			}
		}, 0);
		return ListaOfElements;
	};

	componentWillUnmount() {
		this.unMount = true;
	}

	validate = () => {
		const fielsWithError: any = [];

		if (this.props.schema) {
			Object.keys(this.fields).forEach((field) => {
				if (this.props.schema[field] && this.props.schema[field].subSchema) {
					if (
						this.props.schema[field] &&
						!this.props.schema[field].optional &&
						!this.fields[field].validateRequired() &&
						fielsWithError.indexOf(this.props.schema[field].label) === -1
					) {
						fielsWithError.push(this.props.schema[field].label);
					}
					if (
						this.fields[field].validateRequiredSubForm &&
						!this.fields[field].validateRequiredSubForm() &&
						fielsWithError.indexOf(this.props.schema[field].label) === -1
					) {
						fielsWithError.push(this.props.schema[field].label);
					}
				} else if (
					this.props.schema[field] &&
					!this.props.schema[field].optional &&
					!this.fields[field].validateRequired() &&
					fielsWithError.indexOf(this.props.schema[field].label) === -1
				) {
					fielsWithError.push(this.props.schema[field].label);
				}

				//Validate Schema
				if (
					this.props.schema[field] &&
					this.props.schema[field].validate &&
					!this.props.schema[field].validate(this.docValue[field], this.docValue)
				) {
					fielsWithError.push(this.props.schema[field].label);
				}
				//Validate Date Format
				if (this.props.schema[field] && this.props.schema[field].type === Date && !isDate(this.getDoc()[field])) {
					fielsWithError.push(this.props.schema[field].label);
					this.fields[field] && this.fields[field].setError && this.fields[field].setError(true);
				}
			});
		}

		if (fielsWithError.length > 0) {
			this.setState({ error: fielsWithError });
		} else if (!!this.state.error) {
			this.setState({ error: null });
		}

		return fielsWithError.length === 0;
	};

	onSubmitForm = (event, ...others) => {
		const docResult = { ...(this.docValue || {}) };
		if (this.props.submitVisibleFields) {
			const visibleFiedls = Object.keys(this.fields);
			Object.keys(docResult).forEach((field) => {
				if (visibleFiedls.indexOf(field) === -1) {
					delete docResult[field];
				}
			});
		}
		if (this.props.onSubmit && this.validate()) {
			this.props.onSubmit(docResult);
		} else {
			console.log('Erro no formulário');
		}
	};

	componentDidMount() {
		this.docValue = { ...this.docValue, ...(this.props.doc || {}) };
	}

	shouldComponentUpdate() {
		return true;
	}
	componentDidUpdate(prevProps, prevState) {
		if (
			!_.isEqual(this.props.doc, prevProps.doc) ||
			this.props.mode !== prevProps.mode ||
			!_.isEqual(this.props.children, prevProps.children)
		) {
			const update = true;

			!_.isEqual(this.props.doc, prevProps.doc) && this.setDoc({ ...this.docValue, ...(this.props.doc || {}) });

			this.formElements = this.initFormElements(update);
			this.props.mode !== prevProps.mode && this.setState({ mode: this.props.mode });
		}

		if (this.props.mode !== prevProps.mode && !!this.state.error) {
			this.setState({ error: null });
		}
	}

	render() {
		this.formElements = this.initFormElements();

		return (
			<KeyboardAvoidingView
				behavior={Platform.OS === 'web' ? undefined : Platform.OS === 'ios' ? 'padding' : 'maxHeight'}
				style={{ flex: this.props.isSubForm ? undefined : 1, maxWidth: '100%' }}>
				<TouchableWithoutFeedback onPress={Platform.OS === 'web' ? undefined : Keyboard.dismiss}>
					<View style={{ maxWidth: '100%', width: '100%', ...(this.props.style || {}) }}>
						{this.formElements}
						{this.state.error ? (
							<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
								<Text key={'ErrorMSG'} style={{ color: '#A55' }}>
									{'Os seguintes campos não foram preenchidos corretamente: ' + this.state.error.join(', ')}
								</Text>
							</View>
						) : null}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	buttonForm: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	containerLabel: {
		marginTop: 5,
		width: '100%',
		marginBottom: 16
	},
	containerForm: {
		width: '100%',
		maxWidth: '100%',
		marginTop: 10,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		overflow: 'hidden'
	},
	containerSubForm: {
		width: '98%',
		maxWidth: '98%',
		margin: 5,
		display: 'flex',
		flexDirection: 'column',
		borderLeftWidth: 1,
		borderLeftColor: '#96A2B4',
		borderTopWidth: 1,
		borderTopColor: '#96A2B4',
		borderBottomWidth: 3,
		borderBottomColor: '#96A2B4',
		padding: 4,
		borderRightWidth: 4,
		borderRightColor: '#96A2B4',
	},
	containerEmptyItens: {
		paddingLeft: 16,
		color: '#BBB',
		paddingTop: 16
	},
	containerAddSubForm: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingLeft: 10
	},
	containerChildrenElements: {
		margin: 3,
		marginLeft: 2,
		width: '100%'
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 15,
		bottom: -20,
		backgroundColor: theme.colors.accent
	}
});
export default SimpleFormRN;
