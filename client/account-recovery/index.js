/**
 * Internal dependencies
 */
import {
	lostPassword,
	forgotUsername,
	resetPassword,
	resetPasswordEmailSent,
	resetPasswordByTransactionId,
	redirectLoggedIn
} from './controller';

const routes = {
	ACCOUNT_RECOVERY: '/account-recovery',
	FORGOT_USERNAME: '/account-recovery/forgot-username',
	RESET_PASSWORD: '/account-recovery/reset-password',
	RESET_PASSWORD_EMAIL_SENT: '/account-recovery/reset-password/email-sent',
	RESET_PASSWORD_TRANSACTION_ID: '/account-recovery/reset-password/transaction-id',
};

export default function( router ) {
	// Main route for account recovery is the lost password page
	router( routes.ACCOUNT_RECOVERY, redirectLoggedIn, lostPassword( routes ) );
	router( routes.FORGOT_USERNAME, redirectLoggedIn, forgotUsername );
	router( routes.RESET_PASSWORD, redirectLoggedIn, resetPassword );
	router( routes.RESET_PASSWORD_EMAIL_SENT, redirectLoggedIn, resetPasswordEmailSent );
	router( routes.RESET_PASSWORD_TRANSACTION_ID, redirectLoggedIn, resetPasswordByTransactionId );
}
