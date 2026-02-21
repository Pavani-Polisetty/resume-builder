import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Navbar() {
  const handleDownload = async () => {
    const element = document.getElementById("resume-page");

    if (!element) {
      alert("Resume preview not found");
      return;
    }

    try {
      // Store original styles
      const originalPadding = element.style.padding;
      const originalBorder = element.style.border;
      const originalBorderRadius = element.style.borderRadius;
      const originalMargin = element.style.margin;
      const originalBoxShadow = element.style.boxShadow;
      const originalBackground = element.style.background;

      // Remove border, padding, and shadows for clean PDF
      element.style.padding = "0";
      element.style.border = "none";
      element.style.borderRadius = "0";
      element.style.margin = "0";
      element.style.boxShadow = "none";
      element.style.background = "white";

      // Create canvas with higher quality
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // Restore original styles
      element.style.padding = originalPadding;
      element.style.border = originalBorder;
      element.style.borderRadius = originalBorderRadius;
      element.style.margin = originalMargin;
      element.style.boxShadow = originalBoxShadow;
      element.style.background = originalBackground;

      const imgData = canvas.toDataURL("image/png");

      // A4 dimensions in mm
      const a4Width = 210;
      const a4Height = 297;

      // Calculate dimensions to fit content on single A4 page
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Calculate the scale needed to fit on A4 (with small margins)
      const imgWidth = a4Width - 4; // 2mm margins on each side
      const maxImgHeight = a4Height - 4; // 2mm margins

      // Calculate proportional height
      let imgHeight = (canvasHeight * imgWidth) / canvasWidth;

      // If content exceeds A4 height, scale it down
      let scaleFactor = 1;
      if (imgHeight > maxImgHeight) {
        scaleFactor = maxImgHeight / imgHeight;
        imgHeight = maxImgHeight;
      }

      const pdf = new jsPDF("p", "mm", "a4");

      // Center horizontally and position at top
      const xOffset = (a4Width - imgWidth * scaleFactor) / 2;
      const yOffset = 2;

      pdf.addImage(
        imgData,
        "PNG",
        xOffset,
        yOffset,
        imgWidth * scaleFactor,
        imgHeight,
      );
      pdf.save("Resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="navbar">
      <h2>Career Copilot</h2>

      <div>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}

export default Navbar;
