const currUrl = window.location.href
const splittedUrl = currUrl.split("/")
const slug = splittedUrl[splittedUrl.length - 1]
async function getReviews() {
    let newDiv = ""
    const reviewDiv = document.getElementById("comment-section")
    const response = await fetch(`http://localhost:8888/.netlify/functions/getreviews?slug=${slug}`)
    let reviewsRes = await response.json()
    console.log("REVIEWS", reviewsRes)
    let review = reviewsRes.book
    review.forEach(item => {
        const filledStars = '<i class="fa-solid fa-star text-[#FD8B2A]"></i>'.repeat(item.rating);
        // Calculate empty stars
        const emptyStars = '<i class="fa-regular fa-star text-gray-400"></i>'.repeat(5 - item.rating);
        newDiv += `<div class="px-5 md:px-0">
        <div class="my-6 flex items-center space-x-6 ">
            <img src="../assets/Images/dp-placeholder.jpg" alt="" srcset="" class="h-10 w-10 rounded-full">
            <div class="mt-3">
                <div class="flex items-center space-x-2">
                    <p>
                        ${item.name}
                    </p>
                    <img src="../assets/Images/message.png" alt="" class="h-5 w-5 mt-1">
                </div>
                ${filledStars}${emptyStars}
                
            </div>
        </div>
        <p class="ml-16">
            ${item.review}
        </p>
        <p class="ml-16 my-5">
            ${item.created_at}
        </p>
    </div>`
    })
    reviewDiv.innerHTML = newDiv
}


getReviews()

async function handleTableContent(slug) {
    let currentUrl = new URLSearchParams(window.location.search)
    let newUrl = currentUrl.get("book")
    console.log(newUrl, "newUrl");
    const response = await fetch(`http://localhost:8888/.netlify/functions/chapterindex?slug=${newUrl}`)
    let result = await response.json();
    console.log(result, "result");
    let tableId = document.getElementById("about")
    let contentId = document.getElementById("tableOfContent")
    tableId.style.display = "none";
    contentId.style.display = "block"
    renderItems(result.chapterIndex);


}


// Your data
// const data = [
//     { chapternumber: 1, slug: 'billionaire-god-of-war' },
//     { chapternumber: 2, slug: 'billionaire-god-of-war' },
//     { chapternumber: 3, slug: 'billionaire-god-of-war' },
//     { chapternumber: 4, slug: 'billionaire-god-of-war' },
//     { chapternumber: 5, slug: 'billionaire-god-of-war' },
//     { chapternumber: 6, slug: 'billionaire-god-of-war' },
//     { chapternumber: 7, slug: 'billionaire-god-of-war' },
//     { chapternumber: 8, slug: 'billionaire-god-of-war' },
//     { chapternumber: 9, slug: 'billionaire-god-of-war' }
// ];

// Pagination variables
let currentPage = 1;
const itemsPerPage = 20;

// Function to render items
let data
function renderItems(indexes) {
    if (!data) {
        data = indexes
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = data.slice(startIndex, endIndex);

    const container = document.getElementById('pagination');
    let newDiv = '';
    console.log("ITMTODISPLAy", itemsToDisplay)
    itemsToDisplay.forEach((item, index) => {
        const itemElement = document.createElement('div');
        newDiv += `<div class="bg-white  rounded border-b-2 flex justify-start gap-10">
        <p class=" mt-1 md:text-lg font-medium ">
            ${index}
        </p>
        <div>

            <a href="#" class="block md:text-lg font-medium mb-2">Chapter ${item.chapternumber}</a>
            <span class="text-gray-500">a year ago</span>
        </div>
    </div>`;

    });
    container.innerHTML = newDiv;

    updateButtons();
}

// Function to update button states
function updateButtons() {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(data.length / itemsPerPage);
}

// Event listeners for buttons
document.getElementById('prev-button').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderItems();
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
        currentPage++;
        renderItems();
    }
});

// Initial render
