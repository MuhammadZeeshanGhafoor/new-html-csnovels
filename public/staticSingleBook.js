const currUrl = window.location.href
const splittedUrl = currUrl.split("/")
const slug = splittedUrl[splittedUrl.length - 1].split(".").join("")
// console.log("SLUGG", slug.split(".").join(""))
async function getReviews() {
    let newDiv = ""
    const reviewDiv = document.getElementById("comment-section")
    const response = await fetch(`../.netlify/functions/getreviews?slug=${slug}`)
    let reviewsRes = await response.json()
    console.log("REVIEWS", reviewsRes)
    let review = reviewsRes.book
    review.forEach(item => {
        const filledStars = '<i class="fa-solid fa-star text-[#FD8B2A]"></i>'.repeat(item.rating);
        // Calculate empty stars
        const formattedDate = new Date(item.created_at).toLocaleDateString();
        const emptyStars = '<i class="fa-regular fa-star text-gray-400"></i>'.repeat(5 - item.rating);
        newDiv += `<div class="px-5 md:px-0">
        <div class="my-6 flex items-center space-x-6 ">
            <img src="../assets/Images/dp-placeholder.jpg" alt="" srcset="" class="h-10 w-10 rounded-full">
            <div class="mt-3">
                <div class="flex items-center space-x-2">
                    <p>
                        ${item.name}+232
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
            ${formattedDate}
        </p>
    </div>`
    })
    reviewDiv.innerHTML = newDiv
}


