import { getUser } from '/imports/libs/getUser';
import { EnumUserRoles } from '/imports/userprofile/api/EnumUser';

const checkPermissionSuperAdmin = () => {
	const userLogged = getUser();
	return userLogged.roles && userLogged.roles.indexOf(EnumUserRoles.ADMINISTRADOR) !== -1;
};

const checkPermissionAdmin = () => {
	const userLogged = getUser();
	if (checkPermissionSuperAdmin()) {
		return true;
	}
	return (
		userLogged &&
		userLogged.roles &&
		userLogged.roles.indexOf(EnumUserRoles.ADMINISTRADOR) !== -1 &&
	);
};

const checkPermissionPublic = () => {
	const userLogged = getUser();
	return userLogged.roles && userLogged.roles.indexOf(EnumUserRoles.PUBLICO) !== -1;
};

const checkPermissionUsuario = () => {
	const userLogged = getUser();
	if (checkPermissionSuperAdmin()) {
		return true;
	}
	return userLogged.roles && userLogged.roles.indexOf(EnumUserRoles.USUARIO) !== -1;
};

export { checkPermissionAdmin, checkPermissionSuperAdmin, checkPermissionPublic, checkPermissionUsuario };
