'use strict';

window.NC = window.NC || {};
window.NC.CalculatorRouter = window.NC.CalculatorRouter || {};
window.NC.CalculatorRouter.configs = window.NC.CalculatorRouter.configs || {};

Object.assign(window.NC.CalculatorRouter.configs, {
  'pdf-merge': {
    title: 'PDF Merge',
    icon: '🔗',
    subtitle: 'Combine multiple PDF files in any order instantly',
    inputs: [],
    isPDF: true,
    hasChart: false,
    hasTable: false
  },
  'pdf-split': {
    title: 'PDF Split',
    icon: '✂️',
    subtitle: 'Extract specific pages or ranges from a PDF document',
    inputs: [],
    isPDF: true,
    hasChart: false,
    hasTable: false
  },
  'jpg-to-pdf': {
    title: 'JPG to PDF',
    icon: '🖼️',
    subtitle: 'Convert JPEG/JPG images to a single high-quality PDF',
    inputs: [],
    isPDF: true,
    hasChart: false,
    hasTable: false
  },
  'pdf-to-jpg': {
    title: 'PDF to JPG',
    icon: '📸',
    subtitle: 'Convert all pages in a PDF document into individual JPG images',
    inputs: [],
    isPDF: true,
    hasChart: false,
    hasTable: false
  },
  'pdf-rotate': {
    title: 'PDF Rotate',
    icon: '🔄',
    subtitle: 'Rotate individual pages of a PDF document clockwise',
    inputs: [],
    isPDF: true,
    hasChart: false,
    hasTable: false
  },
  'pdf-delete-pages': {
    title: 'PDF Delete Pages',
    icon: '🗑️',
    subtitle: 'Remove unwanted pages from a PDF document',
    inputs: [],
    isPDF: true,
    hasChart: false,
    hasTable: false
  },
  'pdf-extract-pages': {
    title: 'PDF Extract Pages',
    icon: '📂',
    subtitle: 'Save specific selected pages into a new PDF file',
    inputs: [],
    isPDF: true,
    hasChart: false,
    hasTable: false
  },
  'pdf-metadata-viewer': {
    title: 'PDF Metadata Viewer',
    icon: 'ℹ️',
    subtitle: 'Read properties, author info, and layout settings of a PDF',
    inputs: [],
    isPDF: true,
    hasChart: false,
    hasTable: false
  },
  'image-to-pdf': {
    title: 'Image to PDF',
    icon: '🖼️',
    subtitle: 'Convert JPG, PNG, and WebP images to a consolidated PDF',
    inputs: [],
    isPDF: true,
    hasChart: false,
    hasTable: false
  },
  'pdf-preview': {
    title: 'PDF Preview',
    icon: '👁️',
    subtitle: 'View your PDF document pages cleanly in the browser',
    inputs: [],
    isPDF: true,
    hasChart: false,
    hasTable: false
  }
});

