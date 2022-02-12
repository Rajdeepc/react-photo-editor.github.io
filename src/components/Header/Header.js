import React from "react";

export default function Header({ preview }) {
  return (
    <header className="flex-header">
      <div>
        <span className="logo">Literoom - A Simple Photo Editor</span>
      </div>{" "}
      <div>
        {/* <a
          disabled={!preview}
          className={`download ${!preview ? 'disabled' : ''}`}
          href={preview}
          role="button"
          tabIndex={0}
          download="filename.jpg"
        >
          Download
        </a> */}
      </div>
    </header>
  );
}
