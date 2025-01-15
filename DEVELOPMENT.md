# Baseball Time Machine Development Workflow

## Branches

- `main`: Production branch, deployed to [production URL]
- `staging`: Development/testing branch, deployed to [staging URL]

## Development Workflow

1. **Making Changes**
   ```bash
   # Switch to staging branch
   git checkout staging

   # Make your changes
   # Test locally

   # Commit changes
   git add .
   git commit -m "Description of changes"
   git push origin staging
   ```

2. **Deploying to Production**
   ```bash
   # Once changes are tested on staging
   git checkout main
   git merge staging
   git push origin main
   ```

## Environment Setup

### Production
- Branch: `main`
- URL: [Add production URL]
- Environment: Production
- Build Command: `npm run build`
- Publish Directory: `dist`

### Staging
- Branch: `staging`
- URL: [Add staging URL]
- Environment: Staging
- Build Command: `npm run build`
- Publish Directory: `dist`

## Testing New Features

1. Always create/test changes in `staging` first
2. Use the staging environment to:
   - Test new trivia questions
   - Experiment with UI changes
   - Debug issues
   - Test scoring mechanics

3. Only merge to `main` when:
   - All features are working as expected
   - No console errors
   - Mobile responsiveness is verified
   - Score tracking is working correctly

## Common Commands

```bash
# Create a new feature branch (optional)
git checkout -b feature/name-of-feature staging

# Switch to staging
git checkout staging

# Switch to main
git checkout main

# Update staging with latest changes
git checkout staging
git pull origin staging

# Update main with staging changes
git checkout main
git merge staging
git push origin main
```

## Deployment Checklist

Before merging to main:
- [ ] All features tested on staging
- [ ] Mobile responsiveness verified
- [ ] Console is error-free
- [ ] Score tracking working
- [ ] Images loading correctly
- [ ] Trivia questions accurate
- [ ] Sound effects working
- [ ] Local storage working correctly

## Rolling Back Changes

If issues are found in production:
```bash
# Revert the last merge
git checkout main
git revert -m 1 <merge-commit-hash>
git push origin main
``` 