// Extend CalculatorRouter with PDF UI & execution handler
Object.assign(window.NC.CalculatorRouter, {
  async initPDFUI(config) {
    const bodyEl = document.querySelector('.calc-body');
    if (!bodyEl) return;

    bodyEl.innerHTML = `<div style="text-align:center; padding:var(--space-8); color:var(--txt-secondary); font-weight:600;">📥 Loading PDF secure libraries...</div>`;

    try {
      await Promise.all([
        this.loadScript('https://unpkg.com/pdf-lib@1.17.0/dist/pdf-lib.min.js'),
        this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js'),
        this.loadScript('https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/Sortable.min.js')
      ]);
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      }
    } catch (err) {
      console.error(err);
      bodyEl.innerHTML = `<div style="color:var(--clr-primary); font-weight:bold; padding:var(--space-8); text-align:center;">⚠️ Failed to load PDF dependencies. Please check your network connection.</div>`;
      return;
    }

    // Set up standard PDF interface HTML
    let acceptTypes = '.pdf';
    let fileLabel = 'Supports PDF documents';
    let allowMultiple = true;

    if (config.isPDF) {
      if (this.activeTool === 'jpg-to-pdf') {
        acceptTypes = '.jpg,.jpeg';
        fileLabel = 'Supports JPG/JPEG image files';
      } else if (this.activeTool === 'image-to-pdf') {
        acceptTypes = '.jpg,.jpeg,.png,.webp';
        fileLabel = 'Supports JPG, PNG, and WebP files';
      } else if (
        ['pdf-split', 'pdf-to-jpg', 'pdf-rotate', 'pdf-delete-pages', 'pdf-extract-pages', 'pdf-metadata-viewer', 'pdf-preview'].includes(this.activeTool)
      ) {
        allowMultiple = false;
        fileLabel = 'Select exactly one PDF file';
      }
    }

    bodyEl.innerHTML = `
      <div class="pdf-tool-container" style="display:flex; flex-direction:column; gap:var(--space-6); width:100%;">
        <!-- Drop Zone -->
        <div class="pdf-drop-zone" id="pdf-upload-zone" style="border:2px dashed var(--clr-primary); border-radius:var(--radius-xl); padding:var(--space-8); text-align:center; background:var(--bg-muted); cursor:pointer; transition:all var(--transition-fast);">
          <div style="font-size:3rem; margin-bottom:var(--space-2)">📂</div>
          <div style="font-weight:600; color:var(--txt-primary)">Drag & drop files here or click to browse</div>
          <div style="font-size:var(--text-xs); color:var(--txt-muted); margin-top:var(--space-1); font-weight:600;">${fileLabel}</div>
          <input type="file" id="pdf-file-input" style="display:none" accept="${acceptTypes}" ${allowMultiple ? 'multiple' : ''}>
        </div>

        <!-- Progress Indicator -->
        <div id="pdf-progress-wrap" style="display:none; text-align:center; padding:var(--space-4);">
          <div id="pdf-progress-status" style="font-weight:600; margin-bottom:var(--space-2); color:var(--txt-primary);">Processing...</div>
          <div style="background:var(--border-color); border-radius:var(--radius-full); height:12px; overflow:hidden; margin-bottom:var(--space-2);">
            <div id="pdf-progress-bar" style="width:0%; background:var(--gradient-brand); height:100%; transition:width 0.1s linear;"></div>
          </div>
          <div id="pdf-progress-percent" style="font-size:var(--text-sm); color:var(--txt-muted); font-weight:bold">0% Completed</div>
        </div>

        <!-- Files List / Sortable Manager -->
        <div id="pdf-manager" style="display:none;">
          <h3 style="font-size:var(--text-base); margin-bottom:var(--space-3); font-family:var(--font-heading)">Selected Files / Pages:</h3>
          <div id="pdf-file-list" class="sortable-list" style="display:flex; flex-direction:column; gap:var(--space-3);"></div>
        </div>

        <!-- Controls panel (settings for rotation, splitting ranges) -->
        <div id="pdf-controls-panel" style="display:none; background:var(--bg-muted); padding:var(--space-5); border-radius:var(--radius-xl); border:1px solid var(--border-color);"></div>

        <!-- Action Button -->
        <div id="pdf-action-container">
          <button id="pdf-process-btn" class="btn btn-primary btn-lg" style="width:100%; display:none; background:var(--gradient-brand); border:none; color:white; cursor:pointer; font-weight:700; height:48px; border-radius:var(--radius-xl);">
            ⚡ Process Files
          </button>
        </div>

        <div id="pdf-result-container"></div>
      </div>
    `;

    // Event Bindings
    const uploadZone = document.getElementById('pdf-upload-zone');
    const fileInput = document.getElementById('pdf-file-input');

    uploadZone.addEventListener('click', () => fileInput.click());
    
    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.style.background = 'rgba(37, 99, 235, 0.05)';
    });
    uploadZone.addEventListener('dragleave', () => {
      uploadZone.style.background = 'var(--bg-muted)';
    });
    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.style.background = 'var(--bg-muted)';
      if (e.dataTransfer.files.length > 0) {
        this.handlePDFFiles(e.dataTransfer.files, allowMultiple);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.handlePDFFiles(e.target.files, allowMultiple);
      }
    });
  },

  uploadedFiles: [],

  async handlePDFFiles(filesList, allowMultiple) {
    const listDiv = document.getElementById('pdf-file-list');
    const managerDiv = document.getElementById('pdf-manager');
    const processBtn = document.getElementById('pdf-process-btn');
    const resultContainer = document.getElementById('pdf-result-container');
    const progressWrap = document.getElementById('pdf-progress-wrap');

    // Reset results and progress
    resultContainer.innerHTML = '';
    progressWrap.style.display = 'none';

    if (!allowMultiple) {
      this.uploadedFiles = [filesList[0]];
    } else {
      this.uploadedFiles = this.uploadedFiles.concat(Array.from(filesList));
    }

    if (this.uploadedFiles.length === 0) return;

    managerDiv.style.display = 'block';
    listDiv.innerHTML = '';

    // Populate file list layout
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      const file = this.uploadedFiles[i];
      const item = document.createElement('div');
      item.className = 'pdf-list-item';
      item.dataset.index = i;
      item.style.cssText = 'display:flex; align-items:center; justify-content:space-between; padding:var(--space-3) var(--space-4); background:var(--bg-surface); border:1px solid var(--border-color); border-radius:var(--radius-lg); gap:var(--space-3);';
      
      const details = document.createElement('div');
      details.style.cssText = 'display:flex; align-items:center; gap:var(--space-3); overflow:hidden;';
      
      const icon = document.createElement('span');
      icon.textContent = file.name.endsWith('.pdf') ? '📄' : '🖼️';
      icon.style.fontSize = '1.5rem';
      
      const fileMeta = document.createElement('div');
      fileMeta.style.cssText = 'overflow:hidden; text-overflow:ellipsis; white-space:nowrap;';
      fileMeta.innerHTML = `
        <div style="font-weight:600; color:var(--txt-primary); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:320px;">${file.name}</div>
        <div style="font-size:var(--text-xs); color:var(--txt-muted);">Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</div>
      `;

      details.appendChild(icon);
      details.appendChild(fileMeta);

      const action = document.createElement('button');
      action.className = 'btn btn-secondary';
      action.style.cssText = 'padding:var(--space-1) var(--space-2); border:1px solid var(--border-color); border-radius:var(--radius-md); background:var(--bg-surface); color:#EF4444; font-weight:700; cursor:pointer; font-size:var(--text-sm);';
      action.textContent = 'Remove';
      
      action.addEventListener('click', (e) => {
        e.stopPropagation();
        this.uploadedFiles.splice(i, 1);
        this.handlePDFFiles([], allowMultiple);
      });

      item.appendChild(details);
      item.appendChild(action);
      listDiv.appendChild(item);
    }

    // Set up Sortable for reordering
    if (allowMultiple && window.Sortable) {
      window.Sortable.create(listDiv, {
        animation: 150,
        onEnd: () => {
          // Reorder uploadedFiles list to match DOM
          const reordered = [];
          listDiv.querySelectorAll('.pdf-list-item').forEach(item => {
            const oldIdx = parseInt(item.dataset.index);
            reordered.push(this.uploadedFiles[oldIdx]);
          });
          this.uploadedFiles = reordered;
          // Refresh indices
          listDiv.querySelectorAll('.pdf-list-item').forEach((item, idx) => {
            item.dataset.index = idx;
          });
        }
      });
    }

    // Settings / Settings Panel setup based on tool category
    await this.setupPDFSettingsPanel();

    processBtn.style.display = 'block';
    
    // Bind click event
    processBtn.onclick = () => this.executePDFOperation();
  },

  async setupPDFSettingsPanel() {
    const panel = document.getElementById('pdf-controls-panel');
    if (!panel) return;

    panel.innerHTML = '';
    panel.style.display = 'none';

    if (this.uploadedFiles.length === 0) return;

    const file = this.uploadedFiles[0];

    if (this.activeTool === 'pdf-split') {
      panel.style.display = 'block';
      panel.innerHTML = `
        <h4 style="margin-top:0; margin-bottom:var(--space-2); font-size:var(--text-sm);">Specify Pages to Split</h4>
        <p style="font-size:var(--text-xs); color:var(--txt-muted); margin-bottom:var(--space-3)">Use comma for separate pages and hyphen for ranges (e.g. 1, 3, 5-8).</p>
        <div class="form-group" style="margin-bottom:0;">
          <input type="text" id="pdf-split-pages" class="form-input" placeholder="e.g. 1-2, 4" value="1" style="width:100%; height:42px; border-radius:var(--radius-md); padding:0 var(--space-3); border:1.5px solid var(--border-color);">
        </div>
      `;
    } else if (this.activeTool === 'pdf-rotate') {
      panel.style.display = 'block';
      panel.innerHTML = `
        <h4 style="margin-top:0; margin-bottom:var(--space-2); font-size:var(--text-sm);">Set Page Rotation</h4>
        <div style="display:flex; gap:var(--space-3); align-items:center;">
          <label style="font-size:var(--text-sm); font-weight:500;">Clockwise Rotation Angle:</label>
          <select id="pdf-rotate-angle" class="form-input" style="height:38px; padding:0 var(--space-3); border-radius:var(--radius-md); border:1.5px solid var(--border-color); outline:none;">
            <option value="90">90° (Clockwise)</option>
            <option value="180">180° (Upside Down)</option>
            <option value="270">270° (Counter-Clockwise)</option>
          </select>
        </div>
      `;
    } else if (this.activeTool === 'pdf-delete-pages') {
      panel.style.display = 'block';
      panel.innerHTML = `
        <h4 style="margin-top:0; margin-bottom:var(--space-2); font-size:var(--text-sm);">Select Pages to Delete</h4>
        <input type="text" id="pdf-delete-ranges" class="form-input" placeholder="e.g. 2, 4-6" style="width:100%; height:42px; border-radius:var(--radius-md); padding:0 var(--space-3); border:1.5px solid var(--border-color);">
      `;
    } else if (this.activeTool === 'pdf-extract-pages') {
      panel.style.display = 'block';
      panel.innerHTML = `
        <h4 style="margin-top:0; margin-bottom:var(--space-2); font-size:var(--text-sm);">Select Pages to Extract</h4>
        <input type="text" id="pdf-extract-ranges" class="form-input" placeholder="e.g. 1, 3-5" style="width:100%; height:42px; border-radius:var(--radius-md); padding:0 var(--space-3); border:1.5px solid var(--border-color);">
      `;
    }
  },

  updatePDFProgress(percent, statusText) {
    const wrap = document.getElementById('pdf-progress-wrap');
    const bar = document.getElementById('pdf-progress-bar');
    const text = document.getElementById('pdf-progress-status');
    const pctText = document.getElementById('pdf-progress-percent');

    if (wrap) {
      wrap.style.display = 'block';
      bar.style.width = percent + '%';
      text.textContent = statusText;
      pctText.textContent = percent + '% Completed';
    }
  },

  async executePDFOperation() {
    const progressWrap = document.getElementById('pdf-progress-wrap');
    const resultContainer = document.getElementById('pdf-result-container');

    if (this.uploadedFiles.length === 0) {
      alert('Please upload a file first.');
      return;
    }

    progressWrap.style.display = 'block';
    resultContainer.innerHTML = '';

    try {
      let downloadBlob = null;
      let outputFilename = 'output.pdf';

      if (this.activeTool === 'pdf-merge') {
        this.updatePDFProgress(10, 'Initializing PDF merging engine...');
        const mergedPdf = await PDFLib.PDFDocument.create();

        for (let i = 0; i < this.uploadedFiles.length; i++) {
          const file = this.uploadedFiles[i];
          this.updatePDFProgress(
            Math.round(20 + (i / this.uploadedFiles.length) * 60),
            `Reading file contents: ${file.name}...`
          );
          
          const bytes = await file.arrayBuffer();
          const pdfDoc = await PDFLib.PDFDocument.load(bytes);
          const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
          copiedPages.forEach(page => mergedPdf.addPage(page));
        }

        this.updatePDFProgress(85, 'Building final PDF buffers...');
        const mergedBytes = await mergedPdf.save();
        downloadBlob = new Blob([mergedBytes], { type: 'application/pdf' });
        outputFilename = 'merged_document.pdf';
        this.updatePDFProgress(100, 'Merging completed successfully!');
      } 
      
      else if (this.activeTool === 'pdf-split') {
        this.updatePDFProgress(20, 'Reading PDF document structure...');
        const file = this.uploadedFiles[0];
        const bytes = await file.arrayBuffer();
        const srcPdf = await PDFLib.PDFDocument.load(bytes);
        
        const splitVal = document.getElementById('pdf-split-pages').value;
        const pageCount = srcPdf.getPageCount();
        const indices = this.parsePageRanges(splitVal, pageCount);

        if (indices.length === 0) {
          throw new Error('Please specify valid page ranges (e.g. 1-3, 5).');
        }

        this.updatePDFProgress(50, `Extracting ${indices.length} pages...`);
        const targetPdf = await PDFLib.PDFDocument.create();
        const copiedPages = await targetPdf.copyPages(srcPdf, indices);
        copiedPages.forEach(page => targetPdf.addPage(page));

        this.updatePDFProgress(80, 'Saving output split file...');
        const outBytes = await targetPdf.save();
        downloadBlob = new Blob([outBytes], { type: 'application/pdf' });
        outputFilename = `${file.name.replace('.pdf', '')}_split.pdf`;
        this.updatePDFProgress(100, 'Splitting completed successfully!');
      }

      else if (this.activeTool === 'jpg-to-pdf' || this.activeTool === 'image-to-pdf') {
        this.updatePDFProgress(10, 'Initializing image converter...');
        const pdfDoc = await PDFLib.PDFDocument.create();

        for (let i = 0; i < this.uploadedFiles.length; i++) {
          const file = this.uploadedFiles[i];
          this.updatePDFProgress(
            Math.round(20 + (i / this.uploadedFiles.length) * 60),
            `Embedding image: ${file.name}...`
          );
          
          const bytes = await file.arrayBuffer();
          let embeddedImage;

          if (file.type === 'image/png' || file.name.endsWith('.png')) {
            embeddedImage = await pdfDoc.embedPng(bytes);
          } else {
            embeddedImage = await pdfDoc.embedJpg(bytes);
          }

          const { width, height } = embeddedImage.scale(1);
          const page = pdfDoc.addPage([width, height]);
          page.drawImage(embeddedImage, {
            x: 0,
            y: 0,
            width,
            height
          });
        }

        this.updatePDFProgress(85, 'Creating PDF document channels...');
        const outBytes = await pdfDoc.save();
        downloadBlob = new Blob([outBytes], { type: 'application/pdf' });
        outputFilename = 'images_converted.pdf';
        this.updatePDFProgress(100, 'Conversion completed successfully!');
      }

      else if (this.activeTool === 'pdf-to-jpg') {
        this.updatePDFProgress(15, 'Loading PDF rendering drivers...');
        const file = this.uploadedFiles[0];
        const bytes = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: bytes }).promise;
        const pageCount = pdf.numPages;

        resultContainer.innerHTML = `
          <h4 style="margin-top:var(--space-4); margin-bottom:var(--space-3)">Rendered JPEG Pages:</h4>
          <div id="pdf-jpg-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap:var(--space-3);"></div>
        `;
        const grid = document.getElementById('pdf-jpg-grid');

        for (let i = 1; i <= pageCount; i++) {
          this.updatePDFProgress(
            Math.round(20 + (i / pageCount) * 70),
            `Rendering page ${i} / ${pageCount}...`
          );

          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext('2d');

          await page.render({ canvasContext: context, viewport: viewport }).promise;
          const dataUrl = canvas.toDataURL('image/jpeg');

          const card = document.createElement('div');
          card.style.cssText = 'background:var(--bg-surface); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:var(--space-2); text-align:center;';
          card.innerHTML = `
            <img src="${dataUrl}" style="width:100%; border-radius:var(--radius-md); border:1px solid var(--border-color); max-height:160px; object-fit:contain; background:#f8fafc; margin-bottom:var(--space-2)">
            <div style="font-size:var(--text-xs); font-weight:600; margin-bottom:var(--space-2)">Page ${i}</div>
            <a href="${dataUrl}" download="page_${i}.jpg" class="btn btn-secondary btn-sm" style="font-size:10px; padding:2px 6px; border:1px solid var(--border-color); border-radius:var(--radius-sm); text-decoration:none; color:var(--clr-primary); font-weight:600;">📥 Download</a>
          `;
          grid.appendChild(card);
        }

        this.updatePDFProgress(100, 'All pages exported to JPG images!');
        return; // Return early as downloads are handled individually in the cards
      }

      else if (this.activeTool === 'pdf-rotate') {
        this.updatePDFProgress(20, 'Opening source document...');
        const file = this.uploadedFiles[0];
        const bytes = await file.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(bytes);
        
        const angle = parseInt(document.getElementById('pdf-rotate-angle').value) || 90;
        const pageCount = pdfDoc.getPageCount();

        this.updatePDFProgress(50, `Rotating ${pageCount} pages...`);
        for (let i = 0; i < pageCount; i++) {
          const page = pdfDoc.getPage(i);
          const currentRotation = page.getRotation().angle;
          page.setRotation(PDFLib.degrees(currentRotation + angle));
        }

        this.updatePDFProgress(80, 'Generating rotated document bytes...');
        const outBytes = await pdfDoc.save();
        downloadBlob = new Blob([outBytes], { type: 'application/pdf' });
        outputFilename = `${file.name.replace('.pdf', '')}_rotated.pdf`;
        this.updatePDFProgress(100, 'Rotation completed successfully!');
      }

      else if (this.activeTool === 'pdf-delete-pages') {
        this.updatePDFProgress(20, 'Opening source document...');
        const file = this.uploadedFiles[0];
        const bytes = await file.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(bytes);
        const pageCount = pdfDoc.getPageCount();

        const delVal = document.getElementById('pdf-delete-ranges').value;
        const deleteIndices = this.parsePageRanges(delVal, pageCount);

        if (deleteIndices.length === 0) {
          throw new Error('Please specify valid page indices to delete.');
        }

        this.updatePDFProgress(50, `Discarding ${deleteIndices.length} pages...`);
        // We must delete in descending order of indices to keep index mapping correct
        const sortedDesc = deleteIndices.slice().sort((a, b) => b - a);
        sortedDesc.forEach(idx => {
          pdfDoc.removePage(idx);
        });

        this.updatePDFProgress(80, 'Finalizing updated document...');
        const outBytes = await pdfDoc.save();
        downloadBlob = new Blob([outBytes], { type: 'application/pdf' });
        outputFilename = `${file.name.replace('.pdf', '')}_filtered.pdf`;
        this.updatePDFProgress(100, 'Page deletion completed successfully!');
      }

      else if (this.activeTool === 'pdf-extract-pages') {
        this.updatePDFProgress(20, 'Opening source document...');
        const file = this.uploadedFiles[0];
        const bytes = await file.arrayBuffer();
        const srcPdf = await PDFLib.PDFDocument.load(bytes);
        const pageCount = srcPdf.getPageCount();

        const extVal = document.getElementById('pdf-extract-ranges').value;
        const indices = this.parsePageRanges(extVal, pageCount);

        if (indices.length === 0) {
          throw new Error('Please specify valid page indices to extract.');
        }

        this.updatePDFProgress(50, `Extracting ${indices.length} pages...`);
        const targetPdf = await PDFLib.PDFDocument.create();
        const copiedPages = await targetPdf.copyPages(srcPdf, indices);
        copiedPages.forEach(page => targetPdf.addPage(page));

        this.updatePDFProgress(80, 'Finalizing extracted PDF output...');
        const outBytes = await targetPdf.save();
        downloadBlob = new Blob([outBytes], { type: 'application/pdf' });
        outputFilename = `${file.name.replace('.pdf', '')}_extracted.pdf`;
        this.updatePDFProgress(100, 'Extraction completed successfully!');
      }

      else if (this.activeTool === 'pdf-metadata-viewer') {
        this.updatePDFProgress(30, 'Reading PDF meta channels...');
        const file = this.uploadedFiles[0];
        const bytes = await file.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(bytes);

        const pageCount = pdfDoc.getPageCount();
        const title = pdfDoc.getTitle() || 'N/A';
        const author = pdfDoc.getAuthor() || 'N/A';
        const subject = pdfDoc.getSubject() || 'N/A';
        const creator = pdfDoc.getCreator() || 'N/A';
        const producer = pdfDoc.getProducer() || 'N/A';
        const creationDate = pdfDoc.getCreationDate();
        const modificationDate = pdfDoc.getModificationDate();

        const formatDate = (d) => d ? d.toLocaleString() : 'N/A';

        this.updatePDFProgress(100, 'Metadata parsed!');

        resultContainer.innerHTML = `
          <h4 style="margin-top:var(--space-4); margin-bottom:var(--space-3);">Document Properties:</h4>
          <table style="width:100%; border-collapse:collapse; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:var(--radius-lg); font-size:var(--text-sm);">
            <tbody>
              <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px; font-weight:600; color:var(--txt-secondary)">Title</td><td style="padding:10px;">${title}</td></tr>
              <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px; font-weight:600; color:var(--txt-secondary)">Author</td><td style="padding:10px;">${author}</td></tr>
              <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px; font-weight:600; color:var(--txt-secondary)">Subject / Topic</td><td style="padding:10px;">${subject}</td></tr>
              <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px; font-weight:600; color:var(--txt-secondary)">Total Pages</td><td style="padding:10px;">${pageCount}</td></tr>
              <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px; font-weight:600; color:var(--txt-secondary)">Creator Application</td><td style="padding:10px;">${creator}</td></tr>
              <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px; font-weight:600; color:var(--txt-secondary)">PDF Producer</td><td style="padding:10px;">${producer}</td></tr>
              <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px; font-weight:600; color:var(--txt-secondary)">Creation Date</td><td style="padding:10px;">${formatDate(creationDate)}</td></tr>
              <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px; font-weight:600; color:var(--txt-secondary)">Last Modified</td><td style="padding:10px;">${formatDate(modificationDate)}</td></tr>
            </tbody>
          </table>
        `;
        return;
      }

      else if (this.activeTool === 'pdf-preview') {
        this.updatePDFProgress(20, 'Opening PDF stream...');
        const file = this.uploadedFiles[0];
        const bytes = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: bytes }).promise;
        const pageCount = pdf.numPages;

        resultContainer.innerHTML = `
          <h4 style="margin-top:var(--space-4); margin-bottom:var(--space-3)">Scrollable Document Preview (${pageCount} Pages):</h4>
          <div id="pdf-preview-scroller" style="display:flex; flex-direction:column; gap:var(--space-5); overflow-y:auto; max-height:480px; padding:var(--space-3); border:1px solid var(--border-color); border-radius:var(--radius-xl); background:var(--bg-muted);"></div>
        `;
        const scrollBox = document.getElementById('pdf-preview-scroller');

        for (let i = 1; i <= pageCount; i++) {
          this.updatePDFProgress(
            Math.round(20 + (i / pageCount) * 70),
            `Rendering page ${i} / ${pageCount}...`
          );

          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.2 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.cssText = 'width:100%; border:1.5px solid var(--border-color); border-radius:var(--radius-md); box-shadow:0 4px 6px rgba(0,0,0,0.03); background:#ffffff;';
          const context = canvas.getContext('2d');

          await page.render({ canvasContext: context, viewport: viewport }).promise;
          scrollBox.appendChild(canvas);
        }

        this.updatePDFProgress(100, 'Document preview loaded successfully!');
        return;
      }

      // Generate Download Button if a single PDF output is created
      if (downloadBlob) {
        const downloadUrl = URL.createObjectURL(downloadBlob);
        resultContainer.innerHTML = `
          <div style="text-align:center; padding:var(--space-6); background:var(--gradient-hero); border:1.5px solid rgba(37,99,235,0.15); border-radius:var(--radius-xl);">
            <div style="font-size:2rem; margin-bottom:var(--space-2);">🎉</div>
            <h3 style="font-size:var(--text-lg); font-weight:700; color:var(--clr-primary); margin-bottom:var(--space-1);">PDF Processing Complete!</h3>
            <p style="font-size:var(--text-sm); color:var(--txt-secondary); margin-bottom:var(--space-4);">File ready for download: <strong>${outputFilename}</strong></p>
            <a href="${downloadUrl}" download="${outputFilename}" class="btn btn-primary btn-lg" style="display:inline-flex; align-items:center; justify-content:center; text-decoration:none; font-weight:700; color:white; width:100%; height:46px; border-radius:var(--radius-xl); background:var(--gradient-brand);">
              📥 Download Output PDF
            </a>
          </div>
        `;
      }

    } catch (err) {
      console.error(err);
      this.updatePDFProgress(0, 'Error processing files.');
      resultContainer.innerHTML = `<div style="color:#EF4444; font-weight:600; padding:var(--space-4);">⚠️ Error: ${err.message}</div>`;
    }
  },

  // Helper to parse inputs like "1, 3, 5-8" into [0, 2, 4, 5, 6, 7] (0-indexed page indices)
  parsePageRanges(rangeStr, maxPages) {
    if (!rangeStr) return [];
    
    const indices = [];
    const parts = rangeStr.replace(/\s+/g, '').split(',');

    for (let part of parts) {
      if (part.includes('-')) {
        const bounds = part.split('-');
        const start = parseInt(bounds[0]) || 1;
        const end = parseInt(bounds[1]) || maxPages;
        
        const low = Math.max(1, Math.min(start, end));
        const high = Math.min(maxPages, Math.max(start, end));
        
        for (let i = low; i <= high; i++) {
          indices.push(i - 1);
        }
      } else {
        const page = parseInt(part);
        if (page >= 1 && page <= maxPages) {
          indices.push(page - 1);
        }
      }
    }

    // Return unique, sorted indices
    return Array.from(new Set(indices)).sort((a, b) => a - b);
  }
});
