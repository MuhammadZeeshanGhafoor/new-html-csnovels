
let closePopup = document.querySelector(".popup-close-btn");
let ShowPopup = document.querySelector(".popup-setting-btn");
let closePopup1 = document.querySelector(".close-popup-btn");
let ShowPopup1 = document.querySelector(".popup-table-btn");
let closeNav = document.querySelector(".close-nav-menu");
let openNav = document.querySelector(".open-nav-menu");
let closeOverlay = document.querySelector(".overlay");
let closeOverlay1 = document.querySelector(".overlay-1");
let closeOverlay2 = document.querySelector(".overlay-2");





if (openNav) {
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

}



if (ShowPopup) {
    closePopup.addEventListener("click", () => {
        document.querySelector(".overlay-1").classList.toggle('hidden');
        document.querySelector(".popup-wrapper").classList.toggle('hidden');
    });


    closeOverlay1.addEventListener("click", () => {
        document.querySelector(".overlay-1").classList.toggle('hidden');
        document.querySelector(".popup-wrapper").classList.toggle('hidden');
    });

    ShowPopup.addEventListener("click", () => {
        document.querySelector(".overlay-1").classList.toggle('hidden');
        document.querySelector(".popup-wrapper").classList.toggle('hidden');
    });

    closePopup1.addEventListener("click", () => {
        document.querySelector(".overlay-2").classList.toggle('hidden');
        document.querySelector(".popup-wrapper-2").classList.toggle('hidden');
    });

    closeOverlay2.addEventListener("click", () => {
        document.querySelector(".overlay-2").classList.toggle('hidden');
        document.querySelector(".popup-wrapper-2").classList.toggle('hidden');
    });

    ShowPopup1.addEventListener("click", () => {
        document.querySelector(".overlay-2").classList.toggle('hidden');
        document.querySelector(".popup-wrapper-2").classList.toggle('hidden');
    });

}


function readNextChapter() {
    let urlLocation = window.location.href.split("-")
    let currentCh = urlLocation[urlLocation.length - 1]

    if (Number(currentCh) > 4) {
        window.location.href = `/read-bookpage?slug=${slug}&chapter=${Number(currentCh) + 1}`
    } else {
        window.location.href = `/${slug}/chapter-${Number(currentCh) + 1}`

    }
}

async function addFavourite(bookSlug) {
    let user = localStorage.getItem('user')
    console.log("slug", bookSlug)

    if (user) {

        const parsedUser = JSON.parse(user)
        try {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "email": parsedUser.email,
                "slug": bookSlug
            });

            let response = await fetch("../.netlify/functions/addfavorite", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.text();
            if (response.status == 200) {
                let mainDiv = document.getElementById(`${bookSlug}`)
                console.log(mainDiv)
                let btnEle = mainDiv.getElementsByTagName("button")[0]
                // let btnEle = mainDiv.getElementsByTagName("button")[0];
                console.log("MAIN", mainDiv, "BUTTON", btnEle);

                // Ensure you are selecting the first element child, which should be the SVG
                let svgEle = btnEle.children[0];
                btnEle.removeChild(svgEle);
                btnEle.innerHTML = `<svg width="20" height="18" viewBox="0 0 18 16" class="text-transparent fav-icon"
                                        onclick="addFavourite('my-vampire-system')" fill="#FFC240"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.2501 8.47706L9.00009 14.6671L2.75009 8.47706C2.33784 8.0759 2.01312 7.59374 1.79638 7.06092C1.57963 6.52811 1.47556 5.95618 1.4907 5.38117C1.50585 4.80615 1.63989 4.2405 1.88439 3.71984C2.12888 3.19917 2.47853 2.73477 2.91133 2.35587C3.34412 1.97698 3.85068 1.6918 4.3991 1.51829C4.94752 1.34479 5.52593 1.28671 6.09789 1.34773C6.66986 1.40874 7.223 1.58752 7.72248 1.87281C8.22196 2.1581 8.65696 2.54372 9.00009 3.00539C9.3447 2.54708 9.7802 2.16483 10.2793 1.88256C10.7785 1.6003 11.3305 1.4241 11.9009 1.36499C12.4712 1.30588 13.0477 1.36514 13.5941 1.53905C14.1405 1.71296 14.6451 1.99779 15.0764 2.37569C15.5077 2.7536 15.8563 3.21646 16.1004 3.7353C16.3446 4.25414 16.479 4.81779 16.4953 5.39098C16.5117 5.96417 16.4095 6.53455 16.1952 7.06643C15.9809 7.59831 15.6592 8.08024 15.2501 8.48206"
                                            stroke="currentColor" stroke-width="0" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>`




            }


        } catch (error) {
            console.log(error)
        }

    }
}

