import React from "react";
import { FaHeart, FaStar, FaShare } from 'react-icons/fa';

const RentalModal = ({ rental, onClose, currentImageIndex, nextImage, prevImage, toggleSave, handleRating, toggleCompare, openShareModal }) => {
  if (!rental) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{rental.title}</h2>

        <div className="modal-carousel">
          <button onClick={prevImage} className="carousel-btn">&#10094;</button>
          {rental.images && rental.images.length > 0 && (
            <img src={rental.images[currentImageIndex]} alt={rental.title} className="carousel-img" />
          )}
          <button onClick={nextImage} className="carousel-btn">&#10095;</button>
        </div>

        <p>{rental.description}</p>
        <p><strong>Manzil:</strong> {rental.city}</p>
        <p><strong>Xonalar soni:</strong> {rental.beds}</p>
        <p><strong>Narxi:</strong> {rental.price}{rental.currency}</p>

        <div className="rental-actions">
           <button
            className={`action-btn ${rental.isSaved ? 'active' : ''}`}
            onClick={() => toggleSave(rental.id)}
          >
            <FaHeart /> {rental.isSaved ? 'Saqlangan' : 'Saqlash'}
          </button>
           <button
            className="action-btn"
            onClick={() => toggleCompare(rental)}
          >
            Solishtirish
          </button>
           <button
            className="action-btn"
             onClick={() => openShareModal(rental.id)}
          >
            <FaShare /> Ulashish
          </button>
        </div>
        <div className="rating-buttons">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              className={`rating-btn ${star <= rental.rating ? 'active' : ''}`}
              onClick={() => handleRating(rental.id, star)}
            >
              <FaStar />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RentalModal; 