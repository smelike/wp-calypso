/**
 * External dependencies
 */
import React from 'react';
import page from 'page';

/**
 * Internal dependencies
 */
import LostPasswordPage from 'account-recovery/lost-password';
import ForgotUsernamePage from 'account-recovery/forgot-username';
import ResetPasswordPage from 'account-recovery/reset-password';
import ResetPasswordForm from 'account-recovery/reset-password/reset-password-form';
import TransactionIdForm from 'account-recovery/reset-password/transaction-id-form';
import { getCurrentUser } from 'state/current-user/selectors';

const createTransitCallback = ( route ) => {
	return () => page( route );
};

export const lostPassword = ( routes ) => ( context, next ) => {
	context.primary = <LostPasswordPage
		basePath={ context.path }
		toRestPassword={ createTransitCallback( routes.RESET_PASSWORD ) }
		toForgotUsername={ createTransitCallback( routes.FORGOT_USERNAME ) }
	/>;
	next();
};

export function forgotUsername( context, next ) {
	context.primary = <ForgotUsernamePage basePath={ context.path } />;
	next();
}

export function resetPassword( context, next ) {
	context.primary = (
		<ResetPasswordPage basePath={ context.path }>
			<ResetPasswordForm />
		</ResetPasswordPage>
	);

	next();
}

export function resetPasswordByTransactionId( context, next ) {
	context.primary = (
		<ResetPasswordPage basePath={ context.path }>
			<TransactionIdForm />
		</ResetPasswordPage>
	);

	next();
}

export function redirectLoggedIn( context, next ) {
	const currentUser = getCurrentUser( context.store.getState() );

	if ( currentUser ) {
		page.redirect( '/' );
		return;
	}

	next();
}
