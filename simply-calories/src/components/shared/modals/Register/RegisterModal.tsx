interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg ">
        <h2 className="text-lg font-bold">Register</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RegisterModal;
