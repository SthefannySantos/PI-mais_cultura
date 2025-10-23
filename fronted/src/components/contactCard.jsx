'use client'
export default function ContactCard({ href, iconClass, label, value, external }) {
  return (
    <a
      className="text-decoration-none text-dark"
      href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2">
        <div className="d-flex align-items-center">
          <i className={`${iconClass} me-3`}></i>
          <div className="text-start">
            <small className="text-muted d-block">{label}</small>
            <span>{value}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
