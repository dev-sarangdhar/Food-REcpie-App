// Sample recipe data
const recipes = [
    { id: 1, name: "Chole Bhature" },
    { id: 2, name: "Chicken Curry" },
    { id: 3, name: "Garlic Cheese Sandwitch" },
    { id: 4, name: "Samosa Chat" },
    { id: 5, name: "Pastry" }
  ];
  
  // Elements
  const recipeList = document.getElementById("recipe-list");
  const bookmarkedList = document.getElementById("bookmarked-list");
  const searchBar = document.getElementById("search-bar");
  const clearBookmarksBtn = document.getElementById("clear-bookmarks");
  
  // Get bookmarks from localStorage
  const getBookmarkedRecipes = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    return bookmarks;
  };
  
  // Set bookmarks to localStorage
  const setBookmarkedRecipes = (bookmarks) => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };
  
  // Render recipes in the recipe list
  const renderRecipes = (recipesToDisplay) => {
    recipeList.innerHTML = '';
    recipesToDisplay.forEach((recipe) => {
      const li = document.createElement("li");
      li.textContent = recipe.name;
      const button = document.createElement("button");
      button.textContent = "Bookmark";
      button.onclick = () => bookmarkRecipe(recipe);
      li.appendChild(button);
      recipeList.appendChild(li);
    });
  };
  
  // Render bookmarked recipes
  const renderBookmarkedRecipes = () => {
    const bookmarks = getBookmarkedRecipes();
    bookmarkedList.innerHTML = '';
    bookmarks.forEach((recipe) => {
      const li = document.createElement("li");
      li.textContent = recipe.name;
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.onclick = () => removeBookmark(recipe);
      li.appendChild(removeButton);
      bookmarkedList.appendChild(li);
    });
  };
  
  // Bookmark a recipe
  const bookmarkRecipe = (recipe) => {
    const bookmarks = getBookmarkedRecipes();
    if (!bookmarks.some((bookmarkedRecipe) => bookmarkedRecipe.id === recipe.id)) {
      bookmarks.push(recipe);
      setBookmarkedRecipes(bookmarks);
      renderBookmarkedRecipes();
    }
  };
  
  // Remove a bookmark
  const removeBookmark = (recipe) => {
    let bookmarks = getBookmarkedRecipes();
    bookmarks = bookmarks.filter((bookmarkedRecipe) => bookmarkedRecipe.id !== recipe.id);
    setBookmarkedRecipes(bookmarks);
    renderBookmarkedRecipes();
  };
  
  // Clear all bookmarks
  clearBookmarksBtn.onclick = () => {
    setBookmarkedRecipes([]);
    renderBookmarkedRecipes();
  };
  
  // Search functionality
  searchBar.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchText)
    );
    renderRecipes(filteredRecipes);
  });
  
  // Initial rendering
  renderRecipes(recipes);
  renderBookmarkedRecipes();
  