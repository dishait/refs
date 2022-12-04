import './cutom.css'
import DefaultTheme from 'vitepress/theme'
import Graph from './components/Graph.vue'

export default {
	...DefaultTheme,
	enhanceApp(ctx) {
		DefaultTheme.enhanceApp(ctx)
		ctx.app.component('Graph', Graph)
	}
}
