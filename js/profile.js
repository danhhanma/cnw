document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  // Fetch user profile data
  fetch("http://localhost:8001/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        // Update profile information
        document.getElementById("profileFullName").textContent = data.full_name;
        document.getElementById("profileUsername").textContent =
          "@" + data.username;
        document.getElementById("profileEmail").textContent = data.email;
        document.getElementById("profilePoints").textContent =
          data.points + " điểm";
      }
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      // If token is invalid, redirect to login
      if (error.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "index.html";
      }
    });

  // Handle edit profile button
  document.querySelector(".btn-primary").addEventListener("click", function () {
    // Implement edit profile functionality
    alert("Chức năng chỉnh sửa thông tin đang được phát triển!");
  });
});
