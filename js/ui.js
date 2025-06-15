// UI related functions
let uiInitialized = false;

function initializeUI() {
  if (uiInitialized) return;

  // Initialize UI elements
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const showRegisterLink = document.getElementById("showRegister");
  const showLoginLink = document.getElementById("showLogin");
  const modalTitle = document.getElementById("modalTitle");
  const notLoggedInDiv = document.getElementById("notLoggedIn");
  const loggedInDiv = document.getElementById("loggedIn");
  const userFullName = document.getElementById("userFullName");
  const notLoggedInMobileDiv = document.getElementById("notLoggedInMobile");
  const loggedInMobileDiv = document.getElementById("loggedInMobile");
  const userFullNameMobile = document.getElementById("userFullNameMobile");
  const loadingSpinnerDesktop = document.getElementById(
    "loadingSpinnerDesktop"
  );
  const loadingSpinnerMobile = document.getElementById("loadingSpinnerMobile");

  // Add event listeners
  if (showRegisterLink) {
    showRegisterLink.addEventListener("click", handleShowRegister);
  }
  if (showLoginLink) {
    showLoginLink.addEventListener("click", handleShowLogin);
  }
  if (document.getElementById("loginFormElement")) {
    document
      .getElementById("loginFormElement")
      .addEventListener("submit", window.auth.handleLogin);
  }
  if (document.getElementById("registerFormElement")) {
    document
      .getElementById("registerFormElement")
      .addEventListener("submit", window.auth.handleRegister);
  }
  if (document.getElementById("logoutBtnMobile")) {
    document
      .getElementById("logoutBtnMobile")
      .addEventListener("click", window.auth.handleLogout);
  }
  if (document.getElementById("logoutBtnDesktop")) {
    document
      .getElementById("logoutBtnDesktop")
      .addEventListener("click", window.auth.handleLogout);
  }
  if (document.getElementById("viewProfile")) {
    document
      .getElementById("viewProfile")
      .addEventListener("click", handleViewProfile);
  }

  uiInitialized = true;
}

// Function to set the active navigation link
function setActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// UI update functions
function updateUIForLoggedInUser(fullName) {
  console.log("Updating UI for logged in user:", fullName);

  const notLoggedInDiv = document.getElementById("notLoggedIn");
  const loggedInDiv = document.getElementById("loggedIn");
  const userFullName = document.getElementById("userFullName");
  const notLoggedInMobileDiv = document.getElementById("notLoggedInMobile");
  const loggedInMobileDiv = document.getElementById("loggedInMobile");
  const userFullNameMobile = document.getElementById("userFullNameMobile");
  const loadingSpinnerDesktop = document.getElementById(
    "loadingSpinnerDesktop"
  );
  const loadingSpinnerMobile = document.getElementById("loadingSpinnerMobile");

  if (notLoggedInDiv && loggedInDiv && userFullName) {
    console.log("Updating desktop view");
    userFullName.textContent = fullName;
    notLoggedInDiv.style.display = "none";
    loggedInDiv.style.display = "block";
  }

  if (notLoggedInMobileDiv && loggedInMobileDiv && userFullNameMobile) {
    console.log("Updating mobile view");
    userFullNameMobile.textContent = fullName;
    notLoggedInMobileDiv.style.display = "none";
    loggedInMobileDiv.style.display = "block";
  }
  if (loadingSpinnerDesktop) loadingSpinnerDesktop.style.display = "none";
  if (loadingSpinnerMobile) loadingSpinnerMobile.style.display = "none";
}

function updateUIForLoggedOutUser() {
  console.log("Updating UI for logged out user");

  const notLoggedInDiv = document.getElementById("notLoggedIn");
  const loggedInDiv = document.getElementById("loggedIn");
  const notLoggedInMobileDiv = document.getElementById("notLoggedInMobile");
  const loggedInMobileDiv = document.getElementById("loggedInMobile");
  const loadingSpinnerDesktop = document.getElementById(
    "loadingSpinnerDesktop"
  );
  const loadingSpinnerMobile = document.getElementById("loadingSpinnerMobile");

  if (notLoggedInDiv && loggedInDiv) {
    console.log("Updating desktop view");
    notLoggedInDiv.style.display = "block";
    loggedInDiv.style.display = "none";
  }

  if (notLoggedInMobileDiv && loggedInMobileDiv) {
    console.log("Updating mobile view");
    notLoggedInMobileDiv.style.display = "block";
    loggedInMobileDiv.style.display = "none";
  }
  if (loadingSpinnerDesktop) loadingSpinnerDesktop.style.display = "none";
  if (loadingSpinnerMobile) loadingSpinnerMobile.style.display = "none";
}

function showLoadingSpinner() {
  const notLoggedInDiv = document.getElementById("notLoggedIn");
  const loggedInDiv = document.getElementById("loggedIn");
  const notLoggedInMobileDiv = document.getElementById("notLoggedInMobile");
  const loggedInMobileDiv = document.getElementById("loggedInMobile");
  const loadingSpinnerDesktop = document.getElementById(
    "loadingSpinnerDesktop"
  );
  const loadingSpinnerMobile = document.getElementById("loadingSpinnerMobile");

  if (notLoggedInDiv) notLoggedInDiv.style.display = "none";
  if (loggedInDiv) loggedInDiv.style.display = "none";
  if (notLoggedInMobileDiv) notLoggedInMobileDiv.style.display = "none";
  if (loggedInMobileDiv) loggedInMobileDiv.style.display = "none";
  if (loadingSpinnerDesktop)
    loadingSpinnerDesktop.style.display = "inline-block";
  if (loadingSpinnerMobile) loadingSpinnerMobile.style.display = "inline-block";
}

function handleInvalidToken() {
  console.log("Handling invalid token");
  localStorage.removeItem("token");
  updateUIForLoggedOutUser();
}

// Form handling functions
function handleShowRegister(e) {
  e.preventDefault();
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const modalTitle = document.getElementById("modalTitle");

  if (loginForm && registerForm && modalTitle) {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    modalTitle.textContent = "Đăng ký";
  }
}

function handleShowLogin(e) {
  e.preventDefault();
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const modalTitle = document.getElementById("modalTitle");

  if (loginForm && registerForm && modalTitle) {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    modalTitle.textContent = "Đăng nhập";
  }
}

function switchToLoginForm() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const modalTitle = document.getElementById("modalTitle");

  if (loginForm && registerForm && modalTitle) {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    modalTitle.textContent = "Đăng nhập";
  }
}

function closeLoginModal() {
  const modalElement = document.getElementById("BookingModal");
  if (modalElement) {
    // Hide the modal using Bootstrap's method
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }

    // Manually ensure the modal is hidden and backdrop/modal-open class are removed
    modalElement.style.display = "none";
    modalElement.setAttribute("aria-hidden", "true");
    modalElement.classList.remove("show");

    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.remove());

    document.body.classList.remove("modal-open");
    document.body.style.overflow = ""; // Restore body overflow
    document.body.style.paddingRight = ""; // Restore body padding
  }
}

function handleViewProfile(e) {
  e.preventDefault();
  window.location.href = "profile.html";
}

// Initialize UI when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing UI");
  initializeUI();
  setActiveNavLink();

  // Check initial login status
  if (window.auth) {
    console.log("Checking initial login status");
    showLoadingSpinner();
    window.auth.checkLoginStatus();
  }
});

// Export functions for use in other files
window.ui = {
  updateUIForLoggedInUser,
  updateUIForLoggedOutUser,
  handleInvalidToken,
  switchToLoginForm,
  closeLoginModal,
  initializeUI,
  showLoadingSpinner,
};
