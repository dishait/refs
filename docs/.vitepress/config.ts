import { copyFile } from 'fs/promises'
import { defineConfig } from 'vitepress'

export default defineConfig({
	lang: 'zh-CN',
	title: 'Refs',
	description:
		'可视化的 awesome，直观快速地查找开发生态中的内容',
	head: [['link', { rel: 'icon', href: '/favicon.png' }]],
	themeConfig: {
		logo: 'logo.svg',
		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2022 markthree'
		},
		nav: [
			{
				text: 'Tools',
				link: '/tools/'
			},
			{
				text: 'Go',
				link: '/go/'
			},
			{
				text: 'Python',
				link: '/python/'
			},
			{
				text: 'JavaScript',
				link: '/javaScript/'
			}
		],
		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/dishait/refs'
			}
		]
	},
	vite: {
		plugins: [
			{
				name: 'moveStatic',
				enforce: 'post',
				apply: 'build',
				buildEnd() {
					setImmediate(() => {
						copyFile(
							'deploy/static.ts',
							'docs/.vitepress/dist/static.ts'
						)
					})
				}
			}
		]
	}
})
