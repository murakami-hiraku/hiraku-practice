const root = document.getElementById("heroSlider");

if (root) {
  const slides = Array.from(root.querySelectorAll(".slide"));
  const total = slides.length;

  const idxEl = document.getElementById("slideIdx");
  const totalEl = document.getElementById("slideTotal");
  const capEl = document.getElementById("slideCap");
  const dotsWrap = document.getElementById("slideDots");
  const progEl = document.getElementById("slideProgress");
  const prevBtn = document.getElementById("slidePrev");
  const nextBtn = document.getElementById("slideNext");

  console.log("スライド枚数:", total);

  let cur = 0;

  // ドットナビゲーション
  slides.forEach((slide, index) => {
    const button = document.createElement("button");

    if (index === 0) {
      button.classList.add("on");
    }

    button.addEventListener("click", () => {
      go(index);
    });

    dotsWrap.appendChild(button);
  });

  const dots = Array.from(dotsWrap.children);

  function go(i) {
    cur = (i + total) % total;

    slides.forEach((slide, index) => {
      slide.classList.toggle("is-on", index === cur);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("on", index === cur);
    });

    idxEl.textContent = String(cur + 1).padStart(2, "0");
    capEl.textContent = slides[cur].dataset.cap || "";
  }

  nextBtn.addEventListener("click", () => {
    go(cur + 1);
  });

  prevBtn.addEventListener("click", () => {
    go(cur - 1);
  });

  // 自動再生
  const INTERVAL = 3000;
  let timer = null;

  function start() {
    stop();

    timer = setInterval(() => {
      go(cur + 1);
    }, INTERVAL);
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
