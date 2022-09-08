# fracpack auth

A starter template for internal, private npm packages + documentation.

## Running locally

```bash
npx degit fractalhq/frackpack-auth my-package

cd my-package

pnpm install

pnpm run dev
```

navigate to http://localhost:3000

<details>
<summary>Don't have `pnpm` installed?</summary>

You should! You can install it easily as a drop-in npm replacement with this one liner from <a href='https://pnpm.io/installation'>the docs</a>:

```bash
    curl -fsSL https://get.pnpm.io/install.sh | sh -
```

</details>

<br>

## Setup

- Rename `.env.example` to `.env`, and add your own login credentials.
- Add the same login credentials to your servers environment variables (in my case, to Vercel).
- Add your `npm` token to your Github environment variables.
- Update the `repo` field in `.changeset/config.json`
- Change 'package.json.private' to `true`

## Usage

Anything exported from `src/package/index.ts` will be included in the `npm` package with type declaration files automatically generated. Markdown can be used anywhere (see `src/routes/docs/+page.md)`. I like to use the home page (`src/routes/+page.svelte`) for demos. See `svelte.config.js` to configure your own setup.

## Publishing

- To publish a package update, run `npx changeset` and follow the instructions.
- Commit the generated changelog, and merge the changeset bot's PR.
- Profit.
