import { FiTrash2 } from "react-icons/fi"; // ← IMPORT HERE
function FormSteps({ step, setStep, data, setData, steps }) {
  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);
  const isCustomSectionAdded = steps?.some((s) => s.custom);
  // const customStepsCount = steps?.filter((s) => s.custom).length || 0;

  // const enableCustomNext = customStepsCount > 1;
  const hasNextStep = step < steps.length;
  // );
  return (
    <div className="form-card">
      {step === 1 && (
        <div className="contact-form">
          <h3>Contact Information</h3>

          <input
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />

          <input
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <input
            placeholder="Phone"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />

          <input
            placeholder="LinkedIn URL"
            value={data.linkedin}
            onChange={(e) => setData({ ...data, linkedin: e.target.value })}
          />

          <input
            placeholder="GitHub URL"
            value={data.github}
            onChange={(e) => setData({ ...data, github: e.target.value })}
          />
          <div className="form-buttons">
            <button className="next-btn" onClick={next}>
              Next &rarr;
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="summary-form">
          <h3>Professional Summary</h3>
          <textarea
            value={data.summary}
            onChange={(e) => setData({ ...data, summary: e.target.value })}
          />
          <div className="form-buttons">
            <button className="back-btn" onClick={back}>
              &larr; Previous
            </button>

            <button className="next-btn" onClick={next}>
              Next &rarr;
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="skills-form">
          <h3>Skills</h3>

          {data.skills.map((skill, index) => (
            <div key={index} className="card">
              <input
                value={skill.category}
                placeholder="Category"
                onChange={(e) => {
                  const newSkills = [...data.skills];
                  newSkills[index].category = e.target.value;
                  setData({ ...data, skills: newSkills });
                }}
              />
              <textarea
                value={skill.skills}
                placeholder="Skills"
                onChange={(e) => {
                  const newSkills = [...data.skills];
                  newSkills[index].skills = e.target.value;
                  setData({ ...data, skills: newSkills });
                }}
              />
              <button
                className="remove-btn"
                onClick={() => {
                  const newSkills = data.skills.filter((_, i) => i !== index);
                  setData({ ...data, skills: newSkills });
                }}
              >
                <FiTrash2 />
              </button>{" "}
            </div>
          ))}
          <button
            className="add"
            onClick={() =>
              setData({
                ...data,
                skills: [...data.skills, { category: "", skills: "" }],
              })
            }
          >
            <span className="plus-circle">+</span>
            Add Skill Category
          </button>
          <div>
            <div className="form-buttons">
              <button className="back-btn" onClick={back}>
                &larr; Previous
              </button>

              <button className="next-btn" onClick={next}>
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="experience-form">
          <h3>Professional Experience</h3>

          {data.experience?.map((exp, index) => (
            <div key={index} className="card">
              <input
                value={exp.company}
                placeholder="Company Name"
                onChange={(e) => {
                  const arr = [...data.experience];
                  arr[index].company = e.target.value;
                  setData({ ...data, experience: arr });
                }}
              />
              <input
                value={exp.role}
                placeholder="Role / Position"
                onChange={(e) => {
                  const arr = [...data.experience];
                  arr[index].role = e.target.value;
                  setData({ ...data, experience: arr });
                }}
              />
              <input
                value={exp.location}
                placeholder="Location"
                onChange={(e) => {
                  const arr = [...data.experience];
                  arr[index].location = e.target.value;
                  setData({ ...data, experience: arr });
                }}
              />
              <input
                value={exp.duration}
                placeholder="Duration (ex: Aug 2025 - Present)"
                onChange={(e) => {
                  const arr = [...data.experience];
                  arr[index].duration = e.target.value;
                  setData({ ...data, experience: arr });
                }}
              />
              <textarea
                value={exp.points}
                placeholder="Experience points (comma separated)"
                onChange={(e) => {
                  const arr = [...data.experience];
                  arr[index].points = e.target.value;
                  setData({ ...data, experience: arr });
                }}
              />
              <button
                className="remove-btn"
                onClick={() => {
                  const newExperience = data.experience.filter(
                    (_, i) => i !== index,
                  );
                  setData({ ...data, experience: newExperience });
                }}
              >
                <FiTrash2 />
              </button>{" "}
            </div>
          ))}
          <button
            className="add"
            onClick={() =>
              setData({
                ...data,
                experience: [
                  ...(Array.isArray(data.experience) ? data.experience : []),
                  {
                    company: "",
                    role: "",
                    location: "",
                    duration: "",
                    points: "",
                  },
                ],
              })
            }
          >
            <span className="plus-circle">+</span>
            Add Experience
          </button>

          <div className="form-buttons">
            <button className="back-btn" onClick={back}>
              &larr; Previous
            </button>

            <button className="next-btn" onClick={next}>
              Next &rarr;
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="education-form">
          <h3>Education</h3>

          {data.education.map((edu, index) => (
            <div key={index} className="card">
              <input
                value={edu.institution}
                placeholder="Institution / College"
                onChange={(e) => {
                  const arr = [...data.education];
                  arr[index].institution = e.target.value;
                  setData({ ...data, education: arr });
                }}
              />
              <input
                value={edu.degree}
                placeholder="Degree / Program"
                onChange={(e) => {
                  const arr = [...data.education];
                  arr[index].degree = e.target.value;
                  setData({ ...data, education: arr });
                }}
              />
              <input
                value={edu.year}
                placeholder="Year / Duration"
                onChange={(e) => {
                  const arr = [...data.education];
                  arr[index].year = e.target.value;
                  setData({ ...data, education: arr });
                }}
              />
              <input
                value={edu.location}
                placeholder="Location"
                onChange={(e) => {
                  const arr = [...data.education];
                  arr[index].location = e.target.value;
                  setData({ ...data, education: arr });
                }}
              />
              <input
                value={edu.performance}
                placeholder="CGPA / Percentage (optional)"
                onChange={(e) => {
                  const arr = [...data.education];
                  arr[index].performance = e.target.value;
                  setData({ ...data, education: arr });
                }}
              />
              <button
                className="remove-btn"
                onClick={() => {
                  const arr = data.education.filter((_, i) => i !== index);
                  setData({ ...data, education: arr });
                }}
              >
                <FiTrash2 />
              </button>{" "}
            </div>
          ))}
          <button
            className="add"
            onClick={() =>
              setData({
                ...data,
                education: [
                  ...data.education,
                  {
                    institution: "",
                    degree: "",
                    year: "",
                    location: "",
                    performance: "",
                  },
                ],
              })
            }
          >
            <span className="plus-circle">+</span>
            Add Qualification
          </button>
          <div className="form-buttons">
            <button className="back-btn" onClick={back}>
              &larr; Previous
            </button>

            <button className="next-btn" onClick={next}>
              Next &rarr;
            </button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="projects-form">
          <h3>Projects</h3>

          {data.projects.map((project, index) => (
            <div key={index} className="card">
              <input
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => {
                  const arr = [...data.projects];
                  arr[index].title = e.target.value;
                  setData({ ...data, projects: arr });
                }}
              />

              <input
                placeholder="Project Subtitle (e.g., AI-Driven SaaS)"
                value={project.subtitle}
                onChange={(e) => {
                  const arr = [...data.projects];
                  arr[index].subtitle = e.target.value;
                  setData({ ...data, projects: arr });
                }}
              />

              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => {
                  const arr = [...data.projects];
                  arr[index].description = e.target.value;
                  setData({ ...data, projects: arr });
                }}
              />

              <button
                className="remove-btn"
                type="button"
                onClick={() => {
                  const arr = data.projects.filter((_, i) => i !== index);
                  setData({ ...data, projects: arr });
                }}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
          <button
            className="add"
            onClick={() =>
              setData({
                ...data,
                projects: [
                  ...(data.projects || []),
                  {
                    title: "",
                    subtitle: "",
                    description: "",
                  },
                ],
              })
            }
          >
            <span className="plus-circle">+</span>
            Add Project
          </button>
          <div className="form-buttons">
            <button className="back-btn" onClick={back}>
              &larr; Previous
            </button>

            <button className="next-btn" onClick={next}>
              Next &rarr;
            </button>
          </div>
        </div>
      )}
      {step === 7 && (
        <div className="certifications-form">
          <h3>Certifications</h3>

          {data.certifications?.map((cert, index) => (
            <div key={index} className="card">
              <input
                placeholder="Certification / Award Title"
                value={cert.title}
                onChange={(e) => {
                  const arr = [...data.certifications];
                  arr[index].title = e.target.value;
                  setData({ ...data, certifications: arr });
                }}
              />

              <textarea
                placeholder="Description (details about the certification)"
                value={cert.description}
                onChange={(e) => {
                  const arr = [...data.certifications];
                  arr[index].description = e.target.value;
                  setData({ ...data, certifications: arr });
                }}
              />

              <button
                className="remove-btn"
                type="button"
                onClick={() => {
                  const arr = data.certifications.filter((_, i) => i !== index);
                  setData({ ...data, certifications: arr });
                }}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
          <button
            className="add"
            onClick={() =>
              setData({
                ...data,
                certifications: [
                  ...(data.certifications || []),
                  { title: "", description: "" },
                ],
              })
            }
          >
            <span className="plus-circle">+</span>
            Add Certification
          </button>
          <div className="form-buttons">
            <button className="back-btn" onClick={back}>
              &larr; Previous
            </button>

            <button
              className="next-btn"
              onClick={next}
              disabled={!isCustomSectionAdded}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      )}
      {steps?.[step - 1]?.custom && (
        <div className="custom-section-form">
          <h3>{steps?.[step - 1]?.name}</h3>

          {data.customSections?.map((section, index) => (
            <div key={index} className="card">
              <textarea
                placeholder="Content (comma separated)"
                value={section.content}
                onChange={(e) => {
                  const arr = [...data.customSections];
                  arr[index].content = e.target.value;
                  setData({ ...data, customSections: arr });
                }}
              />

              {/* ⭐ REMOVE BUTTON (same as certifications) */}
              <button
                className="remove-btn"
                type="button"
                onClick={() => {
                  const arr = data.customSections.filter((_, i) => i !== index);
                  setData({ ...data, customSections: arr });
                }}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}

          {/* ADD BUTTON */}
          <button
            className="add"
            onClick={() =>
              setData({
                ...data,
                customSections: [
                  ...(data.customSections || []),
                  {
                    sectionName: steps?.[step - 1]?.name,
                    title: "",
                    content: "",
                  },
                ],
              })
            }
          >
            <span className="plus-circle">+</span>
            Add {steps?.[step - 1]?.name}
          </button>

          <div className="form-buttons">
            <button className="back-btn" onClick={back}>
              &larr; Previous
            </button>
            <button className="next-btn" onClick={next} disabled={!hasNextStep}>
              Next &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormSteps;
