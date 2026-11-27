import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTriggerを登録
gsap.registerPlugin(ScrollTrigger);

// Missionの見出し・テキスト
gsap.from("#mission .mission-head > *", {
  y: 32,
  opacity: 0,
  stagger: 0.1,
  duration: 0.8,
  ease: "expo.out",
  scrollTrigger: {
    trigger: "#mission",
    start: "top 70%",
  },
});

// Originカード
gsap.from("#mission .origin-card", {
  y: 40,
  opacity: 0,
  duration: 0.9,
  ease: "expo.out",
  scrollTrigger: {
    trigger: "#mission",
    start: "top 60%",
  },
});
