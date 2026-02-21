function StepIndicator({ step, setStep }) {
  const steps = [
    "Contact",
    "Summary",
    "Skills",
    "Experience",
    "Education",
    "Projects",
    "Certifications",
  ];

  return (
    <div className="step-indicator">
      {steps.map((label, index) => {
        const number = index + 1;
        return (
          <div
            key={index}
            className="step"
            onClick={() => setStep(number)}
            style={{ cursor: "pointer" }}
          >
            <div className={step === number ? "circle active" : "circle"}>
              {number}
            </div>
            <small>{label}</small>
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;
