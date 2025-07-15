// Function to load the Font Awesome Set
const faSet = document.createElement('link');
faSet.rel = "stylesheet";
faSet.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css";
document.head.appendChild(faSet);

// Fuction to toggle between mobile navbar and desktop navbar
function toggleMenu() {
    const nav = document.querySelector(".nav-links-mobile");
    nav.classList.toggle("show");
}

// Function to dynamically load the navbar
function createNavBar() {
    const navList = [
        ["Home", "/index.html"],
        ["Practices", "/practice.html"],
        ["Member Portal", "/members.html"],
        ["Register", "/register.html"]
    ]; // List of links in the navbar

    const nav = document.createElement("nav");
    nav.className = "custom-navbar";
    nav.innerHTML = `
    <div class="nav-container">
      <div class="top-row">
      <a href="/index.html" style="color: #efefef; text-decoration: none;" class="site-title"><h1 id="mega"> Colombo Independent Debaters' Society</h1> <h1 id="mini">CIDS</h1></a>
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