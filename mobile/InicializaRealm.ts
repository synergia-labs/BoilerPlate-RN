import Realm from 'realm';
import { exampleOff as example } from './imports/modules/example/api/exampleOff';

import { requestRealm } from './imports/libs/requestRealm';

const realmSchemas = [
	example.getSchema()
];

const realmSchemaNames = [ 'example'];

export const inicializaRealmGlobal = async () => {
	const realm = await Realm.open({
		schema: realmSchemas,
		deleteRealmIfMigrationNeeded: true
		// schemaVersion: 2
	});
	globalThis.realm = realm;
};

export const deletarBancoInteiroAgressivamente = async () => {
	const realm = requestRealm();
	realm.write(() => {
		realm.deleteAll();
	});
};

export const deletarBancoInteiro = async () => {
	const realm = requestRealm();
	realm.write(() => {
		realmSchemaNames.forEach((e) => realm.delete(realm.objects(`${e}Off`)));
	});
};

export const deletarSchemaPorNome = async (nome: string) => {
	const realm = requestRealm();
	realm.write(() => {
		realm.delete(realm.objects(`${nome}Off`));
	});
};
