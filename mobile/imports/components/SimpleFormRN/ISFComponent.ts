export interface ISFComponent {
	name: string;
	screenState?: 'view' | 'create' | 'edit';
	label?: string;
	disabled?: boolean;
}
