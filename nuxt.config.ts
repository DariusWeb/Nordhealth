export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	ssr: false,
	css: [
		'@provetcloud/css', 
		'~/assets/css/main.scss'
	],
	typescript: {
		typeCheck: true
	},
	vue: {
		compilerOptions: {
			isCustomElement: tag => tag.startsWith('provet-')
		}
	},
	app: {
		baseURL: '/Nordhealth/',
		buildAssetsDir: 'assets',
		head: {
			htmlAttrs: {
				class: 'n-reset',
			},
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
			]
		},
	},
	nitro: {
		preset: 'github_pages'
	}
})
