async function fetchData(url) {
    try {
        const response = await fetch(url, { method: 'GET' });
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

function renderBooks(books) {
    const main = document.getElementById('most-popular');
    const going = document.getElementById('onGoing');
    const ten = document.getElementById('top10');
    const complete = document.getElementById('Completed');

    let bookdivs = '';
    let onGoingDiv = '';
    let topTenDiv = '';
    let completeDiv = '';

    books.forEach((item, index) => {
        if (item.most_popular) {
            bookdivs += `
            <div class="flex flex-col items-start w-20 h-44 md:h-36  md:w-64 md:flex-row ">
            <img src=${item?.coverimage} class="rounded-md w-full md:w-2/5" onclick="openPage('${item?.slug}')">
            <div class="w-full md:h-full flex flex-col items-start md:justify-between  p-1 text-[#26292d] ">
                <b class="w-12 text-left  text-nowrap overflow-hidden text-ellipsis text-xs font-bold">
                   ${item?.title}</b>
                <div class="w-full flex flex-col md:flex-row  justify-between items-center font-bold text-gray-400">
                    <div class=" w-3/4 justify-start  self-start items-center hidden md:flex">
                        <img src="./assets/icon.png" class="w-5">
                        <p class=" text-xs text-nowrap overflow-hidden text-ellipsis" title="type">${item?.category}</p>
                    </div>
                    <div class="w-full md:2/5 flex justify-end">
                        <p class="text-xs" title="status">${item?.status}</p>
                    </div>
                </div>
        
                <div class="hidden md:flex gap-1 items-center  text-xs">
                    <img src="./assets/book-icon-mobile.png" class="w-3 h-5 ">
                    <p class="text-nowrap overflow-hidden text-ellipsis">
                        ${item?.chaptercount} chapters
                    </p>
                </div>
            </div>
        </div>

      `;
        }

        if (item.status === 'Ongoing') {
            onGoingDiv += `
                        <div class="flex flex-col items-start w-20 h-44 md:h-36  md:w-64 md:flex-row ">
                        <img src=${item?.coverimage} class="rounded-md w-full md:w-2/5" onclick="openPage('${item?.slug}')">
                        <div class="w-full md:h-full flex flex-col items-start md:justify-between  p-1 text-[#26292d] ">
                            <b class="w-full text-left  text-nowrap overflow-hidden text-ellipsis text-xs font-bold">
                               ${item?.title}</b>
                            <div class="hidden md:flex gap-1 items-center  text-xs">
                                <img src="./assets/book-icon-mobile.png" class="w-3 h-5 ">
                                <p class="text-nowrap overflow-hidden text-ellipsis">
                                    ${item?.chaptercount} chapters
                                </p>
                            </div>
                        </div>
                    </div>
                  `;
        }

        if (item.most_popular || item.status == 'Ongoing') {
            topTenDiv += `
            <div class="w-96 lg:w-[46%] p-1 mt-5 flex  ">
            <img src=${item?.coverimage} class="w-16 h-20 crisp-edges rounded-[5px]" onclick="openPage('${item?.slug}')">
            <p title="index number " class="text-red-500 font-bold text-sm mx-4">${index + 1}</p>
            <div class="flex flex-col ">
                <b class="max-w-44 text-nowrap overflow-hidden text-ellipsis text-sm font-bold">${item?.title}</b>
                <p title="geners" class="text-gray-600">${item?.category}</p>
                <div class="flex gap-1 items-center h-8 justify-start ">
                    <img src="./assets/star.png" class="w-4 h-4">
                    <p class="text-gray-600 text-center mt-1">${item?.avgrating.toFixed(2)}</p>
                </div>

            </div>
        </div>
            `
        }

    });

    main.innerHTML = bookdivs;
    going.innerHTML = onGoingDiv;
    ten.innerHTML = topTenDiv
}

async function fetchAndRenderBooks() {
    try {
        const data = await fetchData("../.netlify/functions/allbooks");
        // renderBooks(data.book);
    } catch (error) {

        console.error("Failed to fetch and render books:", error);
    }
}

// fetchAndRenderBooks();