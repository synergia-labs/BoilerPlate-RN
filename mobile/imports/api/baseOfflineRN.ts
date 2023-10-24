import shortid from 'shortid';
import Realm, { UpdateMode } from 'realm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorOffline } from './errorBaseOfflineRN';
import { IDoc } from '../../shared/typings/IDoc';
import { USER_ASYNC_COLLECTION } from '../config/storageConfig';
import { getIdAparelho } from '../libs/getIdAparelho';
import { requestRealm } from '../libs/requestRealm';
import { ISchema } from '../../shared/typings/ISchema';
import { hasValue } from '../libs/hasValue';

interface ISchemaRealm {
	name: string;
	primaryKey: string;
	properties: { [key: string]: any };
}

interface IRealmProperty {
	type: string;
	indexed?: boolean;
	optional?: boolean;
}

/**
 * Apos criar sua apiOffline é necessário registrar o schema no arquivo inicializaRealm
 */

export class BaseOfflineRN<Doc extends IDoc> {
	private schema: ISchemaRealm;
	private schemaName: string;
	private schemaMongo: ISchema<Doc>;
	private keyDate: string[];
	constructor(schemaName: string, schemaMongo: ISchema<Doc>, schemaRealm: { [key: string]: any }) {
		this.schemaName = schemaName;
		this.schemaMongo = schemaMongo;
		this.keyDate = this._typeDate();
		this.schema = {
			name: schemaName,
			primaryKey: '_id',
			properties: schemaRealm
		};
		this._prepareDataForRealmInsertion = this._prepareDataForRealmInsertion.bind(this);
		this._objParse = this._objParse.bind(this);
		this._typeDate = this._typeDate.bind(this);
		this._convertTypeDate = this._convertTypeDate.bind(this);
		this._deleteSchema = this._deleteSchema.bind(this);
		this._deleteAllObjects = this._deleteAllObjects.bind(this);
		this._userIdAsyncStorage = this._userIdAsyncStorage.bind(this);
		this._addLogInformation = this._addLogInformation.bind(this);
		this.insert = this.insert.bind(this);
		this.upsert = this.upsert.bind(this);
		this.update = this.update.bind(this);
		this.remove = this.remove.bind(this);
		this.getCollection = this.getCollection.bind(this);
		this.getSchema = this.getSchema.bind(this);
		this.findById = this.findById.bind(this);
		this.find = this.find.bind(this);
	}

	private _typeDate = () => {
		const keys = Object.keys(this.schemaMongo);
		const arr = ['createdat', 'updatedat', 'lastupdate'];
		keys.forEach((key) => {
			if (this.schemaMongo[key].type === Date) arr.push(key);
		});
		return arr;
	};

	private _convertTypeDate = (doc: { [key: string]: any }) => {
		this.keyDate.forEach((key) => {
			if (!!doc[key]) {
				doc[key] = new Date(doc[key]);
			}
		});
	};

	private _userIdAsyncStorage = async () => {
		const userAsyncStorage = await AsyncStorage.getItem(USER_ASYNC_COLLECTION);
		const asyncData = userAsyncStorage && JSON.parse(userAsyncStorage);
		return asyncData._id;
	};

	private _objParse = (docObj: Realm.Results<{ [key: string]: any } & Realm.Object<unknown>>) => {
		const parsedData = docObj.map((doc) => JSON.parse(doc.data));
		return parsedData;
	};

	private _prepareDataForRealmInsertion = async (docObj: Doc) => {
		docObj._id = docObj._id ?? shortid.generate();
		const docObjJSONString = JSON.stringify(docObj);
		const { _id, data, ...remainingFields } = this.schema.properties;
		const baseObj = { _id: docObj._id!, data: docObjJSONString };
		const objForPersistence = Object.keys(remainingFields).reduce((acc, curr) => {
			return { ...acc, [curr]: (docObj as { [key: string]: any })[curr] };
		}, baseObj);
		return objForPersistence;
	};

	// Apagar o banco inteiro, incluindo schemas
	private _deleteSchema = async () => {
		const realm = requestRealm();
		realm.write(() => {
			realm.delete(realm.objects(this.schemaName));
		});
	};

	// Apagar os dados
	private _deleteAllObjects = async () => {
		const realm = requestRealm();
		realm.write(() => {
			realm.deleteAll();
		});
	};

	private _addLogInformation = async (docObj: Doc, type: string) => {
		const userId = await this._userIdAsyncStorage();
		const updateInfo = { lastupdate: new Date(), updatedby: userId };
		if (type === 'insert') {
			const insertLogs = { createdby: userId, createdat: new Date(), idAparelho: getIdAparelho() };
			return { ...docObj, ...insertLogs, ...updateInfo };
		} else {
			return { ...docObj, ...updateInfo };
		}
	};

	getSchema = () => {
		return this.schema;
	};

