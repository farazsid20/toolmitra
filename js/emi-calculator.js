const emiForm = document.querySelector("#emiForm");

if (emiForm) {
  const loanAmount = document.querySelector("#loanAmount");
  const interestRate = document.querySelector("#interestRate");
  const loanTenure = document.querySelector("#loanTenure");
  const emiMessage = document.querySelector("#emiMessage");
  const monthlyEmi = document.querySelector("#monthlyEmi");
  const totalInterest = document.querySelector("#totalInterest");
  const totalPayment = document.querySelector("#totalPayment");

  const formatCurrency = (value) => new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(value);

  const setMessage = (text, isError = false) => {
    emiMessage.textContent = text;
    emiMessage.className = `text-sm font-medium ${isError ? "text-red-600" : "text-emerald-600"}`;
  };

  emiForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const principal = Number(loanAmount.value);
    const annualRate = Number(interestRate.value);
    const months = Number(loanTenure.value);

    if (!principal || principal <= 0 || !annualRate || annualRate <= 0 || !months || months <= 0) {
      setMessage("Saare inputs valid positive number hone chahiye.", true);
      return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const factor = (1 + monthlyRate) ** months;
    const emi = (principal * monthlyRate * factor) / (factor - 1);
    const payment = emi * months;
    const interest = payment - principal;

    monthlyEmi.textContent = formatCurrency(emi);
    totalInterest.textContent = formatCurrency(interest);
    totalPayment.textContent = formatCurrency(payment);
    setMessage("Calculation complete ho gaya.");
  });
}
