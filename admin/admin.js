let loginCheck = localStorage.getItem("currentAdminEmail");
if (loginCheck) {

    document.querySelector('.toggle').addEventListener('click', () => {
        document.querySelector('.navbar ul').classList.toggle('active');
    });

    console.log(loginCheck)



    let userLength = JSON.parse(localStorage.getItem("signup_details"))
    console.log(userLength)
    document.querySelector(".user").innerHTML = ` ${userLength.length} Active User `
    let productArr = []
    let proLength = 0
    async function fetchData() {

        let res = await fetch(`https://nayka-4ffd7-default-rtdb.firebaseio.com/.json`)
        let data = await res.json()
        productArr = data
        proLength = productArr.length
        console.log(productArr)
        document.querySelector("#product").innerHTML = `${proLength} Products Available`
        console.log(proLength)
        display(productArr)
    }
    fetchData()

    function display(data) {
        let child = ""
        data.forEach(element => {
            child += `
             <tr>
                <td>${element.name}</td>
                <td>${element.brand}</td>
                <td>${element.category}</td>
                <td>${element.price}</td>
                <td>${element.ratings}</td>
                <td><button class="edit-btn" onclick = "edit(${element.id})">Edit  </button></td>
                <td><button class="delete-btn" onclick = "delete${element.id}">Delete</button></td>
            </tr>
            `

        });
        document.querySelector("tbody").innerHTML = child
    }
    function edit(id) {
        window.location.href = `editProduct.html?id=${id}`
    }

    // Logut button 
    const logoutButton = document.querySelector("#logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            // Clear user-specific data from localStorage
            localStorage.removeItem("currentUserId");
            localStorage.removeItem("currentUserEmail");

            alert("You have been logged out successfully.");

            // Redirect to the login page or home page
            window.location.href = "./login.html"; // Replace with the desired page
        });
    }

}
else {
    alert("Please login first")
    window.location.href = "login.html"
}