# How to build TypeScript mono-repo project deploy in micros
This repository explains how to create a mono-repo using microservice instead of a monolithic approach

> That repository is a mirror example for this entry https://medium.com/p/6a13454937ab/edit

## Directory Structure
    - applications/ : contains all microservices instance
    - lib/ : contains all microservices common libraries 
    - applications/**/build/ : contains the build information for the microservice deploy
    - docker-compose.yml : example of start a cluster of microservices

## Tools
    - NPM (v7 or higher) Workspaces
    - eslint.js
    - husky
    - TypeScript
    - Docker

## NPM CLI

- We can create a workspace entry using the same code
  > npm init -w ./applications/user-service

- We can order installation to all workspace items
  > npm install --workspaces express winston mocha chai

- We can order install to specific workspace items
  > npm install -D @types/express -w user-service

## Package JSON Script
The scripts in the parent folder that I propose are the next:

```
    "build-all": "npm run build --workspaces --if-present",
    "install-all": "npm install --workspaces  --if-present",
    "lint-all": "npm run lint --workspaces --if-present",
    "lint-fix-all": "npm run lint-fix --workspaces --if-present"
```

for each of these parent script you need a child script that does the same, for example in user-service package.json

```
  "scripts": {
    "start": "node .",
    "build": "tsc",
    "lint": "eslint src",
    "lint-fix": "eslint src --fix"
  }
```

## Eslint Requirement
Eslint inheritance is setting from the parent, if you don't put the key "root" in the file, eslint is going to find in the parent folder the eslint file... so we could create in the parent folder an eslint configuration.

> https://eslint.org/docs/user-guide/configuring/configuration-files#cascading-and-hierarchy

The configuration is the next, for parent root

```
{
    "root": true, // important
    "parser": "@typescript-eslint/parser",
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "plugins": ["workspaces", "@typescript-eslint"],
    "ignorePatterns": ["**/**/dist/*.{js,ts}"],
    "rules": {
        "workspaces/no-relative-imports": "error",
        "workspaces/require-dependency": "warn"
    }
}

```

for a child, we only need an empty *.eslintrc* file

```
{}
```

## TypeScript requirements

### TypeScript Config
TypeScript provides a mono-repo feature, for that, you could have a main tsconfig.json root config and in each TS subproject you could extends this configuration

(/tsconfig.json)
```(json)
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "allowSyntheticDefaultImports": true,
  }
}

```

(/applications/user-service/tsconfig.json)
```(json)
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "references": [
    {
      "path": "../../libs/hello-i18n"
    }
  ]
}

```

### TypeScript references
For reuse libraries in other TypeScript projects, you need to create a reference in the tsconfig.json

(/applications/user-service/tsconfig.json)
```(json)
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "references": [
    {
      "path": "../../libs/hello-i18n"
    }
  ]
}

```

like this of user-service, but we need to take care of put these attributes in the package.json of the lib you are using

```
  "main": "dist/index.js",
  "files": [
    "src",
    "dist"
  ]
```