import { useState } from "react";
import "../assets/main.css";

const Dialog = (value) => {
  const [open, setOpen] = useState(value);

  return (
    <div>
      {open && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>Simple Dialog</h3>
            <p>This is a simple dialog box.</p>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialog;
