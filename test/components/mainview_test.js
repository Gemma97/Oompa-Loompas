import { renderComponent, expect } from '../test_helper';
import MainView from '../../src/components/main_view';
import { shallow } from 'enzyme';

describe('MainView', () => {

    it('shows the correct text', () => {

        // create an instance of MainView
        const component = renderComponent(MainView);

        expect(component).to.contain('Find your Oompa Loompa');
    });  
});

