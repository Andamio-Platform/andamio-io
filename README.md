# Andamio Platform

### Commands to run

- `build`: check lint and build Next JS project - use before deploy to GitHub and Vercel
- `db:update`: format, push and generate the database - use after changing the database schema (prisma/schema.prisma)
- `dev`: run the development server
- `db:studio`: open the Prisma Studio - to view database tables and data

### Folder structure

The folder structure of this project is as follows:

```
.
├── prisma # the database schema
├── src # the main source code of the project
│   ├── components # basic UI components
│   ├── hooks # custom reusable hooks
│   ├── lib # reusable functions and third party libraries
│   ├── pages # the routing of every page
│   ├── server # contains backend services including auth, DB and TRPC
│   │   ├── api/root.ts # TRPC router, add if new routers are added
│   │   ├── api/routers # database queries and mutations
│   ├── styles # global styles and theme
│   ├── types # global types
│   ├── ui # main UI source codes, including business logic
│   ├── utils # utility functions
│   ├── env.js # environment variables
```

### Environment variables

```
# Database URL
DATABASE_URL="postgres://..."

# Next Auth
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
```
