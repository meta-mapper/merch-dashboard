import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			$src: 'src'
		},

		csrf: {
			checkOrigin: false
		},

		adapter: adapter()
	}
};

export default config;
