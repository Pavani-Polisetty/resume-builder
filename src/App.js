import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import StepIndicator from "./components/Steps";
import FormSteps from "./components/Form";
import ResumePreview from "./components/Preview";

function App() {
  // Step state
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  // Load saved data
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
        };
  });

  // Save automatically
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <Navbar showPreview={showPreview} setShowPreview={setShowPreview} />

      <div className="main-container">
        <div className="form-area">
          <StepIndicator step={step} setStep={setStep} />
          <FormSteps
            step={step}
            setStep={setStep}
            data={data}
            setData={setData}
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
