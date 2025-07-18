document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabBar = document.querySelector(".tab-bar");
  const tabWrapper = document.querySelector(".tabs-wrapper");
  const tabItems = document.querySelectorAll(".tab-item");

  let activeTab = document.querySelector(".tab.active");

  function centerUnderline(el) {
    const elOffsetLeft = el.offsetLeft;
    const elWidth = el.offsetWidth;
    const underlineLeft = elOffsetLeft + (elWidth / 2) - (tabBar.offsetWidth / 2);
    tabBar.style.transform = `translateX(${underlineLeft}px)`;
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      document.querySelector(".tab.active")?.classList.remove("active");
      tab.classList.add("active");
      activeTab = tab;

      document.querySelector(".tab-item.active")?.classList.remove("active");
      if (tabItems[index]) {
        tabItems[index].classList.add("active");
      }

      centerUnderline(activeTab);
    });

    tab.addEventListener("mouseenter", () => centerUnderline(tab));
    tab.addEventListener("mouseleave", () => centerUnderline(activeTab));
  });

  window.addEventListener("load", () => centerUnderline(activeTab));
  window.addEventListener("resize", () => centerUnderline(activeTab));

  //  --- Bootstrap Modal --------------- 
  const showButtons = document.querySelectorAll(".show-btn");

  showButtons.forEach(button => {
    button.addEventListener("click", function () {
      const article = button.closest(".position-relative");

      const imageSrc = article.querySelector("img.banner")?.getAttribute("src") || "";
      const date = article.querySelector("h5")?.innerText || "";
      const title = article.querySelector("h4")?.innerText || "";
      const paragraphEl = article.querySelector("p");
      const text = paragraphEl?.dataset.fullText || paragraphEl?.innerText || "";

      // Populate modal content
      document.getElementById("modalImage").setAttribute("src", imageSrc);
      document.getElementById("modalDate").textContent = date;
      document.getElementById("modalTitle").textContent = title;
      document.getElementById("modalText").textContent = text;

      // Show modal using Bootstrap
      const modal = new bootstrap.Modal(document.getElementById("articleModal"));
      modal.show();
    });
  });
});

