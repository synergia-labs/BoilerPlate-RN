import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { userprofileApi } from '../../../api/UserProfileApi';
import _ from 'lodash';
import { PageLayout } from '../../../../ui/layouts/PageLayout';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import { NavigateFunction } from 'react-router-dom';
import { ComplexTable } from '/imports/ui/components/ComplexTable/ComplexTable';

interface IUserProfileList {
	users: IUserProfile[];
	navigate: NavigateFunction;
}

const UserProfileList = ({ users, navigate }: IUserProfileList) => {
	const onClick = (event, id, doc) => {
		navigate('/userprofile/view/' + id);
	};

	return (
		<PageLayout title={'Lista de Usuários'} actions={[]}>
			<ComplexTable
				data={users}
				schema={_.pick(userprofileApi.schema, ['photo', 'username', 'email'])}
				onRowClick={(row) => navigate('/userprofile/view/' + row.id)}
				searchPlaceholder={'Pesquisar usuário'}
				toolbar={{
					selectColumns: true,
					exportTable: { csv: true, print: true },
					searchFilter: true
				}}
				/>

		</PageLayout>
	);
};

export const UserProfileListContainer = withTracker((props) => {
	const subHandle = userprofileApi.subscribe('userProfileList', {});
	const users = subHandle.ready() ? userprofileApi.find({}).fetch() : [];

	return {
		users
	};
})(UserProfileList);
