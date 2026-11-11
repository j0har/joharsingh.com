document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  var body = document.querySelector("body"),
    menuToggle = document.querySelector(".hamburger"),
    menuList = document.querySelector(".main-nav"),
    btnScrollToTop = document.querySelector(".top");


  menuToggle.addEventListener("click", function () {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  // The open menu covers the page, so the page behind it leaves the tab order and stops scrolling until it closes.
  var pageBehindMenu = document.querySelectorAll("body > :not(.header):not(script)");

  function setMenuOpen(open) {
    menuToggle.setAttribute("aria-expanded", String(open));
    menuList.classList.toggle("is-visible", open);
    document.documentElement.classList.toggle("menu-open", open);
    pageBehindMenu.forEach(function (el) {
      el.inert = open;
    });
  }

  // Past the desktop breakpoint the nav is always shown, so an open menu has to release the page.
  window.matchMedia("(min-width: 1025px)").addEventListener("change", function (event) {
    if (event.matches) setMenuOpen(false);
  });


  // is-in lifts the page-load cover once the first frame has painted.
  setTimeout(function(){
    body.classList.add("is-in");
  },150)


  let disableTransition;

  window.addEventListener("resize", () => {
    stopAnimation();
  });

  function stopAnimation() {
    document.body.classList.add("disable-animation");
    clearTimeout(disableTransition);
    disableTransition = setTimeout(() => {
      document.body.classList.remove("disable-animation");
    }, 100);
  }


  reframe(".post__content iframe:not(.reframe-off), .page__content iframe:not(.reframe-off), .project-content iframe:not(.reframe-off)");


  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  })


  const lightense = document.querySelector(".page__content img, .post__content img, .project-content img, .gallery__image img"),
  imageLink = document.querySelectorAll(".page__content a img, .post__content a img, .project-content a img, .gallery__image a img");

  if (imageLink) {
    for (var i = 0; i < imageLink.length; i++) imageLink[i].parentNode.classList.add("image-link");
    for (var i = 0; i < imageLink.length; i++) imageLink[i].classList.add("no-lightense");
  }

  if (lightense) {
    Lightense(".page__content img:not(.no-lightense), .post__content img:not(.no-lightense), .project-content img:not(.no-lightense), .gallery__image img:not(.no-lightense)", {
    padding: 60,
    offset: 30
    });
  }


  if (document.querySelector(".my-slider")) {
    var slider = tns({
      container: ".my-slider",
      items: 3,
      slideBy: 1,
      gutter: 32,
      nav: true,
      mouseDrag: true,
      autoplay: false,
      speed: 500,
      controlsContainer: "#customize-controls",
      responsive: {
        1024: {
          items: 3,
        },
        768: {
          items: 2,
        },
        0: {
          items: 1,
        }
      }
    });
  }


  var pagination = document.querySelector(".pagination[data-next-page]");

  if (pagination) {
    var loadMoreButton = pagination.querySelector(".load-more-posts"),
      paginationStatus = pagination.querySelector(".pagination__status"),
      postGrid = document.querySelector(".grid"),
      nextPage = Number(pagination.dataset.nextPage),
      totalPages = Number(pagination.dataset.totalPages),
      totalPosts = Number(pagination.dataset.totalPosts),
      loading = false;

    // Disabling a focused button drops keyboard focus, so a flag blocks repeat clicks while the page loads.
    loadMoreButton.addEventListener("click", function () {
      if (loading) return;
      loading = true;

      fetch(pagination.dataset.pageUrl.replace(":num", nextPage))
        .then(function (response) {
          if (!response.ok) throw new Error(response.status);
          return response.text();
        })
        .then(function (html) {
          var nextPageDocument = new DOMParser().parseFromString(html, "text/html"),
            newPosts = Array.prototype.slice.call(nextPageDocument.querySelectorAll(".grid__post"));

          newPosts.forEach(function (post) {
            postGrid.appendChild(document.adoptNode(post));
          });
          new LazyLoad({ elements_selector: ".lazy" });
          nextPage++;

          if (nextPage > totalPages) {
            loadMoreButton.remove();
            paginationStatus.textContent = "Showing all " + totalPosts + " posts";
          } else {
            paginationStatus.textContent = "Showing " + postGrid.querySelectorAll(".grid__post").length + " of " + totalPosts + " posts";
          }

          // Keyboard users land on what arrived.
          if (newPosts.length) newPosts[0].querySelector(".card-link").focus();
        })
        .finally(function () {
          loading = false;
        });
    });
  }


  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  btnScrollToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
    document.querySelector(".logo__link").focus({ preventScroll: true });
  });

});
