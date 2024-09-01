
let subscribeBtn = document.querySelectorAll(".subscribe-btn");
let closeNav = document.querySelector(".close-nav-menu");
let openNav = document.querySelector(".open-nav-menu");
let closeOverlay = document.querySelector(".overlay");

const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {

    if (!token) {
        window.location = "/login"
    }

})
// window.onload = () => {
//     console.log("Wroking")
//     if (!token) {
//         window.location = "/login"
//     }
// }

openNav.addEventListener("click", () => {
    document.querySelector('.menu-dropdown').classList.add("active");
    document.querySelector('body').classList.add("active");
});

closeNav.addEventListener("click", () => {
    document.querySelector('.menu-dropdown').classList.remove("active");
    document.querySelector('body').classList.remove("active");
});

closeOverlay.addEventListener("click", () => {
    document.querySelector('.menu-dropdown').classList.remove("active");
    document.querySelector('body').classList.remove("active");
});



subscribeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault()
        document.querySelector(".styled-dashboard").style.display = "none";
        document.querySelector(".subscribe-content").style.display = "block";
    })
})


async function getUserData() {
    let user = localStorage.getItem("user");
    console.log(user)
    if (user) {
        let { id } = JSON.parse(user)

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({ "userId": id });

        let response = await fetch("../.netlify/functions/getUserDetails", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        console.log("GET DATA", data);

        if (response.status === 200) {
            if (data?.user?.name == null || undefined) {
                localStorage.setItem("user", JSON.stringify(data?.user))
            }
        }
    }

}
// getUserData()


function updateUi() {
    let user = localStorage.getItem("user")
    let parsedUser = JSON.parse(user)
    let usernameDivs = document.querySelectorAll(".userName")
    let emailDiv = document.getElementById("email-div")
    let userIdDivs = document.querySelectorAll(".userId")
    let profileDivs = document.querySelectorAll(".profileImg")


    if (parsedUser?.photo_url) {

        profileDivs.forEach((item) => {
            item.src = parsedUser.photo_url
        })
    }
    emailDiv.innerHTML = parsedUser.email
    console.log(usernameDivs)
    usernameDivs.forEach((item) => {
        item.innerHTML = parsedUser.name
    })
    userIdDivs.forEach((item) => {
        item.innerHTML = `ID: ${parsedUser.id}`
    })
}
updateUi()




async function getFavorites() {

    let user = localStorage.getItem('user')
    let parsedUser = JSON.parse(user)

    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({ "email": parsedUser?.email });

    let response = await fetch("../.netlify/functions/getfavorites", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });

    let result = await response.json();
    console.log("FAVOURITES", result);
    const books = await getBooksByName(result)
    console.log("BOOKS", books, "FROM BACKEDN")


    if (response.status == 200) {
        let listDiv = document.querySelectorAll(".favoriteBooksList")

        let genHtml = ''

        books?.book.forEach((item) => {


            genHtml += `<a href="/book/${item.slug}" class="w-full bg-gray-5 rounded-[10px] p-2">
                                                <div class="relative overflow-hidden rounded-lg">
                                                    <div
                                                    class="absolute bg-[#0000007e] w-[62px] pt-1.5 pb-2 px-2 right-0 bottom-0 flex items-center gap-1 text-white text-sm">
                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_51_2196)">
                                                            <path
                                                                    d="M9.67252 2.29308C9.54618 2.03707 9.28545 1.875 8.99997 1.875C8.71449 1.875 8.45376 2.03707 8.32742 2.29308L6.43056 6.13653L2.18905 6.75286C1.90653 6.79391 1.67182 6.99179 1.5836 7.2633C1.49539 7.53481 1.56896 7.83286 1.77339 8.03213L4.84257 11.0238L4.11804 15.2482C4.06978 15.5296 4.18544 15.814 4.4164 15.9818C4.64736 16.1496 4.95356 16.1717 5.20625 16.0388L8.99997 14.0444L12.7937 16.0388C13.0464 16.1717 13.3526 16.1496 13.5835 15.9818C13.8145 15.814 13.9302 15.5296 13.8819 15.2482L13.1574 11.0238L16.2265 8.03213C16.431 7.83286 16.5046 7.53481 16.4163 7.2633C16.3281 6.99179 16.0934 6.79391 15.8109 6.75286L11.5694 6.13653L9.67252 2.29308Z"
                                                                    fill="#FAAD14"></path>
                                                            </g>
                                                            <defs>
                                                            <clipPath id="clip0_51_2196">
                                                                    <rect width="15" height="15" fill="white"
                                                                    transform="translate(1.5 1.5)"></rect>
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                        <p class="md:text-sm text-xs font-bold font-NotoSansJP">4.9</p>
                                                        </div>
                                                    <img src="${item?.coverimage}"
                                                        class="rounded-lg md:h-[240px] w-full bg-cover" alt="no-img">
                                                        </div>
                                                <h2
                                                    class="md:text-lg text-sm font-bold mt-4 mb-2 text-gray-2 text-ellipsis overflow-hidden max-w-full text-nowrap">
                                                    ${item?.title}</h2>
                                                    <p class="md:text-sm text-xs text-gray-6 mb-2 text-ellipsis-2">Marvin
        ${item?.description}</p>
                                                <div class="flex items-center justify-between pb-2">
                                                    <div class="flex items-center gap-1 py-1 mt-2">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_51_1450)">
                                                            <path
                                                            d="M15.205 4.26758C15.4431 4.60686 15.4967 4.99079 15.3657 5.41936L12.9104 13.5086C12.7973 13.8896 12.5696 14.2095 12.2273 14.4685C11.8851 14.7274 11.5205 14.8569 11.1336 14.8569H2.89249C2.43416 14.8569 1.9922 14.6976 1.5666 14.3792C1.14101 14.0607 0.844874 13.6694 0.678207 13.2051C0.53535 12.8063 0.529398 12.4283 0.66035 12.0711C0.66035 12.0473 0.669279 11.967 0.687136 11.8301C0.704993 11.6932 0.716898 11.5831 0.72285 11.4997C0.728803 11.4521 0.719874 11.3881 0.696065 11.3078C0.672255 11.2274 0.663327 11.1694 0.669279 11.1336C0.681184 11.0682 0.704993 11.0057 0.740708 10.9461C0.776422 10.8866 0.825529 10.8167 0.888029 10.7363C0.950529 10.656 0.999636 10.586 1.03535 10.5265C1.17226 10.3003 1.30618 10.028 1.43714 9.70954C1.56809 9.39109 1.65737 9.11877 1.70499 8.89258C1.72285 8.83305 1.72434 8.74377 1.70946 8.62472C1.69458 8.50567 1.69309 8.42234 1.70499 8.37472C1.72285 8.30925 1.77345 8.22591 1.85678 8.12472C1.94011 8.02353 1.99071 7.95508 2.00856 7.91936C2.13356 7.70508 2.25856 7.43127 2.38356 7.09794C2.50856 6.7646 2.58297 6.49675 2.60678 6.29436C2.61273 6.24079 2.60529 6.14555 2.58446 6.00865C2.56362 5.87175 2.56511 5.78841 2.58892 5.75865C2.61273 5.68127 2.67821 5.5905 2.78535 5.48633C2.89249 5.38216 2.95797 5.3152 2.98178 5.28544C3.09487 5.13067 3.22136 4.87919 3.36124 4.53097C3.50112 4.18276 3.58297 3.89555 3.60678 3.66936C3.61273 3.62174 3.6038 3.54585 3.57999 3.44169C3.55618 3.33752 3.55023 3.25865 3.56214 3.20508C3.57404 3.15746 3.60083 3.10389 3.64249 3.04436C3.68416 2.98484 3.73773 2.91639 3.80321 2.83901C3.86868 2.76163 3.91928 2.69913 3.95499 2.65151C4.00261 2.58008 4.05172 2.4893 4.10231 2.37919C4.15291 2.26907 4.19755 2.1649 4.23624 2.06669C4.27493 1.96847 4.32255 1.86133 4.3791 1.74526C4.43565 1.62919 4.49368 1.53395 4.55321 1.45954C4.61273 1.38514 4.6916 1.3152 4.78981 1.24972C4.88803 1.18424 4.99517 1.15002 5.11124 1.14704C5.22731 1.14407 5.36868 1.16044 5.53535 1.19615L5.52642 1.22294C5.75261 1.16936 5.9044 1.14258 5.98178 1.14258H12.7764C13.2169 1.14258 13.5562 1.30924 13.7943 1.64258C14.0324 1.97591 14.0859 2.36282 13.955 2.80329L11.5086 10.8926C11.2943 11.6009 11.0815 12.0578 10.8702 12.2631C10.6589 12.4685 10.2764 12.5711 9.72285 12.5711H1.96392C1.80321 12.5711 1.69011 12.6158 1.62464 12.7051C1.55916 12.8003 1.55618 12.9283 1.61571 13.089C1.75856 13.5057 2.18714 13.714 2.90142 13.714H11.1425C11.3151 13.714 11.4818 13.6679 11.6425 13.5756C11.8032 13.4834 11.9074 13.3598 11.955 13.2051L14.6336 4.39258C14.6752 4.26163 14.6901 4.09198 14.6782 3.88365C14.9044 3.97294 15.08 4.10091 15.205 4.26758ZM5.70499 4.28544C5.68118 4.36282 5.68714 4.42978 5.72285 4.48633C5.75856 4.54288 5.81809 4.57115 5.90142 4.57115H11.33C11.4074 4.57115 11.4833 4.54288 11.5577 4.48633C11.6321 4.42978 11.6812 4.36282 11.705 4.28544L11.8925 3.71401C11.9163 3.63663 11.9104 3.56966 11.8746 3.51311C11.8389 3.45657 11.7794 3.42829 11.6961 3.42829H6.26749C6.19011 3.42829 6.11422 3.45657 6.03981 3.51311C5.96541 3.56966 5.9163 3.63663 5.89249 3.71401L5.70499 4.28544ZM4.96392 6.57115C4.94011 6.64853 4.94606 6.7155 4.98178 6.77204C5.01749 6.82859 5.07702 6.85686 5.16035 6.85686H10.5889C10.6663 6.85686 10.7422 6.82859 10.8166 6.77204C10.891 6.7155 10.9401 6.64853 10.9639 6.57115L11.1514 5.99972C11.1752 5.92234 11.1693 5.85538 11.1336 5.79883C11.0979 5.74228 11.0383 5.71401 10.955 5.71401H5.52642C5.44904 5.71401 5.37315 5.74228 5.29874 5.79883C5.22434 5.85538 5.17523 5.92234 5.15142 5.99972L4.96392 6.57115Z"
                                                                    fill="#4A4C56"></path>
                                                                    </g>
                                                            <defs>
                                                                <clipPath id="clip0_51_1450">
                                                                <rect width="16" height="16" fill="white"></rect>
                                                                </clipPath>
                                                                </defs>
                                                                </svg>
                                                        <p class="text-xs text-gray-6">${item.chaptercount} Chapter</p>
                                                        
                                                        </div>
                                                        <button>
                                                        <svg width="20" height="18" viewBox="0 0 18 16"
                                                        class=" fav-icon" fill="#E9B433"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                        d="M15.2501 8.47706L9.00009 14.6671L2.75009 8.47706C2.33784 8.0759 2.01312 7.59374 1.79638 7.06092C1.57963 6.52811 1.47556 5.95618 1.4907 5.38117C1.50585 4.80615 1.63989 4.2405 1.88439 3.71984C2.12888 3.19917 2.47853 2.73477 2.91133 2.35587C3.34412 1.97698 3.85068 1.6918 4.3991 1.51829C4.94752 1.34479 5.52593 1.28671 6.09789 1.34773C6.66986 1.40874 7.223 1.58752 7.72248 1.87281C8.22196 2.1581 8.65696 2.54372 9.00009 3.00539C9.3447 2.54708 9.7802 2.16483 10.2793 1.88256C10.7785 1.6003 11.3305 1.4241 11.9009 1.36499C12.4712 1.30588 13.0477 1.36514 13.5941 1.53905C14.1405 1.71296 14.6451 1.99779 15.0764 2.37569C15.5077 2.7536 15.8563 3.21646 16.1004 3.7353C16.3446 4.25414 16.479 4.81779 16.4953 5.39098C16.5117 5.96417 16.4095 6.53455 16.1952 7.06643C15.9809 7.59831 15.6592 8.08024 15.2501 8.48206"
                                                        stroke="#FCE936" stroke-width="0"
                                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        
                                                        </button>
                                                        </div>
                                                        </a>`
        })
        listDiv.forEach((item) => {
            item.innerHTML = genHtml
        })

    }
}
getFavorites()

