# Demo - Api with Nodejs and Typescript

- [Configuring the project](#configuring-the-project)
- [Tests](#tests)
- [gitignore](#gitignore)
- [Dependencies](#dependencies)
- [Types Dependencies](#types-dependencies)
- [Dev Dependencies](#dev-dependencies)
  - [Configure VSCode debug](#configure-vscode-debug)
- [Project dependencies](#project-dependencies)


## Configuring the project

**1. Create project**
```bash
npm init -y
```

**2. Install TypeScript**
```bash
npm install -D typescript
```
> NOTE: We will need TypeScript in development environment only, regarding that, we will install it as a dev dependency using the `-D` flag.

**3. Init TypeScript in the project**
```bash
tsc --init
```

**4. Configure TypeScript**
```json
{
  "compilerOptions": {
    "target": "es2020",
    "outDir": "dist",
    ..
  },
  "include": [
    "./src/**/*",
    "./tests/**/*"
  ]
}
```

**5. Install ts-node to help us run TypeScript files**
```bash
npm install -D ts-node
```

**6. Configure `package.json`**
```json
{
  ...
  "main": "dist/app.js",
  "scripts": {
    "build": "rimraf dist && tsc",
    "start": "cross-env NODE_ENV=production node dist/app.js",
    "dev": "cross-env NODE_ENV=development nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/app.ts",
  }
  ...
}
```


## Tests

**1. Install Jest**
```bash
npm install -D jest @types/jest ts-jest
```

**2. Configure Jest**
```bash
npx ts-jest config:init
```

**3. Configure `package.json`**
```json
{
  ...
  "scripts": {
    ...
    "test": "jest"
  }
  ...
}
```


## gitignore
```ini
# Dependency directories
node_modules/

# TypeScript compiled output
dist/
build/

# configs
.env
```


## Dependencies
```bash
npm i cross-env dotenv express helmet
```

- `cross-env` - Run scripts that set and use environment variables across platforms
- `dotenv` - Loads environment variables from .env file
- `express` - Framework to create the API
- `helmet` - Helmet helps you secure your Express apps by setting various HTTP headers


## Types Dependencies
```bash
npm i -D @types/express @types/node
```

- `@types/express` - TypeScript definitions for express
- `@types/node` - TypeScript definitions for Node.js


## Dev Dependencies
```bash
npm i -D nodemon rimraf
```

- `nodemon` - Monitor for any changes in your node.js application and automatically restart the server
- `rimraf` - A deep deletion module for node (like `rm -rf`)


### Configure VSCode debug

**1. Configure `tsconfig.json`**
```json
{
  "compilerOptions": {
    "sourceMap": true,
    ...
  }
}
```

**2. Configure `launch.json`**
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/src/app.ts",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": [ "${workspaceFolder}/dist/**/*.js" ]
    }
  ]
}
```

## Project dependencies
```bash
npm i pg-promise
```