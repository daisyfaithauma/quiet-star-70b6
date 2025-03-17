- npm create cloudflare@latest - npm install --save hono
-Then replace src/index.ts - add node compatibility
 -     },
  "compatibility_flags": [
    "nodejs_compat"
  ],
-Add binding : "ai": {"binding": "AI"}
}
-npm run dev
