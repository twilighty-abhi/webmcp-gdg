# GDG WebMCP Workshop Kit

A complete 2-hour, hands-on workshop for turning ordinary Vite websites into agent-ready websites with [WebMCP](https://developer.chrome.com/docs/ai/webmcp). Seven teams start with a polished, human-first site; they expose three existing application capabilities as agent tools.

## Quick start

```bash
npm install
npm run dev
```

Open the printed localhost URL. Navigate to a track such as `/tracks/events/`, the instructor demo at `/demos/webmcp-demo/`, or a checkpoint. All data is deterministic local mock data; no accounts, API keys, backend, or external services are required.

## Chrome and Tool Inspector setup

WebMCP is experimental and changes quickly. Use a current Chrome build with the WebMCP origin trial when applicable; for localhost development, Chrome’s current documentation says to open `chrome://flags/#enable-webmcp-testing`, enable it, and relaunch. Local pages must be origin-isolated; Vite is configured with COOP/COEP headers for this.

Install the [Model Context Tool Inspector](https://chromewebstore.google.com/detail/model-context-tool-inspec/) extension, then follow this repeatable check:

1. Open `/demos/webmcp-demo/` directly in the configured Chrome profile.
2. Open the Inspector and confirm `searchEvents`, `getEventDetails`, and `registerForEvent` appear.
3. Select `searchEvents`, inspect its input schema, and invoke it with `{ "query": "cloud" }`.
4. Copy the returned `evt-cloud` ID and invoke `getEventDetails`.
5. Invoke `registerForEvent` with that ID, an attendee name, and an email; confirm the visible UI update and structured result.

If Chrome does not expose `document.modelContext`, the human site still works—only the demo/checkpoint tools will not register. See Chrome’s [WebMCP overview](https://developer.chrome.com/docs/ai/webmcp) and [Imperative API](https://developer.chrome.com/docs/ai/webmcp/imperative-api) for the authoritative, current setup.

## Repository map

```text
tracks/       Seven tool-free participant starter sites
demos/        Instructor’s working event-platform demo
checkpoints/  First tool → multiple tools → reference solution
shared/       Base styling, reusable app logic, isolated WebMCP wrapper
instructor/   Runbook, challenge, and judging rubric
```

Every starter uses the same readable shape: `config.js` contains local data, `main.js` creates the human UI, and shared application functions perform search/details/action. Starters deliberately do **not** import `shared/utils/webmcp.js`. The demo and checkpoints do; its `execute` functions call application functions rather than duplicate business logic.

## Tracks and intended tools

| Team | Track | Read | Detail | Change state |
|---|---|---|---|---|
| 1 | Events | `searchEvents` | `getEventDetails` | `registerForEvent` |
| 2 | E-commerce | `searchProducts` | `getProductDetails` | `addToCart` |
| 3 | Travel | `searchFlights` | `getFlightDetails` | `bookFlight` |
| 4 | Restaurants | `searchRestaurants` | `getRestaurantDetails` | `reserveTable` |
| 5 | Tasks | `listTasks` | `getTaskDetails` | `completeTask` |
| 6 | Courses | `searchCourses` | `getCourseDetails` | `enrollInCourse` |
| 7 | Movies | `searchMovies` | `getMovieDetails` | `addToWatchlist` |

The supplied final event example is the reference. Teams can copy its small, isolated registration module, rename tools and schemas for their domain, and use their track’s existing `app.search`, `app.details`, and `app.act` functions.

## Checkpoints and recovery

Serve from the repository root and open:

- `/checkpoints/01-first-tool/` — one structured, read-only search tool.
- `/checkpoints/02-multiple-tools/` — search, details, and a state-changing tool.
- `/checkpoints/03-final-example/` — same complete solution with errors and safety annotations.

If work goes sideways, return to the starter track, then checkpoint 1, checkpoint 2, or the final example. This lets instructors recover a team without debugging a damaged file.

## Troubleshooting

- **No tools appear:** ensure you are on the demo/checkpoint rather than a starter, enable the WebMCP testing flag, relaunch Chrome, and refresh.
- **`document.modelContext` is missing:** use a supported/current Chrome; check the flag/origin-trial status in the official docs. The API is experimental.
- **Inspector cannot see localhost:** open the local page directly in the same Chrome profile with the extension; avoid an embedded preview or a cross-origin iframe.
- **Schema or execution error:** inspect required fields and IDs in the Inspector. Search first, then use a returned ID such as `evt-cloud`.
- **Port is busy:** run `npm run dev -- --port 5174` and use that URL.
- **`npm install` fails:** confirm Node 20.19+ (or 22.12+) and rerun after clearing a partial `node_modules` directory.
- **Starter was changed accidentally:** use the equivalent fresh track, or continue from a checkpoint as described above.

Start with [instructor/workshop-runbook.md](instructor/workshop-runbook.md), then [demos/webmcp-demo/README.md](demos/webmcp-demo/README.md), [instructor/challenge.md](instructor/challenge.md), and [shared/utils/webmcp.js](shared/utils/webmcp.js).
