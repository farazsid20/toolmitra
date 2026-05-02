// Developed by Ahmad Faraz Siddiqui
const resumeForm = document.querySelector("#resumeForm");

if (resumeForm) {
  const fields = {
    name: document.querySelector("#name"),
    phone: document.querySelector("#phone"),
    email: document.querySelector("#email"),
    education: document.querySelector("#education"),
    skills: document.querySelector("#skills"),
    experience: document.querySelector("#experience")
  };

  const preview = {
    name: document.querySelector("#previewName"),
    contact: document.querySelector("#previewContact"),
    education: document.querySelector("#previewEducation"),
    skills: document.querySelector("#previewSkills"),
    experience: document.querySelector("#previewExperience")
  };

  const templateStyle = document.querySelector("#templateStyle");
  const resumePreview = document.querySelector("#resumePreview");
  const resumeMessage = document.querySelector("#resumeMessage");
  const downloadResume = document.querySelector("#downloadResume");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setMessage = (text, isError = false) => {
    resumeMessage.textContent = text;
    resumeMessage.className = `text-sm font-medium ${isError ? "text-red-600" : "text-emerald-600"}`;
  };

  const setFieldError = (field, message) => {
    const errorElement = field.parentElement.querySelector(".field-error");
    if (errorElement) {
      errorElement.textContent = message;
    }
    field.classList.toggle("border-red-400", Boolean(message));
  };

  const validateForm = () => {
    let valid = true;

    Object.values(fields).forEach((field) => {
      const value = field.value.trim();
      let error = "";

      if (!value) {
        error = "Yeh field bharna zaroori hai.";
      }

      if (!error && field === fields.email && !emailPattern.test(value)) {
        error = "Sahi email address dalo.";
      }

      setFieldError(field, error);
      if (error) {
        valid = false;
      }
    });

    return valid;
  };

  const updatePreview = () => {
    preview.name.textContent = fields.name.value.trim() || "Aapka Naam";
    preview.contact.textContent = `${fields.email.value.trim() || "email@example.com"} | ${fields.phone.value.trim() || "98xxxxxxxx"}`;
    preview.education.textContent = fields.education.value.trim() || "Aapki education yahan show hogi.";
    preview.skills.textContent = fields.skills.value.trim() || "Aapki skills yahan show hongi.";
    preview.experience.textContent = fields.experience.value.trim() || "Aapka experience yahan show hoga.";
  };

  const updateTemplate = () => {
    resumePreview.classList.remove("resume-minimal", "resume-modern", "resume-classic");
    resumePreview.classList.add(`resume-${templateStyle.value}`);
  };

  Object.values(fields).forEach((field) => {
    field.addEventListener("input", () => {
      if (field.value.trim()) {
        setFieldError(field, "");
      }
      updatePreview();
    });
  });

  templateStyle.addEventListener("change", updateTemplate);

  resumeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setMessage("Please form ke required fields sahi bharo.", true);
      return;
    }

    updatePreview();
    updateTemplate();
    setMessage("Preview update ho gaya. Ab PDF download kar sakte ho.");
  });

  downloadResume.addEventListener("click", () => {
    if (!validateForm()) {
      setMessage("PDF se pehle required fields sahi bharo.", true);
      return;
    }

    updatePreview();
    updateTemplate();

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const lines = [
      `Name: ${fields.name.value.trim()}`,
      `Phone: ${fields.phone.value.trim()}`,
      `Email: ${fields.email.value.trim()}`,
      "",
      "Education:",
      fields.education.value.trim(),
      "",
      "Skills:",
      fields.skills.value.trim(),
      "",
      "Experience:",
      fields.experience.value.trim()
    ];

    let y = 20;
    lines.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, 170);
      doc.text(wrapped, 20, y);
      y += wrapped.length * 8;
    });

    doc.save("zamtoolmitra-resume.pdf");
    setMessage("PDF ready hai. Download start ho jana chahiye.");
  });

  updatePreview();
  updateTemplate();
}
