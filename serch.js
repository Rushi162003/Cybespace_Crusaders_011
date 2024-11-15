// Function to fetch products based on category (simulating categories with IDs)
async function fetchProducts(category) {
  try {
      // Fetch posts from JSONPlaceholder
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();
      
      // Clear the previous products
      document.getElementById('product-list').innerHTML = '';
      
      // Simulate categories by filtering posts based on category (here using category numbers 1-5)
      const categoryPosts = posts.filter(post => {
          return post.id % 5 === category; // Simulating 5 categories based on ID
      });
      
      // Display the products
      categoryPosts.forEach(post => {
          const productDiv = document.createElement('div');
          productDiv.classList.add('product-item');
          productDiv.innerHTML = `
              <img src="https://via.placeholder.com/150" alt="Product Image">
              <h3>${post.title}</h3>
              <p>${post.body}</p>
          `;
          document.getElementById('product-list').appendChild(productDiv);
      });
  } catch (error) {
      console.error("Error fetching products:", error);
  }
}

// Event listeners for buttons
document.getElementById('category1').addEventListener('click', () => fetchProducts(1));
document.getElementById('category2').addEventListener('click', () => fetchProducts(2));
document.getElementById('category3').addEventListener('click', () => fetchProducts(3));
document.getElementById('category4').addEventListener('click', () => fetchProducts(4));
document.getElementById('category5').addEventListener('click', () => fetchProducts(5));