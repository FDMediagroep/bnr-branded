# bnr-branded

## Bootstrap new project

Initialize a new node project:

`npm init`

Install minimal modules we need for our project:

`npm i -D next react react-dom typescript @types/react @types/react-dom @types/node sass`

## Code Convention (EsLint + Prettier)

```
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser @typescript-eslint/typescript-estree eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react prettier
```

## Vercel project

Run following in the root of your project folder: `vc`

And you'll get following wizard prompts:

$ _Set up and deploy “~/Documents/fdmg-projects/bnr-brandstories/bnr-branded”?_ [__Y__/n]

$ _Which scope do you want to deploy to?_ **BNR Nieuwsradio**

$ _Link to existing project?_ [y/__N__]

$ _What’s your project’s name?_ **bnr-branded**

$ _In which directory is your code located?_ **./**

```
Auto-detected Project Settings (Next.js):

-   Build Command: `npm run build` or `next build`
-   Output Directory: Next.js default
-   Development Command: next dev --port $PORT
```

$ _Want to override the settings?_ [y/__N__]

Terminal output:

```
🔗 Linked to bnr/bnr-branded (created .vercel and added it to .gitignore)
🔍 Inspect: https://vercel.com/bnr/bnr-branded/HeWvVB1xFwza1bngutKcFY7Lofux [964ms]
✅ Production: https://bnr-branded.vercel.app [copied to clipboard] [44s]
📝 Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).
💡 To change the domain or build command, go to https://vercel.com/bnr/bnr-branded/settings
```

## Environment

Run the following command to pull the environment variables set for the project in the Vercel Dashboard.

`vc env pull`
