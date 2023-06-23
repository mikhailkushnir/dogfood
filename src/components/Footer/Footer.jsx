import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';


export const Footer = () => {

  
  return <div className='footer'>
    <Link to={'/FAQ'}><h3>FAQ</h3></Link> 
  </div>
}