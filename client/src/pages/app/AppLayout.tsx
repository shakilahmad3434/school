import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import CatchError from "../../utils/error";
import HttpInterceptor from "../../utils/HttpInterceptor";
import Label from "../../components/common/Label";
import Select from "../../components/common/Select";
import AuthContext from "../../context/AuthContext";
import fetcher from "../../utils/fetcher";
import useSWR from "swr";
import { toast } from "react-toastify";


const RefreshTokenInMS = 8*60*1000

const menus = [
        {
            label: "Dashboard",
            src: '/app/dashboard',
            icon: "dashboard-line"
        },
        {
            label: "Students",
            src: '/app/students',
            icon: "group-3-line"
        },
        {
            label: "Teachers",
            src: '/app/teachers',
            icon: "group-line"
        },
        {
            label: "Classes",
            src: '/app/classes',
            icon: "artboard-line"
        },
        {
            label: "Subjects",
            src: '/app/subjects',
            icon: "book-line"
        },
        {
            label: "Attendance",
            src: '/app/attendance',
            icon: "article-line"
        },
        {
            label: "Payments",
            src: '/app/payments',
            icon: "currency-line"
        },
        {
            label: "Expenses",
            src: '/app/expenses',
            icon: "wallet-2-line"
        },
        {
            label: "Salaries",
            src: '/app/salaries',
            icon: "bank-line"
        },
        {
            label: "Employees",
            src: '/app/employees',
            icon: "empathize-line"
        },
    ]

const AppLayout = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation()
    const [sidebar, setSidebar] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const {session, setSessionYear} = useContext(AuthContext)
    const {error} = useSWR('/auth/refresh-token', fetcher, {refreshInterval: RefreshTokenInMS, shouldRetryOnError: false})

    useEffect(() => {
        if(error)
            logout()
      }, [error])

    useEffect(() => {
        let timer = setInterval(() => {
            generateAccessToken()
        }, 8*60*1000);

        return () => clearInterval(timer)
    }, [])

    const generateAccessToken = async () => {
        try {
            const {data} = await HttpInterceptor.get("/auth/refresh-token")
            console.log(data)
        } catch (err) {
            CatchError(err)
        }
    }

    const logout = async () => {
        try {
            const {data} = await HttpInterceptor.get('/auth/logout')
            toast.success(data.message)
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        } catch (err) {
            CatchError(err)
        }
    }

    return (
        <div className="w-full h-screen flex overflow-hidden font-work-sans">
            <aside
                className={`fixed top-0 left-0 lg:relative ${sidebar ? "w-18" : "w-64"} h-full z-50 bg-white text-gray-700 transition-width duration-300`}
            >
                <nav className="w-full h-full p-4 flex flex-col shadow-md overflow-auto">
                    <div className="flex items-center justify-between mb-6 px-2">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9">
                                <img
                                src="/school.png"
                                alt="Logo"
                                className="w-full h-full object-cover"
                            />
                            </div>
                            {!sidebar && <span className="text-lg font-semibold lg:block">EduDash</span>}
                        </div>
                        <button onClick={() => setSidebar((prev) => !prev)} className="absolute -right-4 top-2 z-100 grid place-items-center cursor-pointer bg-indigo-600 w-7 h-7 border-none rounded-full">
                            <svg
                                className={`w-4 h-4 stroke-white transition-transform duration-200 rotate-0`}
                                fill="none"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28"
                                />
                            </svg>
                        </button>
                    </div>

                    <ul className="space-y-2">
                        {
                            menus.map((menu, index) => (
                                <li key={index} title={menu.label}>
                                    <Link to={menu.src} className={`flex items-center gap-3 p-2 rounded-md ${menu.src === pathname ? "bg-blue-100" : ""} hover:bg-blue-50 transition`}
                                    >
                                        <i className={`ri-${menu.icon} text-2xl`}></i>
                                        {
                                            !sidebar &&
                                            <span className="lg:inline text-lg">{menu.label}</span>
                                        }
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>

                </nav>
            </aside>
            <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex-1 transition-width duration-300">
                <header className="w-full h-16 bg-white border-b border-gray-200 shadow-sm flex justify-between items-center px-4 md:px-8">
                    <div>
                        <h2 className="text-2xl capitalize font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-gray-500">{session.schoolName}</h2>
                    </div>
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-3">
                            <Label>Session: </Label>
                            <Select onChange={(e) => setSessionYear(e.target.value)}>
                                <option value="2025-26">2025-26</option>
                                <option value="2024-25">2024-25</option>
                                <option value="2023-24">2023-24</option>
                            </Select>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="bg-gray-100 w-8 h-8 hover:text-gray-400 rounded-full cursor-pointer"><i className="ri-notification-2-line text-xl"></i></button>
                            <button className="bg-gray-100 w-8 h-8 hover:text-gray-400 rounded-full cursor-pointer"><i className="ri-mail-line text-xl"></i></button>
                        </div>
                        <div className="relative">
                            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setMenuOpen((prev) => !prev)}>
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img
                                    src="https://www.radiustheme.com/demo/html/psdboss/akkhor/akkhor/img/figure/admin.jpg"
                                    alt="logo"
                                    className="w-full h-full object-cover"
                                />
                                </div>
                                <div>
                                <h3 className="text-md font-semibold text-gray-700 -mb-1 capitalize">
                                    {session.directorName}
                                </h3>
                                <p className="text-sm text-gray-500">Admin</p>
                                </div>
                            </div>

                            {
                                menuOpen &&
                                    <div className="absolute top-13 right-0 bg-white shadow-lg rounded-md overflow-hidden w-52 z-50 transition-all duration-500">
                                        <Link
                                        to="/app/settings"
                                        className="flex items-center gap-2 px-5 py-3 hover:bg-gray-100 text-gray-700"
                                        >
                                        <i className="ri-settings-line text-lg"></i>
                                        Account Settings
                                        </Link>
                                        <button
                                        onClick={logout}
                                        className="flex items-center gap-2 px-5 py-3 hover:bg-gray-100 text-gray-700 w-full text-left"
                                        >
                                        <i className="ri-logout-circle-r-line text-lg"></i>
                                        Logout
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                </header>
                <div className="overflow-scroll h-full">
                    <Outlet />
                </div>
            </section>
        </div>
    );
};

export default AppLayout;
