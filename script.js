console.log("Portfolio Loaded Successfully");

/* ================= PROJECT DESCRIPTION TOGGLE ================= */
function toggleDescription(btn) {
    const desc = btn.closest(".project-card").querySelector(".small-popup");

    // Close all other popups
    document.querySelectorAll(".small-popup").forEach(popup => {
        if (popup !== desc) popup.style.display = "none";
    });

    // Toggle current popup
    desc.style.display = desc.style.display === "block" ? "none" : "block";
}

function openPopup(btn) {
    const card = btn.closest(".project-card");
    if (!card) return;

    const popup = card.querySelector(".small-popup");
    if (!popup) return;

    // Close all other popups
    document.querySelectorAll(".small-popup").forEach(p => {
        if (p !== popup) p.style.display = "none";
    });

    // Toggle current popup
    popup.style.display =
        popup.style.display === "block" ? "none" : "block";
}

/* ================= CLOSE POPUP ================= */
function closePopup(btn) {
    btn.parentElement.style.display = "none";
}

/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", function () {

    /* ---------- EMAILJS ---------- */
    if (typeof emailjs !== "undefined") {
        emailjs.init("_VtEa1RdW-OhuH7UH");
    }

    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // prevent page jump

            emailjs.send("service_lbuk1kj", "template_ajij65k", {
                from_name: document.getElementById("name").value,
                from_email: document.getElementById("email").value,
                message: document.getElementById("message").value,
            })
            .then(() => {
                alert("Message sent successfully!");
                form.reset();
            })
            .catch(error => {
                alert("Failed to send message");
                console.error("EmailJS error:", error);
            });
        });
    }

    /* ---------- THEME TOGGLE ---------- */
    const toggleBtn = document.getElementById("theme-toggle");

    if (toggleBtn) {
        // Load saved theme
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-theme");
            toggleBtn.textContent = "☀️";
        } else {
            toggleBtn.textContent = "🌙";
        }

        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");

            const isLight = document.body.classList.contains("light-theme");
            toggleBtn.textContent = isLight ? "☀️" : "🌙";
            localStorage.setItem("theme", isLight ? "light" : "dark");
        });
    }
});
function openCVPopup() {
    document.getElementById("cv-popup").style.display = "flex";
}

function closeCVPopup() {
    document.getElementById("cv-popup").style.display = "none";
}

function submitCV() {
    const name = document.getElementById("cv-name").value.trim();
    const email = document.getElementById("cv-email").value.trim();

    if (!name || !email) {
        alert("Please enter both name and email");
        return;
    }

    // Send details to your email
    emailjs.send("service_lbuk1kj", "template_ajij65k", {
        from_name: name,
        from_email: email,
        message: "Downloaded CV"
    });

    // Trigger CV download
    const link = document.createElement("a");
    link.href = "YOUR_CV.pdf";   // 🔴 put your actual CV file name here
    link.download = "Navya_Bhargavi_CV.pdf";
    link.click();

    closeCVPopup();
}
