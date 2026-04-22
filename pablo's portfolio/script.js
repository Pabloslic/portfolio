const galleryCards = document.querySelectorAll(".gallery-card[data-full]");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const emailMessage = document.getElementById("emailMessage");
const whatsappMessage = document.getElementById("whatsappMessage");
const emailSendButton = document.getElementById("emailSendButton");
const whatsappSendButton = document.getElementById("whatsappSendButton");
const menuToggle = document.getElementById("menuToggle");
const siteMenu = document.getElementById("siteMenu");

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  if (lightboxImage) {
    lightboxImage.src = "";
    lightboxImage.alt = "";
  }
};

galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const imageUrl = card.dataset.full;
    const imageAlt = card.dataset.alt || "Graphic design preview";

    if (!lightbox || !lightboxImage || !imageUrl) return;

    lightboxImage.src = imageUrl;
    lightboxImage.alt = imageAlt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

if (counters.length) {
  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target || 0);
    const duration = 1400;
    const startTime = performance.now();

    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = `+${value}k`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = `+${target}k`;
      }
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.45,
    }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

if (emailSendButton && emailMessage) {
  emailSendButton.addEventListener("click", () => {
    const message = encodeURIComponent(emailMessage.value.trim());
    const subject = encodeURIComponent("Portfolio Inquiry");
    const url = `mailto:udechimelawrence147@gmail.com?subject=${subject}&body=${message}`;
    window.location.href = url;
  });
}

if (whatsappSendButton && whatsappMessage) {
  whatsappSendButton.addEventListener("click", () => {
    const message = encodeURIComponent(whatsappMessage.value.trim());
    const url = `https://wa.me/2348101410188?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

if (menuToggle && siteMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}
