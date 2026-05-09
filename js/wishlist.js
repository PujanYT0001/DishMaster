/**
 * DishMaster - Wishlist Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    renderWishlist();
});

function renderWishlist() {
    const grid = document.getElementById('wishlistGrid');
    if (!grid) return;

    const favorites = JSON.parse(localStorage.getItem('dm-favorites') || '[]');
    
    if (favorites.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                <i class="far fa-heart fa-4x" style="color: #ccc; margin-bottom: 20px;"></i>
                <h3>Your wishlist is empty</h3>
                <p style="margin-top: 10px; color: var(--text-muted);">Explore our recipes and click the heart icon to save them here.</p>
                <a href="recipes.html" class="btn btn-primary" style="margin-top: 20px; display: inline-block;">Browse Recipes</a>
            </div>
        `;
        return;
    }

    // Filter all recipes down to just the favorited ones
    const savedRecipes = window.recipeData.filter(recipe => favorites.includes(recipe.id));

    grid.innerHTML = savedRecipes.map(recipe => `
        <div class="recipe-card" id="wishlist-card-${recipe.id}">
            <div class="recipe-img" style="position: relative;">
                <img src="${recipe.image}" alt="${recipe.name}">
                <button class="wishlist-btn" onclick="removeWishlistItem('${recipe.id}')" style="position: absolute; top: 10px; right: 10px; background: white; border: none; border-radius: 50%; width: 35px; height: 35px; display: flex; justify-content: center; align-items: center; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.2); z-index: 2; transition: all 0.3s ease;">
                    <i class="fas fa-trash" style="color: #ff4444; font-size: 1.1rem;"></i>
                </button>
            </div>
            <div class="recipe-info">
                <div class="recipe-meta">
                    <span><i class="far fa-clock"></i> ${recipe.time}</span>
                    <span><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
                </div>
                <h3 class="recipe-name">${recipe.name}</h3>
                <p class="recipe-desc">${recipe.description}</p>
                <div class="recipe-footer">
                    <div class="rating">
                        <i class="fas fa-star"></i> ${recipe.rating}
                    </div>
                    <a href="recipe-detail.html?id=${recipe.id}" class="btn btn-primary btn-sm" style="padding: 8px 16px; font-size: 0.8rem;">View Recipe</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Special wrapper to re-render the page after removing an item from the wishlist page
window.removeWishlistItem = function(recipeId) {
    window.Utils.removeFromFavorites(recipeId);
    renderWishlist(); // re-render the UI
};
