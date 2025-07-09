import login from '$lib/api/login';
import verifySession from '$lib/api/verify-session';
import getUsers from '$lib/js/get-users';
import createUser from '$lib/js/create-user';
import deleteUser from '$lib/js/delete-user';
import getOrderStats from '$lib/js/shopify-orders-stats';
import getOrders from '$lib/js/shopify-orders';
import getProducts from '$lib/js/shopify-products';
// import { getProducts, getOrders } from '$lib/js/shopify';

export const hookApi = async ({ event }) => {
	//
	const url = event.url;

	if (url.pathname.startsWith('/api')) {
		//
		const token = await event.request.headers.get('token');

		if (url.pathname === '/api/login') {
			//
			const { email, password } = await event.request.json();

			if (!email || !password) {
				return {
					status: 'failure',
					message: 'Email and password are required.'
				};
			}

			const loginResult = await login({ email, password });

			if (!loginResult) {
				//
				return {
					status: 'failure',
					message: 'Invalid email or password.'
				};
			}

			return {
				status: 'success',
				message: 'Login successful.',
				data: loginResult
			};
		}

		// No more request without session verification
		const session = await verifySession(token);

		if (!session) {
			//
			return {
				status: 'failure',
				message: 'Not logged in or session expired.'
			};
		}

		if (url.pathname === '/api/verify-session') {
			//
			return {
				status: 'success',
				message: 'Session verified successfully.',
				data: {
					id: session.id,
					type: session.type,
					name: session.name,
					email: session.email
				}
			};
		}

		if (url.pathname === '/api/users') {
			//
			const users = await getUsers(session);

			return {
				status: 'success',
				data: users
			};
		}

		if (url.pathname === '/api/create-user') {
			//
			const payload = await event.request.json();

			const result = await createUser({ session, payload });

			if (result) {
				return { status: 'success' };
			}

			return { status: 'failure' };
		}

		if (url.pathname === '/api/delete-user') {
			//
			const id = url.searchParams.get('id');

			await deleteUser({ session, id });

			return { status: 'success' };
		}

		if (url.pathname === '/api/order-stats') {
			//
			const startDate = url.searchParams.get('start_date');
			const endDate = url.searchParams.get('end_date');

			const stats = await getOrderStats({ session, startDate, endDate });

			return {
				status: 'success',
				data: stats
			};
		}

		if (url.pathname === '/api/orders') {
			//
			const after = url.searchParams.get('after');
			const startDate = url.searchParams.get('start_date');
			const endDate = url.searchParams.get('end_date');

			const orders = await getOrders({ session, after, startDate, endDate });

			return {
				status: 'success',
				data: orders
			};
		}

		if (url.pathname === '/api/products') {
			//
			const after = url.searchParams.get('after');

			const products = await getProducts({ session, after });

			return {
				status: 'success',
				data: products
			};
		}
	}
};
