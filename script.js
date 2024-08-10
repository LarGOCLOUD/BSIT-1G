function downloadPDF() {
    const { jsPDF } = window.jspdf;

    html2canvas(document.querySelector("#form-container"), { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF('p', 'pt', 'a4');
        
        // Calculate the number of pages
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        const pageHeight = pdf.internal.pageSize.getHeight();
        let heightLeft = pdfHeight;
        let position = 0;

        // If height > pageHeight, split the image
        if (heightLeft > pageHeight) {
            while (heightLeft > 0) {
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pageHeight;
                position -= pageHeight;
                if (heightLeft > 0) {
                    pdf.addPage();
                }
            }
        } else {
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        }

        pdf.save("par-q-form.pdf");
    });
}

function downloadPNG() {
    html2canvas(document.querySelector("#form-container"), { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'par-q-form.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}