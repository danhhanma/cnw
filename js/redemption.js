document.addEventListener("DOMContentLoaded", function () {
  // Function to handle redemption
  window.handleRedeem = async function (itemPrice) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để thực hiện quy đổi!");
      // Optionally, open the login modal
      // const loginModal = new bootstrap.Modal(document.getElementById('BookingModal'));
      // loginModal.show();
      return;
    }

    if (
      !confirm(
        `Bạn có chắc chắn muốn quy đổi vật phẩm này và nhận ${itemPrice} điểm?`
      )
    ) {
      return;
    }

    try {
      // Fetch current user points
      const userResponse = await fetch("http://localhost:8001/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        if (userResponse.status === 401) {
          alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          localStorage.removeItem("token");
          window.location.href = "index.html";
        } else {
          alert("Không thể lấy thông tin người dùng. Vui lòng thử lại.");
        }
        return;
      }

      const userData = await userResponse.json();
      const currentPoints = userData.score || 0;

      const newScore = currentPoints + itemPrice;

      // Send update score request
      const updateResponse = await fetch(
        "http://localhost:8001/auth/update-score",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ new_score: newScore }),
        }
      );

      if (updateResponse.ok) {
        const updatedUserData = await updateResponse.json();
        alert(
          `Quy đổi thành công! Bạn đã nhận được ${itemPrice} điểm. Điểm của bạn hiện tại là ${updatedUserData.score} điểm.`
        );
        // Update UI for points (e.g., in navigation bar)
        if (window.ui && window.ui.updateUIForLoggedInUser) {
          window.ui.updateUIForLoggedInUser(
            updatedUserData.full_name,
            updatedUserData.score
          );
        }
        // Optionally, refresh the page or update relevant elements dynamically
        location.reload(); // Simple refresh for now
      } else {
        const errorData = await updateResponse.json();
        alert(
          `Quy đổi thất bại: ${errorData.message || updateResponse.statusText}`
        );
      }
    } catch (error) {
      console.error("Error during redemption:", error);
      alert("Đã xảy ra lỗi trong quá trình quy đổi. Vui lòng thử lại.");
    }
  };

  // Add event listeners to all redeem buttons
  document.querySelectorAll(".redeem-btn").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const itemPrice = parseInt(this.dataset.price);
      if (!isNaN(itemPrice)) {
        window.handleRedeem(itemPrice);
      } else {
        console.error("Invalid item price for redemption button:", this);
      }
    });
  });
});
