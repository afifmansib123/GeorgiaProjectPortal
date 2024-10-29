// components/TaskModal.js
import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement(typeof document !== 'undefined' ? document.body : null); // Avoid SSR issues

export default function TaskModal({ isOpen, onRequestClose, addEvent, newEvent, handleInputChange }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add New Event"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Add Task</h2>
      <form>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <label>Description</label>
        <textarea
          name="desc"
          value={newEvent.desc}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <label>Color</label>
        <input
          type="color"
          name="color"
          value={newEvent.color}
          onChange={handleInputChange}
          className="w-full p-2 mb-4"
        />
        <button type="button" onClick={addEvent} className="px-4 py-2 bg-blue-500 text-white rounded">Add Task</button>
        <button type="button" onClick={onRequestClose} className="px-4 py-2 bg-gray-300 ml-2 rounded">Cancel</button>
      </form>
    </Modal>
  );
}
