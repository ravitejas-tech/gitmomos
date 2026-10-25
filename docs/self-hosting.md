# Self-hosting gitmomos

Run your own copy of gitmomos on Supabase and a static host such as Vercel. It takes about 30 minutes. You need:

- Node.js 20 or newer. Yarn 4 ships inside the repository, so the global `yarn` command picks it up.
- A free [Supabase](https://supabase.com) project.
- An API key from one AI provider to try it with: [Gemini](https://aistudio.google.com/apikey) or [Groq](https://console.groq.com/keys), both free, or [Claude](https://platform.claude.com/settings/keys) or [OpenAI](https://platform.openai.com/api-keys). Every user adds their own key in the app's **Settings**; the functions hold none.
- A GitHub account for the OAuth App, and an account with a static host. This guide uses [Vercel](https://vercel.com).

Every step starts with **Where**, so you know which window it happens in:

| Label | Means |
|---|---|
| **Terminal** | A terminal open in the cloned repository |
| **Editor** | The repository open in your editor |
| **Supabase** | Your project in the [Supabase dashboard](https://supabase.com/dashboard) |
| **GitHub** | [github.com](https://github.com) settings |
| **Vercel** | Your project in the [Vercel dashboard](https://vercel.com) |

Throughout, replace `<project-ref>` with your Supabase project ref (the part before `.supabase.co` in the project URL) and `<site>` with the address the app will live at, such as `gitmomos.example.com`.

Do the parts in order; each one needs something from the one before.

---

## 1. Collect the secrets

### 1.1 AI provider key

**Where:** [Google AI Studio → API keys](https://aistudio.google.com/apikey) for a free Gemini key, or [GroqCloud → API Keys](https://console.groq.com/keys) for a free Groq key. Claude and OpenAI keys work too.

Create a key and keep it for part 5. It goes into the app, not into the function secrets.

### 1.2 GitHub OAuth App

**Where:** GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**

| Field | Value |
|---|---|
| Application name | `gitmomos` |
| Homepage URL | `https://<site>` |
| Authorization callback URL | `https://<site>/dashboard/connections/github` |

Click **Register application**, copy the **Client ID**, then **Generate a new client secret** and copy it straight away. GitHub shows it only once.

GitHub allows one callback URL per app, so local development needs a second OAuth App with the callback `http://localhost:5173/dashboard/connections/github`.

> OAuth Apps can only read private repositories with the `repo` scope, so that is what gitmomos asks for. It only ever calls read endpoints.

### 1.3 Supabase database password

**Where:** Supabase

Use the password you chose when you created the project. If you don't have it, open **Project Settings → Database → Reset database password**.

---

## 2. Database and edge functions

### 2.1 Install

**Where:** Terminal

```bash
git clone https://github.com/ravitejas-tech/gitmomos.git
cd gitmomos
yarn install
cp supabase/functions/.env.example supabase/functions/.env
openssl rand -hex 32
```

The last command prints a random string. That is your **worker secret**; you need it twice.

### 2.2 Fill in the function secrets

**Where:** Editor → `supabase/functions/.env`

```
GITHUB_CLIENT_ID=<client ID from 1.2>
GITHUB_CLIENT_SECRET=<client secret from 1.2>
WORKER_SECRET=<the string from 2.1>
```

Leave `ALLOW_LOCAL_GITEA` commented out in production. The file is gitignored.

### 2.3 Create the tables and deploy the functions

**Where:** Terminal

```bash
yarn supabase login
yarn supabase link --project-ref <project-ref>
yarn db:push
yarn secrets:set
yarn functions:deploy
```

- `link` asks for the database password from 1.3. Nothing shows while you paste it.
- `db:push` lists the migrations and asks to apply them. Answer `y`.
- If `functions:deploy` complains about Docker, run `yarn supabase functions deploy connections sync profile-chat --use-api` instead.

**Check:** in Supabase, **Table Editor** lists `profiles`, `connections`, `repositories`, `commits`, `reports`, `report_embeddings`, `profile_questions` and `ai_keys`, **Storage** lists the public `profile-media` bucket, and **Edge Functions** lists `connections`, `sync` and `profile-chat`.

---

## 3. Supabase settings

### 3.1 Let the nightly worker call the sync function

**Where:** Supabase → **SQL Editor → New query**

```sql
select vault.create_secret('https://<project-ref>.supabase.co', 'project_url');
select vault.create_secret('<worker secret from 2.1>', 'worker_secret');
```

Without these two secrets the hourly job runs but does nothing. Delete the query tab afterwards, since it contains the secret.

**Check:**

```sql
select name from vault.decrypted_secrets;
select jobname, schedule, active from cron.job;
```

The first lists `project_url` and `worker_secret`; the second shows `gitmomos-daily-sync`, `5 * * * *`, `true`.

### 3.2 Sign-in URLs

**Where:** Supabase → **Authentication → URL Configuration**

- **Site URL:** `https://<site>`
- **Redirect URLs:** `https://<site>/dashboard` and `https://<site>/dashboard/settings`

The confirmation and password-reset emails link to these.

### 3.3 Email confirmation

**Where:** Supabase → **Authentication → Sign In / Providers**

Supabase's built-in email sender only delivers to members of your Supabase organisation, a few times an hour. Either add your own SMTP server under **Authentication → Emails**, or switch **Confirm email** off. Sign-up works either way.

---

## 4. Deploy the website

The site is static: `yarn build` writes it to `build/client/`.

### 4.1 Vercel

**Where:** Vercel → **Add New → Project** → import your fork of the repository

1. Leave **Root Directory** empty. `vercel.json` in the repository sets the build command, the output directory and the rewrite that serves `/dashboard/...` URLs.
2. Under **Environment Variables**, add the two variables below. Set **Type** to **Config** and tick **Production** and **Preview**. Vercel refuses `VITE_` variables saved as **Secret**, because their values end up in the browser bundle anyway.

| Key | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://<project-ref>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase → **Project Settings → API Keys** → the `anon` key under **Legacy API Keys**, or the **Publishable key** |

3. Click **Deploy**. Every push to `main` deploys again.

### 4.2 Other static hosts

Build with the same two variables set, then upload `build/client/`. Unknown paths must fall back to `/__spa-fallback.html`; `public/_redirects` already does this for Netlify and Cloudflare Pages.

---

## 5. Try it

**Where:** `https://<site>`

1. Sign up. You land on the dashboard.
2. **Settings → AI provider**: pick the provider, paste the key from 1.1 and click **Continue**, then choose the report and chat models and click **Save**.
3. **Repositories → Connect GitHub**, approve, and you come back to the app. For Gitea, use **Connect Gitea** with an access token that has `read:repository` and `read:user`.
4. Paste a repository URL into **Tracked repositories** and click **Add**.
5. On **Overview**, click **Sync now**. Today's report appears under **Reports**.
6. In **Settings**, check your timezone. The nightly report is written just after midnight in it.
7. In **Public profile**, pick a handle, switch on the repositories to show, and turn the profile on. Open `https://<site>/@<handle>` and ask the chatbot a question.

If a step fails, open Supabase → **Edge Functions →** `connections`, `sync` or `profile-chat` **→ Logs**.

The next day, confirm the worker ran:

```sql
select status, return_message, start_time from cron.job_run_details order by start_time desc limit 5;
```

---

## Updating

**Where:** Terminal

```bash
git pull
yarn install
yarn db:push            # new migrations, if any
yarn functions:deploy   # always, before the new website goes live
```

Then let the host deploy the new `main`. Deploy the functions first: a new website calling an action the old functions don't know fails until they are updated.

> **Upgrading to a choice of AI provider:** `gemini_keys` becomes `ai_keys`, and every saved Gemini key keeps the models it used before: `gemini-3.5-flash` for reports and `gemini-flash-lite-latest` for the chatbot. Run `yarn db:push`, `yarn functions:deploy` and the website deploy back to back, because the old functions and the old website both read the renamed table. The `GEMINI_MODEL` and `GEMINI_CHAT_MODEL` function secrets are no longer read, since each user picks their models in **Settings → AI provider**; if you set them, remove them with `yarn supabase secrets unset GEMINI_MODEL GEMINI_CHAT_MODEL`.

> **Upgrading to per-user Gemini keys:** after this update a report is written only for a user who has saved a key in **Settings → AI provider**, and the public chatbot only answers on profiles whose owner has one. The `GEMINI_API_KEY` function secret is no longer read; remove it with `yarn supabase secrets unset GEMINI_API_KEY`.

> **Upgrading from v1:** v2 replaces the old schema with one fresh migration. Run `yarn supabase db reset --linked` before `yarn db:push`. **This deletes all v1 data.**

---

## Troubleshooting

| You see | Cause | Fix |
|---|---|---|
| Vercel: `Root Directory "apps/web" does not exist` | The project was set up for gitmomos v1 | Clear **Settings → Build and Deployment → Root Directory**, then redeploy |
| Vercel: `cannot use visibility: secret` | A `VITE_` variable saved as **Secret** | Remove it and add it again as **Config** |
| Build log: `supabaseUrl is required` | Variables missing for that environment | Add both to **Production** and **Preview**, then redeploy |
| 404 when refreshing a `/dashboard/...` page | No SPA fallback on the host | Use `vercel.json`, `public/_redirects` or your host's equivalent |
| GitHub shows a 404 page with `client_id=your_github_oauth_client_id` | The example `.env` values were uploaded | Fill in 2.2, then run `yarn secrets:set` again |
| GitHub: `redirect_uri is not associated with this application` | Callback URL mismatch | Make the OAuth App's callback exactly `https://<site>/dashboard/connections/github` |
| Sign-up email never arrives | Built-in Supabase email limits | Turn off **Confirm email** or add SMTP (3.3) |
| "Couldn't find owner/repo" when adding a repository | Typo, or the connected account can't read it | Check the URL and that account's access on GitHub or Gitea |
| Reports never appear overnight | Vault secrets missing or wrong | Redo 3.1; `worker_secret` must equal `WORKER_SECRET` |
| A report says "Add an AI provider key in Settings" | That user has no key saved | Add one in **Settings → AI provider** |
| A report says "… rejected your API key" | The saved key was deleted, restricted or ran out of credit with its provider | Create a new key and use **Replace key** in Settings |
| A report says "… is busy right now" | The chosen model, and on Gemini or Groq every built-in fallback, was overloaded or timed out | Write it again later, or pick another model with **Change models** in Settings |
| A report says "… has reached its usage limit" | The key's free tier or rate limit ran out; on Groq a day with many commits can be larger than one request may be | Write it again later, or pick a model or provider with higher limits |
| A report says "… returned an answer in the wrong format" | The chosen model didn't follow the report format | Pick another model with **Change models** in Settings |
