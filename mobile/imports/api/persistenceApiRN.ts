/* A idéia dessa classe é ser usada caso o sistema futuramente apresente comportamento diferente quando online/offline.

Nesse caso, essa API já tomará a decisão sobre qual API (online/offline) utilizar de forma transparente para o desenvolvedor. */

export class PersistenceApiRN<Doc> {
	apiOnline: any;
	apiOffline: any;
	constructor(apiOnline: any, apiOffline: any) {
		this.apiOnline = apiOnline;
		this.apiOffline = apiOffline;
		this.insert = this.insert.bind(this);
		this.upsert = this.upsert.bind(this);
		this.update = this.update.bind(this);
		this.remove = this.remove.bind(this);
		this.findOne = this.findOne.bind(this);
	}

	insert = async (
		docObj: Doc,
		isInternetConnected: boolean | null,
		foreignKey: string | undefined = undefined,
		callback?: (...args: any[]) => void
	) => {
		if (isInternetConnected) this.apiOnline.insert(docObj, callback);
		else await this.apiOffline.insert(docObj, callback, foreignKey ?? undefined);
	};

	upsert = async (
		docObj: Doc,
		isInternetConnected: boolean | null,
		foreignKey: string | undefined = undefined,
		callback: (...args: any[]) => void
	) => {
		if (isInternetConnected) this.apiOnline.upsert(docObj, callback);
		else this.apiOffline.upsert(docObj, callback);
	};

	update = async (
		docObj: Doc,
		isInternetConnected: boolean | null,
		foreignKey: string | undefined = undefined,
		callback: (...args: any[]) => void
	) => {
		if (isInternetConnected) this.apiOnline.update(docObj, callback);
		else await this.apiOffline.update(docObj, callback, foreignKey ?? undefined);
	};

	remove = async (docObj: Doc, isInternetConnected: boolean | null, callback: any) => {
		if (isInternetConnected) this.apiOnline.remove(docObj, callback);
		else await this.apiOffline.remove(docObj, callback);
	};

	findOne = async (id: string, methodName: string, isInternetConnected: boolean | null, callback: any) => {
		if (isInternetConnected) this.apiOnline.callMethod(methodName, id, callback);
		else {
			try {
				const value = await this.apiOffline.findById(id);
				value && callback(undefined, value);
			} catch (error) {
				callback(error, undefined);
			}
		}
	};
}
