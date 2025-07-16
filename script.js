// Function to load the Font Awesome Set
const faSet = document.createElement('link');
faSet.rel = "stylesheet";
faSet.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css";
document.head.appendChild(faSet);

// definitions for Supabase
const supabaseUrl = 'https://whmlpoxodlbtbfbitvxh.supabase.co'
const supabaseKey = "sb_publishable_2JaIl9xJY-RVuQeNuuW-2Q_liqOwqhd"
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// load supabase to every page
const subB = document.createElement('script');
subB.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
document.head.appendChild(subB)

// Fuction to toggle between mobile navbar and desktop navbar
function toggleMenu() {
  const nav = document.querySelector(".nav-links-mobile");
  nav.classList.toggle("show");
}

// Function to dynamically load the navbar
function createNavBar() {
  const navList = [
    ["Home", "./index.html"],
    ["Practices", "./practice.html"],
    ["Members Portal", "./members-portal.html"],
    ["Contact Us", "./contact-us.html"],
    ["Register", "./register.html"]
  ]; // List of links in the navbar

  const nav = document.createElement("nav");
  nav.className = "custom-navbar";
  nav.innerHTML = `
    <div class="nav-container">
      <div class="top-row">
      <div style = "display: flex">
      <a href="./index.html" style="color: #efefef; text-decoration: none;" class="site-title"><p id="mega"> Colombo Independent Debaters' Society</p> <p id="mini">CIDS</p></a>
      </div>
        <div class="menu-toggle" onclick="toggleMenu()"><i class="fa">&#9776;</i></div>
        <ul class="nav-links-desktop">
          ${navList.map(([label, link]) => `<li id = "${label}"><a href="${link}">${label}</a></li>`).join("")}
        </ul>
      </div>
      <ul class="nav-links-mobile">
        <div class="menu-toggle" onclick="toggleMenu()" style="width: 100%; margin-top: 15px; margin-bottom: 20px;"><i class="fa">&#xf00d;</i></div>
        ${navList.map(([label, link]) => `<li><a href="${link}">${label}</a></li>`).join("")}
      </ul>
    </div>
  `;
  document.body.insertBefore(nav, document.body.firstChild);
}

// Adjust the height of the Text Content box with entry
function adjustTextContentHeight(textarea, form, startingLineHeight) {
  const lineHeight = 20;

  textarea.addEventListener('input', function () {
    this.rows = startingLineHeight;
    const lines = Math.floor(this.scrollHeight / lineHeight);
    this.rows = lines;
  });

  form.addEventListener('reset', function () {
    setTimeout(() => {
      textarea.rows = startingLineHeight;
    }, 0);
  });
}

// dymanically load the footer
function createFooter() {
  const footerLinks = [
    ["https://www.instagram.com/cids_srilanka/", "fa-brands", "f16d"],
    ["mailto:cids.english@gmail.com", "fa-regular", "f0e0"],
    ["https://www.linkedin.com/company/cids_sri_lanka/", "fa-brands", "f0e1"]
  ]

  const footer = `
    <div class="footer" id="footer">
      <div class="contact-buttons">
          ${footerLinks.map(([link, type, icon]) => `<a href="${link}"><button><i class="${type}">&#x${icon};</i></button></a>`).join("")}
      </div>
      <p>Colombo Independent Debaters' Society © All Rights Reserved</p>
    </div>
  `
  document.getElementById("bodyMain").insertAdjacentHTML('afterend', footer)
}

// function for the FAQ collapsible to work
function faqManagement() {
  const faqButtons = document.getElementsByClassName("show-faq");

  for (let i = 0; i < faqButtons.length; i++) {
    faqButtons[i].addEventListener("click", function () {
      const answer = this.parentElement.nextElementSibling;

      if (answer.style.maxHeight && answer.style.maxHeight !== "0px") {
        answer.style.maxHeight = "0px";
        this.textContent = "+";
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        this.textContent = "–";
      }
    });
  }
}

// manage a scrollable div that can hold anything really
function scrollDiv(id, side, onRightEnd = null) {
  const element = document.getElementById(id);
  const scrollAmount = Math.max(window.innerWidth * 0.25, 200);

  const maxScrollLeft = element.scrollWidth - element.clientWidth;
  let newScrollLeft = element.scrollLeft;

  if (side === "r") {
    newScrollLeft = Math.min(element.scrollLeft + scrollAmount, maxScrollLeft);
  } else if (side === "l") {
    newScrollLeft = Math.max(element.scrollLeft - scrollAmount, 0);
  }

  element.scroll({
    top: 0,
    left: newScrollLeft,
    behavior: "smooth",
  });

  if (onRightEnd && newScrollLeft >= maxScrollLeft) {
    onRightEnd();
  }
}

function onRightEnd() {
  alert("On the right");
}

// Function used to handle the login process
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const msg = document.getElementById('message');
  msg.textContent = "";

  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    msg.textContent = "Login failed: " + error.message;
    msg.style.color = "red";
  } else {
    msg.textContent = "Login successful!";
    msg.style.color = "lime";
    window.location.href = "./members-portal.html";
  }
}

async function logout() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    alert("Logout failed: " + error.message);
  } else {
    window.location.href = "./index.html";
  }
}
