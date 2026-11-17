import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Servicesの要素を取得
const track = document.getElementById("svcTrack");
const progress = document.getElementById("svcProgress");

if (track && progress) {
  const cards = track.querySelectorAll(".svc-card");
  const total = cards.length;

  // スマホでは横スクロールしない
  const isMobile = () => window.innerWidth <= 900;

  // 横スクロールする距離
  const getDistance = () => {
    return track.scrollWidth - window.innerWidth;
  };

  if (!isMobile() && total > 1) {
    // アニメーションの初期状態
    cards.forEach((card) => {
      gsap.set(card.querySelector("[data-clip]"), {
        xPercent: 0,
      });

      gsap.set(card.querySelector(".num"), {
        rotation: 180,
        transformOrigin: "100% 50%",
      });
    });

    // 横スクロール
    gsap.to(track, {
      x: () => -getDistance(),
      ease: "none",

      scrollTrigger: {
        trigger: "#services",
        pin: true,
        scrub: 0.6,
        start: "top top",
        end: () => "+=" + getDistance(),
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          // プログレスバー
          progress.style.width = self.progress * 100 + "%";

          // カードごとの演出
          cards.forEach((card, i) => {
            const clip = card.querySelector("[data-clip]");
            const num = card.querySelector(".num");

            // 最初のカードは最初から表示
            let p = 1;

            if (i > 0) {
              const start = (i - 1) / (total - 1);
              const end = i / (total - 1);

              p = gsap.utils.clamp(
                0,
                1,
                (self.progress - start) / (end - start),
              );
            }

            if (clip) {
              gsap.set(clip, {
                xPercent: p * 110,
              });
            }

            if (num) {
              gsap.set(num, {
                rotation: 180 - p * 180,
                transformOrigin: "100% 50%",
              });
            }
          });
        },
      },
    });
  }
}
