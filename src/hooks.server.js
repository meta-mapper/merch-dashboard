import { hookApi } from '$src/hook-api';

const hooks = {
	hookApi
};

export async function handle({ event, resolve }) {
	//
	for (const hook in hooks) {
		//
		const hookResponse = await hooks[hook]({ event });

		if (hookResponse) {
			//
			console.log('Hook Responded: ', hook);

			// If the hook response is a Response object, return it directly
			if (hookResponse instanceof Response) {
				//
				return hookResponse;
			}

			// If the hook response is not a Response object, create a new Response

			const headers = {};

			if (typeof hookResponse === 'object') {
				//
				headers['Content-Type'] = 'application/json';
			}

			return new Response(JSON.stringify(hookResponse), { headers });
		}
	}

	const response = await resolve(event);

	return response;
}
