const footerClock = document.querySelector("#footerClock");

// 時計を更新する関数
function updateClock() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  footerClock.textContent = `NARA / ${hours}:${minutes}:${seconds}`;
}

// 最初に時計を表示
updateClock();

// 1秒ごとに更新
setInterval(updateClock, 1000);

import gsap from "gsap";

// Footer Bandの文字を取得
const bigNameTrack = document.querySelector("#bigNameTrack");

// 文字が存在する場合だけアニメーション
if (bigNameTrack) {
  gsap.to(bigNameTrack, {
    xPercent: -33.333,
    duration: 20,
    ease: "none",
    repeat: -1,
  });
}
