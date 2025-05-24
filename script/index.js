function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (const btn of activeButtons) {
        btn.classList.remove("active");
    }
}

const showLoader = () =>{
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
}
const hideLoader = () =>{
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
}

function loadCategories() {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then((data) => displayCategories(data.categories));
}

function loadVideos(searchText = "") {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then((data) => {
            removeActiveClass();
            document.getElementById("btn-all").classList.add("active");
            displayVideos(data.videos)
        })
}

const loadCategoryVideos = (id) => {
    showLoader();
    // console.log(id);
    const url = `
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `;
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add("active");
            // console.log(clickedButton);
            displayVideos(data.category);
        });
}

const loadVideoDetails = (videoId) => {
    // console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
        .then(res => res.json())
        .then((data) => displayVideoDetails(data.video))
}

const displayVideoDetails = (video) => {
    console.log(video);
    document.getElementById('video_details').showModal();
    const detailsContainer = document.getElementById('details_container');
    detailsContainer.innerHTML = `
    
<div class="card bg-base-100 image-full shadow-sm">
    <figure>
        <img src="${video.thumbnail}">
    </figure>
    <div class="card-body">
        <h2 class="card-title">${video.title}</h2>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
        <div class="card-actions justify-end">
        </div>
    </div>
</div>
    `;
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
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `
        // Append the element
        categoryContainer.appendChild(categoryDiv);
    }

}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";
    if (videos.length === 0) {
        videoContainer.innerHTML = `
        <div class="py-20 col-span-full flex flex-col gap-5 justify-center items-center">
            <img src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here.</h2>
        </div>
        `;
        hideLoader();
        return;
    }
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
                    ${video.authors[0].verified  == true ? ` <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt="">` : ``}
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views} views</p>
                </div>
            </div>
            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
        </div>
        `
        videoContainer.appendChild(videoCard);
    });
    hideLoader();
}


document.getElementById('search-input').addEventListener("keyup", (e) =>{
    const input = e.target.value;
    // console.log(input)
    loadVideos(input);
})

loadCategories();
// loadVideos();