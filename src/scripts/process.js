import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Processの要素を取得
const blocks = document.querySelectorAll("#process .prc-block");
const num = document.getElementById("prcNum");
const enEl = document.getElementById("prcEn");

console.log("取得したProcessブロック数:", blocks.length);
console.log("数字エリア:", num);
console.log("英語ラベル:", enEl);

const digit0 = num.children[0].querySelector(".digit-stack");
const digit1 = num.children[1].querySelector(".digit-stack");

console.log("digit0:", digit0);
console.log("digit1:", digit1);

// 数字を切り替える関数
function changeNumber(step) {
  const targetNumber = Number(step);

  gsap.to(digit1, {
    y: `-${targetNumber}em`,
    duration: 0.5,
    ease: "power2.out",
  });
}

// 各工程のスクロールを監視
blocks.forEach((block) => {
  ScrollTrigger.create({
    trigger: block,
    start: "top center",

    onEnter: () => {
      const step = block.dataset.step;
      const en = block.dataset.en;

      changeNumber(step);
      enEl.textContent = en;
    },

    onEnterBack: () => {
      const step = block.dataset.step;
      const en = block.dataset.en;

      changeNumber(step);
      enEl.textContent = en;
    },
  });
});
