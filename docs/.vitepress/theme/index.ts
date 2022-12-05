import './cutom.css'
import DefaultTheme from 'vitepress/theme'
import Graph from './components/Graph.vue'

type EnhanceAppContext = Parameters<
	typeof DefaultTheme['enhanceApp']
>[0]

export default {
	...DefaultTheme,
	enhanceApp(ctx: EnhanceAppContext) {
		DefaultTheme.enhanceApp(ctx)
		ctx.app.component('Graph', Graph)
	}
}
