import { Recurso as Usuarios } from '../modules/userProfile/Recursos';
import {Recurso as Example} from '../modules/example/Recursos';

import { RoleType } from './RoleType';

type MapRolesRecursos = {
	[key: string]: string[];
};

/**
 * Mapeamento entre as roles (perfil de usuário) e os recursos.
 * chave: role.
 * valores: recursos.
 *
 *
 * O nome do recurso deve ser prefixado com nome do módulo.
 *
 * Favor manter a ordem alfabética no nome dos módulos.
 *
 */


const administrador = [
	Usuarios.USUARIO_CREATE,
	Usuarios.USUARIO_REMOVE,
	Usuarios.USUARIO_UPDATE,
	Usuarios.USUARIO_VIEW,
	Example.EXAMPLE_CREATE,
	Example.EXAMPLE_REMOVE,
	Example.EXAMPLE_UPDATE,
	Example.EXAMPLE_VIEW

];

export const mapRolesRecursos: MapRolesRecursos = {
	[RoleType.ADMINISTRADOR]: administrador,
};
