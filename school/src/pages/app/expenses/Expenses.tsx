import { useContext, useEffect, useState } from "react";
import Drawer from "../../../components/common/Drawer";
import Form, { type FormDataType } from "../../../components/common/Form";
import Input from "../../../components/common/Input";
import Label from "../../../components/common/Label";
import Select from "../../../components/common/Select";
import Textarea from "../../../components/common/Textarea";
import CatchError from "../../../utils/error";
import HttpInterceptor from "../../../utils/HttpInterceptor";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";
import moment from "moment";
import StatusBadge from "../../../components/common/StatusBadge";

interface FormDataInterface {
    _id?: string;
    title?: string;
    amount?: number;
    description?: string;
    date?: string;
    status?: string;
}

interface ExpenseItemInterface {
    _id: string;
    title: string;
    amount: number;
    description: string;
    date: string;
    status: string;
    createdAt: string;
}

const Expenses = () => {
    const [close, setClose] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const { session, sessionYear } = useContext(AuthContext);
    const [expensesData, setExpensesData] = useState<ExpenseItemInterface[]>([]);
    const [formData, setFormData] = useState<FormDataInterface>({});

    useEffect(() => {
        if (session?.id && sessionYear) {
            fetchExpenses();
        }
    }, [session?.id, sessionYear]);

    const handleExpenses = async (values: FormDataType) => {
        const payload = {
            ...values,
            school: session.id,
        };
        try {
            let response;
            if (editMode && formData._id) {
                response = await HttpInterceptor.put(
                    `/expense/${formData._id}`,
                    payload
                );
            } else {
                response = await HttpInterceptor.post("/expense", payload);
            }
            toast.success(response.data.message);
            setClose(false);
            fetchExpenses();
            resetForm();
        } catch (err) {
            CatchError(err);
        }
    };

    const fetchExpenses = async () => {
        try {
            const { data } = await HttpInterceptor.get(
                `/expense/${session.id}/${sessionYear}`
            );
            setExpensesData(data);
        } catch (err) {
            CatchError(err);
        }
    };

    // update expense record
    const handleUpdateExpense = async (expenseId: string) => {
        const expense = expensesData.find((t) => t._id === expenseId);
        if (expense) {
            setFormData({
                ...expense,
                date: moment(expense.date).format("YYYY-MM-DD"),
            });
            setClose(true);
            setEditMode(true);
        }
    };

    // delete single expense item
    const handleDeleteExpense = async (expenseId: string) => {
        try {
            const { data } = await HttpInterceptor.delete(
                `/expense/${expenseId}`
            );
            toast.success(data.message);
            fetchExpenses();
        } catch (err) {
            CatchError(err);
        }
    };

    // reset all form data
    const resetForm = () => {
        setFormData({});
    };

    // handle drawer close
    const handleCloseDrawer = () => {
        setClose(false);
        resetForm();
        setEditMode(false);
    };

    return (
        <div className="p-5 flex justify-center overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="relative w-full h-full bg-white shadow rounded-2xl p-5">
                <header className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-work-sans font-semibold">
                            All Expenses Data
                        </h2>
                    </div>
                    <div className="flex items-center gap-5">
                        <Input
                            type="search"
                            name="search"
                            placeholder="Search Expenses"
                            className="w-64"
                        />
                        <Select
                            name="expenses-export"
                            id="expenses-export"
                            className="w-32"
                        >
                            <option value="export">Export</option>
                            <option value="pdf">PDF</option>
                            <option value="xls">XLS</option>
                        </Select>
                        <button
                            onClick={() => setClose(true)}
                            className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white hover:scale-103 transition duration-300 cursor-pointer space-x-1"
                        >
                            <i className="ri-add-line"></i>
                            <span>Add expense</span>
                        </button>
                    </div>
                </header>
                <div className="border-b border-gray-200 mt-4 -ml-5 -mr-5 mb-5" />

                {expensesData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 w-full text-center bg-gray-50 rounded-md border border-dashed border-gray-300 p-6 mt-10">
                        <i className="ri-user-unfollow-line text-4xl text-gray-400 mb-4"></i>
                        <h2 className="text-lg font-semibold text-gray-600">
                            No Expense Item Found
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Try adding a new expense or check your filters.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <i className="ri-receipt-line text-blue-500"></i>
                                            Expense
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <i className="ri-menu-4-fill text-green-500"></i>
                                            Description
                                        </div>
                                    </th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <i className="ri-money-rupee-circle-line text-yellow-500"></i>
                                            Amount
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
                                {expensesData.map(
                                    (expense: any, index: number) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-[#f8fafc] hover:transform hover:translate-x-1 hover:transition hover:duration-300"
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-medium text-gray-900">
                                                        {expense.title}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">
                                                {expense.description}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-lg font-semibold text-gray-900">
                                                    ₹{" "}
                                                    {expense.amount.toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <StatusBadge
                                                    status={expense.status}
                                                />
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">
                                                <div className="flex flex-col">
                                                    <span>
                                                        {moment(
                                                            expense.date
                                                        ).format("ll")}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {moment(
                                                            expense.createdAt
                                                        ).format("LT")}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateExpense(
                                                                expense._id
                                                            )
                                                        }
                                                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 px-3 rounded-lg transition duration-300 hover:shadow-xl hover:transform hover:-translate-y-0.5"
                                                        title="Edit"
                                                    >
                                                        <i className="ri-edit-2-fill text-sm"></i>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteExpense(
                                                                expense._id
                                                            )
                                                        }
                                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg transition duration-300 hover:shadow-xl hover:transform hover:-translate-y-0.5"
                                                        title="Delete"
                                                    >
                                                        <i className="ri-delete-bin-7-line text-sm"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Drawer
                title={editMode ? "Update Expense record" : "Add a new expense"}
                onClose={close}
                setClose={handleCloseDrawer}
            >
                <Form onValue={handleExpenses}>
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="title" required>
                                Title
                            </Label>
                            <Input
                                type="text"
                                name="title"
                                placeholder="Electricity bill"
                                id="title"
                                value={formData.title || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="amount" required>
                                Amount
                            </Label>
                            <Input
                                type="number"
                                name="amount"
                                placeholder="00.00"
                                id="amount"
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

                    <div className="mb-5">
                        <div className="w-full">
                            <Label htmlFor="description" required>
                                Description
                            </Label>
                            <Textarea
                                rows={6}
                                name="description"
                                id="description"
                                value={formData.description || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="date" required>
                                Date
                            </Label>
                            <Input
                                type="date"
                                name="date"
                                id="date"
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
                        <div className="w-full">
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
                    </div>

                    <button className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white hover:scale-103 transition duration-300 cursor-pointer space-x-1">
                        <i className="ri-arrow-right-line"></i>
                        <span>{editMode ? "Update Expense" : "Add now"}</span>
                    </button>
                </Form>
            </Drawer>
        </div>
    );
};

export default Expenses;
