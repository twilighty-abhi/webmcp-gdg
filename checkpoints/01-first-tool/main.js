import '../../shared/styles/base.css';
import config from '../../tracks/events/config.js';
import { createApp } from '../../shared/utils/app.js';
const app = createApp({ ...config, brand: 'Gatherly · Checkpoint 1', sourcePaths: ['checkpoints/01-first-tool', 'tracks/events'] });
// First tool: the wrapper delegates to the same search function used by the UI.
if (document.modelContext) await document.modelContext.registerTool({
  name: 'searchEvents', title: 'Search events', description: 'Search local events by optional words and category. Returns event records and IDs for a later step.',
  inputSchema: { type: 'object', properties: { query: { type: 'string', description: 'Words in an event title or description' }, category: { type: 'string', description: 'Exact event category' } } },
  annotations: { readOnlyHint: true, consequentialHint: false, untrustedContentHint: false },
  execute: async input => { const items = app.search(input); return { ok: true, items, count: items.length }; }
});
