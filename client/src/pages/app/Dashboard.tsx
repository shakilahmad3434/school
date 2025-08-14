import { useContext, useEffect, useState } from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    AreaChart,
    Area,
} from "recharts";
import CatchError from "../../utils/error";
import HttpInterceptor from "../../utils/HttpInterceptor";
import AuthContext from "../../context/AuthContext";

interface DashboardInterface {
    totalStudents?: number;
    totalTeachers?: number;
    totalClasses?: number;
    totalPayments?: number;
}

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState<DashboardInterface>({});
    const { session, sessionYear } = useContext(AuthContext);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const { data } = await HttpInterceptor.get(
                `/dashboard/${session.id}/${sessionYear}`
            );
            setDashboardData(data);
        } catch (err) {
            CatchError(err);
        }
    };

    const studentEnrollmentData = [
        { month: "Jan", students: 1200, teachers: 180 },
        { month: "Feb", students: 1350, teachers: 195 },
        { month: "Mar", students: 1420, teachers: 210 },
        { month: "Apr", students: 1500, teachers: 220 },
        { month: "May", students: 1580, teachers: 235 },
        { month: "Jun", students: 1650, teachers: 247 },
    ];

    const paymentData = [
        { month: "Jan", collected: 45000, pending: 8000, overdue: 2000 },
        { month: "Feb", collected: 48000, pending: 6500, overdue: 1500 },
        { month: "Mar", collected: 52000, pending: 7200, overdue: 1800 },
        { month: "Apr", collected: 49500, pending: 8800, overdue: 2200 },
        { month: "May", collected: 54000, pending: 5500, overdue: 1200 },
        { month: "Jun", collected: 56000, pending: 4800, overdue: 1000 },
    ];

    return (
        <div className="p-10">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex justify-between items-center shadow p-5 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl">
                        <div>
                            <div className="bg-white/20 backdrop-blur-sm text-white w-20 h-20 rounded-full flex justify-center items-center">
                                <i className="ri-graduation-cap-line text-4xl"></i>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-md text-white">
                                Total Students
                            </h2>
                            <h2 className="font-poppins text-3xl font-bold text-gray-100">
                                {dashboardData.totalStudents?.toLocaleString(
                                    "en-IN"
                                ) || "0"}
                            </h2>
                        </div>
                    </div>

                    <div className="flex justify-between items-center shadow p-5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl">
                        <div>
                            <div className="bg-white/20 backdrop-blur-sm text-white w-20 h-20 rounded-full flex justify-center items-center">
                                <i className="ri-user-star-line text-4xl"></i>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-md text-white">
                                Total Teachers
                            </h2>
                            <h2 className="font-poppins text-3xl font-bold text-gray-100">
                                {dashboardData.totalTeachers?.toLocaleString(
                                    "en-IN"
                                ) || "0"}
                            </h2>
                        </div>
                    </div>

                    <div className="flex justify-between items-center shadow p-5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl">
                        <div>
                            <div className="bg-white/20 backdrop-blur-sm text-white w-20 h-20 rounded-full flex justify-center items-center">
                                <i className="ri-building-line text-4xl"></i>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-md text-white">
                                Total Classes
                            </h2>
                            <h2 className="font-poppins text-3xl font-bold text-gray-100">
                                {dashboardData.totalClasses?.toLocaleString(
                                    "en-IN"
                                ) || "0"}
                            </h2>
                        </div>
                    </div>

                    <div className="flex justify-between items-center shadow p-5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl">
                        <div>
                            <div className="bg-white/20 backdrop-blur-sm text-white w-20 h-20 rounded-full flex justify-center items-center">
                                <i className="ri-wallet-2-line text-4xl"></i>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-md text-white">
                                Total Payment
                            </h2>
                            <h2 className="font-poppins text-2xl font-bold text-gray-100">
                                ₹{" "}
                                {dashboardData.totalPayments?.toLocaleString(
                                    "en-IN"
                                ) || "0"}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-10">
                    <div className="bg-white/60 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-5">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-slate-800">
                                Enrollment Trends
                            </h3>
                            <div className="flex space-x-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm text-slate-600">
                                        Students
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <span className="text-sm text-slate-600">
                                        Teachers
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={studentEnrollmentData}>
                                <defs>
                                    <linearGradient
                                        id="colorStudents"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#3B82F6"
                                            stopOpacity={0.3}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#3B82F6"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                    <linearGradient
                                        id="colorTeachers"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#8B5CF6"
                                            stopOpacity={0.3}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#8B5CF6"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#E2E8F0"
                                />
                                <XAxis dataKey="month" stroke="#64748B" />
                                <YAxis stroke="#64748B" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.9)",
                                        backdropFilter: "blur(10px)",
                                        border: "none",
                                        borderRadius: "12px",
                                        boxShadow:
                                            "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="students"
                                    stroke="#3B82F6"
                                    fillOpacity={1}
                                    fill="url(#colorStudents)"
                                    strokeWidth={3}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="teachers"
                                    stroke="#8B5CF6"
                                    fillOpacity={1}
                                    fill="url(#colorTeachers)"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white/60 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-5">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-slate-800">
                                Payment Status
                            </h3>
                            <div className="flex space-x-3">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-slate-600">
                                        Collected
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <span className="text-sm text-slate-600">
                                        Pending
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-sm text-slate-600">
                                        Overdue
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={paymentData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#E2E8F0"
                                />
                                <XAxis dataKey="month" stroke="#64748B" />
                                <YAxis stroke="#64748B" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.9)",
                                        backdropFilter: "blur(10px)",
                                        border: "none",
                                        borderRadius: "12px",
                                        boxShadow:
                                            "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                                    }}
                                    formatter={(value) => [
                                        `${value.toLocaleString()}`,
                                        "",
                                    ]}
                                />
                                <Bar
                                    dataKey="collected"
                                    fill="#10B981"
                                    radius={[4, 4, 0, 0]}
                                />
                                <Bar
                                    dataKey="pending"
                                    fill="#F59E0B"
                                    radius={[4, 4, 0, 0]}
                                />
                                <Bar
                                    dataKey="overdue"
                                    fill="#EF4444"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="mt-4 grid grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-green-50 rounded-xl">
                                <p className="text-sm text-green-600 font-medium">
                                    Total Collected
                                </p>
                                <p className="text-xl font-bold text-green-700">
                                    $304,500
                                </p>
                            </div>
                            <div className="text-center p-3 bg-yellow-50 rounded-xl">
                                <p className="text-sm text-yellow-600 font-medium">
                                    Pending
                                </p>
                                <p className="text-xl font-bold text-yellow-700">
                                    $40,800
                                </p>
                            </div>
                            <div className="text-center p-3 bg-red-50 rounded-xl">
                                <p className="text-sm text-red-600 font-medium">
                                    Overdue
                                </p>
                                <p className="text-xl font-bold text-red-700">
                                    $9,700
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
