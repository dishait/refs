<script setup lang="ts">
import insertCss from 'insert-css'
import { onMounted, ref } from 'vue'

const container = ref<HTMLElement>()

onMounted(async () => {
	insertCss(`
  .g6-component-tooltip {
	padding: 0px 10px 24px 10px;
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`)

	const data = {
		nodes: [
			{
				id: '0',
				label: 'node-0',
				x: 100,
				y: 100,
				description: 'This is node-0.',
				subdescription: 'This is subdescription of node-0.'
			},
			{
				id: '1',
				label: 'node-1',
				x: 250,
				y: 100,
				description: 'This is node-1.',
				subdescription: 'This is subdescription of node-1.'
			},
			{
				id: '2',
				label: 'node-2',
				x: 150,
				y: 310,
				description: 'This is node-2.',
				subdescription: 'This is subdescription of node-2.'
			},
			{
				id: '3',
				label: 'node-3',
				x: 320,
				y: 310,
				description: 'This is node-3.',
				subdescription: 'This is subdescription of node-3.'
			}
		],
		edges: [
			{
				id: 'e0',
				source: '0',
				target: '1',
				description: 'This is edge from node 0 to node 1.'
			},
			{
				id: 'e1',
				source: '0',
				target: '2',
				description: 'This is edge from node 0 to node 2.'
			},
			{
				id: 'e2',
				source: '0',
				target: '3',
				description: 'This is edge from node 0 to node 3.'
			}
		]
	}
	const { Tooltip, Graph } = await import('@antv/g6')
	const tooltip = new Tooltip({
		offsetX: 10,
		offsetY: 10,
		itemTypes: ['node', 'edge'],
		getContent: e => {
			const outDiv = document.createElement('div')
			outDiv.style.width = 'fit-content'
			outDiv.innerHTML = `
      <h4>Custom Content</h4>
      <ul>
        <li>Type: ${e!.item!.getType()}</li>
      </ul>
      <ul>
        <li>Label: ${
					e!.item!.getModel().label ||
					e!.item!.getModel().id
				}</li>
      </ul>`
			return outDiv
		}
	})

	const width = container!.value!.scrollWidth
	const height = container!.value!.scrollHeight || 500

	const graph = new Graph({
		container: container.value as HTMLElement,
		width,
		height,
		linkCenter: true,
		plugins: [tooltip],
		modes: {
			default: ['drag-node']
		},
		defaultNode: {
			size: [80, 40],
			type: 'rect'
		},
		defaultEdge: {
			style: {
				stroke: '#b5b5b5',
				lineAppendWidth: 3
			}
		}
	})
	graph.data(data)
	graph.render()

	graph.on('node:mouseenter', e => {
		graph.setItemState(e.item as any, 'active', true)
	})
	graph.on('node:mouseleave', e => {
		graph.setItemState(e!.item as any, 'active', false)
	})
	graph.on('edge:mouseenter', e => {
		graph.setItemState(e!.item as any, 'active', true)
	})
	graph.on('edge:mouseleave', e => {
		graph.setItemState(e!.item as any, 'active', false)
	})

	if (typeof window !== 'undefined') {
		window.onresize = () => {
			if (!graph || graph.get('destroyed')) return
			if (
				!container.value ||
				!container.value.scrollWidth ||
				!container.value.scrollHeight
			)
				return
			graph.changeSize(
				container.value.scrollWidth,
				container.value.scrollHeight
			)
		}
	}
})
</script>

<template>
	<div ref="container"></div>
</template>
