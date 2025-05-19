// Gift ideas database with tags
const giftIdeas = [
  {
    id: 1,
    title: "Customized Pixel Portrait",
    description: "A personalized pixel art portrait of the recipient in a retro gaming style.",
    price: "$25-45",
    tags: ["birthday", "anniversary", "art", "personalized", "cute"]
  },
  {
    id: 2,
    title: "Mechanical Keyboard",
    description: "A satisfying mechanical keyboard with customizable RGB lighting and clickety keys.",
    price: "$60-120",
    tags: ["tech", "gaming", "graduation", "christmas"]
  },
  {
    id: 3,
    title: "Succulents Starter Kit",
    description: "Collection of 5 cute mini succulents in pastel colored pots.",
    price: "$30-45",
    tags: ["housewarming", "birthday", "cute", "plants"]
  },
  {
    id: 4,
    title: "Vintage Polaroid Camera",
    description: "Instant camera that prints physical photos with that nostalgic feel.",
    price: "$70-150",
    tags: ["birthday", "graduation", "photography", "tech", "retro"]
  },
  {
    id: 5,
    title: "Japanese Stationery Box",
    description: "Kawaii stationery set with cute pens, washi tapes, and stickers.",
    price: "$20-35",
    tags: ["birthday", "cute", "art", "stationery"]
  },
  {
    id: 6,
    title: "Sunset Lamp Projector",
    description: "Projects a beautiful sunset glow on any wall for the perfect aesthetic vibes.",
    price: "$25-40",
    tags: ["housewarming", "birthday", "aesthetic", "decor"]
  },
  {
    id: 7,
    title: "Personalized Star Map",
    description: "Custom star map showing the night sky from any location and date.",
    price: "$30-60",
    tags: ["anniversary", "wedding", "birthday", "personalized"]
  },
  {
    id: 8,
    title: "Anime Themed Cookbook",
    description: "Recipes inspired by popular anime, with beautiful illustrations.",
    price: "$25-35",
    tags: ["birthday", "housewarming", "anime", "food"]
  },
  {
    id: 9,
    title: "Retro Gaming Console",
    description: "Mini console with classic games from the 80s and 90s.",
    price: "$50-100",
    tags: ["birthday", "christmas", "tech", "gaming", "retro"]
  },
  {
    id: 10,
    title: "Digital Art Tablet",
    description: "Drawing tablet for creating digital art, perfect for aspiring artists.",
    price: "$50-200",
    tags: ["birthday", "graduation", "art", "tech"]
  },
  {
    id: 11,
    title: "Lo-Fi Vinyl Record",
    description: "Relaxing lo-fi beats on vinyl for the ultimate chill vibes.",
    price: "$25-40",
    tags: ["birthday", "music", "aesthetic", "retro"]
  },
  {
    id: 12,
    title: "Mini Espresso Machine",
    description: "Compact espresso maker for perfect coffee at home.",
    price: "$80-120",
    tags: ["housewarming", "wedding", "graduation", "coffee"]
  },
  {
    id: 13,
    title: "Custom Pet Portrait",
    description: "Artist-made portrait of their beloved pet in a cute pixel style.",
    price: "$40-100",
    tags: ["birthday", "christmas", "art", "pet", "personalized"]
  },
  {
    id: 14,
    title: "Ambient Light Strip Kit",
    description: "LED strips that can be controlled by app for the perfect room ambiance.",
    price: "$30-60",
    tags: ["housewarming", "tech", "decor", "aesthetic"]
  },
  {
    id: 15,
    title: "Vintage Style Headphones",
    description: "Retro-looking headphones with modern sound quality.",
    price: "$70-150",
    tags: ["birthday", "graduation", "music", "tech", "retro"]
  },
  {
    id: 16,
    title: "Self-Care Gift Basket",
    description: "Collection of bath bombs, face masks, and relaxing candles.",
    price: "$40-80",
    tags: ["birthday", "anniversary", "wellness", "self-care"]
  },
  {
    id: 17,
    title: "Board Game Collection",
    description: "Set of fun board games for game nights with friends and family.",
    price: "$50-100",
    tags: ["housewarming", "christmas", "games", "family"]
  },
  {
    id: 18,
    title: "Aesthetic Neon Sign",
    description: "Custom neon sign with their favorite quote or design.",
    price: "$50-150",
    tags: ["birthday", "housewarming", "decor", "aesthetic", "personalized"]
  }
];

