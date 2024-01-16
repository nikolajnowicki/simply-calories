type RegisterButtonProps = {
  text: string;
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
};

export const RegisterButton: React.FC<RegisterButtonProps> = ({
  text,
  onClick,
}) => {
  return (
    <li className="list-none">
      <button
        type="submit"
        onClick={onClick}
        className="flex justify-center items-center px-4 py-1 mr-4 h-8 text-md rounded-md text-white bg-slate-700 hover:bg-slate-600 cursor-pointer"
      >
        {text}
      </button>
    </li>
  );
};
