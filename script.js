'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header active
 */

const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 300) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeHeader);



/**
 * toggle active on add to fav
 */

const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

const toggleActive = function () {
  this.classList.toggle("active");
}

addEventOnElem(addToFavBtns, "click", toggleActive);



/**
 * scroll revreal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 1.5) {
      sections[i].classList.add("active");
    } else {
      sections[i].classList.remove("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);


if (document.getElementById("sign-form")) {
    document.getElementById("sign-form").addEventListener("submit", (e) => {
        e.preventDefault();

        // Collect user data from the form
        const userData = {
            Password: document.getElementById("password").value, // Match API field name
            Email: document.getElementById("email").value,       // Match API field name
            FirstName: document.getElementById("firstname").value, // Match API field name
            LastName: document.getElementById("lastname").value,   // Match API field name
            PhoneNumber: document.getElementById("phonenumber").value, // Match API field name
        };

        // Call your backend API for signup
        fetch("https://kitkit.azurewebsites.net/api/User/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
               if (data.Token) {
                  window.location.href = "presale.html";
            } else {
                    alert("Signup failed: " + (data.message || "Please try again."));
}
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            });
    });
}

// Login Form Submission
if (document.getElementById("login-form")) {
    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const userData = {
            Email: document.getElementById("email").value,
            Password: document.getElementById("password").value,
        };

        // Call your backend API for login
        fetch("https://kitkit.azurewebsites.net/api/User/authenticate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
           .then((data) => {
               if (data.Token) {
                  window.location.href = "presale.html";
            } else {
                    alert("login failed: " + (data.message || "Please try again."));
}
            })
    });
}