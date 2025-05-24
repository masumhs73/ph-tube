// function loadCategories () {
//     fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
//     .then(res => res.json())
//     .then((data) => displayCategories(data.categories))
// }

// function displayCategories(categories) {
//     // get the container
//     const categoryContainer = document.getElementById('category-container');

//     // Loop operation on Array of object
//     for (const cat of categories) {
//         // console.log(cat);
//         // Create element
//         const categoryDiv = document.createElement("div");
//         categoryDiv.innerHTML = `
//         <button onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
//         `
//         // Append the element
//         categoryContainer.appendChild(categoryDiv);
//     }

// }

// loadCategories();