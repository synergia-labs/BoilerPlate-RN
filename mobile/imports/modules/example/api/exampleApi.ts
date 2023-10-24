import Meteor, { Mongo } from '@meteorrn/core';
import { exampleSch, IExample } from '../../../../shared/modules/example/exampleSch';
import { ApiBaseRN } from '../../../api/baseRN';

class ExampleApiRN extends ApiBaseRN<IExample> {
	constructor() {
		super('example', exampleSch);
	}
}

export const exampleApiRN = new ExampleApiRN();
