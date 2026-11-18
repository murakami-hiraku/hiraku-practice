import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTriggerを登録
gsap.registerPlugin(ScrollTrigger);

// 施設セクションを取得
const facilities = document.querySelectorAll(".fac-screen");

// 施設ごとにアニメーション
facilities.forEach((facility) => {
  const image = facility.querySelector(".clip-wrap");
  const chars = facility.querySelectorAll(".fac-text h3 .ch");

  gsap.fromTo(
    chars,
    {
      y: 40,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: {
        trigger: facility,
        start: "top 70%",
        once: true,
      },
    },
  );

  gsap.to(image, {
    clipPath: "inset(0% 0% 0% 0%)",
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: facility,
      start: "top 70%",
      once: true,
    },
  });
});
