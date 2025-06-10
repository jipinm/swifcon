import React from 'react';
import styles from './MaskedText.module.css';

interface MaskedTextProps {
  number?: string;
  className?: string;
}

const MaskedText: React.FC<MaskedTextProps> = ({ 
  number = "15", 
  className = '' 
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <span className={styles.maskedText}>{number}</span>
    </div>
  );
};

export default MaskedText;
