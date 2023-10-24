import React, { useCallback, useEffect, useRef, useState } from 'react';
import { theme } from '../../../paper/themeRN';
import Feather from 'react-native-vector-icons/Feather';
import {
	AutocompleteDropdown,
	AutocompleteDropdownRef,
	TAutocompleteDropdownItem
} from 'react-native-autocomplete-dropdown';
import { normalizarTexto } from '../../../../shared/libs/utilitariosDeTexto';
import { View, StyleProp, ViewStyle } from 'react-native';
import { autocompleteDropdownSFStyle } from './AutocompleteDropdownSFStyles';
import { SimpleLabel } from '../../../paper/components/SimpleLabel/SimpleLabel';

interface IAutocompleteDropdownSF {
	name: string;
	value: TAutocompleteDropdownItem | undefined;
	onChange: React.Dispatch<React.SetStateAction<TAutocompleteDropdownItem | undefined>>;
	options: TAutocompleteDropdownItem[];
	label: string;
	disabled?: boolean;
	inputStyle?: StyleProp<ViewStyle>;
	placeHolderTextColor?: string;
	borderFocus?: string;
	onFocus?: () => void;
}

interface ISuggestions {
	id: string;
	title: string | null;
}

export const AutocompleteDropdownSF = (props: IAutocompleteDropdownSF) => {
	const { name, value, onChange, options, disabled, label, inputStyle, placeHolderTextColor, borderFocus, onFocus } =
		props;
	const [dropdownValue, setDropdownValue] = useState<TAutocompleteDropdownItem | undefined | null>(
		value || undefined || null
	);
	const handleFocus = () => {
		if (onFocus) onFocus();
	};
	const [suggestionsList, setSuggestionsList] = useState<ISuggestions[] | null>(null);

	const dropdownController = useRef<AutocompleteDropdownRef>(null);

	const handleOnChange = (item: ISuggestions | undefined) => {
		if (!item) {
			setDropdownValue(null);
			onChange(undefined);
			dropdownController.current?.setItem(undefined);
			dropdownController.current?.setInputText('');
			setSuggestionsList(null);
		} else if (item !== dropdownValue || JSON.stringify(item) !== JSON.stringify(dropdownValue)) {
			setDropdownValue(item);
			onChange(item);
			dropdownController.current?.setItem(item);
			dropdownController.current?.setInputText('');
		}
	};

	const getSuggestions = async (q: string) => {
		const filterToken = normalizarTexto(q).toLowerCase();

		if (typeof q !== 'string' || q.length === 0) {
			setSuggestionsList(null);
			return;
		}
		const suggestions = options
			.filter((item: TAutocompleteDropdownItem) => {
				return item.title ? normalizarTexto(item.title.toLowerCase()).indexOf(filterToken) !== -1 : undefined;
			})
			.map((item: TAutocompleteDropdownItem) => ({
				id: item.id,
				title: item.title
			}));

		setSuggestionsList(suggestions.length === 0 ? [] : suggestions);
	};

	const onClearPress = () => {
		handleOnChange(undefined);
	};

	const onOpenSuggestionsList = useCallback((isOpened: any) => {}, []);

	useEffect(() => {
		setSuggestionsList(options);
		setDropdownValue(null);
		dropdownController.current?.setItem(undefined);
		dropdownController.current?.setInputText('');
	}, [options]);

	const valueId = value ? value.id : undefined;

	useEffect(() => {
		if (value !== dropdownValue && JSON.stringify(value) !== JSON.stringify(dropdownValue)) {
			setDropdownValue(value);
			dropdownController.current?.setItem(value);
			dropdownController.current?.setInputText('');
		}
	}, [valueId]);

	return (
		<View key={name} style={{ ...autocompleteDropdownSFStyle.inputContainer, marginBottom: 15, zIndex: 2 }}>
			{label && <SimpleLabel>{label}</SimpleLabel>}
			<AutocompleteDropdown
				clearOnFocus={false}
				closeOnBlur={false}
				controller={(controller) => (dropdownController.current = controller)}
				initialValue={dropdownValue?.id ?? undefined}
				onSelectItem={(item) => {
					item && handleOnChange(item);
				}}
				onClear={onClearPress}
				onOpenSuggestionsList={onOpenSuggestionsList}
				onChangeText={getSuggestions}
				dataSet={suggestionsList || options}
				position={'relative'}
				flatListProps={{
					keyboardShouldPersistTaps: 'handled'
				}}
				textInputProps={{ placeholder: 'Selecionar', placeholderTextColor: placeHolderTextColor, editable: !disabled }}
				emptyResultText={'Local não encontrado'}
				useFilter={false} // set false to prevent rerender twice
				inputContainerStyle={{
					backgroundColor: '#fff',
					borderRadius: 5,
					borderWidth: 1,
					borderColor: !!borderFocus
						? borderFocus
						: !!dropdownValue?.id
						? theme.colors.verdeEscuro
						: theme.colors.cinza80,
					padding: 8,
					...inputStyle
				}}
				suggestionsListContainerStyle={{
					backgroundColor: '#FFF',
					zIndex: 2
				}}
				ChevronIconComponent={<Feather name="chevron-down" size={20} color="#000" />}
				ClearIconComponent={<Feather name="x" size={18} color="#000" />}
				onFocus={handleFocus}
			/>
		</View>
	);
};
