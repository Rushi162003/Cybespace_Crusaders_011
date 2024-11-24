let userEmail = localStorage.getItem("currentUserEmail");
let signBtn = document.querySelector("#signBtn");
if (userEmail) {
    // if (signBtn) {
    signBtn.innerHTML = `
        <span id="sign_in_button" style="display: inline-flex; align-items: center; justify-content: center; padding: 8px 16px; background-color: #e6007e; color: white; font-weight: bold; border-radius: 8px; font-size: 14px;" onclick="logout()">Logout</span>`;
    // }
}

console.log("email", localStorage.getItem("currentUserEmail"))
function logout() {
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUserEmail");
    alert("You have been logged out successfully.");
}