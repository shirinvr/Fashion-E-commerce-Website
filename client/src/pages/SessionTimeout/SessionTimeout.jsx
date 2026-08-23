import { useEffect, useState } from "react";

const SessionTimeout = ({
  timeout = 15 * 60 * 1000, // 15 minutes
  onTimeout,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let timer;

    const handleTimeout = () => {
      setShowPopup(true);

      // Stop further timeout processing
      clearTimeout(timer);
    };

    const resetTimer = () => {
      if (showPopup) return;

      clearTimeout(timer);
      timer = setTimeout(handleTimeout, timeout);
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timer);

      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [timeout, showPopup]);

  const handleOk = () => {
    setShowPopup(false);

    if (onTimeout) {
      onTimeout();
    }
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2>Session Timeout</h2>

        <p>Your session has timed out.</p>
        <p>Please login again to continue.</p>

        <button onClick={handleOk} style={styles.button}>
          OK
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  popup: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "400px",
    maxWidth: "90%",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  },

  button: {
    marginTop: "20px",
    padding: "10px 30px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default SessionTimeout;
