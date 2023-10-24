export interface ISchema {
	type: any;
	label?: string;
	defaultValue?: any;
	optional?: boolean;
	frontEndComponent?: string;
	default?: any;
	isAudio?: boolean;
	isImage?: boolean;
	options?: { value: string; label: string }[];
}
