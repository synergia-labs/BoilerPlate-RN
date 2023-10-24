// @ts-ignore
import { Mongo } from '@meteorrn/core';
import { ApiBaseRN } from '../api/baseRN';
import { IUserProfile, userProfileSch } from '../../shared/modules/userProfile/userProfileSch';

class UserProfileApi extends ApiBaseRN<IUserProfile> {
	constructor() {
		super('userprofile', userProfileSch);
	}
}

export const userProfileApi = new UserProfileApi();
