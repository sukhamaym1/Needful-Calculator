'use strict';

window.NC_ARTICLES = window.NC_ARTICLES || {};

Object.assign(window.NC_ARTICLES, {
  'pdf-merge': `
    <h2>Introduction to PDF Merging</h2>
    <p>Merging multiple PDF documents into a single consolidated file is a common administrative and personal task. Whether compiling academic assignments, monthly invoices, or project reports, our in-browser PDF Merger provides a secure, local-sandbox solution without sending your documents to remote servers.</p>
    
    <h3>How it works</h3>
    <p>Using the client-side library <code>pdf-lib</code>, the PDF documents are loaded as binary arrays inside the browser memory. The merger script reads page indexes, copies each page stream, and appends them sequentially into a brand new PDF buffer, generating a downloadable link in seconds.</p>
    
    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Is there a limit on the number of files I can merge?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            No. Since processing runs locally in your browser, the limit depends on your system's RAM capacity.
          </div>
        </div>
      </div>
    </div>
  `,

  'pdf-split': `
    <h2>Introduction to PDF Splitting</h2>
    <p>Splitting a large document allows you to isolate and extract specific sections. This is extremely useful when sharing chapters of books, extracting contract appendices, or breaking down bulk invoices.</p>
    
    <h3>How it works</h3>
    <p>You select a PDF, input page ranges (e.g. 1-3, 5), and click process. The tool loads the source PDF locally, copies the requested pages into a new document buffer, and compiles the download file entirely in-browser.</p>
    
    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Can I split password-protected PDFs?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Protected PDFs must be unlocked before splitting. Ensure you enter correct access keys if requested, or decrypt the document prior to uploading.
          </div>
        </div>
      </div>
    </div>
  `,

  'jpg-to-pdf': `
    <h2>Introduction to JPG to PDF Conversion</h2>
    <p>Converting photos or scanned documents in JPEG format to a single PDF makes them easy to print, share, and archive. Our converter merges multiple images into a uniform PDF document.</p>
    
    <h3>How it works</h3>
    <p>Each image is read as raw bytes, embedded into a new PDF canvas matching the dimensions of the photo, and outputted as a standard PDF file.</p>
    
    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Can I reorder my images before generating the PDF?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes. You can drag and drop the image slots in the file manager to arrange pages in any custom sequence before processing.
          </div>
        </div>
      </div>
    </div>
  `,

  'pdf-to-jpg': `
    <h2>Introduction to PDF to JPG Conversion</h2>
    <p>Sometimes you need page templates as image formats for presentations, social media, or web applications. This tool turns any PDF page into a high-resolution JPEG.</p>
    
    <h3>How it works</h3>
    <p>Using <code>PDF.js</code>, each document page is drawn onto an HTML5 canvas element at high scale, then exported as individual JPEG data blobs ready for saving.</p>
    
    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Will the image quality match the original PDF?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes. The canvas renders at 1.5x scaling factor to ensure sharp text outlines and crisp images in the exported JPEGs.
          </div>
        </div>
      </div>
    </div>
  `,

  'pdf-rotate': `
    <h2>Introduction to Rotating PDFs</h2>
    <p>Correct orientation is essential for readable documents, especially when scanning pages sideways. This tool lets you rotate individual pages of a PDF clockwise.</p>
    
    <h3>How it works</h3>
    <p>The script modifies the rotation metadata of specific pages within the PDF stream (incrementing by 90, 180, or 270 degrees) and saves the structure.</p>
    
    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Does rotation compress or degrade my PDF?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            No. It only changes the metadata orientation flags without re-encoding text layouts or graphics, maintaining original document quality.
          </div>
        </div>
      </div>
    </div>
  `,

  'pdf-delete-pages': `
    <h2>Introduction to Page Deletion</h2>
    <p>Remove confidential sheets, unnecessary cover pages, or blank scanning errors from your PDF files to streamline your documents.</p>
    
    <h3>How it works</h3>
    <p>The parser loads the document structure, deletes requested page items in reverse order to preserve indexing, and writes the output file.</p>
    
    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Can I recover deleted pages later?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            No, the deletion compiles a new PDF without those pages. Ensure you keep your original source file backup safe.
          </div>
        </div>
      </div>
    </div>
  `,

  'pdf-extract-pages': `
    <h2>Introduction to Page Extraction</h2>
    <p>Pull vital sheets out of massive reports and assemble them into a smaller, target file. Useful for extracting financial ledgers or research summaries.</p>
    
    <h3>How it works</h3>
    <p>The source document page arrays are copied into a clean, empty target PDF which is saved and outputted for download.</p>
    
    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Are hyperlinks preserved in extracted pages?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes, copyPages keeps internal page links and formatting properties intact.
          </div>
        </div>
      </div>
    </div>
  `,

  'pdf-metadata-viewer': `
    <h2>Introduction to PDF Metadata</h2>
    <p>Every PDF contains metadata indicating who created it, what application compiled it, its topic, creation dates, and revision stamps.</p>
    
    <h3>How it works</h3>
    <p>The client reader decodes structural metadata streams of the binary PDF file and presents them in an organized properties grid.</p>
    
    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Is metadata viewing safe?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Entirely. The metadata parsing runs completely locally in the browser sandbox. No file data is shared or transmitted.
          </div>
        </div>
      </div>
    </div>
  `,

  'image-to-pdf': `
    <h2>Introduction to Image to PDF Conversion</h2>
    <p>Convert your JPG, PNG, and WebP graphics into standard PDF formats. It supports multiple input uploads and arranges pages neatly in order.</p>
    
    <h3>How it works</h3>
    <p>Images are converted into byte buffers, embedded as page sheets using corresponding formats (PNG/JPG), and saved to a final output PDF.</p>
    
    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Can I convert PNG screenshots?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            Yes, the tool detects PNG formats and embeds them securely using the native PNG stream decoder.
          </div>
        </div>
      </div>
    </div>
  `,

  'pdf-preview': `
    <h2>Introduction to PDF Previews</h2>
    <p>Read your document pages directly on the webpage without requiring external desktop applications or browser extensions.</p>
    
    <h3>How it works</h3>
    <p>Using <code>PDF.js</code>, page structures are rendered onto HTML5 canvas layouts sequentially in a scrollable, premium container.</p>
    
    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          <span>Can I copy text from the preview layout?</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            This preview tool is optimized for visual page scrolling and renders pages as image canvases. To copy text, open the PDF using a native viewer.
          </div>
        </div>
      </div>
    </div>
  `
});
