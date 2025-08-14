import { useContext, useEffect, useState } from "react";
import Drawer from "../../../components/common/Drawer";
import Form, { type FormDataType } from "../../../components/common/Form";
import Input from "../../../components/common/Input";
import Label from "../../../components/common/Label";
import Select from "../../../components/common/Select";
import StatusBadge from "../../../components/common/StatusBadge";
import AuthContext from "../../../context/AuthContext";
import HttpInterceptor from "../../../utils/HttpInterceptor";
import { toast } from "react-toastify";
import CatchError from "../../../utils/error";
import moment from "moment";
import Modal from "../../../components/common/Modal";

interface FormDataInterface {
    _id?: string;
    studentName?: string;
    amount?: number;
    feeType?: string;
    date?: string;
    status?: string;
}

interface PaymentItemInterface {
    _id: string;
    paymentId: string;
    studentName: string;
    title: string;
    amount: number;
    feeType: string;
    date: string;
    status: string;
    createdAt: string;
}

interface StudentInterface {
    _id: string;
    studentName: string;
    studentPhoto: string;
    class: string;
    section: string;
    rollNumber: string;
    fatherName: string;
    mobile: string;
}

const Payments = () => {
    const [close, setClose] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [modalClose, setModalClose] = useState(false)
    const { session, sessionYear } = useContext(AuthContext);
    const [paymentData, setPaymentData] = useState<PaymentItemInterface[]>([]);
    const [formData, setFormData] = useState<FormDataInterface>({});
    const [studentsData, setStudentsData] = useState<StudentInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [monthFilter, setMonthFilter] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.id && sessionYear) {
            fetchPayments();
        }
    }, [session?.id, sessionYear]);

    useEffect(() => {
        if (session?.id && sessionYear) {
            fetchAllStudents();
        }
    }, [session?.id, sessionYear]);

    // Fetch all students
    const fetchAllStudents = async () => {
        if (!session?.id || !sessionYear) return;
        
        try {
            setLoading(true);
            const { data } = await HttpInterceptor.get(`/student/${session.id}/${sessionYear}`);
            setStudentsData(data);

            if(data.length === 0)
                setModalClose(true)
        } catch (err) {
            CatchError(err);
        } finally {
            setLoading(false);
        }
    };

    // Create or update payment record
    const handlePayment = async (values: FormDataType) => {
        const payload = {
            ...values,
            school: session.id,
        };

        try {
            setLoading(true);
            let response;
            if (editMode && formData._id) {
                response = await HttpInterceptor.put(
                    `/payment/${formData._id}`,
                    payload
                );
            } else {
                response = await HttpInterceptor.post("/payment", payload);
            }
            toast.success(response.data.message);
            setClose(false);
            fetchPayments();
            resetForm();
        } catch (err) {
            CatchError(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch payments
    const fetchPayments = async () => {
        if (!session?.id || !sessionYear) return;
        
        try {
            setLoading(true);
            const { data } = await HttpInterceptor.get(
                `/payment/${session.id}/${sessionYear}`
            );
            setPaymentData(data);
        } catch (err) {
            CatchError(err);
        } finally {
            setLoading(false);
        }
    };

    // Update payment record
    const handleUpdatePayment = async (paymentId: string) => {
        const payment = paymentData.find((p) => p._id === paymentId);
        if (payment) {
            const paymentDate = moment(payment.date).isValid() 
                ? moment(payment.date).format("YYYY-MM-DD") 
                : "";
                
            setFormData({
                _id: payment._id,
                studentName: payment.studentName,
                amount: payment.amount,
                feeType: payment.feeType,
                date: paymentDate,
                status: payment.status,
            });
            setClose(true);
            setEditMode(true);
        }
    };

    // Delete payment record
    const handleDeletePayment = async (paymentId: string) => {
        if (!window.confirm("Are you sure you want to delete this payment record?")) {
            return;
        }

        try {
            setLoading(true);
            const { data } = await HttpInterceptor.delete(`/payment/${paymentId}`);
            toast.success(data.message);
            fetchPayments();
        } catch (err) {
            CatchError(err);
        } finally {
            setLoading(false);
        }
    };

    // Reset form data
    const resetForm = () => {
        setFormData({});
    };

    // Handle drawer close
    const handleCloseDrawer = () => {
        setClose(false);
        resetForm();
        setEditMode(false);
    };

    // Get student data by ID
    const getStudentById = (studentId: string): StudentInterface | undefined => {
        return studentsData.find(student => student._id === studentId);
    };

    // Filter payments based on search and date filters
    const filteredPayments = paymentData.filter(payment => {
        const matchesSearch = searchTerm === "" || 
            payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.studentName.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesDate = dateFilter === "" || 
            moment(payment.date).format("YYYY-MM-DD") === dateFilter;
        
        const matchesMonth = monthFilter === "" || 
            moment(payment.date).format("YYYY-MM") === monthFilter;
        
        return matchesSearch && matchesDate && matchesMonth;
    });

    // Export functionality
    const handleExport = (format: string) => {
        console.log(`Exporting as ${format}`);
        toast.info(`Export as ${format.toUpperCase()} - Feature coming soon!`);
    };

    if (loading && paymentData.length === 0) {
        return (
            <div className="p-5 flex justify-center items-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading payments...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-5 flex justify-center overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="relative w-full h-full bg-white shadow rounded-2xl p-5">
                <header className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                        <h2 className="text-2xl font-work-sans font-semibold">
                            All Payments Data
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">
                            Total Records: {filteredPayments.length}
                        </p>
                    </div>
                    <div className="flex items-center gap-5 flex-wrap">
                        <Input
                            type="search"
                            name="search"
                            placeholder="Search payment by ID or student"
                            className="w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Select
                            name="subject-export"
                            id="subject-export"
                            className="w-32"
                            onChange={(e) => {
                                if (e.target.value !== "export") {
                                    handleExport(e.target.value);
                                    e.target.value = "export";
                                }
                            }}
                        >
                            <option value="export">Export</option>
                            <option value="pdf">PDF</option>
                            <option value="xls">XLS</option>
                        </Select>
                        <button
                            onClick={() => setClose(true)}
                            disabled={loading}
                            className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white hover:scale-103 transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <i className="ri-money-rupee-circle-line"></i>
                            <span>Add payment</span>
                        </button>
                    </div>
                </header>
                <div className="border-b border-gray-200 mt-4 -ml-5 -mr-5" />

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mt-4">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="font-medium">Filter by date:</h1>
                            <input 
                                type="date"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="py-2 px-3 rounded border border-gray-200 w-[300px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <h1 className="font-medium">Filter by month:</h1>
                            <input 
                                type="month"
                                value={monthFilter}
                                onChange={(e) => setMonthFilter(e.target.value)}
                                className="py-2 px-3 rounded border border-gray-200 w-[300px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setDateFilter("");
                                setMonthFilter("");
                            }}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition duration-300"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                <div className="py-10">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <i className="ri-id-card-line text-blue-500"></i>
                                            ID
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <i className="ri-user-line text-pink-500"></i>
                                            Student
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <i className="ri-user-3-line text-green-500"></i>
                                            Parent Contact
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <i className="ri-money-rupee-circle-line text-purple-500"></i>
                                            Amount & Type
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <i className="ri-stack-line text-gray-500"></i>
                                            Status
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <i className="ri-calendar-2-line text-purple-500"></i>
                                            Date
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <div className="flex items-center justify-center gap-2">
                                            <i className="ri-settings-2-line text-gray-500"></i>
                                            Actions
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredPayments.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center">
                                                <i className="ri-inbox-line text-4xl mb-4"></i>
                                                <p className="text-lg font-medium">No payments found</p>
                                                <p className="text-sm">Try adjusting your search or filters</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPayments.map((payment: PaymentItemInterface) => {
                                        const student = getStudentById(payment.studentName);
                                        return (
                                            <tr 
                                                key={payment._id} 
                                                className="hover:bg-[#f8fafc] hover:transform hover:translate-x-1 hover:transition hover:duration-300"
                                            >
                                                <td className="py-2 px-6 font-medium text-blue-600">
                                                    {payment.paymentId}
                                                </td>
                                                <td className="py-2 px-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-indigo-500 flex-shrink-0">
                                                            <img 
                                                                src={student?.studentPhoto || "https://res.cloudinary.com/dqxwawaiz/image/upload/v1745391977/avt_uhehme.png"}
                                                                alt="student photo" 
                                                                className="w-full h-full object-cover" 
                                                                onError={(e) => {
                                                                    e.currentTarget.src = "https://res.cloudinary.com/dqxwawaiz/image/upload/v1745391977/avt_uhehme.png";
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h2 className="text-md font-semibold capitalize">
                                                                {student?.studentName || "Unknown Student"}
                                                            </h2>
                                                            {student && (
                                                                <p className="text-gray-500 text-xs">
                                                                    Class: {student.class}({student.section}) (R-{student.rollNumber})
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 capitalize">
                                                        {student?.fatherName || "N/A"}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                                        <i className="ri-phone-line w-3 h-3"></i>
                                                        +91 {student?.mobile || "N/A"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">
                                                        ₹ {payment.amount.toLocaleString("en-IN")}
                                                    </div>
                                                    <div className="text-sm text-gray-500 capitalize">
                                                        {payment.feeType}
                                                    </div>
                                                </td>
                                                <td className="py-2 px-6">
                                                    <StatusBadge status={payment.status} />
                                                </td>
                                                <td className="py-2 px-6 text-gray-600">
                                                    <div className="flex flex-col">
                                                        <span>{moment(payment.date).format('ll')}</span>
                                                        <span className="text-xs text-gray-400">
                                                            {moment(payment.createdAt).format('LT')}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleUpdatePayment(payment._id)}
                                                            disabled={loading}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 px-3 rounded-lg transition duration-300 hover:shadow-xl hover:transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            title="Edit"
                                                        >
                                                            <i className="ri-edit-2-fill text-sm"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeletePayment(payment._id)}
                                                            disabled={loading}
                                                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg transition duration-300 hover:shadow-xl hover:transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            title="Delete"
                                                        >
                                                            <i className="ri-delete-bin-7-line text-sm"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Drawer
                title={editMode ? "Update Payment record" : "Add a new payment"}
                onClose={close}
                setClose={handleCloseDrawer}
            >
                <Form onValue={handlePayment}>
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="studentName" required>
                                Student's Name
                            </Label>
                            <Select
                                id="studentName"
                                name="studentName"
                                value={formData.studentName || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        studentName: e.target.value,
                                    }))
                                }
                                required
                            >
                                <option value="">Select Student</option>
                                {studentsData.map((student: StudentInterface) => (
                                    <option key={student._id} value={student._id}>
                                        {student.studentName} - Class {student.class}({student.section})
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label htmlFor="amount" required>
                                Payment Amount
                            </Label>
                            <Input
                                type="number"
                                name="amount"
                                placeholder="Enter amount"
                                id="amount"
                                min="0"
                                step="0.01"
                                value={formData.amount || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        amount: Number(e.target.value),
                                    }))
                                }
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="feeType" required>
                                Fee Type
                            </Label>
                            <Select
                                id="feeType"
                                name="feeType"
                                value={formData.feeType || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        feeType: e.target.value,
                                    }))
                                }
                                required
                            >
                                <option value="">Select fee type</option>
                                <option value="tuition">Tuition Fee</option>
                                <option value="transport">Transport Fee</option>
                                <option value="annual">Annual Fee</option>
                                <option value="exam">Exam Fee</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label htmlFor="date" required>
                                Payment Date
                            </Label>
                            <Input
                                type="date"
                                name="date"
                                id="date"
                                max={editMode ? undefined : moment().format("YYYY-MM-DD")}
                                value={formData.date || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        date: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <Label htmlFor="status" required>
                            Status
                        </Label>
                        <Select
                            id="status"
                            name="status"
                            value={formData.status || ""}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    status: e.target.value,
                                }))
                            }
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="paid">Paid</option>
                            <option value="due">Due</option>
                            <option value="pending">Pending</option>
                        </Select>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white hover:scale-103 transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <i className="ri-arrow-right-line"></i>
                        <span>{editMode ? "Update payment" : "Add new payment"}</span>
                        {loading && <i className="ri-loader-4-line animate-spin"></i>}
                    </button>
                </Form>
            </Drawer>

            <Modal modalClose={modalClose} setModalClose={setModalClose} description="No Student has been found. Please add at least one Student before to access this feature." buttonText="Ok, Add student" link="/app/students" />
        </div>
    );
};

export default Payments;