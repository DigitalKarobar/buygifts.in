// JavaScript code
fetch('data.json')
  .then(response => response.json())
  .then(products => {
    const navMenu = document.getElementById('navMenu');
    const productListDiv = document.getElementById('productList');

    // Function to generate product elements
    function generateProductElement(product) {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';

      const imageElement = document.createElement('img');
      imageElement.src = product.image;
      imageElement.alt = product.title;

      const titleElement = document.createElement('h3');
      titleElement.textContent = product.title;

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = product.description;

      const linkElement = document.createElement('a');
      linkElement.href = product.link;
      linkElement.textContent = 'Buy Now';

      productDiv.appendChild(imageElement);
      productDiv.appendChild(titleElement);
      productDiv.appendChild(descriptionElement);
      productDiv.appendChild(linkElement);

      return productDiv;
    }

    // Function to filter products based on the selected category
    function filterProducts(category) {
      productListDiv.innerHTML = '';

      if (category === 'all') {
        products.forEach((product) => {
          const productElement = generateProductElement(product);
          productListDiv.appendChild(productElement);
        });
      } else {
        const filteredProducts = products.filter(product => product.category === category);
        filteredProducts.forEach((product) => {
          const productElement = generateProductElement(product);
          productListDiv.appendChild(productElement);
        });
      }
    }

    // Function to search for products
    function searchProducts(event) {
      event.preventDefault();
      const searchInput = document.getElementById('searchInput');
      const searchTerm = searchInput.value.toLowerCase().trim();

      const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );

      filterProducts('all'); // Reset filters
      displayFilteredProducts(filteredProducts);
    }

    // Function to display filtered products
    function displayFilteredProducts(filteredProducts) {
      productListDiv.innerHTML = '';

      if (filteredProducts.length === 0) {
        const noResultsElement = document.createElement('p');
        noResultsElement.textContent = 'No matching products found.';
        productListDiv.appendChild(noResultsElement);
      } else {
        filteredProducts.forEach((product) => {
          const productElement = generateProductElement(product);
          productListDiv.appendChild(productElement);
        });
      }
    }

    // Scroll-to-top button functionality
    const scrollToTopButton = document.getElementById("scrollToTopButton");
    window.onscroll = function() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.display = "block";
      } else {
        scrollToTopButton.style.display = "none";
      }
    };

    function scrollToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

    // Populate navigation menu
    // const categories = ['all', ...new Set(products.map(product => product.category))];
    const categories = ['all', 'Books', 'Gadget', 'Best Seller', 'Computer', 'Health & Lifestyle'];
    categories.forEach(category => {
      const liElement = document.createElement('li');
      const aElement = document.createElement('a');
      aElement.href = '#';
      aElement.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      aElement.addEventListener('click', () => filterProducts(category));
      liElement.appendChild(aElement);
      navMenu.appendChild(liElement);
    });

    // Load all categories' products by default
    filterProducts('all');

    // Event listener for search form submission
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', searchProducts);
  });
