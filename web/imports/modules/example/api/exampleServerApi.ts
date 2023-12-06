// region Imports
import { Recurso } from '../config/Recursos';
import { userprofileServerApi } from '/imports/userprofile/api/UserProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
import { IExample, exampleSch } from '/shared/modules/example/exampleSch';
// endregion

class ExampleServerApi extends ProductServerBase<IExample> {
	constructor() {
		super('example', exampleSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});

		this.addTransformedPublication(
			'exampleList',
			(filter = {}) => {
				return this.defaultListCollectionPublication(filter, {
					projection: { image: 1, title: 1, description: 1, createdby: 1 }
				});
			},
			(doc: IExample & { nomeUsuario: string }) => {
				const userProfileDoc = userprofileServerApi.getCollectionInstance().findOne({ _id: doc.createdby });
				return { ...doc, nomeUsuario: userProfileDoc?.username };
			}
		);

		this.addPublication('exampleDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {});
		});

		this.addRestEndpoint(
			'view',
			(params, options) => {
				console.log('Params', params);
				console.log('options.headers', options.headers);
				return { status: 'ok' };
			},
			['post']
		);

		this.addRestEndpoint(
			'view/:exampleId',
			(params, options) => {
				console.log('Rest', params);
				if (params.exampleId) {
					return this
						.defaultCollectionPublication(
							{
								_id: params.exampleId
							},
							{}
						)
						.fetch();
				} else {
					return { ...params };
				}
			},
			['get']
		);
		this.registerMethod('obtemExemplo', this.obtemExemplo.bind(this));
		this.registerMethod('obtemExemplos', this.obtemExemplos.bind(this));
	}

	obtemExemplos = () => {
		return this.collectionInstance.find({}).fetch();
	};
	obtemExemplo = (id: string) => {
		return this.collectionInstance.find({_id: id}).fetch();
	}
}

export const exampleServerApi = new ExampleServerApi();
