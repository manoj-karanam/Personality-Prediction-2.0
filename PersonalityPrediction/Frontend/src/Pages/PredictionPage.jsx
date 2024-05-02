import React, { useEffect, useState } from 'react';
import './PredictionPage.css';
import { Rings } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PredictionPage() {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [showResult, setShowResult] = useState(false)
    const [isAnimationloading, setAnimationLoading] = useState(true)
    const navigate = useNavigate();
    const [userResult, setUserResult] =useState(null)

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        const filteredFiles = newFiles.filter(file => {
            const fileType = file.type;
            if (fileType === "application/pdf" || fileType.includes("wordprocessingml") || fileType.includes("msword")) {
                return true;
            } else {
                setError('Only PDF and Word documents are allowed.');
                return false;
            }
        });

        if (filteredFiles.length > 0) {
            setError('');
            setFiles(prevFiles => [...prevFiles, ...filteredFiles]);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setAnimationLoading(false)

        }, 2000)

    }, [])

    const handleUpload = async () => {
        console.log("Submitting files to API: ", files);
        const response = axios.post("https://", files)
        setUserResult(response?.data?.result)
        
        setShowResult(true)
    };

    const removeFile = (fileToRemove) => {
        setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
        setShowResult(false)
        if (files.length <= 1) setError(''); // Clear error when no files are left
    };

    if (isAnimationloading) {
        return <Rings
            visible={true}
            height="160"
            width="160"
            color="#5c52ee"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    }

    return (
        <div>
            <div className='logout'>
                <button onClick={() => navigate("/")}>Logout</button>
            </div>
            <div className="upload-container">
                <div className="card">
                    <div className='upload-title'>Upload</div>
                    <div className={`drop-area ${error ? 'error' : ''}`}>
                        <div className="upload-icon">
                            <svg width="69" height="60" viewBox="0 0 69 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.0283 14.7459L36.1205 14.7734L36.1245 14.7688C36.5622 14.8481 36.9963 14.5861 37.1249 14.152C38.2966 10.2153 41.9877 7.46512 46.1001 7.46512C46.587 7.46512 46.9818 7.07024 46.9818 6.58338C46.9818 6.0965 46.5869 5.70164 46.1001 5.70164C41.0459 5.70164 36.7987 9.06673 35.435 13.6494C35.2958 14.1162 35.5618 14.6068 36.0283 14.7459Z" fill="#483EA8" stroke="#F9FFF9" stroke-width="0.3" />
                                <path d="M56.3438 42.4384H51.9534C51.5494 42.4384 51.2217 42.1107 51.2217 41.7067C51.2217 41.3027 51.5494 40.9749 51.9534 40.9749H56.3438C62.3956 40.9749 67.3197 36.0509 67.3197 29.999C67.3197 23.9471 62.3956 19.023 56.3438 19.023H56.2382C56.026 19.023 55.8242 18.9311 55.6852 18.7706C55.5462 18.6101 55.4834 18.3974 55.5138 18.1873C55.5791 17.7315 55.612 17.2737 55.612 16.8279C55.612 11.5829 51.3444 7.31531 46.0995 7.31531C44.059 7.31531 42.1131 7.95296 40.4719 9.15978C40.1112 9.42478 39.599 9.30718 39.3905 8.91047C34.7425 0.0596993 22.6023 -1.12887 16.3082 6.57053C13.6568 9.81417 12.615 14.0336 13.4498 18.146C13.5418 18.6002 13.1942 19.0236 12.7327 19.0236H12.4395C6.3876 19.0236 1.46353 23.9477 1.46353 29.9996C1.46353 36.0514 6.3876 40.9755 12.4395 40.9755H16.8298C17.2338 40.9755 17.5615 41.3032 17.5615 41.7072C17.5615 42.1113 17.2338 42.439 16.8298 42.439H12.4395C5.5805 42.439 0 36.8585 0 29.9995C0 23.3329 5.27155 17.8742 11.8651 17.5731C11.2457 13.3066 12.4301 9.00295 15.1751 5.64437C21.9138 -2.5996 34.828 -1.67556 40.2871 7.51707C42.0287 6.42522 44.0215 5.85244 46.0992 5.85244C52.4538 5.85244 57.4892 11.261 57.0486 17.58C63.5813 17.9463 68.7829 23.3763 68.7829 29.999C68.7829 36.8585 63.2024 42.4384 56.3434 42.4384L56.3438 42.4384Z" fill="#483EA8" />
                                <path d="M15.85 41.2935C15.85 51.4634 24.1237 59.737 34.2935 59.737C44.4634 59.737 52.737 51.4633 52.737 41.2935C52.737 31.1235 44.4634 22.85 34.2935 22.85C24.1235 22.85 15.85 31.1237 15.85 41.2935ZM17.6138 41.2935C17.6138 32.0966 25.0964 24.6138 34.2935 24.6138C43.4904 24.6138 50.9732 32.0964 50.9732 41.2935C50.9732 50.4904 43.4904 57.9732 34.2935 57.9732C25.0966 57.9732 17.6138 50.4905 17.6138 41.2935Z" fill="#483EA8" stroke="#F9FFF9" stroke-width="0.3" />
                                <path d="M33.9423 48.6577C33.9423 49.0364 34.2494 49.3435 34.628 49.3435C35.0066 49.3435 35.3137 49.0368 35.3137 48.6577V34.7292C35.3137 34.3505 35.0066 34.0435 34.628 34.0435C34.2494 34.0435 33.9423 34.3505 33.9423 34.7292V48.6577Z" fill="#483EA8" stroke="#483EA8" stroke-width="0.3" />
                                <path d="M34.6279 35.7003L30.8272 39.5009L34.6279 35.7003ZM34.6279 35.7003L38.4286 39.501C38.5624 39.6348 38.7384 39.7018 38.9135 39.7019L34.6279 35.7003ZM29.8573 39.501C30.1251 39.7688 30.5595 39.769 30.8271 39.501L38.9135 39.7019C39.0883 39.7018 39.2645 39.6353 39.3984 39.501C39.6663 39.2331 39.6662 38.7991 39.3984 38.5313L35.1127 34.2456C34.8449 33.9778 34.4105 33.9776 34.143 34.2456C34.1429 34.2456 34.1429 34.2457 34.1429 34.2457L29.8573 38.5313C29.5894 38.7991 29.5894 39.2331 29.8573 39.501Z" fill="#483EA8" stroke="#483EA8" stroke-width="0.3" />
                            </svg>

                        </div>
                        <label htmlFor="file-upload" className="file-upload-label">
                            Drag & drop files or Browse
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <p className="supported-formats">
                            Supported formats: PDF
                        </p>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                    {files.length > 0 && (
                        <div className='uploaded-files-section'>
                            <div className='uploaded'>Uploaded Files</div>
                            <div className="uploaded-files">
                                {files.map((file, index) => (
                                    <div key={index} className="uploaded-file-card">
                                        {file.name}
                                        <button onClick={() => removeFile(file)} className="remove-file"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="8" cy="8" r="8" fill="#FFF3F3" />
                                            <path d="M11.4769 5.14517H10.4774C10.464 5.14054 10.4501 5.13753 10.436 5.13614H9.37174V4.25348C9.3718 4.18714 9.3458 4.12346 9.29945 4.07608C9.25304 4.02871 9.18995 4.00138 9.12369 4H6.60672C6.53948 4 6.47501 4.02667 6.42752 4.07422C6.37997 4.12177 6.35324 4.18624 6.35324 4.25348V5.13614H5.29439C5.2803 5.13753 5.2664 5.14054 5.25303 5.14517H4.25347C4.16288 5.14517 4.07921 5.19345 4.03395 5.27188C3.98868 5.35031 3.98868 5.44691 4.03395 5.52535C4.07921 5.60378 4.16288 5.65211 4.25347 5.65211H5.06783L5.72585 11.7735C5.7329 11.8358 5.76263 11.8933 5.8094 11.9351C5.85611 11.9769 5.91661 11.9999 5.97932 12H9.75462C9.81668 11.9991 9.87627 11.9756 9.92233 11.9339C9.96831 11.8922 9.99751 11.8352 10.0045 11.7735L10.6625 5.66105H11.4769C11.5675 5.66105 11.6511 5.61277 11.6964 5.53434C11.7417 5.45591 11.7417 5.35924 11.6964 5.28087C11.6511 5.20244 11.5675 5.1541 11.4769 5.1541L11.4769 5.14517ZM6.86566 4.50695H8.86472V5.13614H6.86566V4.50695ZM9.52455 11.4894H6.20582L5.57663 5.66111H10.1537L9.52455 11.4894Z" fill="#E41D1D" />
                                            <path d="M7.86529 10.8962C7.93252 10.8962 7.99699 10.8695 8.04454 10.822C8.09209 10.7745 8.11876 10.71 8.11876 10.6428V6.50796C8.11876 6.41737 8.07049 6.33369 7.99205 6.28843C7.91362 6.24311 7.81696 6.24311 7.73852 6.28843C7.66009 6.3337 7.61182 6.41737 7.61182 6.50796V10.6428C7.61182 10.71 7.63848 10.7745 7.68603 10.822C7.73359 10.8695 7.79805 10.8962 7.86529 10.8962H7.86529Z" fill="#E41D1D" />
                                            <path d="M6.86752 10.8944H6.87829C6.94523 10.8916 7.00831 10.8624 7.05382 10.8132C7.09927 10.7641 7.12347 10.6989 7.121 10.6319L6.96817 6.49713L6.96823 6.49707C6.96684 6.42935 6.93789 6.36506 6.88799 6.3192C6.83803 6.27339 6.77158 6.24997 6.70393 6.25437C6.63699 6.2572 6.57391 6.28639 6.52846 6.33557C6.48295 6.38475 6.45882 6.44994 6.46122 6.51688L6.61405 10.6517C6.61724 10.7169 6.64529 10.7784 6.69248 10.8235C6.73962 10.8686 6.80228 10.894 6.86752 10.8944L6.86752 10.8944Z" fill="#E41D1D" />
                                            <path d="M8.85384 10.8944H8.86281C8.92962 10.8959 8.99433 10.8711 9.04308 10.8254C9.09178 10.7797 9.12067 10.7166 9.1235 10.6499L9.27633 6.51507H9.27627C9.27874 6.44814 9.25454 6.38295 9.2091 6.33377C9.16359 6.28459 9.10051 6.2554 9.03357 6.25257C8.96513 6.24553 8.89687 6.26762 8.84553 6.31348C8.79418 6.35929 8.76457 6.42466 8.76391 6.49353L8.60927 10.6283H8.60933C8.6059 10.6962 8.62986 10.7626 8.67585 10.8126C8.72177 10.8626 8.78594 10.8921 8.85384 10.8944L8.85384 10.8944Z" fill="#E41D1D" />
                                        </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <button onClick={handleUpload} className="upload-button" disabled={files.length === 0 || error}>Submit</button>
                    {showResult ? <div className='result'> Your personality type is {userResult}</div> : ""}
                </div>
            </div>

        </div>

    );
}

export default PredictionPage;
