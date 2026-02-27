import React, { useState } from "react";
import ReactDOM from "react-dom";

function StepIndicator({ step, setStep, steps, setSteps }) {
  const [showModal, setShowModal] = useState(false);
  const [newSection, setNewSection] = useState("");

  // ======================
  // ADD SECTION
  // ======================
  const handleAddSection = () => {
    if (!newSection.trim()) return;

    setSteps([...steps, { name: newSection, custom: true }]);

    setNewSection("");
    setShowModal(false);
  };

  // ======================
  // REMOVE SECTION
  // ======================
  const handleRemove = (index) => {
    const updated = steps.filter((_, i) => i !== index);
    setSteps(updated);

    if (step > updated.length) {
      setStep(updated.length);
    }
  };

  return (
    <>
      <div className="step-indicator">
        {steps.map((item, index) => {
          const number = index + 1;

          return (
            <div key={index} className="step">
              {item.custom && step === number && (
                <span
                  className="remove-icon"
                  onClick={() => handleRemove(index)}
                >
                  ✕
                </span>
              )}

              <div
                className={step === number ? "circle active" : "circle"}
                onClick={() => setStep(number)}
              >
                {number}
              </div>

              <small>{item.name}</small>
            </div>
          );
        })}

        {/* ADD BUTTON */}
        <div className="step add-step" onClick={() => setShowModal(true)}>
          <div className="circle plus">+</div>
          <small>Add Section</small>
        </div>
      </div>

      {/* MODAL */}
      {showModal &&
        ReactDOM.createPortal(
          <>
            <div
              onClick={() => setShowModal(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 99999,
              }}
            />

            <div
              style={{
                position: "fixed",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                padding: "24px",
                borderRadius: "12px",
                width: "90%",
                maxWidth: "600px",
                zIndex: 100000,
              }}
            >
              <h2>Add Custom Section</h2>

              <input
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                placeholder="Enter section name"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              />

              <div
                style={{ display: "flex", justifyContent: "end", gap: "10px" }}
              >
                <button onClick={() => setShowModal(false)}>Cancel</button>

                <button onClick={handleAddSection}>Add Section</button>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}

export default StepIndicator;
