const applyTheme = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    document.documentElement.style.setProperty("--bg", "#0a0a0a");
    document.documentElement.style.setProperty("--text", "#ffffff");
  } else {
    document.documentElement.style.setProperty("--bg", "#ffffff");
    document.documentElement.style.setProperty("--text", "#000000");
  }
};

const mq = window.matchMedia("(prefers-color-scheme: dark)");
if (mq.addEventListener) {
  mq.addEventListener("change", applyTheme);
} else if (mq.addListener) {
  mq.addListener(applyTheme);
}

applyTheme();
