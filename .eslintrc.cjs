module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:node/recommended'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'node/file-extension-in-import': ['error', 'always'],
		'node/no-unpublished-import': 0,
		'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
	},
};
