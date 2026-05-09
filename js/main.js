/**
 * DishMaster - Homepage Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedRecipes();
    renderTrendingVideos();
    setupHomeSearch();
});

function renderFeaturedRecipes() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;

    // Get 4 recipes for the homepage (e.g., first 4 or random)
    const featured = window.recipeData.slice(0, 4);

    grid.innerHTML = featured.map(recipe => `
        <div class="recipe-card">
            <div class="recipe-img" style="position: relative;">
                <img src="${recipe.image}" alt="${recipe.name}">
                <button class="wishlist-btn" onclick="window.toggleWishlist('${recipe.id}', this, event)" style="position: absolute; top: 10px; right: 10px; background: white; border: none; border-radius: 50%; width: 35px; height: 35px; display: flex; justify-content: center; align-items: center; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.2); z-index: 2; transition: all 0.3s ease;">
                    <i class="${window.Utils.isFavorite(recipe.id) ? 'fas' : 'far'} fa-heart" style="color: ${window.Utils.isFavorite(recipe.id) ? 'var(--primary-color, red)' : '#666'}; font-size: 1.2rem;"></i>
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

function renderTrendingVideos() {
    const grid = document.getElementById('trendingVideoGrid');
    if (!grid) return;

    const videos = window.videoData;

    grid.innerHTML = videos.map(video => `
        <div class="video-card">
            <div class="video-thumb">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="play-overlay">
                    <div class="play-btn"><i class="fas fa-play"></i></div>
                </div>
                <span style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.8); color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">${video.duration}</span>
            </div>
            <div class="video-info">
                <h3 style="font-size: 1.1rem; margin-bottom: 5px; color: var(--text-dark);">${video.title}</h3>
                <div style="font-size: 0.8rem; color: var(--text-muted);">
                    <i class="far fa-eye"></i> ${video.views} views
                </div>
            </div>
        </div>
    `).join('');
}

function setupHomeSearch() {
    const searchInput = document.getElementById('homeSearch');
    const searchBtn = document.getElementById('searchBtn');

    if (searchInput && searchBtn) {
        const handleSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `recipes.html?search=${encodeURIComponent(query)}`;
            }
        };

        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }
}

/* Global UI Features */
window.addEventListener(" scroll\, () => {
 const scrollBtn = document.querySelector(.scroll-top-btn);
 if (scrollBtn) {
 if (window.scrollY > 300) {
 scrollBtn.classList.add(\show\);
 } else {
 scrollBtn.classList.remove(\show\);
 }
 }
});

function scrollToTop() {
 window.scrollTo({
 top: 0,
 behavior: \smooth\
 });
}

