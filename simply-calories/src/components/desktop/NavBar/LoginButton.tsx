type LogInButtonProps = {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  className?: string;
};

export const LogInButton: React.FC<LogInButtonProps> = ({
  text,
  onClick,
  type = "button",
  className,
}) => {
  return (
    <li className={`list-none ${className}`}>
      <button
        type={type}
        onClick={onClick}
        className="flex justify-center items-center px-4 py-1 mr-4 h-8 text-md rounded-md text-white bg-green-700 hover:bg-green-600 cursor-pointer"
      >
        {text}
      </button>
    </li>
  );
};
