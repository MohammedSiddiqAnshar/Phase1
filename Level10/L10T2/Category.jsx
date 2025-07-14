import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Category() {
  const cuisines = ['Italian', 'American', 'Thai', 'Japanese'];

  return (
    <div className="category-nav">
      {cuisines.map((type) => (
        <NavLink key={type} to={`/cuisine/${type.toLowerCase()}`}>
          {type}
        </NavLink>
      ))}
    </div>
  );
}
