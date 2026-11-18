import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Worksカードを取得
const cards = document.querySelectorAll("#worksCanvas .work-card");

console.log("取得したカード数:", cards.length);

// カードが存在する場合だけアニメーション
if (cards.length > 0) {
  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 60,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: "#worksCanvas",
        start: "top 80%",
        once: true,
      },
    },
  );
}
