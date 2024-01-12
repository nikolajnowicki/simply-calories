type RegisterButtonProps = {
  text: string;
  onClick: () => void;
};

export const RegisterButton = ({ text, onClick }: RegisterButtonProps) => {
  return (
    <li onClick={onClick} className="list-none">
      <div className="flex justify-center items-center px-4 py-1 mr-4 h-8 text-md rounded-md text-white bg-slate-700 hover:bg-slate-600      cursor-pointer 2">
        {text}
      </div>
    </li>
  );
};
