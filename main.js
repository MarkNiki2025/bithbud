let hideTimeout;

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  header.classList.remove("hidden");
  clearTimeout(hideTimeout);
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 800) { 
    header.classList.add('white-bg');
  } else {
    header.classList.remove('white-bg');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".alltextintheheadline");
  setTimeout(() => {
    if(section) section.classList.add("show");
  }, 500); 
});

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".center");
  if(!section) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add("show1");
        observer.unobserve(section); 
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".numbers");
  if(!section) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add("show2");
        observer.unobserve(section); 
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".left");
  if(!section) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add("show3");
        observer.unobserve(section); 
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
});

const names = ["Петро Коваль", "Оксана Бузина", "Лариса Горбач"];
let currentIndex = 0;
let timeout;

function updateDots(index) {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.style.opacity = "1";
      dot.style.backgroundColor = "white";
    } else {
      dot.style.opacity = "0.5";
      dot.style.backgroundColor = "rgb(231, 231, 235)";
    }
  });
}

function resetAutoChange() {
  clearTimeout(timeout);
  timeout = setTimeout(autoChange, 6000);
}

function updateName(index) {
  const personNameEl = document.getElementById("personName");
  if(personNameEl) {
    personNameEl.textContent = names[index];
  }
  currentIndex = index;
  updateDots(index);
  resetAutoChange();
}

function changeName(index) {
  updateName(index);
}

function autoChange() {
  currentIndex = (currentIndex + 1) % names.length;
  updateName(currentIndex);
}

window.onload = () => {
  updateName(0);
  resetAutoChange();

  if(window.innerWidth <= 768) {
    const comentsBlock = document.getElementById('coments');
    const excludeElement = document.querySelector('.coment'); 

    let touchStartX = 0;
    let touchEndX = 0;

    if (comentsBlock) {
      comentsBlock.addEventListener('touchstart', function(e) {
        if (e.target === excludeElement || excludeElement.contains(e.target)) {
          return;
        }
        touchStartX = e.changedTouches[0].screenX;
      }, {passive: true});

      comentsBlock.addEventListener('touchend', function(e) {
        if (e.target === excludeElement || excludeElement.contains(e.target)) {
          return;
        }
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, {passive: true});
    

    function handleSwipe() {
      const swipeThreshold = 50;

      if (touchEndX < touchStartX - swipeThreshold) {
        currentIndex = (currentIndex + 1) % names.length;
        changeName(currentIndex);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        currentIndex = (currentIndex - 1 + names.length) % names.length;
        changeName(currentIndex);
      }
    }
    setInterval(() => {
      currentIndex = (currentIndex + 1) % names.length;
      changeName(currentIndex);
    }, 6000);
  }
  } else {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % names.length;
      changeName(currentIndex);
    }, 6000);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function activateMenu() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", activateMenu);
});

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("nav-menu");

  if(burger && navMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle("open");
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll('#nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove("open");
        navMenu.classList.remove("active");
      });
    });
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector('.header');
  console.log("Header width: ", header.offsetWidth, "px");
  console.log("Window width: ", window.innerWidth, "px");
});

