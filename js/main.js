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

    // Use asymmetric grid for homepage
    grid.className = 'featured-grid-asymmetric';

    // Get 3 recipes for the asymmetric layout
    const featured = window.recipeData.slice(0, 3);

    grid.innerHTML = featured.map((recipe, index) => `
        <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.name}" class="card-img">
            <div class="card-overlay">
                <div class="recipe-meta" style="margin-bottom: 10px; color: var(--accent-orange); font-weight: 600; font-size: 0.8rem; display: flex; gap: 15px;">
                    <span><i class="far fa-clock"></i> ${recipe.time}</span>
                    <span><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
                </div>
                <h3 class="recipe-name" style="color: white; font-family: 'Clash Display', sans-serif; font-size: ${index === 0 ? '2.5rem' : '1.5rem'}; margin-bottom: 10px;">${recipe.name}</h3>
                <p class="recipe-desc" style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 20px;">${recipe.description}</p>
                <div class="recipe-footer" style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="rating" style="color: #FFB800;">
                        <i class="fas fa-star"></i> ${recipe.rating}
                    </div>
                    <a href="recipe-detail.html?id=${recipe.id}" class="btn btn-primary" style="background: var(--accent-orange); border: none; padding: 10px 20px; font-size: 0.8rem;">View Recipe</a>
                </div>
            </div>
            <button class="wishlist-btn" onclick="window.toggleWishlist('${recipe.id}', this, event)" style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; cursor: pointer; z-index: 5; transition: all 0.3s ease;">
                <i class="${window.Utils.isFavorite(recipe.id) ? 'fas' : 'far'} fa-heart" style="color: ${window.Utils.isFavorite(recipe.id) ? 'var(--accent-orange)' : 'white'}; font-size: 1.1rem;"></i>
            </button>
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

