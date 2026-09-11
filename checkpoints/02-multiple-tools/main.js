import '../../shared/styles/base.css';
import config from '../../tracks/events/config.js';
import { createApp } from '../../shared/utils/app.js';
const app = createApp({ ...config, brand: 'Gatherly · Checkpoint 2' });
if (document.modelContext) {
  await document.modelContext.registerTool({ name: 'searchEvents', title: 'Search events', description: 'Search local events by optional words and category.', inputSchema: { type: 'object', properties: { query: { type: 'string' }, category: { type: 'string' } } }, annotations: { readOnlyHint: true }, execute: async input => { const items = app.search(input); return { ok: true, items, count: items.length }; } });
  await document.modelContext.registerTool({ name: 'getEventDetails', title: 'Get event details', description: 'Get complete details for an event ID returned by search.', inputSchema: { type: 'object', properties: { id: { type: 'string', description: 'Event ID' } }, required: ['id'] }, annotations: { readOnlyHint: true }, execute: async input => app.details(input) });
  await document.modelContext.registerTool({ name: 'registerForEvent', title: 'Register for event', description: 'Register an attendee for a selected event after confirming intent.', inputSchema: { type: 'object', properties: { id: { type: 'string' }, attendeeName: { type: 'string' }, email: { type: 'string' } }, required: ['id', 'attendeeName', 'email'] }, annotations: { consequentialHint: true }, execute: async input => app.act(input) });
}
