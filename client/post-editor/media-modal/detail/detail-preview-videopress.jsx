/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { noop } from 'lodash';
import debug from 'debug';

/**
 * Internal dependencies
 */
import loadScript from 'lib/load-script';

/**
 * Module variables
 */
const log = debug( 'calypso:post-editor:videopress' );

class EditorMediaModalDetailPreviewVideoPress extends Component {
	static propTypes = {
		isPlaying: PropTypes.bool,
		item: PropTypes.object.isRequired,
		onPause: PropTypes.func,
	};

	static defaultProps = {
		isPlaying: false,
		onPause: noop,
	};

	constructor() {
		super();

		this.onScriptLoaded = this.onScriptLoaded.bind( this );
	}

	componentDidMount() {
		this.loadInitializeScript();
	}

	componentWillUnmount() {
		this.destroy();
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.isPlaying === nextProps.isPlaying ) {
			return;
		}

		if ( ! nextProps.isPlaying ) {
			this.pause();
		}
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.item.videopress_guid !== prevProps.item.videopress_guid ) {
			this.destroy();
			this.loadInitializeScript();
		}
	}

	shouldComponentUpdate( nextProps ) {
		if ( this.props.item.videopress_guid !== nextProps.item.videopress_guid ) {
			return true;
		}

		return false;
	}

	setVideoInstance = ref => this.video = ref;

	loadInitializeScript() {
		loadScript.loadScript( 'https://wordpress.com/wp-content/plugins/video/assets/js/next/videopress.js', this.onScriptLoaded );
	}

	onScriptLoaded( error ) {
		if ( error ) {
			log( `Script${ error.src } failed to load.` );
			return;
		}

		/* eslint-disable no-undef */
		this.player = videopress( this.props.item.videopress_guid, this.video, {
		/* eslint-enable no-undef */
			autoPlay: this.props.isPlaying,
			height: this.props.item.height,
			width: this.props.item.width,
		} );
	}

	destroy() {
		if ( ! this.player ) {
			return;
		}

		this.player.destroy();

		// Remove DOM created outside of React.
		while ( this.video.firstChild ) {
			this.video.removeChild( this.video.firstChild );
		}
	}

	pause() {
		const video = this.video.getElementsByTagName( 'video' );

		if ( video.length > 0 ) {
			video[ 0 ].pause();
			this.props.onPause( video[ 0 ].currentTime );
		}
	}

	render() {
		return (
			<div
				className="editor-media-modal-detail__preview is-video"
				ref={ this.setVideoInstance }>
			</div>
		);
	}
}

export default EditorMediaModalDetailPreviewVideoPress;
