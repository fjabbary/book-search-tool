import React from 'react';
import { GiBookCover } from "react-icons/gi";

function Header() {
    return (
        <div className="top-header">
            <h1 className="heading">Book Search Tool </h1>
            <div><GiBookCover className="book-icon" /></div>
        </div>
    )
}

export default Header
