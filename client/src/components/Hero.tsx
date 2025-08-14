import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Streamline Your
                            <span className="text-blue-600">
                                {" "}
                                School Management
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Empower your educational institution with our
                            comprehensive management system. Handle admissions,
                            grades, attendance, and communication all in one
                            powerful platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to='/login' className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-lg flex items-center justify-center group">
                                Start Free Trial
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 font-semibold text-lg">
                                Watch Demo
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300 group">
                            <img
                                src="/school-management.jpg"
                                alt="school-management pic"
                                className="transition-all duration-300 group-hover:brightness-75"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
