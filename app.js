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
  let success = false;
  if (Object.keys(recipes).length > 0) {
    success = true;
    console.log(`Successfully fetched recipes`);
  }

  res.send({ success, recipes });

  console.log("Get recipes. Test");
});

// get recipe by id
app.get("/api/recipes/:id", async function (req, res) {
  const recipe = await getRecipeByID(req.params.id);
  let success = false;

  if (Object.keys(recipe).length > 0) {
    success = true;
    console.log(`Successfully fetched recipes`);
  }

  res.send({ success, recipe });

  console.log(`Testing for id: ${req.params.id}`);
});

// add recipe
app.post("/api/recipes", async function (req, res) {
  const newRecipe = await createRecipe(req.body);
  let success = false;

  if (Object.keys(newRecipe).length > 0) {
    success = true;
    console.log(`Successfully added recipe`);
  }

  res.send({ success, newRecipe });
  console.log(`Testing for new recipe`);
});

// update recipe
app.patch("/api/recipes/:id", async function (req, res) {
  const updatedRecipe = await updateRecipeByID(req.params.id, req.body);

  let success = false;

  if (Object.keys(updatedRecipe).length > 0) {
    success = true;
    console.log(`Successfully updated recipe`);
  }

  res.send({ success, updatedRecipe });
  console.log(`Testing for updated recipe with id ${req.params.id}`);
});

// delete recipe
app.delete("/api/recipes/:id", async (req, res) => {
  const deletedRecipe = await deleteRecipeByID(req.params.id);

  // Let's make it display all the recipes that are left to show that something has been deleted.
  const recipesAfterDelete = await getRecipes();

  let success = false;

  if (Object.keys(deletedRecipe).length > 0) {
    success = true;
    console.log(`Successfully deleted recipe`);
  }
  // return an object with value of success(boolean),
  // deleted recipe and recipes after delete
  res.send({ success, deletedRecipe, recipesAfterDelete });

  console.log("Testing for Delete.", { deletedRecipe });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
