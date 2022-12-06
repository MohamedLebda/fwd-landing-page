//  Define Global Variables
const nav = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const scrollBtn = document.getElementById("btn");
const bufferZone = 100;
const navbarConatiner = document.querySelector(".page__header");
let prevScroll = window.scrollY;
// End Global Variables

// build the nav

for (let section of sections) {
  const li = document.createElement("li");
  const anchor = document.createElement("a");
  li.appendChild(anchor);
  anchor.textContent = section.querySelector("h2").textContent;
  // Scroll to section on link click
  anchor.setAttribute("href", `#${section.id}`);
  nav.appendChild(li);
}

// scroll to the top button
window.addEventListener("scroll", () => {
  if (window.scrollY >= 550) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
  navbarAppearance();
  // add active classes on scroll
  addActiveClass();
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Start Helper Functions
// to remove all classes in secetions
const removeActiveClass = (elements, className) => {
  elements.forEach((element) => element.classList.remove(className));
};

// End Helper Functions

// Add class 'active' to section when near top of viewport
// Begin Main Functions
const addActiveClass = () => {
  for (let i = 0; i < sections.length; i++) {
    //  remove all active classes
    removeActiveClass(sections, "active-class");
    // remove all active classes on nav bar
    nav.childNodes.forEach((listItem) =>
      listItem.firstChild.classList.remove("navbar-active")
    );

    if (
      (sections[sections.length - 1].getBoundingClientRect().top < bufferZone &&
        i === sections.length - 1) ||
      (sections[i].getBoundingClientRect().top < bufferZone &&
        sections[i + 1].getBoundingClientRect().top > bufferZone)
    ) {
      // Set section as active
      sections[i].classList.add("active-class");

      // Set section in nav bar as active
      nav.childNodes.forEach((listItem) => {
        if (
          listItem.textContent === sections[i].querySelector("h2").textContent
        ) {
          listItem.firstChild.classList.add("navbar-active");
        }
      });
      break;
    }
  }
};

// to Hide fixed navigation bar while not scrolling
function navbarAppearance() {
  if (prevScroll > window.scrollY || prevScroll < sections[0].offsetTop) {
    navbarConatiner.style.transform = "translate(0, 0)";
  } else {
    setTimeout(() => {
      navbarConatiner.style.transform = "translate(0, -100%)";
    }, 1000);
  }
  prevScroll = window.scrollY;
}
// End Main Functions
