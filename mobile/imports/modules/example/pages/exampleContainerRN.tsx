import {ExampleDetail} from './exampleDetailRN';
import {ExampleList} from './exampleListRN';

export const ExampleContainer = (props: any) => {
	const {route} = props;

	const validState: {[key: string]: number} = {view: 1, edit: 1, create: 1};

	const {screenState, id} = route?.params ?? {screenState: null, id: null}; // obter via param de navegação

	if (!!screenState && validState[screenState as string]) {
		return <ExampleDetail {...props} screenState={screenState} id={id} />;
	}
	return <ExampleList {...props} />;
};
