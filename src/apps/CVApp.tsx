import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaDownload, FaFilePdf, FaFileWord, FaFile, FaEye } from 'react-icons/fa';

const CVApp: React.FC = () => {
  const [uploadedCV, setUploadedCV] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const staticPath = '/cv/ibrahim-musa-cv.pdf';
    fetch(staticPath, { method: 'HEAD' }).then(res => {
      if (res.ok) {
        setUploadedCV({
          name: 'Ibrahim-Musa-CV.pdf',
          type: 'application/pdf',
          data: staticPath,
        });
      }
    });
  }, []);

  const getFileIcon = (fileType: string) => {
    if (fileType?.includes('pdf')) return <FaFilePdf className="file-icon pdf" />;
    if (fileType?.includes('word')) return <FaFileWord className="file-icon word" />;
    return <FaFile className="file-icon default" />;
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
    setPreviewUrl(uploadedCV.data);
    setShowPreview(true);
  };

  return (
    <div className="window-content">
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

        {uploadedCV && (
          <motion.div
            className="cv-display-area"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="cv-info">
              <div className="cv-file-info">
                {getFileIcon(uploadedCV.type)}
                <div className="cv-details">
                  <h3>{uploadedCV.name}</h3>
                </div>
              </div>
              <div className="cv-actions">
                <motion.button className="cv-action-btn preview-btn" onClick={handlePreview}>
                  <FaEye /> Preview
                </motion.button>
                <motion.button className="cv-action-btn download-btn" onClick={handleDownload}>
                  <FaDownload /> Download
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

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
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="pdf-modal-header">
                  <h4>Preview: {uploadedCV?.name}</h4>
                  <button className="pdf-close-btn" onClick={() => setShowPreview(false)}>✕</button>
                </div>
                <div className="pdf-modal-body">
                  {previewUrl && <iframe title="cv-preview" src={previewUrl} className="pdf-frame" />}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CVApp;