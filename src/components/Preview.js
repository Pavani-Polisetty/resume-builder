import { useRef, useEffect, useState } from "react";

const formatUrl = (url) => {
  if (!url) return "";
  if (!url.startsWith("http")) return "https://" + url;
  return url;
};

function ResumePreview({ data }) {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    if (contentRef.current && pageRef.current) {
      const measureContent = () => {
        const contentHeight = contentRef.current?.scrollHeight || 0;
        const contentWidth = contentRef.current?.scrollWidth || 0;

        // A4 dimensions in CSS pixels
        const a4Width = 794; // 210mm at 96dpi
        const a4Height = 1123; // 297mm at 96dpi
        const pageMargins = 60; // Total top + bottom margins in pixels
        const maxHeight = a4Height - pageMargins;

        if (contentHeight > maxHeight && contentHeight > 0) {
          // Calculate scale factor to fit content within A4 page
          const scaleFactor = maxHeight / contentHeight;
          // Ensure we don't scale up, only down
          setFontScale(Math.min(scaleFactor, 1));
        } else {
          setFontScale(1);
        }
      };

      // Measure with delays to ensure DOM has fully rendered
      measureContent();
      const timer1 = setTimeout(measureContent, 50);
      const timer2 = setTimeout(measureContent, 150);
      const timer3 = setTimeout(measureContent, 300);
      const timer4 = setTimeout(measureContent, 500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [data]);

  return (
    <div className="preview-wrapper">
      <div id="resume-page" ref={pageRef}>
        <div
          ref={contentRef}
          style={{
            width: "100%",
            boxSizing: "border-box",
            fontSize: `${14 * fontScale}px`,
            transform: `scale(${fontScale})`,
            transformOrigin: "top left",
            transformBox: "content-box",
          }}
        >
          {data.name && <h1 className="center-text">{data.name}</h1>}

          {(data.email || data.phone || data.linkedin || data.github) && (
            <p className="center-text">
              {data.email}
              {data.phone && ` | ${data.phone}`}

              {data.linkedin && (
                <>
                  {" | "}
                  <a
                    href={formatUrl(data.linkedin)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </>
              )}

              {data.github && (
                <>
                  {" | "}
                  <a
                    href={formatUrl(data.github)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </>
              )}
            </p>
          )}

          {data.summary && (
            <>
              <h3>Professional Summary</h3>
              <p>{data.summary}</p>
            </>
          )}

          {data.skills?.length > 0 && (
            <>
              <h3>Core Competences</h3>
              {data.skills.map((s, i) => (
                <div key={i} className="skill-row">
                  <div className="skill-category">{s.category}</div>
                  <div className="skill-values">{s.skills}</div>
                </div>
              ))}
            </>
          )}

          {Array.isArray(data.experience) && data.experience.length > 0 && (
            <>
              <h2 className="section-title">PROFESSIONAL EXPERIENCE</h2>

              {data.experience?.map((exp, i) => (
                <div key={i} className="experience-block">
                  {/* Company + Location */}
                  <div className="exp-header">
                    <strong>{exp.company}</strong>
                    <span>{exp.location}</span>
                  </div>

                  {/* Role + Duration */}
                  <div className="exp-subheader">
                    <i>{exp.role}</i>
                    <i>{exp.duration}</i>
                  </div>

                  {/* Bullet Points */}
                  {exp.points && exp.points.trim().length > 0 && (
                    <ul className="exp-points">
                      {exp.points.split(",").map((point, idx) => (
                        <li key={idx}>{point.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </>
          )}

          {data.education?.length > 0 && (
            <>
              <h3>Education</h3>
              <ul className="education-list">
                {data.education.map((e, i) => (
                  <li key={i} className="education-item">
                    <div className="education-header">
                      <strong>{e.institution}</strong>
                      <span className="education-location">{e.location}</span>
                    </div>
                    <div className="education-details">
                      <i>{e.degree}</i>
                      <span className="education-year">{e.year}</span>
                    </div>
                    {e.performance && (
                      <div className="education-performance">
                        <i>{e.performance}</i>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {data.projects?.length > 0 && (
            <>
              <h3>Key Technical Projects</h3>
              <ul className="projects-list">
                {data.projects.map((p, i) => (
                  <li key={i} className="project-item">
                    <strong>{p.title}</strong>
                    {p.subtitle && (
                      <span className="project-subtitle"> ({p.subtitle})</span>
                    )}
                    <span className="project-text">: {p.description}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {data.certifications?.length > 0 && (
            <>
              <h3>Certifications & Awards</h3>
              <ul className="certifications-list">
                {data.certifications.map((c, i) => (
                  <li key={i} className="certification-item">
                    <strong>{c.title}:</strong> {c.description}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
