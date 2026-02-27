import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import StepIndicator from "./components/Steps";
import FormSteps from "./components/Form";
import ResumePreview from "./components/Preview";

function App() {
  // ======================
  // STEP STATE
  // ======================
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  // ======================
  // LOAD STEPS (WITH LOCAL STORAGE)
  // ======================
  const [steps, setSteps] = useState(() => {
    const savedSteps = localStorage.getItem("resumeSteps");

    return savedSteps
      ? JSON.parse(savedSteps)
      : [
          { name: "Contact", custom: false },
          { name: "Summary", custom: false },
          { name: "Skills", custom: false },
          { name: "Experience", custom: false },
          { name: "Education", custom: false },
          { name: "Projects", custom: false },
          { name: "Certifications", custom: false },
          { name: "Custom Section", custom: true },
        ];
  });

  // ======================
  // LOAD RESUME DATA
  // ======================
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("resumeData");

    return savedData
      ? JSON.parse(savedData)
      : {
          name: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          github: "",
          summary: "",
          skills: [],
          experience: [],
          education: [],
          projects: [],
          certifications: [],
          customSections: [],
        };
  });

  // ======================
  // SAVE RESUME DATA
  // ======================
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(data));
  }, [data]);

  // ======================
  // SAVE STEPS (IMPORTANT FIX)
  // ======================
  useEffect(() => {
    localStorage.setItem("resumeSteps", JSON.stringify(steps));
  }, [steps]);

  // ======================
  // UI
  // ======================
  return (
    <div>
      <Navbar showPreview={showPreview} setShowPreview={setShowPreview} />

      <div className="main-container">
        <div className="form-area">
          <StepIndicator
            step={step}
            setStep={setStep}
            steps={steps}
            setSteps={setSteps}
          />

          <FormSteps
            step={step}
            setStep={setStep}
            data={data}
            setData={setData}
            steps={steps}
          />
        </div>

        <div className="preview-area">
          <ResumePreview data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
