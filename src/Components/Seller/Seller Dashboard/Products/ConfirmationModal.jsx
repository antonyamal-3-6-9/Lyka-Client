import React, { useState } from 'react';
import Modal from 'react-modal';

const customModalStyles = {
  content: {
    width: '400px',
    margin: 'auto',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    padding: '20px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customModalStyles}>
      <h2 style={{ marginBottom: '10px' }}>Confirm Deletion</h2>
      <p style={{ marginBottom: '20px' }}>Are you sure you want to delete this product?</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ marginRight: '10px' }} onClick={onConfirm}>
          Delete
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
}
 export default ConfirmationModal