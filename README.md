# Taskify

## Description

Taskify is a feature-rich task completion website that rewards users with XP for each completed task, determined by the selected category. The platform aims to streamline task management, offering a personalized experience through a royalty-based XP system. Users can gain XP points by completing tasks across various categories, contributing to a sense of achievement and progress.

## Technology Used:

### Languages:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Database:

- [MongoDB](https://www.mongodb.com/)
- [Prisma](https://www.prisma.io/)

### Authentication:

- [Clerk](https://clerk.com/)

## Steps to Run Taskify Locally:

### 1. Install all required dependencies:

```bash
    npm install
```

### 2. Create a `.env.local` file and include the following environment variables:

```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=

    NEXT_PUBLIC_CLERK_SIGN_IN_URL=
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
    NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=
```

### 3. Install Prisma for MongoDB:

<b>a. Run the following command:</b>

```bash
    npx prisma init --datasource-provider MongoDB
```

<b>b.  In the generated `.env` file, add your MongoDB driver URL with your username, password, and database name.</b>

<b>c. Generate the database based on the Prisma schema:</b>
    
```bash
    npx prisma generate
```

<b>d. Open the Prisma dashboard to verify the database setup:</b>

```bash
    npx prisma studio
```

### 4. Start the project:

```bash
    npm run dev
```

## Connect With Me:

If you need any assistance in setting up this project, feel free to reach out on [Twitter](https://twitter.com/AtreayKukanur) or [LinkedIn](https://www.linkedin.com/in/atreay-kukanur/).
