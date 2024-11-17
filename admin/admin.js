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
        console.log(productArr)
        display(productArr)
    }
    // call fetch data 
    fetchData()
 
    function display(data) {
        let child = "";
    
        // Check if data is an object and convert it to an array
        if (data && typeof data === 'object') {
            data = Object.values(data);
        }
    
        // Filter out any null or undefined elements from the data array
        data = data.filter(element => element !== null);
    
        const proLength = data.length;
    
        document.querySelector("#product").innerHTML = `${proLength} Products Available`;
    
        // Now proceed with the safe iteration
        data.forEach(element => {
            child += `
                <tr>
                    <td>${element.name}</td>
                    <td>${element.brand}</td>
                    <td>${element.category}</td>
                    <td>${element.price}</td>
                    <td>${element.ratings}</td>
                    <td><button class="edit-btn" onclick="edit(${element.id})">Edit</button></td>
                    <td><button class="delete-btn" onclick="deleteProduct(${element.id})">Delete</button></td>
                </tr>
            `;
        });
    
        document.querySelector("tbody").innerHTML = child;
    }
    

    // Redirect to Edit html page
    function edit(id) {
        window.location.href = `editProduct.html?id=${id}`
    }


    // deleteProduct funciton for delete item from firebase 
    // Define the deleteProduct function and attach it to the window object
    window.deleteProduct = async function (id) {
        try {
            let res = await fetch(`https://nayka-4ffd7-default-rtdb.firebaseio.com/${id-1}.json`, {
                method: "DELETE", // Use DELETE method
                redirect: "follow" // Follow redirects if necessary
            });

            // Check if the request was successful
            if (res.ok) {
                alert("Product deleted successfully");

                // Refresh product list after deletion (optional)
                await fetchData();
            } else {
                throw new Error("Failed to delete product");
            }
        } catch (error) {
            console.log(error);
            alert("There was an error deleting the product");
        }
    };


    // Logut button 
    const logoutButton = document.querySelector("#logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            // Clear user-specific data from localStorage
            localStorage.removeItem("currentAdminId");
            localStorage.removeItem("currentAdminEmail");

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