import React from 'react';
import './block.css'

const Block = ({color, id, handlePlace}) => {
  return (
    <span className="block" style={{backgroundColor: color || '#fff'}} onClick={() => {handlePlace(id)}}></span>
  );
};

export default Block;