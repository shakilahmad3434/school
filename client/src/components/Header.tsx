import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-500">
                            <img
                                src="/logo.png"
                                alt="logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-3xl font-bold mt-2 bg-gradient-to-r from-black to-lime-500 bg-clip-text text-transparent mb-2 font-work-sans uppercase">
                            EduDash
                        </h2>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a
                            href="#features"
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                        >
                            Features
                        </a>
                        <a
                            href="#benefits"
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                        >
                            Benefits
                        </a>
                        <a
                            href="#testimonials"
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                        >
                            Testimonials
                        </a>
                        <a
                            href="#pricing"
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                        >
                            Pricing
                        </a>
                        <a
                            href="#contact"
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                        >
                            Contact
                        </a>
                    </nav>

                    {/* CTA Button & Mobile Menu */}
                    <div className="flex items-center">
                        <button className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                            Get Demo
                        </button>

                        {/* Mobile menu button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200">
                        <nav className="py-2 space-y-2">
                            <a
                                href="#features"
                                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Features
                            </a>
                            <a
                                href="#benefits"
                                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Benefits
                            </a>
                            <a
                                href="#testimonials"
                                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Testimonials
                            </a>
                            <a
                                href="#pricing"
                                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Pricing
                            </a>
                            <a
                                href="#contact"
                                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                            >
                                Contact
                            </a>
                            <div className="px-4 py-2">
                                <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                                    Get Demo
                                </button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
