function toggleMenu(){
  document.getElementById("menu").classList.toggle("show");
}

/* ===== CLICK OUTSIDE TO CLOSE MENU ===== */
document.addEventListener("click", function(e){
  const menu = document.getElementById("menu");
  const toggle = document.querySelector(".menu-toggle");

  if (!menu.contains(e.target) && !toggle.contains(e.target)) {
    menu.classList.remove("show");
  }
});

/* ===== SLIDER ===== */
let slides=[
  "img/mainbuilding.jpg",
  "img/playground.jpg",
  "img/staff.jpg"
];
let i=0;
setInterval(()=>{
  i=(i+1)%slides.length;
  document.getElementById("slideImg").src=slides[i];
},3000);
function toggleSubMenu() {
  const menu = document.getElementById("execMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

function filterGallery(category) {
  const items = document.querySelectorAll(".gallery-item");
  const buttons = document.querySelectorAll(".gallery-filters button");

  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  items.forEach(item => {
    if (category === "all" || item.classList.contains(category)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

document.querySelectorAll(".gallery-item img").forEach(img => {
  img.onclick = () => {
    const popup = document.createElement("div");
    popup.style = `
      position:fixed;
      top:0;left:0;
      width:100%;height:100%;
      background:rgba(0,0,0,0.8);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:9999;
    `;
    popup.innerHTML = `<img src="${img.src}" style="max-width:90%;max-height:90%">`;
    popup.onclick = () => popup.remove();
    document.body.appendChild(popup);
  };
});

let galleryData = [];

fetch("gallery.json")
  .then(res => res.json())
  .then(data => {
    galleryData = data;
    renderGallery("all");
  });

function renderGallery(category) {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = "";

  galleryData.forEach(item => {
    if (category === "all" || item.category === category) {
      grid.innerHTML += `
        <div class="gallery-item ${item.category}">
          <img src="${item.image}" alt="${item.title}">
          <span class="overlay">${item.title}</span>
        </div>
      `;
    }
  });
}

function filterGallery(category, btn) {
  document.querySelectorAll(".gallery-filters button")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  renderGallery(category);
}