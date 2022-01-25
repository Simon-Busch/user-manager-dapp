import React, {useState, useEffect} from 'react';
import ipfs from '../../../utils/ipfs';
import './Input.css'

const Capture = ({onCapture}) => {
  const [buffer,setBuffer] = useState('');

  const captureFile = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    await reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer.from(reader.result));
    }
  }

  useEffect(() => {
    const ipfsHandler = async () => {
      await ipfs.add(buffer, (error, result) => {
        if(error) {
          console.error(error);
          return;
        }
        onCapture(result[0].hash);
      })
    }
    if (buffer) {
      ipfsHandler();
    }
  }, [buffer, onCapture]);

  return (
    <div className="input-container">
      <label>Upload your avatar</label>
      <input
        className="inputfile"
        type="file"
        name="file"
        id="file"
        onChange={(e) => captureFile(e)}
      />
      <label htmlFor="file">Upload</label>
     </div>
  );
};

export default Capture;