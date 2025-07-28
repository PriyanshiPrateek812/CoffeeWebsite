import React, { useEffect, useRef, useState } from "react";

function FinalStep({ step }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImg, setCapturedImg] = useState(null);
  const [streamActive, setStreamActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Start camera when component mounts
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setStreamActive(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        setErrorMsg("Could not access camera. Please check permissions.");
        console.error("Camera error:", err);
      });

    // Stop camera stream when unmounted
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleClickPhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    setCapturedImg(dataUrl);
  };

  const handleRetake = () => {
    setCapturedImg(null);
  };

  return (
    <div className="card final-card">
      <h1>Smile & sip, let's take a selfie!</h1>

      {errorMsg ? (
        <p style={{ color: "red" }}>{errorMsg}</p>
      ) : (
        <div className="camera-section">
          {!capturedImg ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                muted
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  border: "2px solid #744030",
                }}
              />
              <button className="btn" onClick={handleClickPhoto}>
                📷 Click Photo
              </button>
            </>
          ) : (
            <>
              <img
                src={capturedImg}
                alt="Captured"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  border: "2px solid #744030",
                }}
              />
              <div style={{ marginTop: "12px" }}>
                <a href={capturedImg} download="coffee-moment.png">
                  <button className="btn">⬇️ Download Image</button>
                </a>
                <button
                  className="btn"
                  onClick={handleRetake}
                  style={{ marginLeft: "10px" }}
                >
                  🔁 Retake Photo
                </button>
              </div>
            </>
          )}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}
    </div>
  );
}

export default FinalStep;
