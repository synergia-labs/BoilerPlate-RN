import { ApiBase } from '/imports/api/base';
import { getUser } from '/imports/libs/getUser';

import { IProductBaseOptions } from '../../shared/typings/IBaseOptions';
import { Meteor } from 'meteor/meteor';
import { IDoc } from '/shared/typings/IDoc';
import { ISchema } from '/shared/typings/ISchema';

export class ProductBase<Doc extends IDoc> extends ApiBase<any> {
	private enableCallMethodObserver: boolean | undefined;
	private enableSubscribeObserver: boolean | undefined;
	private _tmpLastSubscribeRegister: string | undefined;
	constructor(apiName: string, apiSch: ISchema<Doc>, options?: IProductBaseOptions | undefined) {
		super(apiName, apiSch, options);

		if (options && options.enableCallMethodObserver) {
			this.enableCallMethodObserver = true;
		}
		if (options && options.enableSubscribeObserver) {
			this.enableSubscribeObserver = true;
		}

		this.getImageThumbnail = this.getImageThumbnail.bind(this);

		this.callMethod = this.callMethod.bind(this);
	}

	callMethod(name: string, ...params: (string | object | any)[]) {
		if (this.enableCallMethodObserver) {
			const self = this;
			import('../analytics/AnalyticsSubscriber').then(({ subjectCallMethod }) => {
				const preparedParams = params
					? Object.keys(params)
							.filter((key: any) => Array.isArray(params[key]) || typeof params[key] !== 'function')
							.reduce((obj, key: any) => {
								return Object.assign(obj, {
									[key]: params[key]
								});
							}, {})
					: {};

				const eventData = {
					methodName: name,
					collection: self.collectionName,
					params: Object.values(preparedParams),
					user: getUser()
				};
				const eventStringify = JSON.stringify({ ...eventData, user: null });
				if (self._tmpLastSubscribeRegister !== eventStringify) {
					subjectCallMethod.next(eventData);
					self._tmpLastSubscribeRegister = eventStringify;
				}
			});
		}
		super.callMethod(name, ...params);
	}

	subscribe(
		api: string = 'default',
		...params: object[]
	): {
		total: any;
		stop(): void;
		ready: () => boolean;
	} | null {
		if (this.enableSubscribeObserver) {
			const self = this;
			import('../analytics/AnalyticsSubscriber').then(({ subjectSubscribe }) => {
				const preparedParams = params
					? Object.keys(params)
							.filter((key: any) => Array.isArray(params[key]) || typeof params[key] !== 'function')
							.reduce((obj, key: any) => {
								return Object.assign(obj, {
									[key]: params[key]
								});
							}, {})
					: {};

				const eventData = {
					apiName: api,
					collection: self.collectionName,
					params: Object.values(preparedParams),
					user: getUser()
				};
				const eventStringify = JSON.stringify({ ...eventData, user: null });
				if (self._tmpLastSubscribeRegister !== eventStringify) {
					subjectSubscribe.next(eventData);
					self._tmpLastSubscribeRegister = eventStringify;
				}
			});
		}

		return super.subscribe(api, ...params);
	}

	getImageThumbnail(field: string, _id: string) {
		const date = new Date();
		const path = `${Meteor.absoluteUrl()}thumbnail/${this.collectionName}/${field}/${_id}?date=${date.toISOString()}`;
		return path;
	}
	getImageURL(field: string, _id: string) {
		const date = new Date();
		const path = `${Meteor.absoluteUrl()}img/${this.collectionName}/${field}/${_id}?date=${date.toISOString()}`;
		return path;
	}

	getAudioURL(field: string, _id: string) {
		const date = new Date();
		const path = `${Meteor.absoluteUrl()}audio/${this.collectionName}/${field}/${_id}?date=${date.toISOString()}`;
		return path;
	}
}
