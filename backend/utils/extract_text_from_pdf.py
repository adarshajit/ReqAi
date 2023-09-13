import PyPDF2
from io import BytesIO

def extract_text_from_pdf(pdf_content):
    pdf_reader = PyPDF2.PdfReader(BytesIO(pdf_content))
    pdf_text = ''
    
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        pdf_text += page.extract_text()
    
    return pdf_text