getReviews()
let newUrl;
async function handleTableContent(slug) {
    let currentUrl = new URLSearchParams(window.location.search)
    newUrl = currentUrl.get("book")
    console.log(newUrl, "newUrl");
    if (!newUrl) {
        const currUrl = window.location.href
        const splittedUrl = currUrl.split("/")
        newUrl = splittedUrl[splittedUrl.length - 1].split(".").join("")

    }
    console.log("NEW URLLL", newUrl)
    const response = await fetch(`../.netlify/functions/chapterindex?slug=${newUrl}`)
    let result = await response.json();
    console.log(result, "result");
    let tableId = document.getElementById("about")
    let contentId = document.getElementById("pagination-main")
    tableId.classList.add("hidden")
    contentId.classList.remove("hidden")

    contentId.classList.add("flex")
    renderItems(result.chapterIndex);
    console.log("REUSSLLLTT", result.chapterIndex)


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
        const formattedDate = new Date(item.created_at).toLocaleDateString();
        newDiv += `<div class="bg-white  rounded border-b-2 flex justify-start gap-10" onclick="redirectChapter('${item.chapternumber}')">
        <p class=" mt-1 md:text-lg font-medium ">
            ${item.chapternumber}
        </p>
        <div>

            <p class="block md:text-lg font-medium mb-2">Chapter ${item.chapternumber}</p>
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
// document.getElementById('prev-button').addEventListener('click', () => {
//     if (currentPage > 1) {
//         currentPage--;
//         renderItems();
//     }
// });

// document.getElementById('next-button').addEventListener('click', () => {
//     if (currentPage < Math.ceil(data.length / itemsPerPage)) {
//         currentPage++;
//         renderItems();
//     }
// });


function redirectChapter(chNumber) {

    let a = window.location.href;
    let slug = a.split('/')[a.split('/').length - 1]
    console.log(slug)
    if (chNumber > 5) {
        window.location.href = `/read-bookpage?slug=${slug}&chapter=${chNumber}`

    } else {
        window.location.href = `/${slug}/chapter-${chNumber}`
    }
    // console.log("first", slug, chNumber, a)
}

// Initial render


function handleData() {
    let tableId = document.getElementById("about")
    let contentId = document.getElementById("pagination-main")
    tableId.classList.remove("hidden")
    contentId.classList.add("hidden")
}

function toggleProfile(id) {
    let profile = document.getElementById(id)
    profile.classList.toggle('hidden')

}

function readBookPage() {
    let url = window.location.href
    let slug = url.split("/")[url.split("/").length - 1];
    console.log(slug)
    window.location.href = `/${slug}/chapter-1`

}


async function getReviews() {
    let url = window.location.href
    let slug = url.split("/")[url.split("/").length - 1];
    const response = await fetch(`../.netlify/functions/getreviews?slug=${slug}`)
    const result = await response.json()
    console.log(response, "REVIEWSSS", result)
    let staticReviews = ""
    let reviewsListDiv = document.getElementById("comment-list")
    if (response.status == 200) {

        result?.book.forEach(element => {
            const updateDate = formatDateTime(element?.created_at)

            staticReviews += `
            <div class="w-full relative flex gap-4 md:mt-10 mt-6 pb-11 border-b border-gray-200">
                <div class="absolute md:static left-0 top-3 min-w-12">
                    <img src="../assets/images/user-comment-img.png"
                        class=" min-w-12 h-12 rounded-full border border-yellow-4 bg-cover" alt="no-img">
                </div>
                <div class="w-full">
                    <div class="flex md:gap-4 gap-2 items-start md:pl-0 pl-16 md:flex-row flex-col">
                        <h3 class="md:text-2xl text-lg font-bold text-gray-2">${element?.name}</h3>
                        <button
                            class="bg-green-3 !text-green-2 md:text-base text-[10px] rounded-lg md:py-2.5 py-1 inline-flex md:gap-2 gap-1 px-4 items-center justify-center">
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.99915 2.3623C7.49268 2.3623 5.86747 4.0448 3.94541 4.65805C3.16389 4.90741 2.77313 5.03209 2.61499 5.20785C2.45684 5.3836 2.41054 5.64043 2.31792 6.15408C1.32684 11.6506 3.49307 16.7323 8.65924 18.7102C9.21432 18.9227 9.49182 19.029 10.0019 19.029C10.5119 19.029 10.7895 18.9227 11.3445 18.7102C16.5103 16.7322 18.6745 11.6506 17.6832 6.15408C17.5905 5.64034 17.5442 5.38347 17.386 5.20771C17.2278 5.03195 16.8371 4.90735 16.0556 4.65813C14.1327 4.04493 12.5057 2.3623 9.99915 2.3623Z"
                                    fill="#1A9959" stroke="#1A9959" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M7.5 11.5286C7.5 11.5286 8.33333 11.5286 9.16667 13.1953C9.16667 13.1953 11.8137 9.02865 14.1667 8.19531"
                                    stroke="white" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <span class="font-medium text-base font-NotoSansJP"></span> Verified Reader
                        </button>
                    </div>
                    <div class="mt-7">
                        <p class=" text-base text-gray-6 font-NotoSansJP max-w-[826px]">Heroes of The Sky is a
                            thrilling adventure that soars above expectations, blending rich world-building with
                            compelling characters. A must-read for fantasy lovers!</p>
                        <div class="md:mt-12 mt-4 flex items-center justify-between">
                            <ul class="flex">
                                <li>
                                    <img src="../assets/images/Rating-start.svg" alt="no-img">
                                </li>
                                <li>
                                    <img src="../assets/images/Rating-start.svg" alt="no-img">
                                </li>
                                <li>
                                    <img src="../assets/images/Rating-start.svg" alt="no-img">
                                </li>
                                <li>
                                    <img src="../assets/images/Rating-start.svg" alt="no-img">
                                </li>
                                <li>
                                    <img src="../assets/images/Rating-star-half-2.svg" alt="no-img">
                                </li>
                            </ul>
                            <p
                                class="bg-gray-7 md:py-3 py-2 px-6 rounded-lg md:text-base text-xs font-NotoSansJP font-medium text-gray-6">
                                ${updateDate}</p>
                        </div>
                    </div>
                </div>
            </div>
            `
        });

    }

    reviewsListDiv.innerHTML = staticReviews

}
getReviews()
function formatDateTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();

    const isToday = (date.toDateString() === now.toDateString());
    const isYesterday = (date.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString());

    let formattedDate;
    if (isToday) {
        formattedDate = 'Today at ' + date.toLocaleTimeString();
    } else if (isYesterday) {
        formattedDate = 'Yesterday at ' + date.toLocaleTimeString();
    } else {
        formattedDate = date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
    }

    return formattedDate;
}




async function getReviews() {
    const response = await fetch(`../.netlify/functions/getreviews?slug=${slug}`)
    const result = await response.json()
    console.log(response, "REVIEWSSS", result)
    let staticReviews = ""
    let reviewsListDiv = document.getElementById("comment-list")
    if (response.status == 200) {
        if (result?.book.length > 0) {


            result?.book.forEach(element => {
                const updateDate = formatDateTime(element?.created_at)

                staticReviews += `
            <div class="w-full relative flex gap-4 md:mt-10 mt-6 pb-11 border-b border-gray-200">
                <div class="absolute md:static left-0 top-3 min-w-12">
                    <img src="../assets/images/user-comment-img.png"
                        class=" min-w-12 h-12 rounded-full border border-yellow-4 bg-cover" alt="no-img">
                </div>
                <div class="w-full">
                    <div class="flex md:gap-4 gap-2 items-start md:pl-0 pl-16 md:flex-row flex-col">
                        <h3 class="md:text-2xl text-lg font-bold text-gray-2">${element?.name}</h3>
                        <button
                            class="bg-green-3 !text-green-2 md:text-base text-[10px] rounded-lg md:py-2.5 py-1 inline-flex md:gap-2 gap-1 px-4 items-center justify-center">
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.99915 2.3623C7.49268 2.3623 5.86747 4.0448 3.94541 4.65805C3.16389 4.90741 2.77313 5.03209 2.61499 5.20785C2.45684 5.3836 2.41054 5.64043 2.31792 6.15408C1.32684 11.6506 3.49307 16.7323 8.65924 18.7102C9.21432 18.9227 9.49182 19.029 10.0019 19.029C10.5119 19.029 10.7895 18.9227 11.3445 18.7102C16.5103 16.7322 18.6745 11.6506 17.6832 6.15408C17.5905 5.64034 17.5442 5.38347 17.386 5.20771C17.2278 5.03195 16.8371 4.90735 16.0556 4.65813C14.1327 4.04493 12.5057 2.3623 9.99915 2.3623Z"
                                    fill="#1A9959" stroke="#1A9959" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M7.5 11.5286C7.5 11.5286 8.33333 11.5286 9.16667 13.1953C9.16667 13.1953 11.8137 9.02865 14.1667 8.19531"
                                    stroke="white" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <span class="font-medium text-base font-NotoSansJP"></span> Verified Reader
                        </button>
                    </div>
                    <div class="mt-7">
                        <p class=" text-base text-gray-6 font-NotoSansJP max-w-[826px]">${element?.review}</p>
                        <div class="md:mt-12 mt-4 flex items-center justify-between">
                            <ul class="flex">
                                <li>
                                    <img src="../assets/images/Rating-start.svg" alt="no-img">
                                </li>
                                <li>
                                    <img src="../assets/images/Rating-start.svg" alt="no-img">
                                </li>
                                <li>
                                    <img src="../assets/images/Rating-start.svg" alt="no-img">
                                </li>
                                <li>
                                    <img src="../assets/images/Rating-start.svg" alt="no-img">
                                </li>
                                <li>
                                    <img src="../assets/images/Rating-star-half-2.svg" alt="no-img">
                                </li>
                            </ul>
                            <p
                                class="bg-gray-7 md:py-3 py-2 px-6 rounded-lg md:text-base text-xs font-NotoSansJP font-medium text-gray-6">
                                ${updateDate}</p>
                        </div>
                    </div>
                </div>
            </div>
            `
            });
        } else {
            reviewsListDiv.innerHTML = `<h1>No reviews</h1>`
        }
    }

    reviewsListDiv.innerHTML = staticReviews

}
// getReviews()
function formatDateTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();

    const isToday = (date.toDateString() === now.toDateString());
    const isYesterday = (date.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString());

    let formattedDate;
    if (isToday) {
        formattedDate = 'Today at ' + date.toLocaleTimeString();
    } else if (isYesterday) {
        formattedDate = 'Yesterday at ' + date.toLocaleTimeString();
    } else {
        formattedDate = date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
    }

    return formattedDate;
}


let thisPage = 1; // Initialize the current page
let midPage;         // Mid page will be calculated

async function getChapters(page = 1) {
    console.log("REQUEST STARTED")
    let url = window.location.href;
    let slug = url.split("/").pop();
    const response = await fetch(`../.netlify/functions/chapterindex?slug=${slug}`);
    const result = await response.json();
    console.log({ "CHAPTERS": result })

    if (response.status === 200) {
        let url = window.location.href;
        let slug = url.split("/").pop();
        console.log("CHAPTER INDEX?>", result);
        const chaptersArray = result?.chapterIndex;
        const chaptersPerPage = 14; // Number of chapters to display per page
        const totalChapters = chaptersArray.length;

        midPage = Math.ceil(page / 2);
        putPagination(Math.ceil(totalChapters / chaptersPerPage), page);

        let chapterList = document.getElementById("chapter-list");
        chapterList.innerHTML = ''; // Clear previous chapters

        const startIndex = (page - 1) * chaptersPerPage;
        const endIndex = Math.min(startIndex + chaptersPerPage, totalChapters);

        for (let i = startIndex; i < endIndex; i++) {
            let chapterNum = `<a href="/reading-page?slug=${slug}&chapter=${i + 1}" class="bg-gray-12 p-4 justify-between flex rounded-[2px] items-center">
                        <p class="text-gray-2 font-medium font-NotoSansJP">Chapters ${i + 1}</p>
                        <ul class="flex gap-1">
                            <li>
                                <div class="bg-gray-13 rounded-full h-1 w-1 opacity-40"></div>
                            </li>
                            <li>
                                <div class="bg-gray-13 rounded-full h-1 w-1"></div>
                            </li>
                            <li>
                                <div class="bg-gray-13 rounded-full h-1 w-1 opacity-40"></div>
                            </li>
                        </ul>
                        <p class="text-gray-2 md:text-base text-sm font-NotoSansJP">2 Weeks ago</p>
                    </a>`;
            chapterList.innerHTML += chapterNum;
        }
    }
}

function putPagination(pages, thisPage) {
    const paginationDiv = document.getElementById("pagination-div");
    const controlDiv = document.getElementById("control-button");

    let midPage = Math.ceil(thisPage);
    let controlledButton = `<button class=" border-2 border-gray-14 text-gray-4 flex gap-2 rounded-full px-4 py-[11px]"
                    onclick="prevPage(${pages})">
                    <svg width="27" height="28" viewBox="0 0 27 28" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.44336 14H22.0898" stroke="#777980" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M9.95784 19.5144C9.95784 19.5144 4.44337 15.4531 4.44336 13.9999C4.44335 12.5467 9.95788 8.48535 9.95788 8.48535"
                            stroke="#777980" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    Previous
                </button>
                <button class="bg-yellow-1 text-gray-2 flex gap-2 rounded-full px-6 py-[11px]"
                    onclick="nextPage(${pages})">
                    Next
                    <svg width="27" height="28" viewBox="0 0 27 28" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.5586 14H4.91211" stroke="#1D1F2C" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M17.043 19.5144C17.043 19.5144 22.5575 15.4531 22.5575 13.9999C22.5575 12.5467 17.043 8.48535 17.043 8.48535"
                            stroke="#1D1F2C" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>

                </button>`

    let paginationHTML = `
<div  onclick="prevPage(${pages})">&laquo;</div>
<div onclick="getChapters(${midPage})">${midPage}</div>
<div onclick="getChapters(${midPage + 1})">${midPage + 1}</div>
<div onclick="getChapters(${midPage + 2})">${midPage + 2}</div>
<div onclick="getChapters(${pages})">${pages}</div>
<div onclick="nextPage(${pages})">&raquo;</div>`;

    paginationDiv.innerHTML = paginationHTML;
    controlDiv.innerHTML = controlledButton
}

function nextPage(totalPages) {
    if (thisPage < totalPages) {
        thisPage++;
        getChapters(thisPage);
    }
}

function prevPage(totalPages) {
    if (thisPage > 1) {
        thisPage--;
        getChapters(thisPage);
    }
}

// Initialize the first page
getChapters(1);
// let nextPageButton = document.getElementById("next-page")
// nextPageButton.addEventListener("click", () => {

// })

function checkUser() {
    console.log("WORKING CHECK USER")
    let user = localStorage.getItem("user")

    if (user) {
        let loginButton = document.getElementById("login-button")
        let signupButton = document.getElementById("signup-button")

        const parsedUser = JSON.parse(user);
        loginButton.href = "#"
        loginButton.innerHTML = "Logout"

        signupButton.className = ""
        signupButton.className = "w-12 h-12 bg-yellow-1 rounded-full cursor-pointer flex items-center justify-center"


        signupButton.href = "/profile"
        if (parsedUser?.photo_url) {
            signupButton.innerHTML = `<img src="${parsedUser?.photo_url}" class="rounded-full cursor-pointer border-2 border-yellow-500 " />`
        } else if (parsedUser?.name) {
            signupButton.innerHTML = `<p class="text-2xl font-bold text-white uppercase">${parsedUser?.name[0]}</p>`
        } else {
            signupButton.innerHTML = `<p class="text-2xl font-bold text-white uppercase">U</p>`

        }

        signupButton.onclick = () => {
            window.location.href = "/profile"
        }


        loginButton.onclick = () => {
            localStorage.clear()
            window.location.reload()
        }


    }
}
checkUser()
async function addFavorite() {
    let user = localStorage.getItem('user')


    if (user) {
        let resultedBtn = getClickedElement("addFavorite")
        let btn = resultedBtn[0]

        const parsedUser = JSON.parse(user)
        try {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "email": parsedUser.email,
                "slug": slug
            });

            let response = await fetch("../.netlify/functions/addfavorite", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.text();
            if (response.status == 200) {
                btn.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="#FFC240" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.4993 12.5717L11.9993 19.9997L4.49932 12.5717C4.00463 12.0903 3.61497 11.5117 3.35487 10.8723C3.09478 10.2329 2.96989 9.54664 2.98806 8.85662C3.00624 8.1666 3.16709 7.48782 3.46048 6.86303C3.75388 6.23823 4.17346 5.68094 4.69281 5.22627C5.21216 4.77159 5.82003 4.42938 6.47814 4.22117C7.13624 4.01296 7.83033 3.94327 8.51669 4.01649C9.20306 4.08971 9.86682 4.30425 10.4662 4.64659C11.0656 4.98894 11.5876 5.45169 11.9993 6.00569C12.4129 5.45571 12.9355 4.99701 13.5344 4.65829C14.1334 4.31958 14.7958 4.10814 15.4803 4.03721C16.1647 3.96628 16.8564 4.03739 17.5121 4.24608C18.1678 4.45477 18.7734 4.79656 19.2909 5.25005C19.8084 5.70354 20.2268 6.25897 20.5197 6.88158C20.8127 7.50419 20.9741 8.18057 20.9936 8.8684C21.0132 9.55622 20.8906 10.2407 20.6335 10.8789C20.3763 11.5172 19.9902 12.0955 19.4993 12.5777" stroke="#1D1F2C" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                                <span class="md:block hidden cursor-pointer">Added Favorite</span>`;


            }


        } catch (error) {
            console.log(error)
        }

    }
}





