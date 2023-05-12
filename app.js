import express from "express";

import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
} from "./recipes.js";

const app = express();
const PORT = 4000;

app.use(express.static("public"));
app.use(express.json());

// get all recipes
app.get("/api/recipes", async function (req, res) {
  const recipes = await getRecipes();
  res.send(recipes);
  console.log("Get recipes. Test");
});

// get recipe by id
app.get("/api/recipes/:id", async function (req, res) {
  const recipe = await getRecipeByID(req.params.id);
  res.send(recipe);
  console.log(`Testing for id: ${req.params.id}`);
});

// add recipe
app.post("/api/recipes", async function (req, res) {
  const newRecipe = await createRecipe(req.body);
  res.send(newRecipe);
  console.log(`Testing for new recipe`);
});

// update recipe
app.patch("/api/recipes/:id", async function (req, res) {
  const updatedRecipe = await updateRecipeByID(req.params.id, req.body);
  res.send(updatedRecipe);
  console.log(`Testing for updated recipe with id ${req.params.id}`);
});

// delete recipe

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