async function getBooksByName(data) {
    let array = []
    if ("book_slug" in data[0]) {

        data.map((item) => {
            array.push(item["book_slug"])
        })
    }
    if ("slug" in data[0]) {
        data.map((item) => {
            array.push(item["slug"])
        })
    }
    console.log("Array", array)
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
        slug: array
    });

    let response = await fetch("../.netlify/functions/getfilteredbooks", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });

    let result = await response.json();
    if (response.status === 200) {
        // console.log(data);
        return result;
    }

}

async function getBookMark() {
    try {

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "userId": "6232285f-17d5-4219-a99c-18a475f4f6cf",
            "slug": "billionaire-god-of-war",
            "chapter": "4"
        });

        let response = await fetch("../.netlify/functions/getbookmarks", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();

        console.log("Bookmark data", data);
        if (data) {
            const books = await getBooksByName(data)
            console.log("BOOKS IN BOOK MARK", books)
            const bookMarkDiv = document.getElementById("bookmarks-div")
            let genHtml = ""
            books.book.forEach(book => {
                let { chapter } = data.find((item) => item.slug == book.slug)

                console.log("chapter number", chapter)

                genHtml += `<div  class="w-full bg-gray-5 rounded-[10px] p-2">
                                            <div class="relative overflow-hidden rounded-lg">
                                                <div
                                                    class="absolute bg-[#0000007e] w-[62px] pt-1.5 pb-2 px-2 right-0 bottom-0 flex items-center gap-1 text-white text-sm">
                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_51_2196)">
                                                            <path
                                                                d="M9.67252 2.29308C9.54618 2.03707 9.28545 1.875 8.99997 1.875C8.71449 1.875 8.45376 2.03707 8.32742 2.29308L6.43056 6.13653L2.18905 6.75286C1.90653 6.79391 1.67182 6.99179 1.5836 7.2633C1.49539 7.53481 1.56896 7.83286 1.77339 8.03213L4.84257 11.0238L4.11804 15.2482C4.06978 15.5296 4.18544 15.814 4.4164 15.9818C4.64736 16.1496 4.95356 16.1717 5.20625 16.0388L8.99997 14.0444L12.7937 16.0388C13.0464 16.1717 13.3526 16.1496 13.5835 15.9818C13.8145 15.814 13.9302 15.5296 13.8819 15.2482L13.1574 11.0238L16.2265 8.03213C16.431 7.83286 16.5046 7.53481 16.4163 7.2633C16.3281 6.99179 16.0934 6.79391 15.8109 6.75286L11.5694 6.13653L9.67252 2.29308Z"
                                                                fill="#FAAD14"></path>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_51_2196">
                                                                <rect width="15" height="15" fill="white"
                                                                    transform="translate(1.5 1.5)"></rect>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <p class="md:text-sm text-xs font-bold font-NotoSansJP">4.9</p>
                                                </div>
                                                <a href="/reading-page?slug=${book?.slug}&chapter=${chapter}">
                                                <img src="${book?.coverimage}"
                                                class="rounded-lg md:h-[240px] w-full bg-cover" alt="no-img">
                                                </a>
                                            </div>
                                            <h2
                                                class="md:text-lg text-sm font-bold mt-4 mb-2 text-gray-2 text-ellipsis overflow-hidden max-w-full text-nowrap">
                                                ${book?.title}</h2>
                                            <p class="md:text-sm text-xs text-gray-6 mb-2 text-ellipsis-2">${book?.description}</p>
                                            <div class="flex items-center justify-between pb-2">
                                                <div class="flex items-center gap-1 py-1 mt-2">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_51_1450)">
                                                            <path
                                                                d="M15.205 4.26758C15.4431 4.60686 15.4967 4.99079 15.3657 5.41936L12.9104 13.5086C12.7973 13.8896 12.5696 14.2095 12.2273 14.4685C11.8851 14.7274 11.5205 14.8569 11.1336 14.8569H2.89249C2.43416 14.8569 1.9922 14.6976 1.5666 14.3792C1.14101 14.0607 0.844874 13.6694 0.678207 13.2051C0.53535 12.8063 0.529398 12.4283 0.66035 12.0711C0.66035 12.0473 0.669279 11.967 0.687136 11.8301C0.704993 11.6932 0.716898 11.5831 0.72285 11.4997C0.728803 11.4521 0.719874 11.3881 0.696065 11.3078C0.672255 11.2274 0.663327 11.1694 0.669279 11.1336C0.681184 11.0682 0.704993 11.0057 0.740708 10.9461C0.776422 10.8866 0.825529 10.8167 0.888029 10.7363C0.950529 10.656 0.999636 10.586 1.03535 10.5265C1.17226 10.3003 1.30618 10.028 1.43714 9.70954C1.56809 9.39109 1.65737 9.11877 1.70499 8.89258C1.72285 8.83305 1.72434 8.74377 1.70946 8.62472C1.69458 8.50567 1.69309 8.42234 1.70499 8.37472C1.72285 8.30925 1.77345 8.22591 1.85678 8.12472C1.94011 8.02353 1.99071 7.95508 2.00856 7.91936C2.13356 7.70508 2.25856 7.43127 2.38356 7.09794C2.50856 6.7646 2.58297 6.49675 2.60678 6.29436C2.61273 6.24079 2.60529 6.14555 2.58446 6.00865C2.56362 5.87175 2.56511 5.78841 2.58892 5.75865C2.61273 5.68127 2.67821 5.5905 2.78535 5.48633C2.89249 5.38216 2.95797 5.3152 2.98178 5.28544C3.09487 5.13067 3.22136 4.87919 3.36124 4.53097C3.50112 4.18276 3.58297 3.89555 3.60678 3.66936C3.61273 3.62174 3.6038 3.54585 3.57999 3.44169C3.55618 3.33752 3.55023 3.25865 3.56214 3.20508C3.57404 3.15746 3.60083 3.10389 3.64249 3.04436C3.68416 2.98484 3.73773 2.91639 3.80321 2.83901C3.86868 2.76163 3.91928 2.69913 3.95499 2.65151C4.00261 2.58008 4.05172 2.4893 4.10231 2.37919C4.15291 2.26907 4.19755 2.1649 4.23624 2.06669C4.27493 1.96847 4.32255 1.86133 4.3791 1.74526C4.43565 1.62919 4.49368 1.53395 4.55321 1.45954C4.61273 1.38514 4.6916 1.3152 4.78981 1.24972C4.88803 1.18424 4.99517 1.15002 5.11124 1.14704C5.22731 1.14407 5.36868 1.16044 5.53535 1.19615L5.52642 1.22294C5.75261 1.16936 5.9044 1.14258 5.98178 1.14258H12.7764C13.2169 1.14258 13.5562 1.30924 13.7943 1.64258C14.0324 1.97591 14.0859 2.36282 13.955 2.80329L11.5086 10.8926C11.2943 11.6009 11.0815 12.0578 10.8702 12.2631C10.6589 12.4685 10.2764 12.5711 9.72285 12.5711H1.96392C1.80321 12.5711 1.69011 12.6158 1.62464 12.7051C1.55916 12.8003 1.55618 12.9283 1.61571 13.089C1.75856 13.5057 2.18714 13.714 2.90142 13.714H11.1425C11.3151 13.714 11.4818 13.6679 11.6425 13.5756C11.8032 13.4834 11.9074 13.3598 11.955 13.2051L14.6336 4.39258C14.6752 4.26163 14.6901 4.09198 14.6782 3.88365C14.9044 3.97294 15.08 4.10091 15.205 4.26758ZM5.70499 4.28544C5.68118 4.36282 5.68714 4.42978 5.72285 4.48633C5.75856 4.54288 5.81809 4.57115 5.90142 4.57115H11.33C11.4074 4.57115 11.4833 4.54288 11.5577 4.48633C11.6321 4.42978 11.6812 4.36282 11.705 4.28544L11.8925 3.71401C11.9163 3.63663 11.9104 3.56966 11.8746 3.51311C11.8389 3.45657 11.7794 3.42829 11.6961 3.42829H6.26749C6.19011 3.42829 6.11422 3.45657 6.03981 3.51311C5.96541 3.56966 5.9163 3.63663 5.89249 3.71401L5.70499 4.28544ZM4.96392 6.57115C4.94011 6.64853 4.94606 6.7155 4.98178 6.77204C5.01749 6.82859 5.07702 6.85686 5.16035 6.85686H10.5889C10.6663 6.85686 10.7422 6.82859 10.8166 6.77204C10.891 6.7155 10.9401 6.64853 10.9639 6.57115L11.1514 5.99972C11.1752 5.92234 11.1693 5.85538 11.1336 5.79883C11.0979 5.74228 11.0383 5.71401 10.955 5.71401H5.52642C5.44904 5.71401 5.37315 5.74228 5.29874 5.79883C5.22434 5.85538 5.17523 5.92234 5.15142 5.99972L4.96392 6.57115Z"
                                                                fill="#4A4C56"></path>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_51_1450">
                                                                <rect width="16" height="16" fill="white"></rect>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <p class="text-xs text-gray-6">${book?.chaptercount} Chapter</p>

                                                </div>
                                                <button>
                                                    <svg width="18" height="16" viewBox="0 0 18 16"
                                                        class="text-transparent fav-icon" fill="currentColor"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.2501 8.47706L9.00009 14.6671L2.75009 8.47706C2.33784 8.0759 2.01312 7.59374 1.79638 7.06092C1.57963 6.52811 1.47556 5.95618 1.4907 5.38117C1.50585 4.80615 1.63989 4.2405 1.88439 3.71984C2.12888 3.19917 2.47853 2.73477 2.91133 2.35587C3.34412 1.97698 3.85068 1.6918 4.3991 1.51829C4.94752 1.34479 5.52593 1.28671 6.09789 1.34773C6.66986 1.40874 7.223 1.58752 7.72248 1.87281C8.22196 2.1581 8.65696 2.54372 9.00009 3.00539C9.3447 2.54708 9.7802 2.16483 10.2793 1.88256C10.7785 1.6003 11.3305 1.4241 11.9009 1.36499C12.4712 1.30588 13.0477 1.36514 13.5941 1.53905C14.1405 1.71296 14.6451 1.99779 15.0764 2.37569C15.5077 2.7536 15.8563 3.21646 16.1004 3.7353C16.3446 4.25414 16.479 4.81779 16.4953 5.39098C16.5117 5.96417 16.4095 6.53455 16.1952 7.06643C15.9809 7.59831 15.6592 8.08024 15.2501 8.48206"
                                                            stroke="currentColor" stroke-width="1.5"
                                                            stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>

                                                </button>
                                            </div>
                                        </div>`
            })

            bookMarkDiv.innerHTML = genHtml

        }
    } catch (error) {
        console.log(error)
    }



}

