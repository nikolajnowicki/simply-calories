type LogInButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
};

export const LogInButton = ({ text, onClick, className }: LogInButtonProps) => {
  return (
    <li className={`list-none ${className}`}>
      <div
        onClick={onClick}
        className="flex justify-center items-center px-4 py-1 mr-4 h-8 text-md text-white rounded-md bg-green-700 hover:bg-green-600 cursor-pointer"
      >
        {text}
      </div>
    </li>
  );
};
