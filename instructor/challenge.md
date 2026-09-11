# WebMCP Challenge

Your mission: **turn your assigned website into an agent-ready website.**

Each team must implement at least three WebMCP tools: one read/search operation, one detail/query operation, and one state-changing operation. Test every tool with the Model Context Tool Inspector and create one meaningful multi-step workflow: **search → inspect → perform action**.

Use names that describe a user capability, such as `registerForEvent(eventId, attendee)`, instead of UI mechanics such as `clickRegisterButton()`. Give every tool a clear description, JSON Schema input, useful structured return value, and graceful invalid-input error.

Discuss security before you demo. Mark read-only tools safe to execute automatically; mark consequential actions as requiring confirmation; identify whether a result could contain untrusted content. Your 3-minute presentation should show the inspector and one complete workflow.
