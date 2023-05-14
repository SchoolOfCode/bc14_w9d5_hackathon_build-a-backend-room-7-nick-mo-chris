// Define the URL for the API
const url = "http://localhost:4000";
// Select DOM elements
const recipesSection = document.querySelector("#recipes");
const getRecipeButton = document.querySelector("#get-recipes");
const submitButton = document.querySelector("button[type='submit']");
const ingredientButton = document.querySelector("#add-ingredient");
const ingredientsInput = document.querySelector("#ingredients-input");
const ingredientsList = document.querySelector("#ingredients-list");
// Add event listeners
ingredientButton.addEventListener("click", addIngredient);
submitButton.addEventListener("click", handleSubmit);
getRecipeButton.addEventListener("click", handleClick);
// Function to add ingredient to list
function addIngredient(event) {
  event.preventDefault();
  // Create new list item and add to list
  const li = document.createElement("li");
  const { value } = ingredientsInput;
  if (value === "") {
    return;
  }
  li.innerText = value;
  ingredientsInput.value = "";
  ingredientsList.appendChild(li);
}
// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();
  // Send POST request to API to create new recipe
  createRecipe();
  // getRecipes();
}
// Async function to create new recipe by sending POST request to API
async function createRecipe() {
  console.log(gatherFormData());
  const response = await fetch(`${url}/api/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gatherFormData()),
  });
  const data = await response.json();
  console.log(data);
}
// Function to gather form data and return it as an object
function gatherFormData() {
  const title = document.querySelector("#title").value;
  const ingredientsList = document.querySelectorAll("#ingredients-list > li");
  const ingredients = Array.from(ingredientsList).map((li) => li.innerText);
  const instructions = document.querySelector("#instructions").value;
  const image = document.querySelector("#image-url").value;
  return {
    title,
    ingredients,
    instructions,
    image,
  };
}
// Function to handle click on "Get Recipes" button
function handleClick(event) {
  event.preventDefault();
  getRecipes();
}
// Async function to retrieve all recipes from API and display them on the page
async function getRecipes() {
  const response = await fetch(`${url}/api/recipes`);
  const { payload } = await response.json();
  recipesSection.innerHTML = "";
  console.log(payload);

  // insert each payload item (recipe) in the recipes section
  payload.forEach((item) =>
    recipesSection.insertAdjacentHTML(
      "beforeend",
      `<div className="recipe">
      <h2>${item.title}</h2>
      <img src=${item.image} alt="recipe-image" className="recipe-image" />
<h3>Ingredients:</h3>
  <p>${item.ingredients}</p>
  <h3>Instructions:</h3>
<p>${item.instructions}</p>
      </div>`
    )
  );

  // payload.forEach(renderRecipe);
}
// Function to render recipe on the page
// function renderRecipe(recipe) {
//   const article = createRecipeView(recipe);
//   recipesSection.appendChild(article);
// }
// Function to create HTML element for a recipe
// function createRecipeView({ title, ingredients, instructions, image }) {
//   const article = document.createElement("article");
//   const h2 = document.createElement("h2");
//   h2.innerText = title;
//   const p = document.createElement("p");
//   p.innerText = instructions;
//   const img = document.createElement("img");
//   img.src = image;
//   img.alt = title;
//   const list = createIngredientsList(ingredients);
//   article.appendChild(h2);
//   article.appendChild(img);
//   article.appendChild(list);
//   article.appendChild(p);
//   return article;
// }
// Function to create HTML element for a list of ingredients
// function createIngredientsList(ingredients) {
//   const ul = document.createElement("ul");
//   ingredients.map(createIngredient).forEach(function (item) {
//     ul.appendChild(item);
//   });
//   return ul;
// }
// Call getRecipes function to display recipes on page when page is loaded
getRecipes();
