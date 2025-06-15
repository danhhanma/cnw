// Authentication related functions
const API_URL = "http://localhost:8001";

// Check login status and update UI
async function checkLoginStatus() {
  console.log("Checking login status...");
  const token = localStorage.getItem("token");

  if (window.ui) {
    window.ui.showLoadingSpinner();
  }

  if (!token) {
    console.log("No token found");
    if (window.ui) {
      window.ui.updateUIForLoggedOutUser();
    }
    return;
  }

  try {
    console.log("Fetching user data from /auth/me with token:", token);
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.trim()}`,
        Accept: "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User data received:", data);
      if (window.ui) {
        window.ui.updateUIForLoggedInUser(data.full_name);
      }
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error(
        "Invalid token or server error:",
        response.status,
        errorData
      );
      if (response.status === 401) {
        console.log("Token expired or invalid, removing from storage");
        localStorage.removeItem("token");
      }
      if (window.ui) {
        window.ui.updateUIForLoggedOutUser();
      }
    }
  } catch (error) {
    console.error("Error checking login status:", error);
    localStorage.removeItem("token");
    if (window.ui) {
      window.ui.updateUIForLoggedOutUser();
    }
  }
}

// Handle login form submission
async function handleLogin(e) {
  e.preventDefault();
  console.log("Handling login...");

  const usernameOrEmail = document.getElementById("username_or_email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username_or_email: usernameOrEmail,
        password: password,
      }),
    });

    const data = await response.json();
    console.log("Login response:", data);

    if (response.ok) {
      // Store token
      if (data.access_token) {
        localStorage.setItem("token", data.access_token.trim());
        console.log("Token stored:", data.access_token);
      } else {
        console.error("No access_token received in response");
        alert("Đăng nhập thất bại: Không nhận được access token");
        return;
      }

      // Update UI
      if (window.ui) {
        console.log("Updating UI with user data:", data.user);
        window.ui.updateUIForLoggedInUser(data.user.full_name);
        window.ui.closeLoginModal();
      } else {
        console.error("UI module not found!");
      }

      // Redirect to home page
      // No explicit redirect needed if UI updates correctly on current page
    } else {
      console.error("Login failed:", data.message);
      alert(data.message || "Đăng nhập thất bại");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Có lỗi xảy ra khi đăng nhập");
  }
}

// Handle register form submission
async function handleRegister(e) {
  e.preventDefault();
  console.log("Handling register...");

  const fullName = document.getElementById("full_name").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("register_password").value;

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        email: email,
        username: username,
        password: password,
      }),
    });

    const data = await response.json();
    console.log("Register response:", data);

    if (response.ok) {
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      if (window.ui) {
        window.ui.switchToLoginForm();
      }
    } else {
      console.error("Register failed:", data.message);
      alert(data.message || "Đăng ký thất bại");
    }
  } catch (error) {
    console.error("Register error:", error);
    alert("Có lỗi xảy ra khi đăng ký");
  }
}

// Handle logout
async function handleLogout(e) {
  e.preventDefault();
  console.log("Handling logout...");

  if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
    localStorage.removeItem("token");
    if (window.ui) {
      window.ui.updateUIForLoggedOutUser();
    }
    window.location.href = "index.html";
  }
}

// Handle profile navigation
function handleProfileNavigation() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
    return;
  }
  window.location.href = "profile.html";
}

// Add event listeners when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, setting up auth event listeners");
  const loginForm = document.getElementById("loginFormElement");
  const registerForm = document.getElementById("registerFormElement");
  const logoutBtnDesktop = document.getElementById("logoutBtnDesktop");
  const logoutBtnMobile = document.getElementById("logoutBtnMobile");
  const profileLinks = document.querySelectorAll('a[href="profile.html"]');

  if (loginForm) {
    console.log("Adding login form listener");
    loginForm.addEventListener("submit", handleLogin);
  }
  if (registerForm) {
    console.log("Adding register form listener");
    registerForm.addEventListener("submit", handleRegister);
  }
  if (logoutBtnDesktop) {
    console.log("Adding desktop logout button listener");
    logoutBtnDesktop.addEventListener("click", handleLogout);
  }
  if (logoutBtnMobile) {
    console.log("Adding mobile logout button listener");
    logoutBtnMobile.addEventListener("click", handleLogout);
  }

  // Add profile navigation listeners
  profileLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      handleProfileNavigation();
    });
  });
});

// Export functions for use in other files
window.auth = {
  handleLogin,
  handleRegister,
  handleLogout,
  checkLoginStatus,
  handleProfileNavigation,
};
