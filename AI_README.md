# AI Development Guide - Wiscard

> **Purpose**: A modern, secure, and scalable digital business card application.  
> **Repository**: [GitHub URL]  
> **Status**: Planning

---

## Project Overview

Wiscard is a digital business card platform that allows professionals to create, share, and manage their digital business cards. It provides a modern alternative to traditional paper business cards with features like contact management, social media integration, and analytics. The platform is designed for professionals who want to make a lasting impression and easily share their contact information in a digital format.

### Key Features
- **Digital Business Cards**: Create and customize digital business cards with various templates
- **Contact Management**: Easily share and update contact information
- **Analytics**: Track views and interactions with your digital card

---

## Tech Stack

> **Note to AI**: The tech stack below should be filled in during project planning. If empty, help the user choose appropriate technologies based on their requirements.

### Language & Runtime
| Component | Choice | Rationale |
|-----------|--------|-----------|
| **Language** | TypeScript | Type safety and modern development experience |
| **Runtime** | Node.js (LTS) | Latest LTS version for stability |

### Frameworks & Libraries
| Component | Choice | Purpose |
|-----------|--------|---------|
| **Web Framework** | [TBD] | |
| **Testing** | [TBD] | |
| **Database** | [TBD] | |

### Infrastructure
| Component | Details |
|-----------|---------|
| **Deployment** | [TBD] |
| **CI/CD** | [TBD] |
| **Monitoring** | [TBD] |

---

## Directory Structure

> **Note to AI**: Update this section as the project structure evolves. Keep it current.

```
[project-name]/
├── src/                    # Source code
├── tests/                  # Test files
│   ├── unit/               # Unit tests
│   └── integration/        # Integration tests
├── docs/                   # Documentation
├── .windsurf/              # Windsurf configuration
│   └── rules/              # Project-specific AI rules
├── AI_README.md            # This file
├── CONTRIBUTING.md         # Contribution guidelines
├── TESTING.md              # Testing methodology
├── SECURITY.md             # Security guidelines
├── CHANGELOG.md            # Version history
└── README.md               # User-facing documentation
```

---

## Architecture

### Data Flow
```
[Create a simple ASCII diagram showing how data flows through your system]

Example:
┌─────────┐     ┌─────────┐     ┌─────────┐
│  User   │────▶│   API   │────▶│   DB    │
│Interface│◀────│  Server │◀────│         │
└─────────┘     └─────────┘     └─────────┘
```

### Key Components

1. **[Component Name]** (`path/to/file`)
   - What it does
   - Key responsibilities
   - Important notes

2. **[Component Name]** (`path/to/file`)
   - What it does
   - Key responsibilities

---

## Development Workflow

### Getting Started

```bash
# Clone repository
git clone [repository-url]
cd [project-name]

# Install dependencies
[package manager install command]

# Run development server
[dev server command]
```

### Common Tasks

| Task | Command |
|------|---------|
| Run tests | `[test command]` |
| Build | `[build command]` |
| Lint | `[lint command]` |
| Format | `[format command]` |

---

## Code Patterns & Conventions

> **Note to AI**: Follow these patterns when generating code. Add new patterns as they emerge.

### Naming Conventions
- **Files**: `[convention, e.g., kebab-case, snake_case]`
- **Functions**: `[convention]`
- **Classes**: `[convention]`
- **Constants**: `[convention]`

### Error Handling Pattern
```
[Add language-appropriate example once tech stack is chosen]
```

### Logging Pattern
```
[Add language-appropriate example once tech stack is chosen]
```

---

## API Reference

> **Note to AI**: Document APIs as they're created. Include request/response examples.

### Endpoints

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | [Description] |

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `[VAR_NAME]` | Yes/No | `[default]` | What it configures |

---

## Key Files for AI Assistance

> **Note to AI**: Reference this table when asked to modify the project.

| File | Purpose | When to Modify |
|------|---------|----------------|
| `[file]` | [purpose] | [scenarios] |

---

## External Dependencies

| Service | Purpose | Documentation |
|---------|---------|---------------|
| [Service] | [What it's used for] | [Link] |

---

## Troubleshooting

### Common Issues

1. **[Issue Description]**
   - Cause: [Why it happens]
   - Solution: [How to fix]

---

## Version History

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history.

---

## AI Development Rules

This project uses Windsurf-compatible AI behavior rules located at:

```
.windsurf/rules/project-rules.md
```

These rules are **automatically loaded** by Windsurf. Contributors should:
- Be aware the rules exist and guide AI behavior
- Update rules when establishing new patterns or requirements
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on maintaining rules

---

## Contact & Support

- **Maintainer**: [Name/Team]
- **Issues**: [Link to issue tracker]
