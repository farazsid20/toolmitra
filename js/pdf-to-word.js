// Developed by Ahmad Faraz Siddiqui
const pdfInput = document.querySelector("#pdfInput");

if (pdfInput) {
  const pdfFileName = document.querySelector("#pdfFileName");
  const convertPdfBtn = document.querySelector("#convertPdfBtn");
  const pdfLoader = document.querySelector("#pdfLoader");
  const pdfMessage = document.querySelector("#pdfMessage");
  const pdfDownloadLink = document.querySelector("#pdfDownloadLink");

  let selectedPdf = null;

  const showPdfMessage = (text, isError = false) => {
    pdfMessage.textContent = text;
    pdfMessage.className = `mt-4 text-sm font-medium ${isError ? "text-red-600" : "text-emerald-600"}`;
  };

  const validatePdf = (file) => {
    if (!file) {
      showPdfMessage("Pehle PDF file select karo.", true);
      return false;
    }

    if (file.type !== "application/pdf") {
      showPdfMessage("Sirf PDF file allow hai.", true);
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      showPdfMessage("PDF size 10MB se kam honi chahiye.", true);
      return false;
    }

    return true;
  };

  const simulatePdfConversion = (file) => new Promise((resolve) => {
    window.setTimeout(() => {
      const content = `This is a demo converted DOCX placeholder for ${file.name}.`;
      const blob = new Blob([content], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      resolve(blob);
    }, 1800);
  });

  pdfInput.addEventListener("change", (event) => {
    selectedPdf = event.target.files[0] || null;
    pdfDownloadLink.classList.add("hidden");

    if (!selectedPdf) {
      pdfFileName.textContent = "Abhi koi file select nahi hai.";
      return;
    }

    pdfFileName.textContent = `Selected file: ${selectedPdf.name}`;
    validatePdf(selectedPdf);
  });

  convertPdfBtn.addEventListener("click", async () => {
    if (!validatePdf(selectedPdf)) {
      return;
    }

    pdfLoader.classList.remove("hidden");
    pdfLoader.classList.add("flex");
    pdfDownloadLink.classList.add("hidden");
    showPdfMessage("Conversion start ho gaya hai.");

    try {
      const convertedBlob = await simulatePdfConversion(selectedPdf);
      const url = URL.createObjectURL(convertedBlob);
      pdfDownloadLink.href = url;
      pdfDownloadLink.classList.remove("hidden");
      showPdfMessage("Conversion complete. Download link ready hai.");
    } catch (error) {
      showPdfMessage("Conversion fail ho gaya. Thodi der baad dobara try karo.", true);
    } finally {
      pdfLoader.classList.add("hidden");
      pdfLoader.classList.remove("flex");
    }
  });
}
