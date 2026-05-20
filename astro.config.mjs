// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Project IV',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			// astro.config.mjs 中的 sidebar 配置
			sidebar: [
				// ===================
				// Guides
				// ===================
				{
					label: 'Guides',
					items: [
						{ label: '项目总览', link: '/' },
						{ label: '命名编年史', link: '/00-naming/naming-chronicle' },
						{ label: '领域愿景与哲学基石', link: '/01-strategic-design/domain-vision' },

						// 核心域
						{
							label: '核心域',
							collapsed: true,
							items: [
								{ label: 'Yuan 元', link: '/01-strategic-design/core-domain/yuan-core' },
								{ label: '第二大脑', link: '/01-strategic-design/core-domain/second-brain/para-model' },
								{ label: '化身网格', link: '/01-strategic-design/core-domain/avatar-grid' },
								{ label: '主权网络', link: '/01-strategic-design/core-domain/sovereign-network' },
							],
						},

						// 支撑域
						{
							label: '支撑域',
							collapsed: true,
							items: [
								{ label: 'Vox 共识体', link: '/01-strategic-design/supporting-domain/vox-consensus' },
								{ label: 'Harness 层', link: '/01-strategic-design/supporting-domain/harness-layer' },
								{ label: '感知系统', link: '/01-strategic-design/supporting-domain/perception-system' },
							],
						},

						// 通用域
						{
							label: '通用域',
							collapsed: true,
							items: [
								{ label: '道器生态', link: '/01-strategic-design/generic-domain/dao-kit' },
								{ label: '外交协议', link: '/01-strategic-design/generic-domain/diplomacy' },
							],
						},

						{ label: '上下文映射', link: '/01-strategic-design/context-map' },
						{ label: '分步叙事战略', link: '/01-strategic-design/narrative-strategy' },
						{ label: '合规与生存框架', link: '/01-strategic-design/compliance-and-survival' },

						// 战术设计
						{
							label: '战术设计',
							collapsed: true,
							items: [
								{ label: 'Yuan 聚合', link: '/02-tactical-design/aggregates/yuan-aggregate' },
								{ label: '记忆聚合', link: '/02-tactical-design/aggregates/memory-aggregate' },
								{ label: '化身聚合', link: '/02-tactical-design/aggregates/avatar-aggregate' },
								{ label: '端口与适配器', link: '/02-tactical-design/ports-adapters' },
								{ label: '领域事件目录', link: '/02-tactical-design/domain-events' },
							],
						},

						// 具象化实践
						{
							label: '具象化实践',
							collapsed: true,
							items: [
								{ label: 'ADHD 优先设计', link: '/04-embodied/adhd-first-design' },
								{ label: '开发者烛火仪式', link: '/04-embodied/developer-candle-ritual' },
							],
						},
					],
				},

				// ===================
				// Reference
				// ===================
				{
					label: 'Reference',
					items: [
						{ label: '术语表', link: '/00-naming/glossary' },
						{ label: '化身网格分类规范', link: '/01-strategic-design/core-domain/avatar-grid' },
						{ label: 'PARA 数据模型规范', link: '/01-strategic-design/core-domain/second-brain/para-model' },
						{ label: 'Harness 约束清单', link: '/01-strategic-design/supporting-domain/harness-layer' },
						{ label: 'Yuan 聚合规范', link: '/02-tactical-design/aggregates/yuan-aggregate' },
						{ label: '记忆聚合规范', link: '/02-tactical-design/aggregates/memory-aggregate' },
						{ label: '化身聚合规范', link: '/02-tactical-design/aggregates/avatar-aggregate' },
						{ label: '端口与适配器', link: '/02-tactical-design/ports-adapters' },
						{ label: '领域事件目录', link: '/02-tactical-design/domain-events' },
						{ label: '外交协议规范', link: '/01-strategic-design/generic-domain/diplomacy' },
						{ label: 'ADHD 设计铁律', link: '/04-embodied/adhd-first-design' },
					],
				},

				// ===================
				// ADR
				// ===================
				{
					label: 'ADR',
					items: [
						{ label: '001 · 选择 Rust + Wasm', link: '/03-adr/001-choose-rust-wasm' },
						{ label: '002 · 双 CID 进化模型', link: '/03-adr/002-dual-cid-evolution' },
						{ label: '003 · Spark 优先于 Yore', link: '/03-adr/003-emberspark-over-yore' },
						{ label: '004 · 从 DaoOS 到 Project IV 的命名决策', link: '/03-adr/004-project-iv-naming' },
						{ label: '005 · Hermes Agent 竞争分析', link: '/03-adr/005-hermes-agent-response' },
					],
				},
			]
		}),
	],
});
