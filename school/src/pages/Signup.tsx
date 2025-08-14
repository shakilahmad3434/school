import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import type { FormDataType } from "../components/common/Form";
import Form from "../components/common/Form";
import { toast } from "react-toastify";
import HttpInterceptor from "../utils/HttpInterceptor";
import CatchError from "../utils/error";

const Signup = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignup = async (values: FormDataType) => {
        try {
            setLoading(true);
            const { data } = await HttpInterceptor.post("/auth/signup", values);
            toast.success(data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            CatchError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 relative min-h-screen flex justify-center items-center px-2 py-5 md:px-10 md:py-10 overflow-hidden font-poppins">
            <div className="absolute inset-0">
                <div className="absolute inset-0">
                    <img src="/bg.webp" alt="bg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
                </div>
            </div>
            <div className="max-w-lg w-full space-y-5 rounded-xl shadow-xl p-5 bg-white/5 backdrop-blur-md border border-white/20 text-white animate__animated animate__slideInDown animate__faster">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-500">
                        <img
                        src="/logo.png"
                        alt="logo"
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <h2 className="text-4xl font-bold mt-2 bg-gradient-to-r from-white to-lime-500 bg-clip-text text-transparent mb-2 font-work-sans uppercase">EduDash</h2>
                </div>
                <Form onValue={handleSignup}>
                    <div className="relative mb-3">
                        <i className="ri-school-line absolute top-2.5 left-1.5 text-gray-400"></i>
                        <Input
                            type="text"
                            placeholder="School name"
                            name="schoolName"
                            required
                            className="pl-7 py-3 bg-white/20 border border-white/30"
                        />
                    </div>
                    <div className="relative mb-3">
                        <i className="ri-user-line absolute top-2.5 left-1.5 text-gray-400"></i>
                        <Input
                            type="text"
                            placeholder="Director / Principal name"
                            name="directorName"
                            required
                            className="pl-7 py-3 bg-white/20 border border-white/30"
                        />
                    </div>
                    <div className="relative mb-3">
                        <i className="ri-mail-line absolute top-2.5 left-1.5 text-gray-400"></i>
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            required
                            className="pl-7 py-3 bg-white/20 border border-white/30"
                        />
                    </div>
                    <div className="relative mb-3">
                        <i className="ri-smartphone-line absolute top-2.5 left-1.5 text-gray-400"></i>
                        <Input
                            type="number"
                            placeholder="Mobile"
                            name="mobile"
                            required
                            className="pl-7 py-3 bg-white/20 border border-white/30"
                        />
                    </div>
                    <div className="relative mb-3">
                        <i className="ri-lock-line absolute top-2.5 left-1.5 text-gray-400"></i>
                        <Input
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            required
                            className="pl-7 py-3 bg-white/20 border border-white/30"
                        />
                        <i
                            className={`ri-${
                                show ? "eye-off" : "eye"
                            }-line absolute top-3 right-2 text-gray-300 hover:text-gray-400`}
                            onClick={() => setShow((prev) => !prev)}
                        ></i>
                    </div>
                    <button className="bg-gradient-to-r from-[#0d00f1] to-[#01003e] hover:from-[#010173] hover:to-[#010034] rounded text-white py-2 px-5 w-full flex items-center gap-1 hover:gap-2 justify-center transition-all duration-300 cursor-pointer">
                        {loading ? (
                            <>
                                <i className="ri-loader-4-fill mt-.5 animate-spin"></i>
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <i className="ri-login-circle-line mt-.5"></i>
                                <span>Sign up</span>
                            </>
                        )}
                    </button>
                </Form>
                <p className="text-sm text-gray-200">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-lime-500 font-bold hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
