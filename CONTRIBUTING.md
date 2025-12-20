# Contributing to [PROJECT_NAME]

Thank you for contributing! This project uses AI-assisted development with specific guidelines to maintain quality and consistency.

---

## Before You Start

### If Using AI-Assisted Development (Windsurf, Cursor, etc.)

This project has **AI behavior rules** that are automatically loaded:

```
.windsurf/rules/project-rules.md
```

These rules ensure AI assistants:
- Follow established code patterns
- Maintain security best practices
- Write testable code
- Keep documentation current

**The rules are loaded automatically** - you don't need to do anything special. Just be aware they exist and keep them updated if you make architectural changes.

### Key Documents to Review

| Document | Purpose |
|----------|---------|
| `AI_README.md` | Project context, architecture, and patterns for AI |
| `TESTING.md` | How tests should be written |
| `SECURITY.md` | Security requirements and best practices |
| `.windsurf/rules/project-rules.md` | AI behavior rules |

---

## Development Workflow

### 1. Understand the project
- Read `AI_README.md` for architecture and patterns
- Check existing code for conventions

### 2. Make your changes
- Follow established patterns
- Write tests for new functionality
- Don't break existing tests

### 3. Update documentation if needed
- If you change architecture, update `AI_README.md`
- If you add new patterns, document them
- If you change AI rules, update `.windsurf/rules/project-rules.md`

### 4. Submit your PR
- Describe what you changed and why
- Note any documentation updates
- Flag any security-relevant changes

---

## Maintaining AI Rules

The `.windsurf/rules/project-rules.md` file should evolve with the project:

**Add rules when:**
- You establish a new code pattern that should be followed
- You identify a common mistake AI makes
- You add project-specific requirements

**Update rules when:**
- Architecture changes significantly
- Testing or security requirements change
- You find rules that aren't working well

**Don't remove rules without discussion** - they may exist for reasons not immediately obvious.

---

## Code Style

[Add project-specific style guidelines here]

---

## Questions?

- Check existing issues and discussions
- Open an issue if you're unsure about something
- When in doubt, ask before making major changes
