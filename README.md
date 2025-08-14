# Next.js Commitlint & Auto-Release PoC

This is a proof of concept demonstrating automated semantic versioning and release management for a Next.js application using commitlint, standard-version, and GitHub Actions.

## Overview

This project showcases a complete CI/CD setup that:

- **Enforces conventional commit messages** locally using Commitlint and Husky
- **Automatically generates semantic versions** based on commit types
- **Creates changelogs** and GitHub releases automatically
- **Maintains version consistency** across the project

## Repository

GitHub: [https://github.com/daneel-deimos/poc-commitlint-auto-release](https://github.com/daneel-deimos/poc-commitlint-auto-release)

## Prerequisites

- Node.js 18.20.4 (use `nvm use` to switch to the correct version)
- npm or yarn package manager
- Git

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/daneel-deimos/poc-commitlint-auto-release.git
   cd poc-commitlint-auto-release
   ```

2. **Use the correct Node.js version**
   ```bash
   nvm use
   # or if not installed: nvm install 18.20.4 && nvm use 18.20.4
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## How It Works

### 1. Commit Message Enforcement

**Commitlint** enforces Conventional Commits format locally through a Husky git hook. All commit messages must follow this pattern:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 2. Semantic Versioning

**Standard-version** automatically increments versions based on commit types:

- `fix:` → **patch** version (1.0.1)
- `feat:` → **minor** version (1.1.0) 
- `BREAKING CHANGE:` → **major** version (2.0.0)

### 3. Automated Releases

**GitHub Actions** automatically creates releases when code is merged to main:

- Generates changelog from conventional commits
- Creates version tags
- Publishes GitHub releases with release notes

## Commit Types

| Type | Description | Version Impact |
|------|-------------|----------------|
| `feat:` | New features | Minor |
| `fix:` | Bug fixes | Patch |
| `docs:` | Documentation changes | None |
| `style:` | Code style changes (formatting, etc.) | None |
| `refactor:` | Code refactoring | None |
| `test:` | Adding/updating tests | None |
| `chore:` | Maintenance tasks | None |
| `perf:` | Performance improvements | Patch |
| `ci:` | CI/CD changes | None |

## Examples

### ✅ Valid Commit Messages

```bash
git commit -m "feat: add user authentication system"
git commit -m "fix: resolve login button styling issue"
git commit -m "docs: update README with setup instructions"
git commit -m "feat!: redesign user interface (BREAKING CHANGE)"
git commit -m "fix(auth): handle expired tokens properly"
```

### ❌ Invalid Commit Messages (Will Be Blocked)

```bash
git commit -m "updated stuff"           # Missing type
git commit -m "bug fix"                 # Incorrect format
git commit -m "Add new feature"         # Missing type, wrong case
git commit -m "fixing the login bug"    # Missing colon
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build the application for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run changelog` | Generate changelog manually |
| `npm run release` | Create a release (automatic versioning) |
| `npm run release:minor` | Force minor version release |
| `npm run release:major` | Force major version release |

## Project Structure

```
poc-commitlint-auto-release/
├── .github/
│   └── workflows/
│       └── release.yml          # GitHub Actions workflow
├── .husky/
│   └── commit-msg               # Commitlint git hook
├── src/                         # Next.js app directory
├── docs/
│   └── CHECKLIST.md            # Implementation checklist
├── .commitlintrc.json          # Commitlint configuration
├── .nvmrc                      # Node.js version specification
├── package.json                # Dependencies and scripts
├── VERSION                     # Current version file
└── README.md                   # This file
```

## Generated Files

- **CHANGELOG.md**: Technical changelog for developers
- **GitHub Releases**: User-friendly release notes with version tags
- **Git Tags**: Semantic version tags (v1.0.0, v1.1.0, etc.)

## Testing the Setup

1. **Make a feature commit:**
   ```bash
   git add .
   git commit -m "feat: add new landing page component"
   ```

2. **Make a fix commit:**
   ```bash
   git commit -m "fix: resolve responsive design issues"
   ```

3. **Try an invalid commit (should be blocked):**
   ```bash
   git commit -m "updated something"  # ❌ This will fail
   ```

4. **Push to trigger release:**
   ```bash
   git push origin main
   ```

The GitHub Action will automatically create a new release with the appropriate version bump.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Commitlint** - Commit message linting
- **Husky** - Git hooks
- **Standard-version** - Automated versioning and changelog generation
- **Conventional Changelog** - Changelog generation from commits
- **GitHub Actions** - CI/CD automation

## Contributing

1. Follow the conventional commit format
2. Ensure your commits pass the commitlint check
3. Test your changes locally before pushing
4. Push to main to trigger an automatic release

## License

This is a proof of concept project for demonstration purposes.