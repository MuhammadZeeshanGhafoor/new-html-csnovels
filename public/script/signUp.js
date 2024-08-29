
let email

async function getUsername() {
    try {
        const response = await fetch("../.netlify/functions/generateUsername")
        const result = await response.json();
        if (response.status == 200) {
            document.getElementById("username").value = result.username
        }
    } catch (error) {
        console.log(error)
    }
}
async function signUp() {
    email = document.getElementById("email").value
    let password = document.getElementById("password").value
    if (email && password) {


        try {
            // let username = document.getElementById("username").value


            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                email: email,
                password: password,
                // username: username
            });

            let response = await fetch("../.netlify/functions/signup", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            const result = await response.json()

            if (response.status === 200) {
                showToast({ message: result.message, type: "success" })

                setTimeout(() => {
                    let alertDiv = document.getElementById("alert-box").hidden
                    // window.location = "/login"
                    changeUi()
                }, 2000)
            } else {
                showToast({ message: result.message, type: "error" })
                console.log("0", result)
            }


        } catch (error) {
            showToast({ message: error?.message, type: "error" })

            console.log("2", error)

        }
    } else {

        showToast({ message: "Fill all fields", type: "error" })
        console.log("1", "Type all fields")


    }
}

// getUsername()



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
        alertDiv.classList.add("text-green-500")

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

function navStatus(status) {
    let nav = document.getElementById("navigation")
    if (status == "close") {

        nav.classList.add("hidden")
    } else {
        nav.classList.remove("hidden")

        nav.classList.add("block")

    }
}

function showPassword() {
    let passInput = document.getElementById("password")
    passInput.type = passInput.type == "password" ? "text" : "password"
}


window.addEventListener("DOMContentLoaded", () => {

    let formDiv = document.getElementById("form-div")
    formDiv.innerHTML = ` <img src="./assets/logo-light.png" class="w-52" />
                <p class="text-xl text-white font-bold">Sign <span class="text-yellow-400">Up</span></p>
                <!-- <input type="text" name="username" id="username" placeholder="Username"
                    class=" border-b-[1px] border-[#7b7b7b9f] outline-none p-2 md:p-4 w-[90%] bg-[#cec6c62b] rounded" /> -->

                <input type="text" name="email" id="email" placeholder="Email"
                    class=" border-b-[1px] border-[#7b7b7b9f] outline-none p-2 md:p-4 w-[90%] bg-[#cec6c62b] rounded" />


                <div class="border-b-[1px] border-[#7b7b7b9f] w-[90%] bg-[#cec6c62b] flex justify-around rounded">
                    <input type="password" name="password" id="password" placeholder="password"
                        class="  outline-none p-2 md:p-4 w-[90%] bg-[#cec6c62b] align-self-start rounded " />

                    <img src="./assets/Images/eye.png" class="w-6 h-6  mt-4 text-white  " onclick="showPassword()" />
                </div>
                <p>
                    Already have an account!
                    <a href="/login" class="font-semibold bg-blue-700 underline p-1 rounded"> Login</a>
                </p>
                <button class=" w-32 h-11 bg-slate-700 text-white rounded-md" id="action-button" onclick="signUp()">
                    Sign Up
                </button>`
})


// changeUi()


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
            email
        });

        let updateName = await fetch("../.netlify/functions/updateUserName", {
            method: "POST",
            body: bodyContentUpdate,
            headers: headerUpdate
        });


        let updatedResult = await updateName.json();
        console.log("updateName", updateName, "UPDATED RESULT", updatedResult)
        localStorage.setItem("user", JSON.stringify(updatedResult.data[0]))
        if (updateName.status === 200) {

            console.log("USERNAME UPDATED", updatedResult)



            let headersList = {
                "Accept": "*/*"
                // "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            }

            let bodyContent = new FormData();
            bodyContent.append("id", updatedResult?.data[0]?.id);
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
