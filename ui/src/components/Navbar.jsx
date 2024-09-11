import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo Section */}
                <Link to="/" className="flex items-center">
                    <span className="ml-2 text-2xl font-bold">CraftSpot</span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/services" className="hover:underline">Services</Link>
                    <Link to="/about" className="hover:underline">About Us</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden flex items-center px-2 py-1 border border-white rounded-lg hover:bg-blue-700 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                {/* Mobile Menu (Hidden on Desktop) */}
                <div className="md:hidden absolute top-16 left-0 w-full bg-blue-600 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                    <div className="flex flex-col items-center py-4">
                        <Link to="/" className="py-2 hover:bg-blue-700 w-full text-center">Home</Link>
                        <Link to="/services" className="py-2 hover:bg-blue-700 w-full text-center">Services</Link>
                        <Link to="/about" className="py-2 hover:bg-blue-700 w-full text-center">About Us</Link>
                        <Link to="/contact" className="py-2 hover:bg-blue-700 w-full text-center">Contact</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
