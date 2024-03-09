import React, { useState, useRef, useEffect } from "react";

const DragAndDropImage = ({updatePicture}) => {
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  useEffect(() => {
    if (file !== null && updatePicture) {
      updatePicture(file ? file : null);
      console.log("selected place is " + file);
    }
  }, [file, updatePicture]);

  // send files to server
  const handleUpload = () => {
    // Implement your file upload logic here
  };

  const selectFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Access properties of the selected file here
      console.log(`Selected file name: ${selectedFile.name}`);
    } else {
      console.log("No file selected");
    }
    setFile(selectedFile);
   
  };

  return (
    <div style={{ paddingLeft: '10%' }}>
      {!file ? (
        <div
          className="dropzone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p>Drag and Drop image to Upload</p>
          <p>Or</p>
          <input
            type="file"
            onChange={selectFile}
            hidden
            ref={inputRef}
          />
          <button onClick={() => inputRef.current.click()}>Select Files</button>
        </div>
      ) : (
        <div className="uploads">
          <ul>
          <li style={{ fontSize: "medium" }}>{file.name}</li>
          </ul>
          <div className="actions">
            <button onClick={() => setFile(null)}>Cancel</button>
            <button onClick={handleUpload}>Upload</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragAndDropImage;
