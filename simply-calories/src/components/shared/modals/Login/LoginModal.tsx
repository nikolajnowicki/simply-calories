interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg ">
        <h2 className="text-lg font-bold">Login</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
