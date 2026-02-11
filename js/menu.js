(() => {
  const burger = document.getElementById("burger-menu");
  const mobileNav = document.getElementById("mobile-nav");
  const body = document.body;
  const header = document.querySelector("header");
  let isOpen = false;

  if (!burger || !mobileNav) return;

  function openMenu() {
    isOpen = true;
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
    burger.classList.add("active");
    mobileNav.classList.add("active");

    // Add backdrop blur to header (Apple style)
    if (header) {
      header.style.backdropFilter = "saturate(180%) blur(20px)";
      header.style.backgroundColor = "rgba(255, 255, 255, 0.72)";
    }
  }

  function closeMenu() {
    isOpen = false;
    body.style.overflow = "";
    body.style.position = "";
    body.style.width = "";
    burger.classList.remove("active");
    mobileNav.classList.remove("active");

    // Remove backdrop blur from header
    if (header) {
      header.style.backdropFilter = "";
      header.style.backgroundColor = "";
    }
  }

  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // Close menu when clicking on links
  document.querySelectorAll(".mobile-link, .mobile-cta").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      closeMenu();
    }
  });

  // Close menu when resizing to desktop
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && isOpen) {
        closeMenu();
      }
    }, 250);
  });
})();
