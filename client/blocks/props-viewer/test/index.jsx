/**
 * External dependencies
 */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import useMockery from 'test/helpers/use-mockery';

describe( 'PropsViewer', () => {
	let PropsViewer;
	useMockery( ( mockery ) => {
		mockery.registerSubstitute( '../../../server/devdocs/proptypes-index.json', './test/proptypes-index-mock.json' );
		PropsViewer = require( '../index' );
	} );

	context( 'no matching component', () => {
		it( 'should render only the example', () => {
			const component = ( <PropsViewer.default component={ 'no-match-here-go-away' } example={ <div /> } /> );
			const wrapper = shallow( component );
			expect( wrapper.childAt( 0 ).matchesElement( <div></div> ) ).to.be.true;
		} );
	} );

	context( 'renders a table of propTypes', () => {
		it( 'can render itself', () => {
			const example = ( <div>Example goes here</div> );
			const component = ( <PropsViewer.default component={ 'props-viewer' } example={ example } /> );
			const componentDescription = PropsViewer.findRealComponent( 'props-viewer' )[ 0 ];

			const wrapper = shallow( component );
			expect( wrapper.childAt( 0 ).matchesElement( <div>Example goes here</div> ) ).to.be.true;

			const tableWrapper = wrapper.childAt( 1 );
			expect( tableWrapper.childAt( 0 ).text() ).equals( componentDescription.description );

			const tbody = wrapper.find( 'tbody' );
			const componentRow = tbody.childAt( 0 );

			expect( componentRow.childAt( 1 ).text() ).equals( 'component' );
			expect( componentRow.childAt( 2 ).text() ).equals( componentDescription.props.component.type.name );
			expect( componentRow.childAt( 3 ).text() ).equals( 'undefined' );
			expect( componentRow.childAt( 4 ).text() ).equals( componentDescription.props.component.description );
		} );
	} );

	context( 'reducer', () => {
		it( 'returns empty array if nothing is found', () => {
			const description = PropsViewer.findRealComponent( 'no-results' );
			expect( description ).to.be.empty;
		} );
		it( 'returns an item if something is found', () => {
			const description = PropsViewer.findRealComponent( 'props-viewer' );
			expect( description.length ).to.equal( 1 );
		} );
	} );
} );
