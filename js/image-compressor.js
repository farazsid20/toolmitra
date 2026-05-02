const imageInput = document.querySelector("#imageInput");

if (imageInput) {
  const dropZone = document.querySelector("#dropZone");
  const imagePicker = document.querySelector("#imagePicker");
  const qualityRange = document.querySelector("#qualityRange");
  const qualityValue = document.querySelector("#qualityValue");
  const compressBtn = document.querySelector("#compressBtn");
  const beforeSize = document.querySelector("#beforeSize");
  const afterSize = document.querySelector("#afterSize");
  const imageMessage = document.querySelector("#imageMessage");
  const imagePreview = document.querySelector("#imagePreview");
  const imagePlaceholder = document.querySelector("#imagePlaceholder");
  const downloadCompressed = document.querySelector("#downloadCompressed");

  let selectedFile = null;

  const formatBytes = (bytes) => {
    if (!bytes) return "0 KB";
    const units = ["B", "KB", "MB"];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / (1024 ** index)).toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
  };

  const showMessage = (text, isError = false) => {
    imageMessage.textContent = text;
    imageMessage.className = `mt-4 text-sm font-medium ${isError ? "text-red-600" : "text-emerald-600"}`;
  };

  const validateImage = (file) => {
    if (!file) {
      showMessage("Pehle image select karo.", true);
      return false;
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      showMessage("Sirf JPG ya PNG image upload karo.", true);
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage("Image size 5MB se kam honi chahiye.", true);
      return false;
    }

    return true;
  };

  const updatePreview = (file) => {
    const previewUrl = URL.createObjectURL(file);
    imagePreview.src = previewUrl;
    imagePreview.classList.remove("hidden");
    imagePlaceholder.classList.add("hidden");
    beforeSize.textContent = formatBytes(file.size);
    afterSize.textContent = "-";
    downloadCompressed.classList.add("hidden");
  };

  const handleFile = (file) => {
    if (!validateImage(file)) {
      return;
    }

    selectedFile = file;
    updatePreview(file);
    showMessage("Image ready hai. Ab compression start karo.");
  };

  imagePicker.addEventListener("click", () => imageInput.click());
  imageInput.addEventListener("change", (event) => handleFile(event.target.files[0]));

  ["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropZone.classList.add("drop-active");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropZone.classList.remove("drop-active");
    });
  });

  dropZone.addEventListener("drop", (event) => {
    const file = event.dataTransfer.files[0];
    handleFile(file);
  });

  qualityRange.addEventListener("input", () => {
    qualityValue.textContent = qualityRange.value;
  });

  compressBtn.addEventListener("click", () => {
    if (!validateImage(selectedFile)) {
      return;
    }

    showMessage("Compression chal raha hai...");

    new window.Compressor(selectedFile, {
      quality: Number(qualityRange.value),
      success(result) {
        afterSize.textContent = formatBytes(result.size);
        const downloadUrl = URL.createObjectURL(result);
        downloadCompressed.href = downloadUrl;
        downloadCompressed.download = `compressed-${selectedFile.name.replace(/\s+/g, "-")}`;
        downloadCompressed.classList.remove("hidden");
        showMessage("Compression complete. Ab file download kar sakte ho.");
      },
      error() {
        showMessage("Compression me problem aayi. Dobara try karo.", true);
      }
    });
  });
}
