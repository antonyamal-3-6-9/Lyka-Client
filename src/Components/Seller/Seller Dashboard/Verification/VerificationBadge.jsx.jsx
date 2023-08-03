import React from 'react';
import './verificationBadge.css'; 

const VerificationBadge = (props) => {
  return (
    <div className="verification-badge">
      <span className="verification-badge-text">{props.verify} Verified</span>
    </div>
  );
};

export default VerificationBadge;
