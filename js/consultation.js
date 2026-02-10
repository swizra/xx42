(() => {
  const paymentLink = "https://buy.stripe.com/test_14A28r6Tu7yp9oIaTU53O01";
  const buttons = [
    document.getElementById("consultation-cta-custom"),
    document.getElementById("consultation-cta"),
  ].filter(Boolean);

  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      if (!paymentLink || paymentLink.includes("your_payment_link")) {
        alert(
          "Add your Stripe Payment Link in js/consultation.js before going live.",
        );
        return;
      }

      window.open(paymentLink, "_blank", "noopener,noreferrer");
    });
  });
})();
