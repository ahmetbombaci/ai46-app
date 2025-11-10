// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Animate hamburger menu
  const spans = navToggle.querySelectorAll("span");
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const spans = navToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";

// Set initial theme
if (currentTheme === "dark") {
  html.setAttribute("data-theme", "dark");
  themeIcon.textContent = "☀️";
} else {
  html.setAttribute("data-theme", "light");
  themeIcon.textContent = "🌙";
}

// Toggle theme when button is clicked
themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Update icon
  themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll("section[id]");

const highlightNavigation = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add("active");
    } else {
      navLink?.classList.remove("active");
    }
  });
};

window.addEventListener("scroll", highlightNavigation);

// Form Submission Handler with EmailJS
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

  // Get the submit button and store original text
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="loading"></span> Sending...';

  try {
    // EmailJS Configuration
    // REPLACE THESE WITH YOUR ACTUAL IDs FROM EMAILJS
    const SERVICE_ID = "service_1f5lpjp"; // e.g., 'service_abc123'
    const TEMPLATE_ID = "template_3f00hzg"; // e.g., 'template_xyz789'

    // Send email using EmailJS
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name: data.name,
      from_email: data.email,
      company: data.company || "Not specified",
      service_interest: data.service || "Not specified",
      message: data.message,
      // You can add more fields here
      to_email: "contact@ai46.app", // Your email
      reply_to: data.email,
    });

    console.log("EmailJS Success:", response);

    // Show success message
    showNotification(
      "Thank you for your message! We'll get back to you within 24 hours.",
      "success"
    );

    // Reset form
    contactForm.reset();

    // Optional: Track successful submission
    if (typeof gtag !== "undefined") {
      gtag("event", "form_submit", {
        event_category: "Contact",
        event_label: "EmailJS Form",
      });
    }
  } catch (error) {
    console.error("EmailJS Error:", error);

    // Show user-friendly error message
    let errorMessage = "Sorry, there was an error sending your message. ";

    if (error.text) {
      // EmailJS specific error
      errorMessage +=
        "Please try again or email us directly at contact@ai46.app";
    } else {
      // Network or other error
      errorMessage += "Please check your connection and try again.";
    }

    showNotification(errorMessage, "error");

    // Optional: Provide fallback mailto link
    console.log("Fallback email data:", {
      mailto: `mailto:contact@ai46.app?subject=Website Inquiry from ${
        data.name
      }&body=${encodeURIComponent(data.message)}`,
    });
  } finally {
    // Restore button state
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

// Notification System
function showNotification(message, type = "success") {
  // Remove existing notification if any
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === "success" ? "#10B981" : "#EF4444"};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;

  // Add animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;

  if (!document.querySelector("style[data-notifications]")) {
    style.setAttribute("data-notifications", "true");
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".card, .service-card, .feature").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
  observer.observe(el);
});

// Add fade-in class styles
const fadeInStyle = document.createElement("style");
fadeInStyle.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(fadeInStyle);

// Navbar Background on Scroll
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
  }

  // Hide/show navbar on scroll
  if (currentScroll > lastScroll && currentScroll > 500) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
});

// Add smooth transition for navbar
navbar.style.transition = "all 0.3s ease-in-out";

// Initialize tooltips for service cards
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", (e) => {
    const rect = card.getBoundingClientRect();
    if (rect.width < 350) {
      card.style.zIndex = "10";
    }
  });

  card.addEventListener("mouseleave", () => {
    card.style.zIndex = "";
  });
});

// Form Validation
const inputs = contactForm.querySelectorAll("input, textarea, select");

inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    validateInput(input);
  });

  input.addEventListener("input", () => {
    if (input.classList.contains("error")) {
      validateInput(input);
    }
  });
});

function validateInput(input) {
  const value = input.value.trim();
  let isValid = true;
  let errorMessage = "";

  // Required field validation
  if (input.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "This field is required";
  }

  // Email validation
  if (input.type === "email" && value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid email address";
    }
  }

  // Update UI based on validation
  if (isValid) {
    input.classList.remove("error");
    input.style.borderColor = "";
    removeErrorMessage(input);
  } else {
    input.classList.add("error");
    input.style.borderColor = "#EF4444";
    showErrorMessage(input, errorMessage);
  }

  return isValid;
}

function showErrorMessage(input, message) {
  removeErrorMessage(input);

  const errorElement = document.createElement("span");
  errorElement.className = "error-message";
  errorElement.textContent = message;
  errorElement.style.cssText = `
        color: #EF4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;

  input.parentElement.appendChild(errorElement);
}

function removeErrorMessage(input) {
  const existingError = input.parentElement.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll handlers
window.addEventListener("scroll", debounce(highlightNavigation, 100));

// Log when page is fully loaded
window.addEventListener("load", () => {
  console.log("AI46 Website Loaded Successfully");

  // Remove loading states if any
  document.body.style.opacity = "1";

  // Preload images for better performance
  const imagesToPreload = [
    // Add image URLs here when you add actual images
  ];

  imagesToPreload.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
});

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
  }
});

// Print page info for debugging (remove in production)
console.log("AI46 - AI Transformation Services");
console.log("Contact: contact@ai46.app");
console.log("Ready to transform your business with AI");
