import { exampleRealmSch } from '../../../../shared/modules/example/exampleRealmSch';
import { exampleSch, IExample } from '../../../../shared/modules/example/exampleSch';
import { BaseOfflineRN } from '../../../api/baseOfflineRN';

class ExampleOff extends BaseOfflineRN<IExample> {
	constructor() {
		super('exampleOff', exampleSch, exampleRealmSch);
	}
}

export const exampleOff = new ExampleOff();
