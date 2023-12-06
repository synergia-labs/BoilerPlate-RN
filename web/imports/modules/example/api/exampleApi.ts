// region Imports
import { ProductBase } from '../../../api/productBase';
import { IExample, exampleSch } from '/shared/modules/example/exampleSch';

class ExampleApi extends ProductBase<IExample> {
    constructor() {
        super('example', exampleSch, {
            enableCallMethodObserver: true,
            enableSubscribeObserver: true,
        });
    }
}

export const exampleApi = new ExampleApi();
