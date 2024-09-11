import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import electrician from "../assets/electrician.svg";

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/register');
    };
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Split Hero Section */}
            <section className="bg-gray-50 flex-1 flex items-center justify-center">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between max-w-7xl">
                    {/* Text Section */}
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            Find Skilled Hands Near You
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Easily connect with trusted professionals for your home and business needs.
                        </p>
                        <button onClick={handleGetStarted} className="bg-blue-600 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-300">
                            Get Started
                        </button>
                    </div>

                    {/* Image Section */}
                    <div className="md:w-1/2 mt-8 md:mt-0">
                        <img
                            src={electrician}
                            alt="Find Skilled Professionals"
                            className="w-full h-full object-contain rounded-lg"
                            style={{ maxHeight: '400px' }} // Restrict image height
                        />
                    </div>
                </div>
            </section>

            {/* Simple CTA Section */}
            <section className="bg-blue-600 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-8 px-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Connect?</h2>
                    <p className="text-lg mb-4">
                        Join the platform today to find the help you need or offer your professional services.
                    </p>
                    <button onClick={handleGetStarted} className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300">
                        Join Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