// DOM Elements
const giftIdeasContainer = document.getElementById('gift-ideas-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const tagElements = document.querySelectorAll('.tag');

// Active tags to filter by
let activeTags = [];

// Initialize the page
function init() {
  displayGiftIdeas(giftIdeas);
  setupEventListeners();
}

// Event listeners
function setupEventListeners() {
  // Search button click
  searchButton.addEventListener('click', handleSearch);
  
  // Search input enter key
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });
  
  // Tag clicks
  tagElements.forEach(tag => {
    tag.addEventListener('click', () => {
      const tagValue = tag.getAttribute('data-tag');
      
      // Toggle tag selection
      if (activeTags.includes(tagValue)) {
        activeTags = activeTags.filter(t => t !== tagValue);
        tag.classList.remove('active');
      } else {
        activeTags.push(tagValue);
        tag.classList.add('active');
      }
      
      filterGiftIdeas();
    });
  });
}

// Handle search functionality
function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  if (searchTerm === '') {
    // If search is empty, just filter by active tags
    filterGiftIdeas();
    return;
  }
  
  const filteredGifts = giftIdeas.filter(gift => {
    // Check if the search term is in the title, description or tags
    const inTitle = gift.title.toLowerCase().includes(searchTerm);
    const inDescription = gift.description.toLowerCase().includes(searchTerm);
    const inTags = gift.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    
    // Also respect active tag filters
    const matchesTags = activeTags.length === 0 || 
                        activeTags.some(tag => gift.tags.includes(tag));
    
    return (inTitle || inDescription || inTags) && matchesTags;
  });
  
  displayGiftIdeas(filteredGifts);
}

// Filter gift ideas based on active tags
function filterGiftIdeas() {
  let filteredGifts = giftIdeas;
  
  // Apply tag filters if any are active
  if (activeTags.length > 0) {
    filteredGifts = giftIdeas.filter(gift => 
      activeTags.some(tag => gift.tags.includes(tag))
    );
  }
  
  // Also apply search term if present
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm !== '') {
    filteredGifts = filteredGifts.filter(gift => {
      return gift.title.toLowerCase().includes(searchTerm) || 
             gift.description.toLowerCase().includes(searchTerm) ||
             gift.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    });
  }
  
  displayGiftIdeas(filteredGifts);
}

// Display gift ideas in the container
function displayGiftIdeas(gifts) {
  // Clear current content
  giftIdeasContainer.innerHTML = '';
  
  if (gifts.length === 0) {
    giftIdeasContainer.innerHTML = `
      <div class="no-results">
        <p>No gift ideas found. Try different search terms or tags!</p>
      </div>
    `;
    return;
  }
  
  // Create gift cards
  gifts.forEach(gift => {
    const giftCard = document.createElement('div');
    giftCard.className = 'gift-card';
    
    // Create tags HTML
    const tagsHTML = gift.tags.map(tag => 
      `<span class="gift-tag">${tag}</span>`
    ).join('');
    
    // Fill the card with gift info
    giftCard.innerHTML = `
      <h3 class="gift-title">${gift.title}</h3>
      <p class="gift-description">${gift.description}</p>
      <div class="gift-price">${gift.price}</div>
      <div class="gift-tags">${tagsHTML}</div>
    `;
    
    // Add randomized animation delay for staggered entrance
    const delay = Math.random() * 0.5;
    giftCard.style.animationDelay = `${delay}s`;
    
    // Add to container
    giftIdeasContainer.appendChild(giftCard);
  });
  
  // Add animation to cards
  const cards = document.querySelectorAll('.gift-card');
  cards.forEach((card, index) => {
    // Add a delayed entrance animation
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Add a slight floating animation to cards
function addFloatingEffect() {
  const cards = document.querySelectorAll('.gift-card');
  cards.forEach(card => {
    // Random values for unique floating animation
    const randomX = Math.random() * 5 - 2.5; // -2.5 to 2.5px
    const randomDuration = 2 + Math.random() * 2; // 2-4s
    
    card.style.animation = `floating ${randomDuration}s ease-in-out infinite`;
    card.style.transform = `translateY(0) rotate(${randomX/2}deg)`;
  });
}

// Add floating animation definition
const style = document.createElement('style');
style.textContent = `
  @keyframes floating {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-5px) rotate(1deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
  
  .gift-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s ease, transform 0.5s ease;
  }
`;
document.head.appendChild(style);

// Initialize the app when the page is loaded
window.addEventListener('load', init);
