# 2-hour facilitation runbook

## Before participants arrive

Run `npm install && npm run dev`. In a WebMCP-enabled Chrome profile, open `/demos/webmcp-demo/` and confirm the Tool Inspector lists three tools. Assign seven tables: Events, E-commerce, Travel, Restaurants, Tasks, Courses, and Movies. Ask each table to nominate a driver, inspector operator, schema reviewer, and presenter; roles can rotate.

## 2:00–2:10 — Interactive opening

**Objective:** make the agent/UI gap tangible. **Demonstrate:** the Event starter’s normal search and registration flow. **Participants:** pair-discuss Activity 1: “How would an AI agent register for an event on a normal website?” **Talking points:** DOM scraping, clicking, labels and multistep forms are ambiguous and fragile. **Interaction:** collect three failure modes. **Outcome:** participants can explain why UI automation is not a durable interface. **Common problems:** people jump to “an API”; remind them WebMCP exposes the existing website capability while keeping the human experience visible.

## 2:10–2:20 — Websites vs. agents

**Objective:** introduce structured capability instead of screen choreography. **Demonstrate:** draw `UI → app function → WebMCP wrapper`; point to `shared/utils/app.js`. **Participants:** trace the human register button to `app.act`. **Talking points:** tools are discoverable, typed, and return structured results; they are a progressive enhancement. **Interaction:** ask what an agent needs besides a button label. **Outcome:** teams recognize names, schemas, and return values as the contract. **Common problems:** do not promise every browser supports the experimental proposal.

## 2:20–2:32 — WebMCP concepts

**Objective:** establish the minimum API. **Demonstrate:** `document.modelContext.registerTool({ name, description, inputSchema, execute, annotations })` in the final example. **Participants:** identify which fields make `searchEvents` safe to call. **Talking points:** JSON Schema reduces guessing; `readOnlyHint`, `consequentialHint`, and `untrustedContentHint` are hints, not authorization. **Interaction (Activity 2):** compare `clickRegisterButton()` with `registerForEvent(eventId, attendee)` and ask why the latter wins. **Outcome:** each team drafts three tool names. **Common problems:** descriptions must state capability and when to use it—not implementation detail.

## 2:32–2:45 — Live demo

**Objective:** show discovery through a complete workflow. **Demonstrate:** open Tool Inspector on `/demos/webmcp-demo/`; inspect `searchEvents`, invoke `{ "query": "cloud" }`, call `getEventDetails` with `evt-cloud`, then `registerForEvent`. Show the visible UI confirmation and seats update. **Participants:** predict tool input and result before each call. **Talking points:** WebMCP wrapper delegates to reusable app logic; invalid IDs return structured errors. **Interaction:** ask whether registration should run automatically. **Outcome:** a shared mental model of search → detail → action. **Common problems:** if tools are absent, use the preflight checklist/flag and continue explaining source while one helper fixes Chrome.

## 2:45–3:00 — Guided build #1

**Objective:** register a first read-only tool. **Demonstrate:** compare starter with `checkpoints/01-first-tool`; copy the pattern but change domain vocabulary. **Participants:** add one `search…` or `listTasks` tool to their track, pointing to its existing app function. **Talking points:** no business logic in `execute`; use an object schema; return `{ ok, items, count }`. **Interaction:** each table reads its description aloud as if it were an agent. **Outcome:** one Inspector-visible tool per team. **Common problems:** forgotten `await`, wrong relative import, missing origin isolation, or a tool registered in the starter unintentionally.

## 3:00–3:10 — Tool design activity

**Objective:** improve contracts before adding code. **Demonstrate:** a vague schema versus an ID with description and required list. **Participants:** write tool names, required input, optional filters, output, and error for their remaining two capabilities. **Talking points:** search returns IDs; details verifies information; action changes state. **Interaction (Activity 3):** vote: `searchProducts`, `getAccountBalance`, `deleteAccount`, `transferMoney`, `registerForEvent`—which should require confirmation and why? **Outcome:** a reviewed mini tool spec. **Common problems:** avoid a single catch-all `doThing` tool.

## 3:10–3:25 — Guided build #2

**Objective:** compose three tools safely. **Demonstrate:** `checkpoints/02-multiple-tools` and `03-final-example`; call the same app functions used by UI. **Participants:** add detail and state-changing tools, validate error behavior, and set annotations. **Talking points:** consequential actions demand user intent; tool output may need untrusted-content labeling when sourced from users or outside systems. **Interaction:** partners manually invoke a deliberately bad ID. **Outcome:** a three-tool workflow with UI-visible state change. **Common problems:** state action fails to refresh UI—call the app action rather than editing data inside the wrapper.

## 3:25–3:50 — Group challenge

**Objective:** refine and rehearse. **Demonstrate:** nothing for the first 15 minutes; circulate with questions. **Participants:** complete [challenge.md](challenge.md), test all tools, and prepare a 3-minute demo. **Talking points:** usefulness over extra features. **Interaction:** each team gives another team its schema to inspect for ambiguity. **Outcome:** tested agent-ready sites. **Common problems:** rescue broken code by directing teams to checkpoint 1/2/final rather than debugging every change.

## 3:50–4:00 — Presentations and judging

**Objective:** share decisions and reinforce security. **Demonstrate:** time-box presentations. **Participants:** show Inspector discovery and one workflow; say which tool requires confirmation. **Talking points:** capability names are product design. **Interaction:** audience asks one “what could go wrong?” question per team. **Outcome:** scored submissions using [judging-rubric.md](judging-rubric.md). **Common problems:** if time is short, use a gallery walk and have each team record its Inspector results.

## Fast recovery card

1. Need a clean UI? reopen the assigned `tracks/<name>/` starter.
2. Need one working tool? open `/checkpoints/01-first-tool/`.
3. Need a three-tool pattern? open `/checkpoints/02-multiple-tools/`.
4. Need a complete reference? open `/checkpoints/03-final-example/`.

Never spend more than five minutes on a single environment issue during a build block; pair the affected participant with a working team and return after the next activity.
