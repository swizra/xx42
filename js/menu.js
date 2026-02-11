(() => {
  const burger = document.getElementById("burger-menu");
  const mobileNav = document.getElementById("mobile-nav");
  const body = document.body;
  let scrollPosition = 0;

  if (!burger || !mobileNav) return;

  function openMenu() {
    scrollPosition = window.scrollY;
    body.style.top = `-${scrollPosition}px`;
    body.classList.add("no-scroll");
    burger.classList.add("active");
    mobileNav.classList.add("active");
  }

  function closeMenu() {
    body.classList.remove("no-scroll");
    body.style.top = "";
    window.scrollTo(0, scrollPosition);
    burger.classList.remove("active");
    mobileNav.classList.remove("active");
  }

  burger.addEventListener("click", () => {
    if (!burger.classList.contains("active")) openMenu();
    else closeMenu();
  });

  document
    .querySelectorAll(".mobile-link, .mobile-cta")
    .forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    if (
      !mobileNav.contains(e.target) &&
      !burger.contains(e.target) &&
      mobileNav.classList.contains("active")
    ) {
      closeMenu();
    }
  });

  // Close mobile menu when screen resizes to desktop size
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && mobileNav.classList.contains("active")) {
        closeMenu();
      }
    }, 100);
  });
})();
