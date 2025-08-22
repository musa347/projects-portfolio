import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUpload, 
  FaDownload, 
  FaFilePdf, 
  FaFileWord, 
  FaFile,
  FaCheck,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaEye
} from 'react-icons/fa';

const CVUpload = () => {
  const [uploadedCV, setUploadedCV] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const fileInputRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Load saved CV from localStorage, otherwise try static CV from public/cv
  useEffect(() => {
    const init = async () => {
      const savedCV = localStorage.getItem('uploadedCV');
      const savedDate = localStorage.getItem('cvLastUpdated');
      if (savedCV) {
        setUploadedCV(JSON.parse(savedCV));
        setLastUpdated(savedDate);
        return;
      }

      // Check for a statically hosted CV placed at public/cv/ibrahim-musa-cv.pdf
      try {
        const staticPath = '/cv/ibrahim-musa-cv.pdf';
        const res = await fetch(staticPath, { method: 'HEAD' });
        if (res.ok) {
          setUploadedCV({
            name: 'Ibrahim-Musa-CV.pdf',
            size: 0,
            type: 'application/pdf',
            data: staticPath,
            uploadDate: null,
          });
          setLastUpdated(null);
        }
      } catch (e) {
        // Ignore if not available
      }
    };

    init();
  }, []);

  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) return <FaFilePdf className="file-icon pdf" />;
    if (fileType?.includes('word') || fileType?.includes('doc')) return <FaFileWord className="file-icon word" />;
    return <FaFile className="file-icon default" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(''), 3000);
      return false;
    }

    if (file.size > maxSize) {
      setUploadStatus('size-error');
      setTimeout(() => setUploadStatus(''), 3000);
      return false;
    }

    return true;
  };

  const handleFileUpload = (file) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const cvData = {
        name: file.name,
        size: file.size,
        type: file.type,
        data: e.target.result,
        uploadDate: new Date().toISOString()
      };

      setUploadedCV(cvData);
      setLastUpdated(new Date().toLocaleDateString());
      
      // Save to localStorage
      localStorage.setItem('uploadedCV', JSON.stringify(cvData));
      localStorage.setItem('cvLastUpdated', new Date().toLocaleDateString());
      
      setUploadStatus('success');
      setTimeout(() => setUploadStatus(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDownload = () => {
    if (uploadedCV) {
      const link = document.createElement('a');
      link.href = uploadedCV.data;
      link.download = uploadedCV.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };



  const handlePreview = async () => {
    if (!uploadedCV) return;

    const isPdf =
      (uploadedCV.type && uploadedCV.type.includes('pdf')) ||
      (uploadedCV.name && uploadedCV.name.toLowerCase().endsWith('.pdf')) ||
      (uploadedCV.data && uploadedCV.data.startsWith('data:application/pdf'));

    if (!isPdf) return;

    try {
      let pdfUrl = uploadedCV.data;

      // Normalize to a blob URL that browsers can render reliably
      if (!uploadedCV.data?.startsWith('data:application/pdf')) {
        const blob = await (await fetch(uploadedCV.data)).blob();
        pdfUrl = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      }

      setPreviewUrl(pdfUrl);
      setShowPreview(true);
    } catch (e) {
      console.error('Failed to preview PDF', e);
    }
  };

  return (
    <motion.div
      className="cv-upload-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="cv-upload-header">
        <h2>Curriculum Vitae</h2>
        <p>View and download my CV</p>
      </div>

      {/* Upload Status Messages */}
      <AnimatePresence>
        {uploadStatus && (
          <motion.div
            className={`upload-status ${uploadStatus}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {uploadStatus === 'success' && (
              <>
                <FaCheck /> CV uploaded successfully!
              </>
            )}
            {uploadStatus === 'error' && (
              <>
                <FaExclamationTriangle /> Please upload a PDF or Word document only.
              </>
            )}
            {uploadStatus === 'size-error' && (
              <>
                <FaExclamationTriangle /> File size must be less than 5MB.
              </>
            )}
            {uploadStatus === 'deleted' && (
              <>
                <FaCheck /> CV removed successfully.
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!uploadedCV ? (
        /* Upload Area */
        <motion.div
          className={`cv-upload-area ${isDragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="upload-content">
            <FaUpload className="upload-icon" />
            <h3>Upload Your CV</h3>
            <p>Drag and drop your CV here, or click to browse</p>
            <div className="upload-requirements">
              <span>Supported formats: PDF, DOC, DOCX</span>
              <span>Maximum size: 5MB</span>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </motion.div>
      ) : (
        /* CV Display Area */
        <motion.div
          className="cv-display-area"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="cv-info">
            <div className="cv-file-info">
              {getFileIcon(uploadedCV.type)}
              <div className="cv-details">
                <h3>{uploadedCV.name}</h3>
                <div className="cv-meta">
                  <span className="file-size">{formatFileSize(uploadedCV.size)}</span>
                  {lastUpdated && (
                    <span className="last-updated">
                      <FaCalendarAlt /> Updated: {lastUpdated}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="cv-actions">
              {((uploadedCV.type && uploadedCV.type.includes('pdf')) || (uploadedCV.name && uploadedCV.name.toLowerCase().endsWith('.pdf')) || (uploadedCV.data && uploadedCV.data.startsWith('data:application/pdf'))) && (
                <motion.button
                  className="cv-action-btn preview-btn"
                  onClick={handlePreview}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEye /> Preview
                </motion.button>
              )}
              <motion.button
                className="cv-action-btn download-btn"
                onClick={handleDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload /> Download
              </motion.button>
            </div>
          </div>

          {/* Update functionality removed for recruiter-only view/download */}
        </motion.div>
      )}

      {/* Recruiter Information */}
      <motion.div
        className="recruiter-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h3>For Recruiters</h3>
        <div className="recruiter-content">
          <p>
            This CV is regularly updated to reflect my latest skills, experience, and projects. 
            Feel free to download the most current version for your review.
          </p>
          <div className="contact-info">
            <p><strong>Contact:</strong> musaibrahim0028@yahoo.com</p>
            <p><strong>Response Time:</strong> Within 24 hours</p>
            <p><strong>Availability:</strong> Open to full-time, contract, and consulting opportunities</p>
          </div>
        </div>
      </motion.div>

      {/* In-app PDF preview modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="pdf-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              className="pdf-modal"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pdf-modal-header">
                <h4>Preview: {uploadedCV?.name}</h4>
                <button className="pdf-close-btn" onClick={() => setShowPreview(false)}>✕</button>
              </div>
              <div className="pdf-modal-body">
                {previewUrl ? (
                  <iframe title="cv-preview" src={previewUrl} className="pdf-frame" />
                ) : (
                  <p>Generating preview...</p>
                )}
              </div>
              <div className="pdf-modal-actions">
                <button className="cv-action-btn download-btn" onClick={handleDownload}>
                  <FaDownload /> Download
                </button>
                <button className="cv-action-btn" onClick={() => setShowPreview(false)}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CVUpload;