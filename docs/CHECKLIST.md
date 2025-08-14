# Next.js Commitlint & Auto-Release PoC Setup

## Step 1: Setup Node Version

Create `.nvmrc` file:
```
18.20.4
```

Use the LTS version:
```bash
nvm use
# or
nvm install 18.20.4
nvm use 18.20.4
```

## Step 2: Create Next.js Project

```bash
npx create-next-app@latest my-nextjs-poc --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-nextjs-poc
```

## Step 2: Install Commitlint Dependencies

```bash
npm install --save-dev @commitlint/config-conventional @commitlint/cli husky
```

## Step 3: Configure Commitlint

Create `.commitlintrc.json`:
```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

## Step 4: Setup Husky for Git Hooks

```bash
npx husky init
echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg
chmod +x .husky/commit-msg
```

## Step 5: Install Changelog & Release Tools

```bash
npm install --save-dev conventional-changelog-cli standard-version
```

## Step 6: Add Package.json Scripts

Add to `package.json` scripts:
```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major"
  }
}
```

## Step 7: Create GitHub Actions Workflow

Create `.github/workflows/release.yml`:
```yaml
name: Release
on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Configure Git
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
      
      - name: Release
        run: |
          npm run release
          git push --follow-tags origin main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Step 8: Initialize Version

```bash
echo "1.0.0" > VERSION
git add .
git commit -m "feat: initial project setup"
```

## Testing Commit Messages

**Valid commits:**
```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login button styling"
git commit -m "docs: update README with setup instructions"
```

**Invalid commits (will be blocked):**
```bash
git commit -m "updated stuff"  # ❌ Blocked
git commit -m "bug fix"        # ❌ Blocked
```

## How It Works

1. **Commitlint** enforces Conventional Commits format locally
2. **Husky** blocks non-conforming commits before they're made
3. **Standard-version** auto-increments semantic versions based on commit types:
   - `fix:` → patch (1.0.1)
   - `feat:` → minor (1.1.0)
   - `BREAKING CHANGE:` → major (2.0.0)
4. **GitHub Actions** automatically creates releases when code is merged to main

## Commit Types

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding/updating tests
- `chore:` Maintenance tasks

## Generated Output

- **CHANGELOG.md**: Technical changelog for developers
- **GitHub Releases**: User-friendly release notes with version tags