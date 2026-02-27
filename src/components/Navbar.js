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
      // ===== Save original styles =====
      const originalStyles = {
        padding: element.style.padding,
        fontSize: element.style.fontSize,
        border: element.style.border,
        borderRadius: element.style.borderRadius,
        margin: element.style.margin,
        boxShadow: element.style.boxShadow,
        background: element.style.background,
      };

      // ===== Clean PDF styling =====
      element.style.padding = "0";
      element.style.border = "none";
      element.style.borderRadius = "0";
      element.style.margin = "0";
      element.style.boxShadow = "none";
      element.style.background = "white";

      // ===== AUTO FONT RESIZE =====
      const targetHeight = 1120;

      const computedStyle = window.getComputedStyle(element);
      let baseFont = parseFloat(computedStyle.fontSize);

      let currentHeight = element.scrollHeight;

      while (currentHeight < targetHeight * 0.95) {
        baseFont += 1;
        element.style.fontSize = `${baseFont}px`;
        currentHeight = element.scrollHeight;
        if (baseFont > 24) break;
      }

      while (currentHeight > targetHeight) {
        baseFont -= 0.5;
        element.style.fontSize = `${baseFont}px`;
        currentHeight = element.scrollHeight;
        if (baseFont < 10) break;
      }

      // ===== Capture canvas =====
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // ===== Restore styles =====
      Object.assign(element.style, originalStyles);

      // ===== IMAGE COMPRESSION =====
      let quality = 0.8;
      let imgData;

      do {
        imgData = canvas.toDataURL("image/jpeg", quality);
        quality -= 0.1;
      } while (imgData.length > 1000000 && quality > 0.3);

      // ===== Create PDF =====
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;

      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const scaleX = availableWidth / canvasWidth;
      const scaleY = availableHeight / canvasHeight;
      const scale = Math.min(scaleX, scaleY);

      const imgWidth = canvasWidth * scale;
      const imgHeight = canvasHeight * scale;

      const x = (pageWidth - imgWidth) / 2;
      const y = margin;

      // ===== Add image =====
      pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);

      // ======================================================
      // ⭐ CLICKABLE LINKS (FINAL FIX)
      // ======================================================
      const links = element.querySelectorAll("a");
      const elementRect = element.getBoundingClientRect();

      links.forEach((link) => {
        const rect = link.getBoundingClientRect();

        // Position relative to main element
        const linkX = rect.left - elementRect.left;
        const linkY = rect.top - elementRect.top;
        const linkW = rect.width;
        const linkH = rect.height;

        // HTML → PDF conversion
        const pdfX = x + (linkX / elementRect.width) * imgWidth;
        const pdfY = y + (linkY / elementRect.height) * imgHeight;
        const pdfW = (linkW / elementRect.width) * imgWidth;
        const pdfH = (linkH / elementRect.height) * imgHeight;

        pdf.link(pdfX, pdfY, pdfW, pdfH, {
          url: link.href,
        });
      });

      // ======================================================
      // ⭐ ATS FRIENDLY TEXT LAYER
      // ======================================================
      const plainText = element.innerText || "";

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(0.1);
      pdf.setTextColor(255, 255, 255);

      const lines = pdf.splitTextToSize(plainText, 180);
      pdf.text(lines, 5, 5);

      pdf.save("Resume.pdf");
    } catch (error) {
      console.error(error);
      alert("Error generating PDF");
    }
  };

  return (
    <div className="navbar">
      <h2>Career Copilot</h2>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default Navbar;
