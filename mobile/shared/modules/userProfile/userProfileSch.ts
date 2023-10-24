import { IDoc } from '../../typings/IDoc';
import { EnumPerfilUsuario } from './EnumUser';

export const userProfileSch = {
	photo: {
		type: String,
		label: 'Foto',
		defaultValue: '',
		optional: true,
		isImage: true
	},
	inativo: {
		type: Boolean,
		label: 'status',
		defaultValue: '',
		optional: true
	},
	username: {
		type: String,
		label: 'Nome',
		defaultValue: '',
		optional: false
	},
	nome_minusculo: {
		type: String,
		optional: false
	},
	email: {
		type: String,
		label: 'E-mail',
		defaultValue: '',
		optional: false
	},
	empresaId: {
		type: String,
		label: 'Empresa',
		defaultValue: '',
		optional: false
	},
	phone: {
		type: String,
		label: 'Telefone',
		defaultValue: '',
		optional: true,
		mask: '(##) ####-####'
	},
	roles: {
		type: [String],
		label: 'Perfil de usuário',
		defaultValue: [],
		optional: false,
		options: [
			{ value: EnumPerfilUsuario.ADMINISTRADOR, label: EnumPerfilUsuario.ADMINISTRADOR },
		]
	}
};

export interface IUserProfile extends IDoc {
	_id: string;
	photo?: string;
	phone?: string;
	inativo?: boolean;
	username: string;
	nome_minusculo: string;
	email: string;
	roles?: string[];
}