function getClickedElement(functionName) {
    const elements = document.getElementsByTagName("*"); // Get all elements in the document
    const matchingElements = [];



    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const onclickAttr = element.getAttribute("onclick"); // Get the onclick attribute

        if (onclickAttr && onclickAttr.includes(functionName)) {
            matchingElements.push(element); // If the onclick attribute contains the function name, add the element to the array
        }
    }
    console.log(matchingElements[0])
    return matchingElements;
}



async function getFavorites() {
    const user = localStorage.getItem('user');


    let resultedBtn = getClickedElement("addFavorite")
    let btn = resultedBtn[0]
    if (user) {
        const parsedUser = JSON.parse(user)

        try {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "email": parsedUser.email
            });

            let response = await fetch("http://localhost:8888/.netlify/functions/getfavorites", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.json();
            console.log(data);
            if (response.status == 200) {
                let thisFav = data.find((item) => item.book_slug == slug)
                if (thisFav) {
                    console.log("Fav matches found")

                    btn.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="#FFC240" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.4993 12.5717L11.9993 19.9997L4.49932 12.5717C4.00463 12.0903 3.61497 11.5117 3.35487 10.8723C3.09478 10.2329 2.96989 9.54664 2.98806 8.85662C3.00624 8.1666 3.16709 7.48782 3.46048 6.86303C3.75388 6.23823 4.17346 5.68094 4.69281 5.22627C5.21216 4.77159 5.82003 4.42938 6.47814 4.22117C7.13624 4.01296 7.83033 3.94327 8.51669 4.01649C9.20306 4.08971 9.86682 4.30425 10.4662 4.64659C11.0656 4.98894 11.5876 5.45169 11.9993 6.00569C12.4129 5.45571 12.9355 4.99701 13.5344 4.65829C14.1334 4.31958 14.7958 4.10814 15.4803 4.03721C16.1647 3.96628 16.8564 4.03739 17.5121 4.24608C18.1678 4.45477 18.7734 4.79656 19.2909 5.25005C19.8084 5.70354 20.2268 6.25897 20.5197 6.88158C20.8127 7.50419 20.9741 8.18057 20.9936 8.8684C21.0132 9.55622 20.8906 10.2407 20.6335 10.8789C20.3763 11.5172 19.9902 12.0955 19.4993 12.5777" stroke="#1D1F2C" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <span class="md:block hidden cursor-pointer">Added Favorite</span>`;
                } else {
                    console.log("NO Fav matches found")
                }
            }
        } catch (error) {

        }
    }
}


getFavorites()


function writeReview() {
    const element = getClickedElement("writeReview")
    console.log("working")
    console.log(element[0].parentElement)
    let newDiv = document.createElement("div")
    element[0].parentElement.appendChild(newDiv)
    newDiv.className = "flex absolute w-[80%]  bg-[#F6F6F6] h-44 z-50 rounded-lg border-[#FFC240] border-2"
    newDiv.innerHTML = `<p >Somethjing</p>
        <button >BUTTON</button>
    `
    document.body.classList.add('opacity-5')

}