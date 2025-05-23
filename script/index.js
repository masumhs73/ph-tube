function loadCategories() {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then((data) => displayCategories(data.categories));
}

function loadVideos() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then((data) => displayVideos(data.videos))
}

const loadCategoryVideos = (id) => {
    // console.log(id);
    const url = `
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `;
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then((data) => displayVideos(data.category));
}


function displayCategories(categories) {
    // get the container
    const categoryContainer = document.getElementById('category-container');

    // Loop operation on Array of object
    for (const cat of categories) {
        // console.log(cat);
        // Create element
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `
        // Append the element
        categoryContainer.appendChild(categoryDiv);
    }

}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";
    videos.forEach(video => {
        // console.log(video);
        const videoCard = document.createElement("div")
        // videoCard.innerHTML = `
        // <h2>${video.title}</h2>
        // `
        videoCard.innerHTML = `
    <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-[180px] object-cover" src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-sm text-white bg-black px-2 py-1 rounded">3hrs 56 min
                    ago</span>
            </figure>
            <div class="flex gap-4 px-0 py-5 ">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="info">
                    <h2 class="text-lg font-semibold">${video.title}</h2>
                    <p class="text-xm text-gray-400 flex gap-2 items-center">${video.authors[0].profile_name}
                    <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt="">
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views} views</p>
                </div>
            </div>
        </div>
        `
        videoContainer.appendChild(videoCard);
    });
}


loadCategories();
// loadVideos();