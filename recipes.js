import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "recipes.json";

// GET ALL RECIPES
export async function getRecipes() {
  // should return an array of all recipes
  const recipesJSON = await fs.readFile(fileName);
  const recipes = JSON.parse(recipesJSON);
  return recipes;
}

// GET A RECIPE BY ID
export async function getRecipeByID(id) {
  // should return the particular recipe we are looking for
  const recipesJSON = await fs.readFile(fileName);
  const recipes = JSON.parse(recipesJSON);
  const recipeFound = recipes.filter((recipe) => {
    return recipe.id === id;
  });
  return recipeFound;
}

// CREATE A RECIPE
export async function createRecipe(newRecipe) {
  // should add a recipe to the collection and return the new recipe
  const recipesJSON = await fs.readFile(fileName);
  const recipes = JSON.parse(recipesJSON);

  const recipeToAdd = {
    id: uuidv4(),
    title: newRecipe.title,
    ingredients: newRecipe.ingredients,
    instructions: newRecipe.instructions,
    image: newRecipe.image,
  };
  recipes.push(recipeToAdd);

  const stringifyRecipes = JSON.stringify(recipes);
  await fs.writeFile(fileName, stringifyRecipes, "utf8");
  return recipeToAdd;
}

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) {
  // should replace the recipe at a certain ID with an updated version and return the new recipe
}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {
  // should remove the specific recipe from the collection, and return the deleted recipe
}
