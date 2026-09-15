type Size = "sm" | "md" | "lg";

interface LoaderProps {
  size?: Size;
  className?: string;
  center?: boolean;
  "aria-label"?: string;
}

export function Loader({ size = "md", className = "", center = false, "aria-label": ariaLabel = "Cargando" }: LoaderProps) {
  const sizeClasses: Record<Size, string> = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-24 h-24",
  };

  return (
    <div className={center ? "flex items-center justify-center" : ""} role="status" aria-label={ariaLabel}>
      <svg
        className={`${sizeClasses[size]} animate-spin ${className}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: "var(--color-primary)" }}
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
        <path
          d="M22 12a10 10 0 00-10-10v4a6 6 0 016 6h4z"
          fill="currentColor"
          className="opacity-80"
        />
      </svg>
    </div>
  );
}

export default Loader;