function readBookPage() {
    let url = window.location.href
    let slug = url.split("/")[url.split("/").length - 1];
    console.log(slug)
    window.location.href = `/${slug}/chapter-1`

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
                        <p class=" text-base text-gray-6 font-NotoSansJP max-w-[826px]">${element?.review ? element?.review : ""}</p>
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
            let chapterNum = `<a href="/${slug}/chapter-${i + 1}" class="bg-gray-12 p-4 justify-between flex rounded-[2px] items-center">
                        <p class="text-gray-2 font-medium font-NotoSansJP">Chapterrrrs ${i + 1}</p>
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
                        <p class="text-gray-2 md:text-base text-sm font-NotoSansJP">5 Months Ago</p>
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
let nextPageButton = document.getElementById("next-page")
nextPageButton.addEventListener("click", () => {

})