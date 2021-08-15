import client from './client.js';

export const login = (email, password) => client.post('/admin/login', { email, password });

export const sendMail = (email) =>
	client.get('/admin/forgotPassword', {
		params: {
			email,
		},
	});

export const resetPassword = (payload) => client.post('/admin/forgotPassword', payload);
