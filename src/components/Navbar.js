import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Navbar() {
  const handleDownload = async () => {
    const element = document.getElementById("resume-page");
    const contentElement =
      element?.querySelector?.('[data-resume-content="true"]') || null;

    if (!element) {
      alert("Resume preview not found");
      return;
    }

    try {
      // ===== Save original styles =====
      const originalStyles = {
        padding: element.style.padding,
        border: element.style.border,
        borderRadius: element.style.borderRadius,
        margin: element.style.margin,
        boxShadow: element.style.boxShadow,
        background: element.style.background,
      };

      const originalContentStyles = contentElement
        ? {
            fontSize: contentElement.style.fontSize,
            transform: contentElement.style.transform,
            transformOrigin: contentElement.style.transformOrigin,
          }
        : null;

      // ===== Clean PDF styling =====
      element.style.padding = "0";
      element.style.border = "none";
      element.style.borderRadius = "0";
      element.style.margin = "0";
      element.style.boxShadow = "none";
      element.style.background = "white";

      // The preview uses transform: scale(...) to fit on screen.
      // Disable it during PDF generation so link rectangles align.
      if (contentElement) {
        contentElement.style.transform = "none";
        contentElement.style.transformOrigin = "top left";
        contentElement.style.fontSize = "14px";
      }

      // ===== AUTO FONT RESIZE =====
      const targetHeight = 1120;

      const resizeTarget = contentElement || element;
      const computedStyle = window.getComputedStyle(resizeTarget);
      let baseFont = parseFloat(computedStyle.fontSize);

      let currentHeight = element.scrollHeight;

      while (currentHeight < targetHeight * 0.95) {
        baseFont += 1;
        resizeTarget.style.fontSize = `${baseFont}px`;
        currentHeight = element.scrollHeight;
        if (baseFont > 24) break;
      }

      while (currentHeight > targetHeight) {
        baseFont -= 0.5;
        resizeTarget.style.fontSize = `${baseFont}px`;
        currentHeight = element.scrollHeight;
        if (baseFont < 10) break;
      }

      // ===== Capture link rectangles in the EXACT capture layout =====
      // IMPORTANT: must happen BEFORE html2canvas and BEFORE restoring styles.
      const captureElementRect = element.getBoundingClientRect();
      const captureWidth = element.offsetWidth || captureElementRect.width;
      const captureHeight = element.offsetHeight || captureElementRect.height;

      const linkRects = Array.from(element.querySelectorAll("a"))
        .flatMap((a) => {
          const rects = Array.from(a.getClientRects());
          if (rects.length === 0) return [];
          return rects.map((r) => ({
            href: a.href,
            x: r.left - captureElementRect.left,
            y: r.top - captureElementRect.top,
            w: r.width,
            h: r.height,
          }));
        })
        .filter((r) => r.w > 0 && r.h > 0);

      // ===== Capture canvas =====
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // ===== Restore styles =====
      Object.assign(element.style, originalStyles);
      if (contentElement && originalContentStyles) {
        Object.assign(contentElement.style, originalContentStyles);
      }

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
      // ⭐ CLICKABLE LINKS (aligned to captured layout)
      // ======================================================
      linkRects.forEach((r) => {
        const pdfX = x + (r.x / captureWidth) * imgWidth;
        const pdfY = y + (r.y / captureHeight) * imgHeight;
        const pdfW = (r.w / captureWidth) * imgWidth;
        const pdfH = (r.h / captureHeight) * imgHeight;

        pdf.link(pdfX, pdfY, pdfW, pdfH, { url: r.href });
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
