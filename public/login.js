// import Toastify from '../node_modules'
let userEmail = ""
let userId = ""
async function signIn() {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    console.log(email + "    ", password)
    if (email && password) {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
            const response = await fetch("../.netlify/functions/signin", options)
            console.log("RRRR", response)
            const result = await response.json()
            console.log(result)
            if (response.status === 200) {
                getUserData(result?.user?.id)
                localStorage.setItem("token", result.token)
                // if (user.name == undefined || null) {
                //     changeUi()
                // }
                localStorage.setItem("user", JSON.stringify(result.user))



                showToast({ message: "Login success", type: "success" })

            } else {
                showToast({ message: result.message, type: "error" })
            }

        } catch (error) {
            console.log(error)
            showToast({ message: error.message, type: "error" })

        }
    } else {
        showToast({ message: "fill all fields", type: "error" })
    }
}


function showToast(obj) {
    let alertDiv = document.getElementById("alert-box")
    alertDiv.classList.remove("hidden")
    if (obj.type == "error") {
        alertDiv.classList.add("flex")
        alertDiv.classList.add("bg-[#942e2e63]")
        alertDiv.classList.add("border-red-500")
        alertDiv.classList.add("text-red-500")
    } else {
        alertDiv.classList.add("flex")
        alertDiv.classList.add("bg-[#2e943f83]")
        alertDiv.classList.add("border-green-500")
    }




    alertDiv.innerHTML = `
    <div class="flex flex-col items-center justify-center">

    <p class="font-semibold">${obj.message}</p>
        <button class="bg-gray-500 text-white w-20 h-7 mt-5 rounded" onclick="closeAlert()">close</button>
    </div>
        `
    // alertDiv.innerHTML = ``

}
function closeAlert() {
    let alertDiv = document.getElementById("alert-box")
    alertDiv.classList.add("hidden")
}


async function getUserData(id) {
    console.log("GETTING USER DATA")
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
            userEmail = data?.user?.email
            userId = data?.user?.id
            changeUi()
        } else {
            localStorage.setItem('user', JSON.stringify(data?.user))
            setTimeout(() => {
                window.location.href = "/"
            }, 2000)
        }
    }

}



function changeUi() {


    let formDiv = document.getElementById("form-div")
    formDiv.innerHTML = ` <img src="./assets/logo-light.png" class="w-52" />
                <p class="text-xl text-white font-bold">Update your <span class="text-yellow-400">Profile</span></p>
                <!-- <input type="text" name="username" id="username" placeholder="Username"
                    class=" border-b-[1px] border-[#7b7b7b9f] outline-none p-2 md:p-4 w-[90%] bg-[#cec6c62b] rounded" /> -->


                                    <div class="border-b-[1px]  w-[90%]  flex flex-col justify-around ">
                <label >Name</label>

                <input type="text" name="name" id="name" placeholder="Name"
                    class=" border-b-[1px] border-[#7b7b7b9f] outline-none p-2 md:p-4 w-full bg-[#cec6c62b] rounded" />
                </div>

                <div class="border-b-[1px]  w-[90%]  flex flex-col justify-around ">
                <label >Profile picture</label>
                    <input type="file" name="image" id="image" placeholder="Select Image"
                        class="  outline-none p-2 md:p-4 w-full bg-[#cec6c62b] align-self-start rounded " />

                </div>
                
                <button class=" w-32 h-11 bg-slate-700 text-white rounded-md" id="action-button" onclick="updateProfile()">
                    Update Profile
                </button>`
}

async function updateProfile() {
    let image = document.getElementById("image")
    let name = document.getElementById("name")

    console.log(name)
    const formData = new FormData()
    formData.append("image", image.value)
    formData.append("name", name)

    try {

        let headerUpdate = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let bodyContentUpdate = JSON.stringify({
            name: name.value,
            email: userEmail
        });

        let updateName = await fetch("../.netlify/functions/updateUserName", {
            method: "POST",
            body: bodyContentUpdate,
            headers: headerUpdate
        });


        let updatedResult = await updateName.json();
        // console.log("updateName", updateName, "UPDATED RESULT", updatedResult)
        localStorage.setItem("user", JSON.stringify(updatedResult.data[0]))

        if (updateName.status === 200) {

            // console.log("USERNAME UPDATED", updatedResult)





            let headersList = {
                "Accept": "*/*"
                // "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            }

            let bodyContent = new FormData();
            bodyContent.append("id", userId);
            bodyContent.append("image", image.files[0]);

            let response = await fetch("../.netlify/functions/updateUserProfile", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.json();
            console.log("IMAGE RESPONSE", data);
            if (response.status == 200) {
                getUpdatedUserData()


            } else {
                changeUi()
            }
        }
    } catch (error) {
        console.log("ERROR", error)
    }

}




async function getUpdatedUserData() {
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

            localStorage.setItem("user", JSON.stringify(data?.user))
            window.location.href = "/"

        }
    }

}
