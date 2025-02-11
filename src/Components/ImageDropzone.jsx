import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const styles = {
  container: {
    border: '2px dashed #cccccc',
    borderRadius: '8px',
    textAlign: 'center',
    padding: '20px',
    marginTop: '10px',
    cursor: 'pointer',
  },
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
    position: 'relative',
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    background: 'rgba(255, 0, 0, 0.8)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: 20,
    height: 20,
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

function ImageDropzone({ onFilesChange }) {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      console.log('🔄 Raw Accepted Files:', acceptedFiles);

      // Explicitly validate files
      const validFiles = acceptedFiles.filter(file => file instanceof File && file.name && file.type);

      console.log('✅ Valid Files:', validFiles);

      if (validFiles.length !== acceptedFiles.length) {
        console.warn('⚠️ Some invalid files were dropped and will not be processed.');
      }

      const newFiles = validFiles.map(file => ({
        file, // Preserve the original File object
        preview: URL.createObjectURL(file),
      }));

      console.log('📦 Processed Files for State:', newFiles);

      setFiles(prev => {
        const updatedFiles = [...prev, ...newFiles];
        console.log('📝 Final Files State:', updatedFiles);
        onFilesChange(updatedFiles);
        return updatedFiles;
      });
    },
  });

  const handleRemoveFile = (fileName) => {
    console.log('🗑️ Removing File:', fileName);

    setFiles(prev => {
      const updatedFiles = prev.filter(f => f.file.name !== fileName);
      console.log('📝 Updated Files State After Removal:', updatedFiles);
      onFilesChange(updatedFiles);
      return updatedFiles;
    });
  };

  useEffect(() => {
    return () => files.forEach(f => URL.revokeObjectURL(f.preview));
  }, [files]);

  return (
    <section>
      <div {...getRootProps({ style: styles.container })}>
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select files</p>
      </div>
      <aside style={styles.thumbsContainer}>
        {files.map(f => (
          <div style={styles.thumb} key={f.file.name}>
            <button
              style={styles.deleteButton}
              onClick={() => handleRemoveFile(f.file.name)}
            >
              ×
            </button>
            <div style={styles.thumbInner}>
              <img
                src={f.preview}
                style={styles.img}
                onLoad={() => URL.revokeObjectURL(f.preview)}
              />
            </div>
          </div>
        ))}
      </aside>
    </section>
  );
}

export default ImageDropzone;
