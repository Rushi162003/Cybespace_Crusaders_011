let loginCheck = localStorage.getItem("currentAdminEmail");
if (loginCheck) {

    document.querySelector('.toggle').addEventListener('click', () => {
        document.querySelector('.navbar ul').classList.toggle('active');
    });

    console.log(loginCheck)



    let userLength = JSON.parse(localStorage.getItem("signup_details"))
    console.log(userLength)
    document.querySelector(".user").innerHTML = ` ${userLength.length} Active User `
    // Define array for operation 
    let productArr = []
    let proLength = 0


    // Fetch data from firebase 
    async function fetchData() {

        // fetch data 
        let res = await fetch(`https://nayka-4ffd7-default-rtdb.firebaseio.com/.json`)
        let data = await res.json()

        // set data to productArr And length
        productArr = data
        proLength = productArr.length

        document.querySelector("#product").innerHTML = `${proLength} Products Available`
        display(data)
    }
    // call fetch data 
    fetchData()

    // Display data from fetch using firebase
    function display(data) {
        let child = ""
        console.log(data)
        data.forEach(element => {
            child += `
             <tr>
                <td>${element.name}</td>
                <td>${element.brand}</td>
                <td>${element.category}</td>
                <td>${element.price}</td>
                <td>${element.ratings}</td>
                <td><button class="edit-btn" onclick = "edit(${element.id})">Edit  </button></td>
                <td><button class="delete-btn" onclick = "deleteProduct(${element.id})">Delete</button></td>
            </tr>
            `

        });
        document.querySelector("tbody").innerHTML = child
    }

    // Redirect to Edit html page
    function edit(id) {
        window.location.href = `editProduct.html?id=${id}`
    }


    // deleteProduct funciton for delete item from firebase 
    // Define the deleteProduct function and attach it to the window object
    window.deleteProduct = async function (id) {
        try {
            let request = {
                method: "DELETE",
                redirect: "follow"
            };
            let res = await fetch(`https://nayka-4ffd7-default-rtdb.firebaseio.com/${id}.json`, request);
            let data = await res.json();
            console.log(data);
            alert("Product deleted successfully");

            // Refresh product list after deletion (optional)
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

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