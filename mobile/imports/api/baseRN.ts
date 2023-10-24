import Meteor, { Mongo } from '@meteorrn/core';
import { IDoc } from '../../shared/typings/IDoc';
import { ISchema } from '../../shared/typings/ISchema';
import { IBaseOptions } from '../../shared/typings/IBaseOptions';
import { IMeteorError } from '../../shared/typings/IMeteorError';

const defaultOptions = {
	disableDefaultPublications: true
};

// region Base Model
export class ApiBaseRN<Doc extends IDoc> {
	restApi = {};
	schema: ISchema<Doc>;
	collectionName: string | null;
	// @ts-ignore
	collectionInstance: Mongo.Collection<Doc>;
	options: IBaseOptions;
	/**
	 * Constructor
	 * @param apiName
	 * @param apiSch
	 * @param  {Object} options
	 */
	constructor(apiName: string, apiSch: ISchema<Doc>, options?: IBaseOptions | undefined) {
		this.options = {
			...defaultOptions,
			...(options || {})
		};
		this.collectionName = apiName;
		this.schema = apiSch;
		this.initCollection = this.initCollection.bind(this);

		//**GETS **
		this.getSchema = this.getSchema.bind(this);
		this.getCollectionInstance = this.getCollectionInstance.bind(this);

		//**API/DB METHODS**
		this.callMethod = this.callMethod.bind(this);
		this.callMethodWithPromise = this.callMethodWithPromise.bind(this);
		this.insert = this.insert.bind(this);
		this.upsert = this.upsert.bind(this);
		this.update = this.update.bind(this);
		this.remove = this.remove.bind(this);
		this.getDocs = this.getDocs.bind(this);

		this.initCollection(apiName);
	}

	initCollection(apiName: string) {
		const self = this;
		this.collectionName = apiName;
		if (this.collectionName !== 'users') {
			this.collectionInstance = new Mongo.Collection(this.collectionName);
		} else this.collectionInstance = Meteor.users;
	}

	getSchema = () => {
		return { ...this.schema };
	};

	// //**GETS **
	//  * Get the collection instance.
	//  * @returns {Object} - Collection.
	//  */
	getCollectionInstance() {
		return this.collectionInstance;
	}

	// //**API/DB METHODS**

	// /**
	//  * Wrapper to the Meteor call. This check if the user has
	//  * connection with the server, in this way we can return the result from
	//  * a cached collection or from the server.
	//  * @param  {String} name - Meteor method name
	//  * @param params
	//  */
	callMethod(name: string, ...params: any[]) {
		if (Meteor.status().connected) {
			Meteor.call(`${this.collectionName}.${name}`, ...params);
		} else {
			console.log('Sem Conexão com o Servidor');
		}
	}

	async callMethodWithPromise(name: string, ...params: any[]): Promise<any> {
		return await new Promise((resolve, reject) =>
			this.callMethod(name, ...params, (e: Error, r: any) => {
				if (e) {
					reject(e);
				} else {
					resolve(r);
				}
			})
		);
	}

	// /**
	//  * Wrapper for a Meteor call.
	//  * @param  {Object} docObj - Document from a collection.
	//  * @param  {Function} callback - Callback Function
	//  */
	insert(docObj: Doc, callback: any) {
		const newObj: { [key: string]: any } = { _id: docObj._id };
		const schema = this.getSchema();
		Object.keys(docObj).forEach((key) => {
			if (
				!!schema[key] &&
				((!schema[key].isImage && !schema[key].isAvatar) ||
					((docObj[key as keyof Doc] as string).indexOf('/img/') === -1 &&
						(docObj[key as keyof Doc] as string).indexOf('/thumbnail/') === -1))
			) {
				newObj[key] = docObj[key as keyof Doc];
			}
		});
		this.callMethod('insert', newObj, callback);
	}

	upsert(docObj: Doc | Partial<Doc>, callback: any) {
		this.callMethod('upsert', docObj, callback);
	}
	// /**
	//  * Wrapper for a Meteor call.
	//  * @param  {Object} docObj - Document from a collection.
	//  * @param  {Function} callback - Callback Function
	//  */
	update(
		docObj: Doc,
		callback = (e: IMeteorError, r: any) => {
			console.log(e, r);
		}
	) {
		const newObj: { [key: string]: any } = { _id: docObj._id };
		const schema = this.schema;
		Object.keys(docObj).forEach((key) => {
			if (
				!!schema[key] &&
				((!schema[key].isImage && !schema[key].isAvatar) ||
					(typeof docObj[key as keyof Doc] === 'string' &&
						(docObj[key as keyof Doc] as string).indexOf('/img/') === -1 &&
						(docObj[key as keyof Doc] as string).indexOf('/thumbnail/') === -1))
			) {
				newObj[key] = docObj[key as keyof Doc];
			}
		});
		this.callMethod('update', newObj, callback);
	}

	// /**
	//  * Wrapper for a Meteor call.
	//  * @param  {Object} docObj - Document from a collection.
	//  * @param  {Function} callback - Callback Function
	//  */
	remove(
		docObj: Doc,
		callback = (e: IMeteorError, r: any) => {
			console.log(e, r);
		}
	) {
		this.callMethod('remove', docObj, callback);
	}

	// /**
	//  * Get Docs
	//  * @param apiName
	//  * @param filter
	//  * @param optionsPub
	//  * @param  {Function} callback - Callback Function
	//  */
	getDocs(
		apiName = 'default',
		filter = {},
		optionsPub = {},
		callback = (e: IMeteorError, r: any) => {
			console.log(e, r);
		}
	) {
		this.callMethod('getDocs', apiName, filter, optionsPub, callback);
	}
}
