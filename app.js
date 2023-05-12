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

app.get("/api/recipes/:id", async function (req, res) {
  const recipe = await getRecipeByID(req.params.id);
  res.send(recipe);
  console.log(`Testing for id: ${req.params.id}`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
