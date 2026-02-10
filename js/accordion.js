(() => {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      const isActive = accordionItem.classList.contains("active");

      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
      });

      if (!isActive) {
        accordionItem.classList.add("active");
      }
    });
  });
})();
