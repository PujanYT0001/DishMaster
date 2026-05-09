/**
 * DishMaster - Global Application Logic
 * Handles themes, shared UI components, and state
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    setupNewsletter();
});

// Theme Management
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('dish-master-theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('dish-master-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Navbar Scroll Effect
function initNavbar() {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.backgroundColor = document.documentElement.getAttribute('data-theme') === 'dark' 
                ? 'rgba(18, 18, 18, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            nav.style.height = '70px';
        } else {
            nav.style.backgroundColor = document.documentElement.getAttribute('data-theme') === 'dark'
                ? 'rgba(18, 18, 18, 0.8)'
                : 'rgba(255, 255, 255, 0.8)';
            nav.style.boxShadow = 'none';
            nav.style.height = '80px';
        }
    });
}

// Newsletter
function setupNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input').value;
            if (email) {
                alert(`Thank you for subscribing, ${email}!`);
                form.reset();
            }
        });
    }
}

// Global Utilities
const Utils = {
    formatDate: (date) => {
        return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
    },
    
    saveToFavorites: (recipeId) => {
        let favorites = JSON.parse(localStorage.getItem('dm-favorites') || '[]');
        if (!favorites.includes(recipeId)) {
            favorites.push(recipeId);
            localStorage.setItem('dm-favorites', JSON.stringify(favorites));
            return true;
        }
        return false;
    },
    
    removeFromFavorites: (recipeId) => {
        let favorites = JSON.parse(localStorage.getItem('dm-favorites') || '[]');
        favorites = favorites.filter(id => id !== recipeId);
        localStorage.setItem('dm-favorites', JSON.stringify(favorites));
    },
    
    isFavorite: (recipeId) => {
        const favorites = JSON.parse(localStorage.getItem('dm-favorites') || '[]');
        return favorites.includes(recipeId);
    }
};

window.Utils = Utils;

// Global Wishlist UI Handler
window.toggleWishlist = function(recipeId, btnElement, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const isFav = window.Utils.isFavorite(recipeId);
    const icon = btnElement.querySelector('i');
    
    if (isFav) {
        window.Utils.removeFromFavorites(recipeId);
        icon.className = 'far fa-heart';
        icon.style.color = '#666';
    } else {
        window.Utils.saveToFavorites(recipeId);
        icon.className = 'fas fa-heart';
        icon.style.color = 'var(--primary-color, red)';
    }
};

/* Global Scroll Logic */
window.addEventListener("scroll", () => {
    const scrollBtn = document.querySelector(".scroll-top-btn");
    if (scrollBtn) {
        if (window.scrollY > 300) {
            scrollBtn.classList.add("show");
        } else {
            scrollBtn.classList.remove("show");
        }
    }
});

window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

