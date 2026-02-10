const defaultLanguage = "en";
const supportedLanguages = [
  "en",
  "de",
  "es",
  "fr",
  "hi",
  "it",
  "ja",
  "pt",
  "ru",
  "uk",
  "zh",
];

let currentLanguage =
  localStorage.getItem("selectedLanguage") || defaultLanguage;

if (!supportedLanguages.includes(currentLanguage)) {
  const browserLang = navigator.language.split("-")[0];
  currentLanguage = supportedLanguages.includes(browserLang)
    ? browserLang
    : defaultLanguage;
}

document.documentElement.lang = currentLanguage;

async function loadTranslations(lang) {
  try {
    const response = await fetch(`/lang/${lang}.json`);
    return await response.json();
  } catch (error) {
    console.error("Error loading translations:", error);
    return null;
  }
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((current, prop) => current?.[prop], obj);
}

async function applyTranslations(translations) {
  if (!translations) return;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const value = getNestedValue(translations, key);
    if (value) {
      element.textContent = value;
    }
  });

  const titleKey = document.querySelector("[data-i18n='notFound.title']");
  if (titleKey && document.title.includes("404")) {
    const titleText = getNestedValue(translations, "notFound.title");
    if (titleText) {
      document.title = `${titleText} - KEFE STUDIO`;
    }
  }
}

(async () => {
  if (currentLanguage !== "en") {
    const translations = await loadTranslations(currentLanguage);
    applyTranslations(translations);
  } else {
    const translations = await loadTranslations("en");
    applyTranslations(translations);
  }
})();

if (
  localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.body.classList.add("dark-mode");
}
