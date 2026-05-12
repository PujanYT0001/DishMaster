document.addEventListener('DOMContentLoaded', () => {
    const orbitalSystem = document.querySelector('.orbital-system');
    const ring1 = document.querySelector('.ring-1');
    const ring2 = document.querySelector('.ring-2');
    const tickerWrap = document.querySelector('.ticker-wrap');

    // Data for orbiting items
    const foodItems = [
        { name: 'Burger', icon: '🍔', angle: 0, ring: 1 },
        { name: 'Pizza', icon: '🍕', angle: 72, ring: 1 },
        { name: 'Taco', icon: '🌮', angle: 144, ring: 1 },
        { name: 'Curry', icon: '🍛', angle: 216, ring: 1 },
        { name: 'Salad', icon: '🥗', angle: 288, ring: 1 },
        { name: 'Sushi', icon: '🍣', angle: 45, ring: 2 },
        { name: 'Pasta', icon: '🍝', angle: 135, ring: 2 },
        { name: 'Ramen', icon: '🍜', angle: 225, ring: 2 },
        { name: 'Steak', icon: '🥩', angle: 315, ring: 2 }
    ];

    // Function to place items on rings
    const placeOrbitItems = () => {
        foodItems.forEach((item, index) => {
            const orbitItem = document.createElement('div');
            orbitItem.className = 'orbit-item';
            orbitItem.innerHTML = `<span style="font-size: 2rem;">${item.icon}</span>`;
            
            const radius = item.ring === 1 ? 225 : 290; // Half of ring width/height
            const radian = (item.angle * Math.PI) / 180;
            
            // We'll append them to the rings so they rotate with them
            const targetRing = item.ring === 1 ? ring1 : ring2;
            
            // Calculate position relative to ring center (50% 50%)
            // Since the ring itself rotates, we just need to place them once
            orbitItem.style.left = `calc(50% + ${radius * Math.cos(radian)}px - 40px)`;
            orbitItem.style.top = `calc(50% + ${radius * Math.sin(radian)}px - 40px)`;
            
            // To keep icons upright, we'd need to counter-rotate them, 
            // but for a "space" feel, letting them spin with the ring can look cool too.
            // Let's keep them attached to the ring.
            targetRing.appendChild(orbitItem);
        });
    };

    // Trending Ticker Items
    const trendingItems = [
        { tag: 'TRENDING', text: 'Spicy Garlic Butter Ramen' },
        { tag: 'NEW', text: 'Classic Italian Tiramisu' },
        { tag: 'POPULAR', text: 'Crispy Korean Fried Chicken' },
        { tag: 'FEATURED', text: 'Homemade Sourdough Bread' },
        { tag: 'LIVE', text: 'Masterclass: French Pastry' }
    ];

    const setupTicker = () => {
        // Double the items for seamless loop
        const tickerContent = [...trendingItems, ...trendingItems].map(item => `
            <div class="ticker-item">
                <span>${item.tag}</span> ${item.text}
            </div>
        `).join('');
        tickerWrap.innerHTML = tickerContent;
    };

    // Info Tags - Floating around randomly
    const setupInfoTags = () => {
        const tags = [
            { text: '🔥 2.4k Cooking Now', top: '15%', left: '10%' },
            { text: '⭐ 4.9 Average Rating', top: '70%', left: '15%' },
            { text: '⏱️ 20 min Quick Meals', top: '25%', left: '80%' },
            { text: '👨‍🍳 Pro Tips Included', top: '75%', left: '75%' }
        ];

        tags.forEach((tag, i) => {
            const tagEl = document.createElement('div');
            tagEl.className = 'info-tag';
            tagEl.innerHTML = tag.text;
            tagEl.style.top = tag.top;
            tagEl.style.left = tag.left;
            tagEl.style.animationDelay = `${i * 1}s`;
            orbitalSystem.parentElement.appendChild(tagEl);
        });
    };

    placeOrbitItems();
    setupTicker();
    setupInfoTags();

    // Hover effect on the central dish to pause orbit? (Optional)
    const heroDish = document.querySelector('.hero-dish-wrapper');
    heroDish.addEventListener('mouseenter', () => {
        ring1.style.animationPlayState = 'paused';
        ring2.style.animationPlayState = 'paused';
    });
    heroDish.addEventListener('mouseleave', () => {
        ring1.style.animationPlayState = 'running';
        ring2.style.animationPlayState = 'running';
    });
});
