// import Toastify from '../node_modules'
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
            const response = await fetch("http://localhost:8888/.netlify/functions/signin", options)
            console.log("RRRR", response)
            const result = await response.json()
            console.log(result)
            if (response.status === 200) {
                localStorage.setItem("token", result.token)
                localStorage.setItem("user", JSON.stringify(result.user))
                showToast("LOGIN Success")

            } else {
                showToast(result.error)
            }

        } catch (error) {
            console.log(error)
        }
    } else {
        let alertDiv = document.getElementById("alert-text")
        alertDiv.classList.add("text-red-500")
        alertDiv.innerHTML = "Fill all fields"
    }
}


function showToast(message) {
    let alertDiv = document.getElementById("toast-container")
    alertDiv.classList.remove("hidden")
    setInterval(() => {
        alertDiv.classList.add
            ("hidden")
    }, 3000)
}
