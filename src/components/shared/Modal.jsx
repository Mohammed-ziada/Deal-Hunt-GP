import { motion } from "framer-motion";
import PropTypes from "prop-types";
// import { Navigate } from "react-router-dom";

const Modal = ({ modalContent, modalVisible, setModalVisible, onOk }) => {
  return (
    modalVisible && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p>{modalContent}</p>
          <div className="mt-4 space-x-4">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              onClick={() => setModalVisible(false)} // Close modal
            >
              Close
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
              onClick={onOk} // Trigger onOk function
            >
              OK
            </button>
          </div>
        </motion.div>
      </div>
    )
  );
};

Modal.propTypes = {
  modalContent: PropTypes.string.isRequired, // Content must be a string
  modalVisible: PropTypes.bool.isRequired, // Visibility should be a boolean
  setModalVisible: PropTypes.func.isRequired, // Function to control visibility
  onOk: PropTypes.func, // Function to handle the "OK" action
};

export default Modal;
