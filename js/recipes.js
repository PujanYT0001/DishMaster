/**
 * DishMaster - Recipes Listing Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const initialCat = params.get('cat');
    const initialSearch = params.get('search');

    if (initialCat) {
        const checkbox = document.querySelector(`.filter-list input[value="${initialCat}"]`);
        if (checkbox) checkbox.checked = true;
    }
    
    if (initialSearch) {
        document.getElementById('recipeSearch').value = initialSearch;
    }

    renderRecipes();
    setupEventListeners();
});

function renderRecipes() {
    const grid = document.getElementById('allRecipesGrid');
    if (!grid) return;

    const filtered = filterData();
    const sorted = sortData(filtered);

    document.getElementById('resultsCount').textContent = `${sorted.length} recipes found`;

    if (sorted.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px;"><h3>No recipes found matching your criteria.</h3></div>';
        return;
    }

    grid.innerHTML = sorted.map(recipe => `
        <div class="recipe-card">
            <div class="recipe-img" style="position: relative;">
                <img src="${recipe.image}" alt="${recipe.name}">
                <button class="wishlist-btn" onclick="window.toggleWishlist('${recipe.id}', this, event)" style="position: absolute; top: 10px; right: 10px; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 50%; width: 35px; height: 35px; display: flex; justify-content: center; align-items: center; cursor: pointer; z-index: 2; transition: all 0.3s ease;">
                    <i class="${window.Utils.isFavorite(recipe.id) ? 'fas' : 'far'} fa-heart" style="color: ${window.Utils.isFavorite(recipe.id) ? 'var(--primary)' : 'white'}; font-size: 1.2rem;"></i>
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

function filterData() {
    const search = document.getElementById('recipeSearch').value.toLowerCase();
    const categories = Array.from(document.querySelectorAll('#categoryFilters input:checked')).map(i => i.value);
    const difficulties = Array.from(document.querySelectorAll('#difficultyFilters input:checked')).map(i => i.value);
    const diet = document.querySelector('#dietaryFilters input:checked').value;

    return window.recipeData.filter(recipe => {
        const matchesSearch = recipe.name.toLowerCase().includes(search) || 
                            recipe.description.toLowerCase().includes(search) ||
                            recipe.category.toLowerCase().includes(search);
        
        const matchesCat = categories.length === 0 || categories.includes(recipe.category);
        const matchesDiff = difficulties.length === 0 || difficulties.includes(recipe.difficulty);
        
        let matchesDiet = true;
        if (diet === 'veg') matchesDiet = recipe.veg === true;
        if (diet === 'non-veg') matchesDiet = recipe.veg === false;

        return matchesSearch && matchesCat && matchesDiff && matchesDiet;
    });
}

function sortData(data) {
    const sortBy = document.getElementById('sortSelect').value;
    
    return [...data].sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'time') {
            const timeA = parseInt(a.time) || 0;
            const timeB = parseInt(b.time) || 0;
            return timeA - timeB;
        }
        return 0; // Default: newest (assuming data order)
    });
}

function setupEventListeners() {
    const inputs = document.querySelectorAll('aside input, #sortSelect');
    inputs.forEach(input => {
        input.addEventListener('change', renderRecipes);
    });

    const searchInput = document.getElementById('recipeSearch');
    searchInput.addEventListener('input', () => {
        // Debounce search
        clearTimeout(window.searchTimer);
        window.searchTimer = setTimeout(renderRecipes, 300);
    });
}
