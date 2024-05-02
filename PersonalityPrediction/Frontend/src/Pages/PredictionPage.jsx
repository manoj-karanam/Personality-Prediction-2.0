import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PredictionPage.css';

const PredictionPage = () => {
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [error, setError] = useState('');
    const [personalityDetail, setPersonalityDetail] = useState('');

    const navigate = useNavigate(); // Hook from react-router-dom to navigate programmatically

    const personalityTypes = {
        'I': 'Introversion',
        'E': 'Extroversion',
        'N': 'Intuition',
        'S': 'Sensing',
        'T': 'Thinking',
        'F': 'Feeling',
        'J': 'Judging',
        'P': 'Perceiving'
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setError('');
        setPrediction('');
        setPersonalityDetail('');
    };

    const handleFileUpload = async () => {
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await axios.post('http://localhost:8000/api/predict-personality/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const result = response.data.personality_result;
            setPrediction(result);
            setError('');
            setPersonalityDetail(parsePersonalityType(result));
        } catch (err) {
            setError('Failed to predict personality. Please try again.');
            console.error('Error uploading file:', err);
        }
    };

    const parsePersonalityType = (type) => {
        return type.split('').map(char => personalityTypes[char]).join(' – ');
    };

    const removeFile = () => {
        setFile(null);
        setPrediction('');
        setPersonalityDetail('');
        setError('');
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="page-container">
            <div className="logout">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="upload-container card">
                <h2 className="upload-title">Personality Prediction from Resume</h2>
                <div className="drop-area">
                    <input type="file" id="resume-upload" style={{ display: 'none' }} onChange={handleFileChange} accept=".pdf"/>
                    <label htmlFor="resume-upload" className="file-upload-label">Click here to select a resume PDF file</label>
                </div>
                {file && (
                    <div className="file-list">
                        <div className="file-preview">{file.name}</div>
                        <button onClick={removeFile} className="remove-file">Remove</button>
                    </div>
                )}
                <button className="upload-button" onClick={handleFileUpload} disabled={!file}>Upload and Predict</button>
                {error && <div className="error"><p className="error-message">{error}</p></div>}
                {prediction && (
                    <div className="result">
                        <h3>Predicted Personality:</h3>
                        <p>{prediction}</p>
                        <p>{personalityDetail}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PredictionPage;
