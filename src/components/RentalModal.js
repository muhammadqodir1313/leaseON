import React from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaHeart, FaShare, FaStar } from 'react-icons/fa';

function RentalModal({ rental, onClose, currentImageIndex, nextImage, prevImage, toggleSave, handleRating, toggleCompare, openShareModal, t }) {
  if (!rental) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        
        <div className="modal-carousel">
          <button className="carousel-btn" onClick={prevImage}><FaChevronLeft /></button>
          {rental.images && rental.images.length > 0 && (
            <img
              src={rental.images[currentImageIndex]}
              alt={rental.title}
              className="carousel-img"
            />
          )}
          <button className="carousel-btn" onClick={nextImage}><FaChevronRight /></button>
        </div>
        
        <div style={{ textAlign: 'center', margin: '8px 0', color: '#888', fontSize: '1rem' }}>
          {rental.images ? `${currentImageIndex + 1} / ${rental.images.length}` : t.noImages}
        </div>

        <h2>{rental.title}</h2>
        <p>{rental.description}</p>
        <div style={{ color: '#2563eb', fontWeight: 600 }}>{rental.price}{rental.currency}</div>
        <div style={{ marginTop: 8 }}>{rental.city} — {rental.beds}</div>

        <div className="rental-actions" style={{ marginTop: '20px' }}>
           <button
              className={`action-btn ${rental.isSaved ? 'active' : ''}`}
              onClick={() => toggleSave(rental.id)}
            >
              <FaHeart /> {rental.isSaved ? t.savedButton : t.saveButton}
            </button>
             <button
              className="action-btn"
              onClick={() => toggleCompare(rental)}
            >
              {t.compare}
            </button>
             <button
              className="action-btn"
               onClick={() => openShareModal(rental.id)}
            >
              <FaShare /> {t.share}
            </button>
        </div>
         <div className="rating-buttons" style={{ marginTop: '12px' }}>
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
}

export default RentalModal; 