import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const statement = document.querySelector("#statement");

if (statement) {
  const words = "#statement .stmt-text .w";

  // アニメーション開始前の状態
  gsap.set(words, {
    yPercent: 110,
    opacity: 0,
  });

  // スクロール連動アニメーション
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#statement",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
    },
  });

  // 英単語を順番に表示
  tl.to(words, {
    yPercent: 0,
    opacity: 1,
    stagger: 0.15,
    ease: "power3.out",
    duration: 1,
  });

  // 日本語コピー
  tl.to(
    "#statement .stmt-text .jp",
    {
      opacity: 1,
      duration: 0.6,
    },
    "+=0.2",
  );

  // 署名
  tl.to(
    "#statement .stmt-text .sign",
    {
      opacity: 1,
      duration: 0.4,
    },
    "+=0.1",
  );
}
