import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
export const config = configure({ adapter: new EnzymeAdapter() });
