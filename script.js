const toolDirectory = [
  { name: "Resume Builder", href: "resume-builder.html", keywords: ["resume", "cv", "job"] },
  { name: "Image Compressor", href: "image-compressor.html", keywords: ["image", "photo", "compress", "png", "jpg"] },
  { name: "PDF to Word Converter", href: "pdf-to-word.html", keywords: ["pdf", "word", "docx", "convert"] },
  { name: "EMI Calculator", href: "emi-calculator.html", keywords: ["emi", "loan", "interest", "finance"] },
  { name: "Age Calculator", href: "age-calculator.html", keywords: ["age", "dob", "birth"] }
];

const toolSearchForm = document.querySelector("#toolSearchForm");

if (toolSearchForm) {
  const searchInput = document.querySelector("#toolSearch");
  const searchMessage = document.querySelector("#searchMessage");

  toolSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      searchMessage.textContent = "Kuch type karo, phir hum sahi tool suggest karenge.";
      searchMessage.classList.remove("hidden");
      return;
    }

    const match = toolDirectory.find((tool) => {
      const haystack = `${tool.name.toLowerCase()} ${tool.keywords.join(" ")}`;
      return haystack.includes(query);
    });

    if (match) {
      searchMessage.textContent = `${match.name} mil gaya. Page open ho raha hai...`;
      searchMessage.classList.remove("hidden");
      window.setTimeout(() => {
        window.location.href = match.href;
      }, 600);
      return;
    }

    searchMessage.textContent = "Exact match nahi mila. Popular Tools section check karo.";
    searchMessage.classList.remove("hidden");
  });
}
