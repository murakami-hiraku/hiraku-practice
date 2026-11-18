const header = document.querySelector("#header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// モバイルメニュー
const menuToggle = document.querySelector("#menuToggle");
const mobileMenu = document.querySelector("#mobileMenu");

// メニューを閉じる共通処理
function closeMenu() {
  menuToggle.classList.remove("is-open");
  mobileMenu.classList.remove("is-open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "メニューを開く");

  // 背景ページのスクロールを許可
  document.body.style.overflow = "";
}

// ボタンをクリックしたとき
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.classList.toggle("is-open");

  mobileMenu.classList.toggle("is-open", isOpen);

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "メニューを閉じる" : "メニューを開く",
  );

  // メニュー表示中は背景をスクロールさせない
  document.body.style.overflow = isOpen ? "hidden" : "";
});

// メニュー内のリンクをクリックしたとき
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Escapeキーを押したとき
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});
