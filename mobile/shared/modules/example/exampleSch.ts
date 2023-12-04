import { IDoc } from '../../typings/IDoc';

export const exampleSch = {
	image: {
		type: String,
		label: 'Imagem',
		defaultValue: '',
		optional: true,
		isImage: true
	},
	title: {
		type: String,
		label: 'Título',
		defaultValue: '',
		optional: false
	},
	description: {
		type: String,
		label: 'Descrição',
		defaultValue: '',
		optional: true
	},
	check: {
		type: Boolean,
		frontEndComponent: 'checkbox',
		label: 'Checked?',
		defaultValue: false,
		optional: true
	},
	statusToggle: {
		type: Boolean,
		frontEndComponent: 'switch',
		label: 'Status Toggle',
		defaultValue: false,
		optional: true
	},
	type: {
		type: String,
		label: 'Tipo',
		defaultValue: '',
		optional: true,
		options: [
			{ value: 'normal', label: 'Normal' },
			{ value: 'hard', label: 'Dificil' },
			{ value: 'internal', label: 'Interna' },
			{ value: 'extra', label: 'Extra' }
		]
	},
	typeMulti: {
		type: [String],
		label: 'Tipo com vários valores',
		defaultValue: '',
		optional: true,
		multiple: true,
		visibilityFunction: (doc: any) => !!doc.type && doc.type === 'extra',
		options: [
			{ value: 'normal', label: 'Normal' },
			{ value: 'extra', label: 'Extra' },
			{ value: 'minimo', label: 'Minimo' }
		]
	},
	date: {
		type: Date,
		label: 'Data',
		defaultValue: new Date(),
		optional: true
	},
	files: {
		type: [Object],
		label: 'Arquivos',
		defaultValue: '',
		optional: true,
		isUpload: true
	},
	chip: {
		type: [String],
		label: 'Chips',
		defaultValue: '',
		optional: true
	},
	contacts: {
		type: Object,
		label: 'Contatos',
		defaultValue: '',
		optional: true,
		subSchema: {
			phone: {
				type: String,
				label: 'Telefone',
				defaultValue: '',
				optional: true,
				mask: '(##) ####-####'
			},
			cpf: {
				type: String,
				label: 'CPF',
				defaultValue: '',
				optional: true,
				mask: '###.###.###-##'
			}
		}
	},
	tasks: {
		type: [Object],
		label: 'Tarefas',
		defaultValue: '',
		optional: true,
		subSchema: {
			name: {
				type: String,
				label: 'Nome da Tarefa',
				defaultValue: '',
				optional: true
			},
			description: {
				type: String,
				label: 'Descrição da Tarefa',
				defaultValue: '',
				optional: true
			}
		}
	},
	audio: {
		type: String,
		label: 'Áudio',
		defaultValue: '',
		optional: true,
		isAudio: true
	},
	address: {
		type: Object,
		label: 'Localização',
		defaultValue: '',
		isMapLocation: true,
		optional: true
	},
	slider: {
		type: Number,
		label: 'Slider',
		defaultValue: 0,
		optional: true,
		max: 100,
		min: 0
	},
	statusRadio: {
		type: String,
		label: 'Status RadioButton',
		defaultValue: '',
		optional: true,
		radiosList: ['Todo', 'Doing', 'Done']
	}
};

export interface IExample extends IDoc {
	audio?: string;
	image?: string;
	title: string;
	slider?: number;
	tasks?: Object;
	contacts?: Object;
	date: Date;
	files: any;
	address: string;
	chip: string;
	typeMulti: string;
	description: string;
	check: boolean;
	statusRadio: string;
	statusToggle: boolean;
}
