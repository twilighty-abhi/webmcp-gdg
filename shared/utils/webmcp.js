// This is the only WebMCP-specific layer. The app functions below are also used by the human UI.
export async function registerTools(config, app, level = 'all') {
  if (!document.modelContext) {
    console.info('WebMCP is unavailable. Enable Chrome local testing to inspect these tools.');
    return;
  }
  const word = config.singular.toLowerCase();
  const formSchema = Object.fromEntries((config.formFields || []).map(field => [field.name, { type: 'string', description: field.label }]));
  const searchTool = {
    name: config.searchToolName || `search${config.plural}`,
    title: `Search ${config.plural}`,
    description: `Search the ${word} catalog by optional words and category. Returns concise ${word} records for planning the next step.`,
    inputSchema: { type:'object', properties:{ query:{type:'string',description:`Words to match in ${word} names and descriptions`}, category:{type:'string',description:`Exact ${word} category to filter by`} } },
    annotations:{readOnlyHint:true,untrustedContentHint:false,consequentialHint:false},
    execute: async input => { const items = app.search(input); return { ok:true, items, count:items.length }; }
  };
  await document.modelContext.registerTool(searchTool);
  if (level === 'first') return;
  await document.modelContext.registerTool({
    name:`get${config.singular}Details`, title:`Get ${config.singular} details`, description:`Get the complete local record for one ${word} by its id. Use after searching to verify details before taking action.`,
    inputSchema:{type:'object',properties:{id:{type:'string',description:`${config.singular} id returned by search`}},required:['id']},
    annotations:{readOnlyHint:true,untrustedContentHint:false,consequentialHint:false}, execute:async input=>app.details(input)
  });
  // This changes local state. consequentialHint teaches agents to request confirmation before acting.
  await document.modelContext.registerTool({
    name: ({registration:'registerForEvent',booking:'bookFlight','cart-add':'addToCart',reservation:'reserveTable',completion:'completeTask',enrollment:'enrollInCourse',watchlist:'addToWatchlist'})[config.action],
    title: config.actionTitle, description:`Perform a ${config.action} for a chosen ${word}. Confirm the user's intent and supplied details before calling because it changes application state.`,
    inputSchema:{type:'object',properties:{id:{type:'string',description:`${config.singular} id to act on`},...formSchema,...(config.actionSchema || {})},required:['id', ...(config.actionRequired || (config.formFields || []).map(field => field.name))]},
    annotations:{readOnlyHint:false,untrustedContentHint:false,consequentialHint:true}, execute:async input=>app.act(input)
  });
}