	/**
	 * insert
	 * @param {Object} docObj
	 * @param {function} callback
	 */
	insert = async (docObj: Doc) => {
		return await new Promise<void>((resolve, reject) => {
			if (!hasValue(docObj)) return resolve();
			(async () => {
				try {
					const realm = requestRealm();
					const _docObj = await this._addLogInformation(docObj, 'insert');
					const docParaInsercao: { [key: string]: any } = await this._prepareDataForRealmInsertion(_docObj);
					if (realm.isInTransaction) {
						realm.create<{ [key: string]: any }>(this.schemaName, docParaInsercao);
					} else {
						realm.write(() => {
							realm.create<{ [key: string]: any }>(this.schemaName, docParaInsercao);
						});
					}
					resolve(docParaInsercao?._id);
				} catch (error: any) {
					reject(
						new ErrorOffline(
							this.schemaName + ' - BaseOfflineRN.insert',
							`Não foi possivel inserir este documento: ${error.message}`
						)
					);
				}
			})();
		});
	};

	/**
	 * upsert
	 * @param {Object} docObj
	 * @param {function} callback
	 */
	upsert = async (docObj: Doc) => {
		return await new Promise((resolve, reject) => {
			(async () => {
				const realm = requestRealm();
				const filtered = realm.objects<{ [key: string]: any }>(this.schemaName).filtered('_id == $0', docObj._id);
				filtered.length === 0 ? await this.insert(docObj) : await this.update(docObj);
			})();
		});
	};

	/**
	 * update
	 * @param {Object} docObj
	 * @param {function} callback
	 */
	update = async (docObj: Doc) => {
		return await new Promise((resolve, reject) => {
			(async () => {
				try {
					const realm = requestRealm();
					const _docObj = await this._addLogInformation(docObj, 'update');
					const docAtualizado = await this._prepareDataForRealmInsertion(_docObj);
					if (realm.isInTransaction) {
						realm.create<{ [key: string]: any }>(this.schemaName, docAtualizado, 'modified' as UpdateMode.Modified);
					} else {
						realm.write(() => {
							realm.create<{ [key: string]: any }>(this.schemaName, docAtualizado, 'modified' as UpdateMode.Modified);
						});
					}
					resolve(docAtualizado._id);
				} catch (error: any) {
					reject(
						new ErrorOffline(
							this.schemaName + ' - BaseOfflineRN.update',
							`Não foi possivel editar este documento: ${error.message}`
						)
					);
				}
			})();
		});
	};

	/**
	 * remove
	 * @param {Object} docObj
	 * @param {function} callback
	 */
	remove = async (docObj: Doc) => {
		return await new Promise((resolve, reject) => {
			(async () => {
				try {
					const realm = requestRealm();
					const docRealmParaRemocao = realm
						.objects<{ [key: string]: any }>(this.schemaName)
						.filtered('_id == $0', docObj._id);
					if (realm.isInTransaction) {
						realm.delete(docRealmParaRemocao);
					} else {
						realm.write(() => {
							realm.delete(docRealmParaRemocao);
						});
					}
					resolve(docObj._id);
				} catch (error: any) {
					reject(
						new ErrorOffline(
							this.schemaName + ' - BaseOfflineRN.remove',
							`Não foi possivel remover este documento: ${error.message}`
						)
					);
				}
			})();
		});
	};

	/**
	 * getCollection
	 * @returns {T[]}
	 */
	getCollection = async <T>(): Promise<T[]> => {
		const realm = requestRealm();
		const data = realm.objects<{ [key: string]: any }>(this.schemaName);
		if (data.length === 0) {
			return [];
		} else {
			const parsedData = this._objParse(data) as T[];
			return parsedData;
		}
	};

	/**
	 * findById
	 * @param {string} id
	 * @returns {T[]}
	 */
	findById = async (id: string) => {
		const realm = requestRealm();
		const realmDoc = realm.objects<{ [key: string]: any }>(this.schemaName).filtered('_id == $0', id);
		if (realmDoc.length === 0) {
			return [];
		} else {
			const parsedDoc = this._objParse(realmDoc)[0];
			this._convertTypeDate(parsedDoc);
			return parsedDoc;
		}
	};

	/**
	 * find
	 * @param {string} filter
	 * @param {T} args
	 * @returns {T[]}
	 */
	find = async (filter?: string, ...args: any[]) => {
		const realm = requestRealm();
		let realmData = realm.objects<{ [key: string]: any }>(this.schemaName);
		if (!!filter) realmData = realmData.filtered(filter, ...args);
		if (realmData.length === 0) {
			return [];
		} else {
			const parsedData = this._objParse(realmData);
			parsedData.forEach((parsedDoc) => this._convertTypeDate(parsedDoc));
			return parsedData;
		}
	};

	setSyncDate = async (dados: Doc[]) => {
		return await new Promise((resolve, reject) => {
			const realm = requestRealm();
			(async () => {
				realm.beginTransaction();
				try {
					await Promise.all(
						dados.map(async (doc) => {
							await this.update(doc as Doc);
						})
					);
					realm.commitTransaction();
					resolve('Data da sincronização atualizada com sucesso!');
				} catch (e) {
					realm.cancelTransaction();
					reject(e);
				}
			})();
		});
	};
}
