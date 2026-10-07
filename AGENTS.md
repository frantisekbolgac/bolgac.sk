# AGENTS.md — bolgac.sk

Astro site with Slovak and English content. GitHub Actions builds static files and deploys them to Cloudflare Workers. Follow the repository's current configuration when it differs from this guide.

## Branches and deployment

| Branch | Deployment |
| --- | --- |
| `staging` | Test Worker: `bolgac-sk-staging` |
| `main` | Production Worker: `bolgac-sk-production` at `https://bolgac.sk/` |

- Work on `staging`. A push deploys that branch automatically. After completing and checking a task, commit and push to `origin/staging` unless the user asked for a draft or review only.
- Do not push directly to `main`. Publish through a PR from `staging` to `main` when the user requests publication. Merge the PR only when authorized, then verify production.
- Before editing, check `git status -sb`, the current branch, and `git fetch origin`. Preserve unrelated or uncommitted work. If branches diverged, inspect the history; never force-push or reset away work.
- Before pushing, inspect the diff, stage only relevant files, confirm the branch is `staging`, and use `git push origin staging`. Report the commit and staging deployment result.
- After a production merge, fast-forward `staging` to `main` if possible. If it is not possible, inspect the divergence instead of forcing it.

### After a PR is merged

When a PR from `staging` to `main` is merged, synchronize the staging branch so the next staging deployment starts from the same commit as production:

```bash
git fetch origin
git switch staging
git merge --ff-only origin/main
git push origin staging
```

The push to `staging` triggers the staging deployment. Afterward, verify `git status -sb`, `git log --oneline -3`, and that `origin/main` and `origin/staging` are aligned. If the fast-forward merge fails, inspect the divergence; never force-push or reset away work. Preserve unrelated uncommitted changes throughout.

## Changes and checks

- Read `package.json`, `wrangler.jsonc`, the deployment workflow, and the relevant source files before changing them. Keep the existing branch-to-environment mapping: `staging` → `--env staging`; `main` → `--env production`.
- Follow the project's content and component conventions. For article edits, check both SK and EN versions, metadata, links, canonical URLs, and `hreflang`. Preserve the author's voice; verify factual claims.
- Run the existing build script (typically `npm ci` and `npm run build`) before pushing site changes. Fix a failed build or report the blocker; do not knowingly push a broken build.
- The canonical host is `https://bolgac.sk/`. Keep `noindex` limited to the `workers.dev` addresses, not the public domain. Check generated output before claiming a feature such as sitemap or RSS exists.
- Do not commit secrets. Do not change DNS or deployment credentials as part of an unrelated content task.

## Local development

Use the project-local Astro CLI in background mode. Check status before starting a second server; stop the server you started when finished.

```bash
npx astro dev --background
npx astro dev status
npx astro dev logs
npx astro dev stop
```

## Astro documentation

Consult the relevant [Astro docs](https://docs.astro.build/) before changing:

- [Routing and middleware](https://docs.astro.build/en/guides/routing/)
- [Components](https://docs.astro.build/en/basics/astro-components/)
- [Framework components](https://docs.astro.build/en/guides/framework-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling](https://docs.astro.build/en/guides/styling/)
- [Internationalization](https://docs.astro.build/en/guides/internationalization/)
- [CLI and background mode](https://docs.astro.build/en/reference/cli-reference/)
