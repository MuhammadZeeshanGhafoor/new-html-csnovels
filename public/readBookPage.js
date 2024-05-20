
let url = window.location.search
let currLocation = window.location.href
const searchParm = new URLSearchParams(url)
let newSlug = searchParm.get("slug")
console.log("NEW___SLUG", newSlug)

const newUrl = window.location.search;
const regex = /[\?&]slug=([^&#]+)/;
const match = newUrl.match(regex);
const slug = match && match[1];

console.log("SLJUGGGGG", slug); // Output: "the-first-heir"

const getChapterContent = async () => {
    const url = 'http://localhost:8888/.netlify/functions/getsinglechapter';
    const requestBody = {
        slug: slug,
        chapternumber: "1"
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify the content type as JSON
        },
        body: JSON.stringify(requestBody) // Convert the request body to JSON
    };

    const response = await fetch(url, options)
    let result = await response.json()
    let name = document.getElementById('bookname');
    name.innerText = result?.bookname
    const chapterContentParagraph = document.getElementById('chaptercontent');
    chapterContentParagraph.innerText = result.chaptercontent;

}
getChapterContent()
let indexes
const getIndexes = async () => {
    try {
        const response = await fetch(`http://localhost:8888/.netlify/functions/chapterindex?slug=${slug}`)
        const result = await response.json()
        indexes = result
        console.log(result, "abcRess");
        let paginationNumber = result.chapterIndex.length / 5
        console.log("LENGTH", typeof paginationNumber)
        let paginationDiv = document.getElementById("index-pagination")
        let paginations = ""
        for (let i = 0; i < 6; i++) {
            paginations += `<p onclick="indexPagination('${i}')">  ${Math.trunc(paginationNumber) * i} - ${Math.trunc(paginationNumber) * (i + 1)}</p>`
        }
        paginationDiv.innerHTML = paginations
        indexPagination(0)

    } catch (error) {
        console.log("ERROR FETCHING INDEXES", error)
    }
}
getIndexes()
function indexPagination(id) {
    let indexDiv = ''
    let selectedPage = id
    let paginationNumber = indexes.chapterIndex.length / 5
    let filteredIndexes = indexes.chapterIndex.filter((item) => item.chapternumber > (id * paginationNumber) && item.chapternumber < ((id + 1) * paginationNumber))
    console.log("FILTERED INDEXES", filteredIndexes)

    filteredIndexes.forEach((item) => {
        indexDiv += `<hr>
                    <a href="#" class="block px-4 py-3 text-gray-800 hover:bg-gray-200" >Chapter Number ${item.chapternumber}</a>`
    })
    document.getElementById("indexes").innerHTML = indexDiv
    console.log("INDEX", selectedPage)
}

async function getCurrentBook() {
    try {
        const data = await fetch("../.netlify/functions/getSingleBook?slug=no-1-supreme-warrior")
        let result = await data.json()
        let response = result?.book
        document.getElementById("cover-img").src = response?.coverimage
        document.getElementById("cover-img").classList.remove("animate-pulse")

    } catch (error) {
        console.log("ERROR IN REQ", error)
    }
}
getCurrentBook()

console.log("slugs", slug);
document.getElementById("cover-img").src = url.slice(1, url.length)
document.getElementById("cover-img2").src = url.slice(1, url.length)
// console.log(url.slice(1, url.length))
function toggleDropdown(id) {
    let contentIndex = document.getElementById("myDropdown")
    let setting = document.getElementById("closeIcon")

    if (id !== "myDropdown" &&
        !contentIndex.classList.contains("hidden")) {
        contentIndex.classList.add("hidden")
    }
    if (id == "myDropdown" &&
        contentIndex.classList.contains("hidden")) {
        setting.classList.add("hidden")
    }
    let dropdown = document.getElementById(id);
    dropdown.classList.toggle("hidden");
}
function handleClose(id) {
    let dropdown = document.getElementById(id);
    dropdown.classList.toggle("hidden");
}
