const burgerMenu = document.querySelector(".burger-menu");
const sidebar = document.querySelector(".sidebar");

burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("open");
  sidebar.classList.toggle("open");
});

const swipeContainer = document.querySelector(".swipe-container");
const leftHint = document.querySelector(".left-hint");
const rightHint = document.querySelector(".right-hint");

let isDragging = false;
let startX = 0;
let scrollStart = 0;

function updateSwipeHints() {
  const maxScroll = swipeContainer.scrollWidth - swipeContainer.clientWidth;

  leftHint.style.display = swipeContainer.scrollLeft > 5 ? "inline" : "none";

  rightHint.style.display =
    swipeContainer.scrollLeft < maxScroll - 5 ? "inline" : "none";
}

// მაუსით გადათრევა
swipeContainer.addEventListener("mousedown", (event) => {
  if (event.button !== 0) return;

  isDragging = true;
  startX = event.clientX;
  scrollStart = swipeContainer.scrollLeft;

  swipeContainer.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (event) => {
  if (!isDragging) return;

  event.preventDefault();

  const distance = event.clientX - startX;
  swipeContainer.scrollLeft = scrollStart - distance;
});

window.addEventListener("mouseup", () => {
  if (!isDragging) return;

  isDragging = false;
  swipeContainer.style.cursor = "grab";
});

// Swipe ტექსტზე დაჭერა
rightHint.addEventListener("click", () => {
  const card = swipeContainer.querySelector(".swipe-item");
  if (!card) return;

  const gap = parseFloat(getComputedStyle(swipeContainer).gap) || 0;
  const distance = card.getBoundingClientRect().width + gap;

  swipeContainer.scrollBy({
    left: distance,
    behavior: "smooth",
  });
});

leftHint.addEventListener("click", () => {
  const card = swipeContainer.querySelector(".swipe-item");
  if (!card) return;

  const gap = parseFloat(getComputedStyle(swipeContainer).gap) || 0;
  const distance = card.getBoundingClientRect().width + gap;

  swipeContainer.scrollBy({
    left: -distance,
    behavior: "smooth",
  });
});

// მიმართულებების განახლება სქროლისას
swipeContainer.addEventListener("scroll", updateSwipeHints);

// საწყისი მდგომარეობა
updateSwipeHints();

// მოდალ

const movieModal = document.querySelector("#movieModal");
const movieWindow = document.querySelector(".movie-window");

const movieBackdrop = document.querySelector("#movieBackdrop");
const detailPoster = document.querySelector("#detailPoster");
const detailTitle = document.querySelector("#detailTitle");
const detailViews = document.querySelector("#detailViews");
const detailDescription = document.querySelector("#detailDescription");

const movieClose = document.querySelector("#movieClose");
const movieBack = document.querySelector("#movieBack");

const movieCards = document.querySelectorAll(".top-rated-movies .swipe-item");

movieCards.forEach((card) => {
  card.addEventListener("click", () => {
    const poster = card.querySelector(".swipe-card");
    const title = card.querySelector(".swipe-card-info h3");
    const rating = card.querySelector(".imbd");
    const description = card.querySelector(".movie-description");

    if (!poster || !title) return;

    const posterImage = getComputedStyle(poster).backgroundImage;

    // Use the selected movie's poster as its image
    movieBackdrop.style.backgroundImage = posterImage;
    detailPoster.style.backgroundImage = posterImage;

    detailTitle.textContent = title.textContent.trim();

    detailViews.textContent = rating
      ? `★ ${rating.textContent.trim()} / 5`
      : "Top rated movie";

    detailDescription.textContent = description
      ? description.textContent.trim()
      : "";

    // Reset the window's scroll position
    movieWindow.scrollTop = 0;

    movieModal.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

function closeMovieModal() {
  movieModal.classList.remove("open");
  document.body.style.overflow = "";
}

movieClose.addEventListener("click", closeMovieModal);
movieBack.addEventListener("click", closeMovieModal);

movieModal.addEventListener("click", (event) => {
  if (event.target === movieModal) {
    closeMovieModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && movieModal.classList.contains("open")) {
    closeMovieModal();
  }
});

// Watchlist button
document.querySelector("#watchlistBtn").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const isAdded = button.dataset.added === "true";

  button.dataset.added = String(!isAdded);
  button.innerHTML = isAdded
    ? "<span>＋</span> Watchlist"
    : "<span>✓</span> Added";
});
