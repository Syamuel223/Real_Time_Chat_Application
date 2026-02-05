import React from "react";

export default function Message({ message }) {
  const { content, fileUrl } = message;

  // check if file is image
  const isImage =
    fileUrl &&
    /\.(png|jpe?g|gif|webp)$/i.test(fileUrl);

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "10px 14px",
        borderRadius: "12px",
        marginBottom: "10px",
        maxWidth: "60%",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }}
    >
      {/* Text message */}
      {content && content.trim() !== "" && (
        <p style={{ margin: "0 0 6px 0" }}>{content}</p>
      )}

      {/* Image preview */}
      {isImage && (
        <img
          src={`http://localhost:5000${fileUrl}`}
          alt="uploaded"
          style={{
            maxWidth: "100%",
            borderRadius: "8px",
            marginTop: "5px"
          }}
        />
      )}

      {/* Non-image file */}
      {!isImage && fileUrl && (
        <a
          href={`http://localhost:5000${fileUrl}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#2563eb", fontWeight: "500" }}
        >
          📎 Download File
        </a>
      )}
    </div>
  );
}
