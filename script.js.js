document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.getElementById("timeline");
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("closeModal");

  const modalTitle = document.getElementById("modalTitle");
  const modalYear = document.getElementById("modalYear");
  const modalImage = document.getElementById("modalImage");
  const modalDescription = document.getElementById("modalDescription");
  const modalCategory = document.getElementById("modalCategory");

  fetch("events.json")
    .then(res => res.json())
    .then(events => {
      events.forEach(event => {
        const article = document.createElement("article");

        article.innerHTML = `
          <h3>${event.title}</h3>
          <p><strong>Date:</strong> ${event.year}</p>
          <p>${event.description.substring(0, 60)}...</p>
          <button class="view-btn">View Details</button>
        `;

        article.querySelector(".view-btn").addEventListener("click", () => {
          modalTitle.textContent = event.title;
          modalYear.textContent = `Year: ${event.year}`;
          modalImage.src = event.imageURL;
          modalImage.style.maxWidth = "100%";
          modalDescription.textContent = event.description;
          modalCategory.textContent = event.category;
          modal.style.display = "block";
        });

        timeline.appendChild(article);
      });
    })
    .catch(err => console.error("Error loading events:", err));

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
