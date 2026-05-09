/**
 * DishMaster - Recipe Detail Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');

    if (recipeId) {
        const recipe = window.recipeData.find(r => r.id === recipeId);
        if (recipe) {
            renderRecipeDetail(recipe);
            updateSaveButton(recipeId);
        } else {
            document.getElementById('recipeDetailContent').innerHTML = '<h2>Recipe not found!</h2>';
        }
    } else {
        window.location.href = 'recipes.html';
    }
});

function renderRecipeDetail(recipe) {
    const container = document.getElementById('recipeDetailContent');
    
    container.innerHTML = `
        <div class="recipe-header">
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="header-overlay">
                <h1 style="font-size: 3rem; margin-bottom: 10px;">${recipe.name}</h1>
                <p style="font-size: 1.2rem; opacity: 0.9; max-width: 700px;">${recipe.description}</p>
                <div class="meta-tags">
                    <span class="meta-tag"><i class="far fa-clock"></i> ${recipe.time}</span>
                    <span class="meta-tag"><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
                    <span class="meta-tag"><i class="fas fa-users"></i> ${recipe.servings} Servings</span>
                    <span class="meta-tag"><i class="fas fa-star"></i> ${recipe.rating}</span>
                </div>
            </div>
        </div>

        <div class="detail-grid">
            <div class="detail-main">
                <section class="ingredients" style="margin-bottom: 50px;">
                    <h2 style="margin-bottom: 25px;">Ingredients</h2>
                    <div class="ingredients-list">
                        ${recipe.ingredients.map(ing => `
                            <div class="ingredient-item">
                                <input type="checkbox" style="width: 20px; height: 20px; accent-color: var(--primary);">
                                <span>${ing}</span>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <section class="instructions" style="margin-bottom: 50px;">
                    <h2 style="margin-bottom: 25px;">Cooking Instructions</h2>
                    <div class="steps-list">
                        ${recipe.steps.map((step, index) => `
                            <div class="step-item">
                                <span class="step-number">${index + 1}</span>
                                <p>${step}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <section class="video-section">
                    <h2 style="margin-bottom: 25px;">Watch the Video Tutorial</h2>
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/${recipe.youtubeId}" frameborder="0" allowfullscreen></iframe>
                    </div>
                </section>
            </div>

            <div class="detail-sidebar">
                <div class="nutrition-card">
                    <h3 style="margin-bottom: 15px;">Nutrition Facts</h3>
                    <p style="font-size: 0.9rem; color: var(--text-muted);">Per Serving</p>
                    <div class="nutrition-grid">
                        <div class="nut-item">
                            <span class="nut-val">${recipe.nutrition.calories}</span>
                            <span class="nut-label">Calories</span>
                        </div>
                        <div class="nut-item">
                            <span class="nut-val">${recipe.nutrition.protein}</span>
                            <span class="nut-label">Protein</span>
                        </div>
                        <div class="nut-item">
                            <span class="nut-val">${recipe.nutrition.fat}</span>
                            <span class="nut-label">Fat</span>
                        </div>
                        <div class="nut-item">
                            <span class="nut-val">${recipe.nutrition.carbs}</span>
                            <span class="nut-label">Carbs</span>
                        </div>
                    </div>
                </div>

                <div class="tips-card" style="margin-top: 30px; background: #FFF0E6; padding: 25px; border-radius: 20px; border-left: 5px solid var(--primary);">
                    <h3 style="margin-bottom: 15px; color: var(--primary);"><i class="fas fa-lightbulb"></i> Chef's Tips</h3>
                    <ul style="padding-left: 20px; list-style-type: disc;">
                        ${recipe.tips.map(tip => `<li style="margin-bottom: 10px; font-size: 0.95rem;">${tip}</li>`).join('')}
                    </ul>
                </div>

                <div class="share-card" style="margin-top: 30px; text-align: center;">
                    <p style="margin-bottom: 15px; font-weight: 600;">Share this recipe</p>
                    <div style="display: flex; justify-content: center; gap: 15px;">
                        <button class="social-icon" style="background: #3b5998; color: white;"><i class="fab fa-facebook-f"></i></button>
                        <button class="social-icon" style="background: #1da1f2; color: white;"><i class="fab fa-twitter"></i></button>
                        <button class="social-icon" style="background: #25d366; color: white;"><i class="fab fa-whatsapp"></i></button>
                        <button class="social-icon" style="background: var(--primary); color: white;"><i class="fas fa-link"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Setup Save button
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.onclick = () => {
            const isSaved = window.Utils.isFavorite(recipe.id);
            if (isSaved) {
                window.Utils.removeFromFavorites(recipe.id);
                saveBtn.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
                saveBtn.style.color = '';
            } else {
                window.Utils.saveToFavorites(recipe.id);
                saveBtn.innerHTML = '<i class="fas fa-heart"></i> Wishlisted';
                saveBtn.style.color = 'var(--primary)';
            }
        };
    }
}

function updateSaveButton(recipeId) {
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn && window.Utils.isFavorite(recipeId)) {
        saveBtn.innerHTML = '<i class="fas fa-heart"></i> Wishlisted';
        saveBtn.style.color = 'var(--primary)';
    } else if (saveBtn) {
        saveBtn.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
        saveBtn.style.color = '';
    }
}
