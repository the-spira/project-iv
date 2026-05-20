// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Project IV',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				'zh-hans': { label: '中文', lang: 'zh-Hans' },
				ja: { label: '日本語', lang: 'ja' },
				ru: { label: 'Русский', lang: 'ru' },
				es: { label: 'Español', lang: 'es' },
				fr: { label: 'Français', lang: 'fr' },
				ar: { label: 'العربية', lang: 'ar', dir: 'rtl' },
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						{ label: 'Project Overview', link: '/' },
						{ label: 'Naming Chronicle', link: '/00-naming/naming-chronicle' },
						{ label: 'Domain Vision & Philosophy', link: '/01-strategic-design/domain-vision' },

						{
							label: 'Core Domain',
							collapsed: true,
							items: [
								{ label: 'Yuan', link: '/01-strategic-design/core-domain/yuan-core' },
								{ label: 'Second Brain', link: '/01-strategic-design/core-domain/second-brain/para-model' },
								{ label: 'Avatar Grid', link: '/01-strategic-design/core-domain/avatar-grid' },
								{ label: 'Sovereign Network', link: '/01-strategic-design/core-domain/sovereign-network' },
							],
						},

						{
							label: 'Supporting Domain',
							collapsed: true,
							items: [
								{ label: 'Vox Consensus', link: '/01-strategic-design/supporting-domain/vox-consensus' },
								{ label: 'Harness Layer', link: '/01-strategic-design/supporting-domain/harness-layer' },
								{ label: 'Perception System', link: '/01-strategic-design/supporting-domain/perception-system' },
							],
						},

						{
							label: 'Generic Domain',
							collapsed: true,
							items: [
								{ label: 'Dao Kit', link: '/01-strategic-design/generic-domain/dao-kit' },
								{ label: 'Diplomacy Protocol', link: '/01-strategic-design/generic-domain/diplomacy' },
							],
						},

						{ label: 'Context Mapping', link: '/01-strategic-design/context-map' },
						{ label: 'Narrative Strategy', link: '/01-strategic-design/narrative-strategy' },
						{ label: 'Compliance & Survival', link: '/01-strategic-design/compliance-and-survival' },

						{
							label: 'Tactical Design',
							collapsed: true,
							items: [
								{ label: 'Yuan Aggregates', link: '/02-tactical-design/aggregates/yuan-aggregate' },
								{ label: 'Memory Aggregates', link: '/02-tactical-design/aggregates/memory-aggregate' },
								{ label: 'Avatar Aggregates', link: '/02-tactical-design/aggregates/avatar-aggregate' },
								{ label: 'Ports & Adapters', link: '/02-tactical-design/ports-adapters' },
								{ label: 'Domain Events', link: '/02-tactical-design/domain-events' },
							],
						},

						{
							label: 'Embodied Practice',
							collapsed: true,
							items: [
								{ label: 'ADHD-First Design', link: '/04-embodied/adhd-first-design' },
								{ label: 'Developer Candle Ritual', link: '/04-embodied/developer-candle-ritual' },
							],
						},
					],
				},

				{
					label: 'Reference',
					items: [
						{ label: 'Glossary', link: '/00-naming/glossary' },
						{ label: 'Avatar Grid Spec', link: '/01-strategic-design/core-domain/avatar-grid' },
						{ label: 'PARA Model Spec', link: '/01-strategic-design/core-domain/second-brain/para-model' },
						{ label: 'Harness Constraints', link: '/01-strategic-design/supporting-domain/harness-layer' },
						{ label: 'Yuan Aggregate Spec', link: '/02-tactical-design/aggregates/yuan-aggregate' },
						{ label: 'Memory Aggregate Spec', link: '/02-tactical-design/aggregates/memory-aggregate' },
						{ label: 'Avatar Aggregate Spec', link: '/02-tactical-design/aggregates/avatar-aggregate' },
						{ label: 'Ports & Adapters Spec', link: '/02-tactical-design/ports-adapters' },
						{ label: 'Domain Events Catalog', link: '/02-tactical-design/domain-events' },
						{ label: 'Diplomacy Protocol Spec', link: '/01-strategic-design/generic-domain/diplomacy' },
						{ label: 'ADHD Design Laws', link: '/04-embodied/adhd-first-design' },
					],
				},

				{
					label: 'ADR',
					items: [
						{ label: '001 · Rust + Wasm', link: '/03-adr/001-choose-rust-wasm' },
						{ label: '002 · Dual CID Evolution', link: '/03-adr/002-dual-cid-evolution' },
						{ label: '003 · Spark over Yore', link: '/03-adr/003-emberspark-over-yore' },
						{ label: '004 · Project IV Naming', link: '/03-adr/004-project-iv-naming' },
						{ label: '005 · Hermes Agent Analysis', link: '/03-adr/005-hermes-agent-response' },
					],
				},
			]
		}),
	],
});
