import "./BlobButton.css";

type BlobButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const BlobButton = ({
  children,
  onClick,
  type = "button",
  className = "",
}: BlobButtonProps) => {
  return (
    <button
      className={`blob-button ${className}`}
      onClick={onClick}
      type={type}
    >
      <span className="blob1"></span>
      <span className="inner">{children}</span>
    </button>
  );
};

export default BlobButton;