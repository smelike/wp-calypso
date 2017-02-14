/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { identity, noop } from 'lodash';

/**
 * Internal dependencies
 */
import support from 'lib/url/support';
import Card from 'components/card';
import Button from 'components/button';
import FormLabel from 'components/forms/form-label';
import FormInput from 'components/forms/form-text-input';
import { fetchResetOptionsByLogin } from 'state/account-recovery/reset/actions';
import {
	isAccountRecoveryResetOptionsReady,
	isRequestingAccountRecoveryResetOptions,
} from 'state/selectors';

export class LostPasswordFormComponent extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			userLogin: '',
		};
	}

	submitForm = () => {
		this.props.fetchResetOptionsByLogin( this.state.userLogin );
	};

	onUserLoginChanged = ( event ) => {
		this.setState( { userLogin: event.target.value } );
	};

	componentWillReceiveProps = ( nextProps ) => {
		if ( nextProps.isResetOptionsReady ) {
			this.props.toResetPassword();
		}
	}

	render() {
		const {
			isRequesting,
			translate,
		} = this.props;

		const { userLogin } = this.state;

		const isPrimaryButtonDisabled = ! userLogin || isRequesting;

		return (
			<div>
				<h2 className="lost-password-form__title">
					{ translate( 'Lost your password' ) }
				</h2>
				<p>{ translate( 'Follow these simple steps to reset your account:' ) }</p>
				<ol className="lost-password-form__instruction-list">
					<li>
						{ translate(
							'Enter your {{strong}}WordPress.com{{/strong}} username or email address',
							{ components: { strong: <strong /> } }
						) }
					</li>
					<li>
						{ translate( 'Choose a password reset method' ) }
					</li>
					<li>
						{ translate(
							'Follow instructions and be re-united with your {{strong}}WordPress.com{{/strong}} account',
							{ components: { strong: <strong /> } }
						) }
					</li>
				</ol>
				<p>
					{ translate(
						'Want more help? We have a full {{link}}guide to resetting your password{{/link}}.',
						{ components: { link: <a href={ support.ACCOUNT_RECOVERY } /> } }
					) }
				</p>
				<Card>
					<FormLabel>
						{ translate( 'Username or Email' ) }

						<FormInput
							className="lost-password-form__user-login-input"
							onChange={ this.onUserLoginChanged }
							value={ userLogin }
							disabled={ isRequesting } />
					</FormLabel>
					<a className="lost-password-form__forgot-username-link" onClick={ this.props.toForgotUsername } >
						{ translate( 'Forgot your username?' ) }
					</a>
					<Button
						className="lost-password-form__submit-button"
						onClick={ this.submitForm }
						disabled={ isPrimaryButtonDisabled }
						primary
					>
						{ translate( 'Get New Password' ) }
					</Button>
				</Card>
			</div>
		);
	}
}

LostPasswordFormComponent.defaultProps = {
	translate: identity,
	toResetPassword: identity,
	toForgotUsername: identity,
	isResetOptionsReady: false,
	isRequesting: false,
	fetchResetOptionsByLogin: noop,
};

export default connect(
	( state ) => ( {
		isResetOptionsReady: isAccountRecoveryResetOptionsReady( state ),
		isRequesting: isRequestingAccountRecoveryResetOptions( state ),
	} ),
	{ fetchResetOptionsByLogin }
)( localize( LostPasswordFormComponent ) );
