// DOM이 로드된 후 실행
document.addEventListener("DOMContentLoaded", function () {
  // 스크롤 애니메이션
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // 모든 섹션에 관찰자 추가
  document.querySelectorAll(".letter-section").forEach((section) => {
    observer.observe(section);
  });

  // 인터랙티브 하트 클릭 이벤트
  const heartContainer = document.querySelector(".heart-container");
  const dynamicMessage = document.getElementById("dynamic-message");

  const messages = [
    "당신을 사랑합니다 ❤️",
    "당신은 제게 특별한 사람이에요 💕",
    "함께 있는 시간이 가장 행복해요 🌟",
    "당신의 웃음이 제 마음을 따뜻하게 해요 😊",
    "영원히 함께하고 싶어요 💖",
    "당신과 함께라면 어떤 어려움도 이겨낼 수 있어요 💪",
    "당신의 사랑이 제게 가장 큰 힘이에요 ✨",
    "매일매일 더 사랑해져요 💝",
  ];

  let messageIndex = 0;
  let clickCount = 0;

  heartContainer.addEventListener("click", function () {
    clickCount++;

    // 하트 클릭 애니메이션
    const heart = this.querySelector(".pulse-heart");
    heart.style.transform = "scale(1.3)";
    heart.style.color = "#ff1493";

    setTimeout(() => {
      heart.style.transform = "scale(1)";
      heart.style.color = "#ff6b6b";
    }, 300);

    // 메시지 변경
    messageIndex = (messageIndex + 1) % messages.length;
    dynamicMessage.style.opacity = "0";

    setTimeout(() => {
      dynamicMessage.textContent = messages[messageIndex];
      dynamicMessage.style.opacity = "1";
    }, 200);

    // 클릭 횟수에 따른 특별 효과
    if (clickCount % 5 === 0) {
      createHeartBurst();
    }
  });

  // 하트 폭발 효과
  function createHeartBurst() {
    const container = document.querySelector(".container");

    for (let i = 0; i < 10; i++) {
      const heart = document.createElement("i");
      heart.className = "fas fa-heart burst-heart";
      heart.style.cssText = `
                position: fixed;
                color: #ff6b6b;
                font-size: 20px;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                animation: burst 2s ease-out forwards;
            `;

      container.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 2000);
    }
  }

  // 부드러운 스크롤 네비게이션
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 마우스 움직임에 따른 배경 효과
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;

    // 배경 그라데이션 변화
    const body = document.body;
    const hue1 = 240 + mouseX * 60;
    const hue2 = 280 + mouseY * 60;

    body.style.background = `linear-gradient(135deg, hsl(${hue1}, 70%, 60%) 0%, hsl(${hue2}, 70%, 50%) 100%)`;
  });

  // 타이핑 효과 (시 섹션)
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = "";

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // 시 섹션이 보일 때 타이핑 효과 시작
  const poemSection = document.querySelector("#section3");
  const poemObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const poemLines = entry.target.querySelectorAll(".poem p");
          poemLines.forEach((line, index) => {
            setTimeout(() => {
              typeWriter(line, line.textContent, 50);
            }, index * 500);
          });
          poemObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  poemObserver.observe(poemSection);

  // 편지 페이퍼 호버 효과 개선
  document.querySelectorAll(".letter-paper").forEach((paper) => {
    paper.addEventListener("mouseenter", function () {
      this.style.transform = "rotate(0deg) scale(1.02)";
      this.style.boxShadow = "0 30px 60px rgba(0, 0, 0, 0.15)";
    });

    paper.addEventListener("mouseleave", function () {
      this.style.transform = "rotate(-1deg) scale(1)";
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)";
    });
  });

  // 사진 프레임 클릭 효과
  document.querySelectorAll(".photo-frame").forEach((frame) => {
    frame.addEventListener("click", function () {
      // 클릭 시 확대 효과
      this.style.transform = "scale(1.1) rotate(5deg)";
      this.style.zIndex = "10";

      setTimeout(() => {
        this.style.transform = "scale(1) rotate(0deg)";
        this.style.zIndex = "1";
      }, 500);
    });
  });

  // 스크롤 진행률 표시
  function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // 스크롤 진행률에 따른 배경 색상 변화
    const body = document.body;
    const intensity = Math.min(scrollPercent / 100, 1);

    body.style.setProperty("--scroll-intensity", intensity);
  }

  window.addEventListener("scroll", updateScrollProgress);

  // 페이지 로드 완료 애니메이션
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);

  // 키보드 이벤트 (스페이스바로 하트 클릭)
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
      e.preventDefault();
      heartContainer.click();
    }
  });

  // 터치 디바이스 지원
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener("touchstart", function (e) {
    touchStartY = e.changedTouches[0].screenY;
  });

  document.addEventListener("touchend", function (e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // 위로 스와이프 - 다음 섹션으로
        scrollToNextSection();
      } else {
        // 아래로 스와이프 - 이전 섹션으로
        scrollToPrevSection();
      }
    }
  }

  function scrollToNextSection() {
    const currentSection = getCurrentSection();
    const nextSection = currentSection.nextElementSibling;

    if (nextSection && nextSection.classList.contains("letter-section")) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  function scrollToPrevSection() {
    const currentSection = getCurrentSection();
    const prevSection = currentSection.previousElementSibling;

    if (prevSection && prevSection.classList.contains("letter-section")) {
      prevSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getCurrentSection() {
    const sections = document.querySelectorAll(".letter-section");
    const scrollTop = window.pageYOffset;

    for (let section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        return section;
      }
    }

    return sections[0];
  }
});

// CSS 애니메이션 추가
const style = document.createElement("style");
style.textContent = `
    @keyframes burst {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    .burst-heart {
        animation: burst 2s ease-out forwards;
    }
    
    body {
        transition: background 0.3s ease;
    }
    
    body.loaded .main-title {
        animation: fadeInUp 1.5s ease-out;
    }
    
    body.loaded .subtitle {
        animation: fadeInUp 1.5s ease-out 0.3s both;
    }
`;
document.head.appendChild(style);
