<template>
	<CardCodeExample title="Column draggable">
		<template #description>Only support leaf nodes.</template>

		<n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false" />
		<template #code="{ html, js }">
			{{ html(`
			<n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false" />
			`) }}

			{{
				js(`
				import { h, defineComponent } from "vue"
				import { NButton, useMessage, NDataTable } from "naive-ui"
				import type { DataTableColumns } from "naive-ui"
				
				type Song = {
					no: number
					title: string
					length: string
				}
				
				const createColumns = ({ play }: { play: (row: Song) => void }): DataTableColumns\<\Song\>\ => {
					return [
						{
							title: "No",
							key: "no",
							width: 50
						},
						{
							title: "Title",
							key: "title",
							resizable: true
						},
						{
							title: "Length",
							key: "length",
							resizable: true,
							minWidth: 50,
							maxWidth: 100
						},
						{
							title: "Action",
							key: "actions",
							render(row) {
								return h(
									NButton,
									{
										strong: true,
										tertiary: true,
										size: "small",
										onClick: () => play(row)
									},
									{ default: () => "Play" }
								)
							}
						}
					]
				}
				
				const data: Song[] = [
					{ no: 3, title: "Wonderwall", length: "4:18" },
					{ no: 4, title: "Don't Look Back in Anger", length: "4:48" },
					{ no: 12, title: "Champagne Supernova", length: "7:27" }
				]
				
				export default defineComponent({
					setup() {
						const message = useMessage()
						return {
							data,
							columns: createColumns({
								play(row: Song) {
									message.info(\`Play \$\{row.title\}\`)
								}
							}),
							pagination: false as const
						}
					},
					components: { NDataTable }
				})
				`)
			}}
		</template>
	</CardCodeExample>
</template>

<script lang="ts">
import { h, defineComponent } from "vue"
import { NButton, useMessage, NDataTable, type DataTableColumns } from "naive-ui"

type Song = {
	no: number
	title: string
	length: string
}

const createColumns = ({ play }: { play: (row: Song) => void }): DataTableColumns<Song> => {
	return [
		{
			title: "No",
			key: "no",
			width: 50
		},
		{
			title: "Title",
			key: "title",
			resizable: true
		},
		{
			title: "Length",
			key: "length",
			resizable: true,
			minWidth: 50,
			maxWidth: 100
		},
		{
			title: "Action",
			key: "actions",
			render(row) {
				return h(
					NButton,
					{
						strong: true,
						tertiary: true,
						size: "small",
						onClick: () => play(row)
					},
					{ default: () => "Play" }
				)
			}
		}
	]
}

const data: Song[] = [
	{ no: 3, title: "Wonderwall", length: "4:18" },
	{ no: 4, title: "Don't Look Back in Anger", length: "4:48" },
	{ no: 12, title: "Champagne Supernova", length: "7:27" }
]

export default defineComponent({
	setup() {
		const message = useMessage()
		return {
			data,
			columns: createColumns({
				play(row: Song) {
					message.info(`Play ${row.title}`)
				}
			}),
			pagination: false as const
		}
	},
	components: { NDataTable }
})
</script>
