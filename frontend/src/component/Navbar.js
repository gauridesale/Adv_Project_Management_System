import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLinkClick = () => {
        setDropdownOpen(false);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-lg">
                    ProjectManager
                </div>
                <div className="flex items-center">
                    <Link to="/register" className="text-white mr-4">Register</Link>
                    <div className="relative">
                        <button
                            onClick={handleDropdownToggle}
                            className="text-white focus:outline-none"
                        >
                            Login
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                <Link to="/login/user" onClick={handleLinkClick} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">User</Link>
                                <Link to="/login/manager" onClick={handleLinkClick} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Manager</Link>
                                <Link to="/login/admin" onClick={handleLinkClick} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Admin</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
