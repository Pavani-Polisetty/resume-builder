function FormSteps({ step, setStep, data, setData }) {
  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  return (
    <div className="form-card">
      {step === 1 && (
        <>
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

          <button onClick={next}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Professional Summary</h3>
          <textarea
            value={data.summary}
            onChange={(e) => setData({ ...data, summary: e.target.value })}
          />
          <button onClick={back}>Back</button>
          <button onClick={next}>Next</button>
        </>
      )}

      {step === 3 && (
        <>
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
                type="button"
                onClick={() => {
                  const newSkills = data.skills.filter((_, i) => i !== index);
                  setData({ ...data, skills: newSkills });
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setData({
                ...data,
                skills: [...data.skills, { category: "", skills: "" }],
              })
            }
          >
            Add Skill Category
          </button>
          <button onClick={back}>Back</button>
          <button onClick={next}>Next</button>
        </>
      )}
      {step === 4 && (
        <>
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
                type="button"
                onClick={() => {
                  const newSkills = data.skills.filter((_, i) => i !== index);
                  setData({ ...data, skills: newSkills });
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
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
            Add Experience
          </button>
          <button onClick={back}>Back</button>
          <button onClick={next}>Next</button>
        </>
      )}

      {step === 5 && (
        <>
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
                type="button"
                onClick={() => {
                  const arr = data.education.filter((_, i) => i !== index);
                  setData({ ...data, education: arr });
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
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
            Add Qualification
          </button>
          <button onClick={back}>Back</button>
          <button onClick={next}>Next</button>
        </>
      )}

      {step === 6 && (
        <>
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
                type="button"
                onClick={() => {
                  const arr = data.projects.filter((_, i) => i !== index);
                  setData({ ...data, projects: arr });
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
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
            Add Project
          </button>
          <button onClick={back}>Back</button>
          <button onClick={next}>Next</button>
        </>
      )}
      {step === 7 && (
        <>
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
                type="button"
                onClick={() => {
                  const arr = data.certifications.filter((_, i) => i !== index);
                  setData({ ...data, certifications: arr });
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
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
            Add Certification
          </button>
          <button onClick={back}>Back</button>
        </>
      )}
    </div>
  );
}

export default FormSteps;
