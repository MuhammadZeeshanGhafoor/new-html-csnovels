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

function getIndexes(slug) {
    console.log("INDEXXXEEESSS", slug)
}