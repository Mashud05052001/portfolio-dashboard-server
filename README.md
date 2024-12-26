# Create a new repository from this repository
1. Clone the existing repository to a new directory.       
2. Navigate to the new directory.   
3. Remove the existing Git history & remove origin
4. Delete the README.md file from folder
5. Install all dependencies or update all dependencies to the latest versions
6. Run tsc
7. Now copy the reposotory code from the github and run
8. If you update README.md text directly in repository or update any code in repository directly the at first you have to pull the data then you can push any commit.

```bash
1.  git clone github_clone_url new-created-folder-name
2.  cd new-created-folder-name
3.  Remove-Item -Recurse -Force .git
    git remote remove origin
4.  npm install  |  npm update --latest
5.  tsc   | or |  npm run build
6.  echo "# server-setup" >> README.md
    git init
    git add .
    git commit -m "your commited command"
    git branch -M main
    git remote add origin new_repository_origin_url
    git push -u origin main 
6.  git pull origin main
```




# Server Deployment Setup

## Using Vercel

1.  Create vercel.json file at root directory where package.json file is located & add belowing code

```bash
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```

2. For the first time in the pc install the vercel.
3. Can check properly install or not the vercel version.
4. Then login to the vercel
5. Before production run the "tsc" or "npm run build" in the terminal to complete the JS conversion
6. After succesfully login to your vercel account then run below command to finally deploy your project to vercel

```bash
1.  npm i -g vercel
2.  vercel -v
3.  vercel login
4.  tsc   | or |   npm run build
5.  vercel --prod
```




 
 
 
 # Server Initial Setup Code

A initial setup code for server side where typescript, expressJS, mongoose, eslint & prettier used

For Eslint & Prettier setup =>

- https://blog.logrocket.com/linting-typescript-eslint-prettier
- https://dev.to/md_enayeturrahman_2560e3/how-to-set-up-eslint-and-prettier-1nk6

For update Eslint Content lookup on this git
https://github.com/ShafiaChy/Eslint-Config-Setup?tab=readme-ov-file

# Process

## Step-1

To create a package.json file

```bash
npm init -y
```

## Step-2

Install required items according to dependencies & devDependencies code. Always notice that after installing any package it successfully include or note in the package.json file. If not install it again.

-

## Dependencies

```bash
npm install bcrypt cookie-parser cors dotenv express http-status jsonwebtoken mongoose zod
```

## Dev-Dependencies

```bash
npm install @eslint/js @types/bcrypt @types/cookie-parser @types/cors @types/express @types/jsonwebtoken @typescript-eslint/eslint-plugin @typescript-eslint/parser concurrently eslint eslint-config-prettier globals prettier ts-node-dev typescript typescript-eslint --save-dev
```

## Step-3

To create a tsconfig.json file. Here provide the rootDir & outDir file location

```bash
tsc -init
```

## Step-4

- Create a .env file and here put all the secret info like PORT, MONGODB_URL, NODE_DEV ...
- MongoDB url format :: mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.j7t5o8c.mongodb.net/<DB_COLLECTION_NAME>?retryWrites=true&w=majority&appName=Cluster0
- src -> app -> config -> index.ts

```bash
  import dotenv from 'dotenv';
  import path from 'path';

  dotenv.config({
    path: path.join(process.cwd(), '.env'),
  });

  export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
  };

```

- To access those file

```bash
  import config from './app/config';
  const port = config.port;
```

## Step-5

- In server.ts we have to connect our code to the database.
- Inside a async Function we have to use try catch method
- Inside try, we should connect to the database and run the listen portal.

## Step-6

- In app.ts we should call express & create the app & export it as default.
- Here we can add the parser, middleware and run all of our code.
- Generally we donot run all of our code here. We run our code as folder wise and connect them as express.Router() operation.

## Step-7

Add this 2 line with tsconfig.json. Outside of the compilerOptions.

```bash
  {
    // This 2 line
    "include": ["src"],
    "exclude": ["node_modules"],
    "compilerOptions": {
        .....
        .....
    }
  }
```

## Step-8 Eslint Installation

- Install eslint 3 files. Already previously installed

```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

- Create a eslint.config.mjs file

```bash
  npx eslint --init
```

- Add te ignore , rules , process on the created file as required. Please check eslint.config.mjs file.

## Step-9 Prettier Installation

- Install Prettier file, Already previously installed

```bash
npm install --save-dev prettier
```

- Create a file named .prettierrc.json and code here...

```bash

// .prettierrc.json
{
  "semi": true,
  "singleQuote": true,
}

```

## Step-9 Avoid conflicts of eslint & prettier

- Already installed in before

```bash

npm install --save-dev eslint-config-prettier

```

## Step-10 Update package.json

- -D & --save-dev both are same. -D is the shorter version of --save-dev
- tsc -watch / tsc -w => Wheneven any rootdirectory typescript file will changed it autometically update the .js file in out directory in save time.
- ts-node-dev => it run the ts file directly without converting it's into js

```bash
  "scripts": {
    "build": "tsc",
    "start": "node ./dist/server.js",
    "start:prod": "node ./dist/server.js",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "start:concurrent": "concurrently \"tsc -w\" \"nodemon dist/server.js\"",
    "lint": "npx eslint src --ignore-pattern .ts",
    "lint:fix": "npx eslint src --fix",
    "prettier": "prettier --ignore-path .gitignore --write \"./src/ **/*.+(js|ts|json)\"",
    "prettier:fix": "npx prettier --write src",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## Step-11 Update package.json

- Don't forget to update the .gitignore file. In the .gitignore file add

```
node_modules
dist
.env
```




# portfolio-dashboard-server
