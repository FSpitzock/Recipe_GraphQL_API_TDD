# Recipe GraphQL API (Week 07 Capstone)

This is a **GraphQL API** for managing recipes, built with **Node.js**, **MongoDB**, and **Mongoose**. It follows a **Test-Driven Development (TDD)** approach using **Cypress** for end-to-end testing.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [GraphQL API](#graphql-api)  
- [Testing](#testing)  
- [Seed & Test Data](#seed--test-data)  
- [License](#license)  

---

## Features

- **Query recipes**  
  - Fetch all recipes or a single recipe by ID.
- **Mutate recipes**  
  - Create, update, and delete recipes.  
  - Input validation for required fields.  
  - Duplicate slug handling.  
  - Proper error codes for missing resources.
- **Timestamps**  
  - `createdAt` and `updatedAt` for each recipe.
- Fully tested with **Cypress E2E tests**.

---

## Tech Stack

- **Node.js** & **TypeScript**  
- **MongoDB** & **Mongoose**  
- **GraphQL** (`graphql`, `apollo-server`)  
- **Cypress** for testing  
- **ESLint / Prettier** for code quality  

---

## Getting Started

### Prerequisites

- Node.js >= 20  
- MongoDB running locally or in the cloud  

### Install Dependencies

```bash
npm install
```


### Start the Server
```bash
npm run dev
```

By default, the server will run on:
- http://localhost:4000/graphql

### Environment Variables
Create a .env file in the root directory with the following:

```bash
MONGO_URI=mongodb://localhost:27017/recipes
PORT=4000
```

### GraphQL API
Types

``` bash
type Recipe {
  _id: ID!
  title: String!
  cuisine: String!
  prepTimeMinutes: Int!
  difficulty: String!
  slug: String!
  ingredients: [String!]!
  createdAt: String!
  updatedAt: String!
}
```

Queries
``` bash
# Fetch all recipes
recipes: [Recipe!]!

# Fetch a single recipe by ID
recipe(id: ID!): Recipe
```

Mutations
```
# Create a new recipe
createRecipe(input: CreateRecipeInput!): Recipe!

# Update an existing recipe
updateRecipe(id: ID!, input: UpdateRecipeInput!): Recipe!

# Delete a recipe
deleteRecipe(id: ID!): Recipe!
```

Inputs
```
input CreateRecipeInput {
  title: String!
  cuisine: String!
  prepTimeMinutes: Int!
  difficulty: String!
  slug: String!
  ingredients: [String!]!
}

input UpdateRecipeInput {
  title: String
  cuisine: String
  prepTimeMinutes: Int
  difficulty: String
  slug: String
  ingredients: [String!]
}
```
#### Error Handling

- Validation Errors – when required fields are missing: GraphQLError with message: "validation failed"

- Duplicate Slug – if slug already exists: GraphQLError with message: "duplicate key error"

- Not Found – if trying to update/delete a non-existent recipe: GraphQLError with extensions.code = "NOT_FOUND"

#### Testing

- This project uses Cypress for end-to-end testing.

#### Run All Tests
```
npm run cypress:run
```
#### Run a Specific Spec
```
npm run cypress:run -- --spec cypress/e2e/recipes-capstone.cy.ts
```
#### Test Coverage

- Create recipe
- Update recipe
- Delete recipe
- Validation errors
- Duplicate slug errors
- Not found errors

#### Seed & Test Data

The project includes tasks for seeding the database in tests:

- db:seedRecipes – seed recipes for tests
- db:clearRecipes – clear all recipes
- db:getRecipeById – fetch recipe by ID

These tasks are used in Cypress tests and can also be used for local testing.

#### Example:
```
cy.task('db:seedRecipes', [
  { title: 'Avocado Toast', cuisine: 'American', prepTimeMinutes: 10, difficulty: 'Easy', slug: 'avocado-toast', ingredients: ['bread', 'avocado', 'salt'] }
]);
```

#### License
- This project is open-source and available under the MIT License.
