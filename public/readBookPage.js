
let url = window.location.search
console.log("!!!!!!!!CHAPTER READ", url)
let currLocation = window.location.href
const searchParm = new URLSearchParams(url)
let slug = searchParm.get("slug")
let chapterNumber = searchParm.get("chapter")

console.log("NEW___SLUG", chapterNumber, "CHAPTER", slug)


const getChapterContent = async () => {
    const url = '../.netlify/functions/getsinglechapter';
    const requestBody = {
        slug: slug,
        chapternumber: chapterNumber
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    };

    const response = await fetch(url, options)
    let result = await response.json()
    let name = document.getElementById('bookname');
    let number = document.getElementById('chapter-num')
    let number1 = document.getElementById('chapter-num-1')

    name.innerText = result?.bookname
    number.innerText = `Chapter - ${result?.chapternumber}`
    number1.innerText = `Chapter - ${result?.chapternumber}`

    const chapterContentParagraph = document.getElementById('chaptercontent');
    document.getElementById('loading').classList.add("hidden");
    chapterContentParagraph.innerText = result.chaptercontent;

}
getChapterContent()
let indexes
const getIndexes = async () => {
    console.log("FETCHING INDEXES")
    try {
        const response = await fetch(`../.netlify/functions/chapterindex?slug=${slug}`)
        const result = await response.json()
        let genHtml = ''
        // indexes = result
        console.log(result, "abcRess");
        if (response.status === 200) {
            result.chapterIndex.forEach((item) => {
                genHtml += `<li>
                                <a href="/reading-page?slug=${slug}&chapter=${item?.chapternumber}"
                                    class="py-2 border-b border-gray-5 text-lg font-normal active bg-yellow-7 px-5 flex items-center w-full text-gray-2 h-14 hover:bg-yellow-7">Chapter
            ${item?.chapternumber}</a>
                            </li>`
            })
        }
        // indexPagination(0)
        document.getElementById("number-of-chapters").innerHTML = `${result.chapterIndex.length}`
        let chapterList = document.getElementById('read-chapter-list')
        chapterList.innerHTML = genHtml

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
                    <a href="#" class="block px-4 py-3 text-gray-800 hover:bg-gray-200" onclick="openNewPage('${item.chapternumber}')" >Chapter Number ${item.chapternumber}</a>`
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
// getCurrentBook()

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

function openNewPage(chNumber) {
    console.log("NEXT CHAPTER Dynamic", chNumber)

    if (chNumber > 5) {

        window.location.href = `/reading-page?slug=${slug}&chapter=${chNumber}`

    } else {
        window.location.href = `/${slug}/chapter-${chNumber}`
    }
}

function readNextChapter() {

    let currentCh = Number(chapterNumber)
    if (currentCh > 4) {
        window.location.href = `/reading-page?slug=${slug}&chapter=${currentCh + 1}`
    } else {
        window.location.href = `/${slug}/chapter-${currentCh + 1}`

    }
}
function previousCh() {

    if (chapterNumber > 5) {
        window.location.href = `/reading-page?slug=${slug}&chapter=${chapterNumber - 1}`

    } else {
        window.location.href = `/${slug}/chapter-${chapterNumber - 1}`

    }
}