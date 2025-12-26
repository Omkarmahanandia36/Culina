window.CulinaRecipes=(() => {
    function getMockRecipes(){
        return [
            {
                id:"r1",
                title:"Vegetable stir fry",
                image:"https://www.sharmispassions.com/wp-content/uploads/2022/12/VegClearSoup4.jpg",
                diet:"Vegetarian",
                cooking_time:20,
                rating:4.0
            },

            {
                id: "r2",
                title: "Grilled Chicken Bowl",
                image: "https://www.femalefoodie.com/wp-content/uploads/2023/11/mediterranean-rice-bowl.jpg",
                diet: "Non-Vegetarian",
                cooking_time: 30,
                rating: 4.5
            },
            {
                id: "r3",
                title: "Vegan Lentil Soup",
                image: "https://playswellwithbutter.com/wp-content/uploads/2020/12/Damn-Good-Lentil-Soup-15.jpg",
                diet: "Vegan",
                cooking_time: 25,
                rating: 4.0
            }
        ];
    }
    function renderRecipes(recipes) {
        const container = document.getElementById("recipe-list");
        container.innerHTML = "";

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";

    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p>Diet: ${recipe.diet}</p>
        <p>Cooking Time: ${recipe.cooking_time} mins</p>
        <p>Rating: ${recipe.rating}</p>
      `;

      container.appendChild(card);
    });
  }

  function loadHome() {
    const recipes = getMockRecipes();
    renderRecipes(recipes);
  }

  return { loadHome };


})();