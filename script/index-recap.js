// function loadCategories () {
//     fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
//     .then(res => res.json())
//     .then((data) => displayCategories(data.categories))
// }

// function displayCategories (categories) {
//     // console.log(categories);
//     const categoryContainer = document.getElementById('category-container');
//     for(const cat of categories) {
//         // console.log(cat);
//         const categoryDiv = document.createElement("div");
//         categoryDiv.innerHTML = `
//         <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
//         `
//         categoryContainer.appendChild(categoryDiv);
//     }
// }

// loadCategories();