async function getFavorites() {
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user)

        try {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "userId": "6232285f-17d5-4219-a99c-18a475f4f6cf",
                "email": parsedUser.email
            });

            let response = await fetch("../.netlify/functions/getfavorites", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.json();
            console.log(data);
            if (response.status == 200) {
                updateFavBtn(data)

            }
        } catch (error) {

        }
    }
}

getFavorites()

function updateFavBtn(data) {


    data.forEach((element) => {
        console.log("WORKING")
        let mainDiv = document.getElementById(`${element.book_slug}`)
        console.log(mainDiv)
        let btnEle = mainDiv.getElementsByTagName("button")[0]
        // let btnEle = mainDiv.getElementsByTagName("button")[0];
        console.log("MAIN", mainDiv, "BUTTON", btnEle);

        // Ensure you are selecting the first element child, which should be the SVG
        let svgEle = btnEle.children[0];
        btnEle.removeChild(svgEle);
        btnEle.innerHTML = `<svg width="20" height="18" viewBox="0 0 18 16" class="text-transparent fav-icon"
                            onclick="addFavourite('my-vampire-system')" fill="#FFC240"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.2501 8.47706L9.00009 14.6671L2.75009 8.47706C2.33784 8.0759 2.01312 7.59374 1.79638 7.06092C1.57963 6.52811 1.47556 5.95618 1.4907 5.38117C1.50585 4.80615 1.63989 4.2405 1.88439 3.71984C2.12888 3.19917 2.47853 2.73477 2.91133 2.35587C3.34412 1.97698 3.85068 1.6918 4.3991 1.51829C4.94752 1.34479 5.52593 1.28671 6.09789 1.34773C6.66986 1.40874 7.223 1.58752 7.72248 1.87281C8.22196 2.1581 8.65696 2.54372 9.00009 3.00539C9.3447 2.54708 9.7802 2.16483 10.2793 1.88256C10.7785 1.6003 11.3305 1.4241 11.9009 1.36499C12.4712 1.30588 13.0477 1.36514 13.5941 1.53905C14.1405 1.71296 14.6451 1.99779 15.0764 2.37569C15.5077 2.7536 15.8563 3.21646 16.1004 3.7353C16.3446 4.25414 16.479 4.81779 16.4953 5.39098C16.5117 5.96417 16.4095 6.53455 16.1952 7.06643C15.9809 7.59831 15.6592 8.08024 15.2501 8.48206"
                                stroke="currentColor" stroke-width="0" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>`
    });

}


async function getUpdatedChapters() {
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

        let response = await fetch("../.netlify/functions/getupdates", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        console.log("UPDATED Chapters", data);
        if (data) {
            console.log("GENRATING HTML")
            let genHtml = ""
            data.forEach((item, i) => {
                let date = new Date(item.update_time)
                let hour = date.getHours()
                let minutes = date.getMinutes()
                let bgColor = i % 2 === 0 ? 'bg-white' : 'bg-yellow-3';

                genHtml += ` <a href='/reading-page?slug=${item?.slug}&chapter=${item?.chapter_start}' class="flex ${bgColor} cursor-pointer w-full">
                            <div class="md:w-3/5 w-1/2 max-w-[838px] md:px-8 px-3 py-5">
                                <h3 class="md:text-lg text-xs text-[10px] font-NotoSansJP text-gray-6">${item?.title}</h3>
                            </div>
                            <div class="md:w-1/5 w-1/4 max-w-[240px] md:px-8 px-3 py-5 border-x border-gray-7">
                                <h3 class="md:text-lg text-xs text-[10px] font-NotoSansJP text-gray-6">${item?.chapter_start}</h3>
                            </div>
                            <div class="md:w-1/5 w-1/4 max-w-[240px] md:px-8 px-3 py-5">
                                <h3 class="md:text-lg text-xs text-[10px] font-NotoSansJP text-gray-6"> ${hour} : ${minutes} </h3>
                            </div>
                        </a>`
            })
            let updatedDiv = document.getElementById('updated-chapter')
            console.log("DIVV", updatedDiv)
            updatedDiv.innerHTML = genHtml
        }

    } catch (error) {

    }
}
getUpdatedChapters()