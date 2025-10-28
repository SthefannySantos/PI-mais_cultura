'use client'
export default function ContactCard({ href, iconClass, label, value, external }) {
  return (
    <a
      className="text-decoration-none text-dark"
      href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className="d-flex align-items-center justify-content-between p-3 rounded mb-2" style={{ 
        backgroundColor: "var(--artist-contact-bg)", 
        color: "var(--card-text)" 
      }}>
        <div className="d-flex align-items-center">
          <i className={`${iconClass} me-3`}></i>
          <div className="text-start">
            <small className="d-block" style={{ color: "var(--card-text-muted)" }}>{label}</small>
            <span>{value}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
