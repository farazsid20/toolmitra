const ageForm = document.querySelector("#ageForm");

if (ageForm) {
  const dobInput = document.querySelector("#dob");
  const ageYears = document.querySelector("#ageYears");
  const ageMonths = document.querySelector("#ageMonths");
  const ageDays = document.querySelector("#ageDays");
  const ageMessage = document.querySelector("#ageMessage");

  const setMessage = (text, isError = false) => {
    ageMessage.textContent = text;
    ageMessage.className = `text-sm font-medium ${isError ? "text-red-600" : "text-emerald-600"}`;
  };

  ageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!dobInput.value) {
      setMessage("Date of birth select karna zaroori hai.", true);
      return;
    }

    const birthDate = new Date(dobInput.value);
    const today = new Date();
    const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (Number.isNaN(birthDate.getTime())) {
      setMessage("Valid date select karo.", true);
      return;
    }

    if (birthDate > todayLocal) {
      setMessage("Future date allow nahi hai.", true);
      return;
    }

    let years = todayLocal.getFullYear() - birthDate.getFullYear();
    let months = todayLocal.getMonth() - birthDate.getMonth();
    let days = todayLocal.getDate() - birthDate.getDate();

    if (days < 0) {
      const previousMonth = new Date(todayLocal.getFullYear(), todayLocal.getMonth(), 0);
      days += previousMonth.getDate();
      months -= 1;
    }

    if (months < 0) {
      months += 12;
      years -= 1;
    }

    ageYears.textContent = years;
    ageMonths.textContent = months;
    ageDays.textContent = days;
    setMessage("Age calculation complete ho gayi.");
  });
}
