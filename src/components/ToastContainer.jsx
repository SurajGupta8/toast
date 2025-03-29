import { useRef, useState } from "react";

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const handleClose = (id) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];

    // Add "hide" class to trigger exit animation
    const toastElement = document.getElementById(`toast-${id}`);
    if (toastElement) {
      toastElement.classList.add("hide");
    }

    // Remove from state after animation ends
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 500); // Matches the animation duration
  };

  const handleAdd = (message, type) => {
    const id = new Date().getTime();
    const newToasts = [{ id, message, type }, ...toasts];
    setToasts(newToasts);
    timersRef.current[id] = setTimeout(() => handleClose(id), 3000);
  };

  return (
    <div className="container">
      <div className="toast-container">
        {toasts.map(({ id, message, type }) => {
          return (
            <div key={id} id={`toast-${id}`} className={`toast ${type}`}>
              {`${message} Alert`}{" "}
              <span onClick={() => handleClose(id)}>x</span>
            </div>
          );
        })}
      </div>
      <div className="btn-container">
        <h1>Toast Generator!</h1>
        <button onClick={() => handleAdd("Success", "success")}>Success</button>
        <button onClick={() => handleAdd("Info", "info")}>Info</button>
        <button onClick={() => handleAdd("Warning", "warning")}>Warning</button>
        <button onClick={() => handleAdd("Error", "error")}>Error</button>
      </div>
    </div>
  );
}
