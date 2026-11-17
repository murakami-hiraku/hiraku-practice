import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const root = document.getElementById("heroSlider");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (root) {
  // scroll parallax
  if (!reduced) {
    gsap.to("#hero .hero-head", {
      yPercent: -20,
      opacity: 0.2,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to("#heroSlider", {
      scale: 1.04,
      yPercent: -8,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  // HERO REVEAL
  if (reduced) {
    gsap.set("#heroJP .w", {
      yPercent: 0,
      autoAlpha: 1,
    });
  } else {
    const tl = gsap.timeline({
      delay: 0.1,
    });

    tl.from("#hero .marquee", {
      opacity: 0,
      duration: 0.4,
      ease: "expo.out",
    });

    tl.fromTo(
      "#heroJP .w",
      {
        yPercent: 110,
        autoAlpha: 0,
      },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.0,
        stagger: 0.1,
        ease: "expo.out",
      },
      "-=0.2",
    );

    tl.from(
      "#hero .hero-sub",
      {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "expo.out",
      },
      "-=0.7",
    );

    tl.from(
      "#hero .slider-frame",
      {
        y: 40,
        opacity: 0,
        scale: 0.98,
        duration: 1.0,
        ease: "expo.out",
      },
      "-=0.8",
    );
  }

  const slides = Array.from(root.querySelectorAll(".slide"));
  const total = slides.length;

  const idxEl = document.getElementById("slideIdx");
  const totalEl = document.getElementById("slideTotal");
  totalEl.textContent = String(total).padStart(2, "0");
  const capEl = document.getElementById("slideCap");
  const dotsWrap = document.getElementById("slideDots");
  const progEl = document.getElementById("slideProgress");
  const prevBtn = document.getElementById("slidePrev");
  const nextBtn = document.getElementById("slideNext");

  console.log("スライド枚数:", total);

  let cur = 0;

  const INTERVAL = 3000;
  let timer = null;
  let progTween = null;
  // プログレスバーのアニメーション
  function startProgress() {
    if (progTween) {
      progTween.kill();
    }

    progEl.style.width = "0%";

    progTween = gsap.to(progEl, {
      width: "100%",
      duration: INTERVAL / 1000,
      ease: "none",
    });
  }

  // ドットナビゲーション
  slides.forEach((slide, index) => {
    const button = document.createElement("button");

    if (index === 0) {
      button.classList.add("on");
    }

    button.addEventListener("click", () => {
      go(index, true);
    });

    dotsWrap.appendChild(button);
  });

  const dots = Array.from(dotsWrap.children);

  function go(i, manual = false) {
    cur = (i + total) % total;

    slides.forEach((slide, index) => {
      slide.classList.toggle("is-on", index === cur);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("on", index === cur);
    });

    idxEl.textContent = String(cur + 1).padStart(2, "0");
    capEl.textContent = slides[cur].dataset.cap || "";

    if (manual) {
      start();
    } else {
      startProgress();
    }
  }

  nextBtn.addEventListener("click", () => {
    go(cur + 1, true);
  });

  prevBtn.addEventListener("click", () => {
    go(cur - 1, true);
  });

  // 自動再生
  function start() {
    stop();

    timer = setInterval(() => {
      go(cur + 1);
    }, INTERVAL);

    startProgress();
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
    }
  }

  start();

  // マウスを乗せたら停止
  root.addEventListener("mouseenter", () => {
    stop();

    if (progTween) {
      progTween.pause();
    }
  });

  // マウスが離れたら再開
  root.addEventListener("mouseleave", () => {
    start();
  });

  // スワイプ操作
  let sx = 0;

  root.addEventListener(
    "touchstart",
    (e) => {
      sx = e.touches[0].clientX;
      stop();
    },
    { passive: true },
  );

  root.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - sx;

      if (Math.abs(dx) > 40) {
        if (dx < 0) {
          go(cur + 1);
        } else {
          go(cur - 1);
        }
      }

      start();
    },
    { passive: true },
  );
}