getBookMark()







let freeBook = {}


function countdownTimer() {

    const countdownDate = new Date(freeBook.validity).getTime(); // Set the date and time to count down to
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("days").innerText = 0;
        document.getElementById("hours").innerText = 0;
        document.getElementById("minutes").innerText = 0;
        document.getElementById("seconds").innerText = 0;
    }
}

const x = setInterval(countdownTimer, 1000);




async function getFreeBook() {
    try {

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "userEmail": "joe60@temp.com",
            "username": "jeff N",
            "slug": "billionaire-god-of-war",
            "rating": "4.3"
        });

        let response = await fetch("../.netlify/functions/getfreebook", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        console.log("FREE BOOK", data);


        if (data) {
            freeBook = data.book
            let genHtml = `
                        <div class="rounded-lg overflow-hidden w-auto">
                            <img src="${data?.book?.coverimage}"
                                class="w-full md:max-w-[200px] max-w-[113px] min-h-[142px] object-cover bg-cover"
                                alt="no-img">
                        </div>
                        <div class="w-3/4">
                            <h2 class="md:text-[32px] text-base font-bold text-gray-2 md:mb-4 mb-1">${data?.book?.title}</h2>
                            <p class="md:text-base text-xs text-[10px] text-gray-6 font-NotoSansJP">Last Updated: Today
                                <span class="md:font-bold font-medium">05:47AM</span>
                            </p>
                            <div class="flex md:gap-12 gap-8 md:mt-6 mt-2">
                                <div>
                                    <div class="flex items-center md:gap-4 gap-2 md:mb-3">
                                        <h2 class="md:text-[32px] text-base text-gray-6 font-NotoSansJP font-black">${data?.book?.avgrating}
                                        </h2>
                                        <ul class="flex">
                                            <li><img src="./assets/images/Rating-start.svg"
                                                    class="md:w-auto max-w-[16px]" alt="no-img"></li>
                                            <li class="md:block hidden"><img src="./assets/images/Rating-start.svg"
                                                    alt="no-img"></li>
                                            <li class="md:block hidden"><img src="./assets/images/Rating-start.svg"
                                                    alt="no-img"></li>
                                            <li class="md:block hidden"><img src="./assets/images/Rating-start.svg"
                                                    alt="no-img"></li>
                                            <li class="md:block hidden"><img src="./assets/images/Rating-star-half.svg"
                                                    alt="no-img"></li>
                                        </ul>
                                    </div>
                                    <p class="md:text-sm text-[10px] text-gray-4 font-NotoSansJP">${data?.book?.totalratings}</p>
                                </div>
                                <div>
                                    <h2 class="md:text-[32px] text-base font-black text-gray-6 font-NotoSansJP md:mb-3">
                                        ${data?.book?.chaptercount}</h2>
                                    <p class="md:text-sm text-[10px] text-gray-4 font-NotoSansJP ">Chapters</p>
                                </div>
                                <div>
                                    <h2 class="md:text-[32px] text-base font-black text-gray-6 font-NotoSansJP md:mb-3">
                                        1.4k</h2>
                                    <p class="md:text-sm text-[10px] text-gray-4 font-NotoSansJP">Views</p>
                                </div>
                            </div>
                            <p class="md:text-base text-[10px] text-gray-6 font-NotoSansJP max-w-[478px] md:mt-6 mt-2">
                                ${data?.book?.description}</p>

                        </div>
                        <div class="lg:flex justify-end items-end lg:ml-auto lg:w-auto w-full mt-auto mb-3 hidden">
                            <a href="/book/${data?.book?.slug}"
                                class="text-gray-2 lg:w-auto w-full min-w-[162px] transition-all duration-300 hover:bg-yellow-500 text-center font-medium text-lg py-2.5 px-8 font-NotoSansJP bg-yellow-1 rounded-full">Read</a>
                        </div>

                        <a href="/book/${data?.book?.slug}"
                            class="text-gray-2 absolute lg:hidden block bottom-6 left-1/2 -translate-x-1/2 max-w-[95%]  lg:w-auto w-full min-w-[162px] transition-all duration-300 hover:bg-yellow-500 text-center font-medium text-lg py-2.5 px-8 font-NotoSansJP bg-yellow-1 rounded-full">Read</a>
                    </div>`
            const freebookDiv = document.getElementById("freebook");
            freebookDiv.innerHTML = genHtml
        }

    }
    catch (e) { console.log(e); }
}



getFreeBook()