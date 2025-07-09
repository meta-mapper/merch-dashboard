import axios from 'axios';

export default async (options) => {
	//
	if (typeof options === 'string') {
		options = { url: options };
	}

	if (typeof localStorage !== 'undefined') {
		//
		options.headers = {
			...options.headers,
			'Content-Type': 'application/json',
			token: localStorage.getItem('session_token') || ''
		};
	}

	// console.log('Axios request options:', options);

	try {
		const response = await axios(options);

		return response.data;
		//
	} catch (error) {
		//
		if (error.response) {
			//
			return error.response.data;
		}

		return {};
	}
};
