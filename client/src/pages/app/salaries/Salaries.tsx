import { useContext, useEffect, useState } from "react";
import Drawer from "../../../components/common/Drawer";
import Form, { type FormDataType } from "../../../components/common/Form";
import Input from "../../../components/common/Input";
import Label from "../../../components/common/Label";
import Select from "../../../components/common/Select";
import Textarea from "../../../components/common/Textarea";
import AuthContext from "../../../context/AuthContext";
import HttpInterceptor from "../../../utils/HttpInterceptor";
import { toast } from "react-toastify";
import CatchError from "../../../utils/error";
import moment from "moment";
import StatusBadge from "../../../components/common/StatusBadge";

interface EmployeeInterface {
    employeeName: string;
    _id: string
}

interface FormDataInterface {
    _id?: string;
    employee?: string;
    salary?: string;
    description?: string;
    date?: string;
    status?: string
}

interface SalaryWithEmployee {
    _id: string;
    employee: string;
    employeeName: string;
    salary: number;
    description: string;
    date: string;
    status: string;
    createdAt: string;
}

const Salaries = () => {
    const [close, setClose] = useState(false);
    const {session, sessionYear} = useContext(AuthContext);
    const [salariesWithEmployees, setSalariesWithEmployees] = useState<SalaryWithEmployee[]>([]);
    const [employeesList, setEmployeesList] = useState<EmployeeInterface[]>([]);
    const [formData, setFormData] = useState<FormDataInterface>({});
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        fetchSalaries();
        fetchEmployees();
    }, [])

    // create a new salaries
    const handleSalaries = async (values: FormDataType) => {
        try {
            const payload = {
                ...values,
                school: session.id,
            };

            let response;
            if(editMode && formData._id){
                response = await HttpInterceptor.put(`/salary/${formData._id}`, payload);
            }else{
                response = await HttpInterceptor.post('/salary', payload);
            }
            toast.success(response.data.message);
            setClose(false);
            fetchSalaries();
            resetForm();
        } catch (err) {
            CatchError(err)
        }
    }

    // fetch all salaries with employee names
    const fetchSalaries = async () => {
        try {
            const {data: salariesData} = await HttpInterceptor.get(`/salary/${session.id}/${sessionYear}`);
            
            // Fetch employee names for all salaries
            const salariesWithNames = await Promise.all(
                salariesData.map(async (salary: any) => {
                    try {
                        const employeeName = await getEmployeeName(salary.employee);
                        return { ...salary, employeeName };
                    } catch (err) {
                        console.error('Error fetching employee name for:', salary.employee, err);
                        return { ...salary, employeeName: 'Unknown Employee' };
                    }
                })
            );
            
            setSalariesWithEmployees(salariesWithNames);
        } catch (err) {
            CatchError(err)
        }
    }

    // fetch all employees
    const fetchEmployees = async () => {
        try {
            const {data} = await HttpInterceptor.get(`/employee/${session.id}/${sessionYear}`)
            setEmployeesList(data)
        } catch (err) {
            CatchError(err)
        }
    }

    // fetch employee by id
    const getEmployeeName = async (employeeId: string): Promise<string> => {
        try {
            const {data} = await HttpInterceptor.get(`/employee/${employeeId}`)
            return data.employeeName || 'Unknown'
        } catch (err) {
            console.error('Error fetching employee name:', err);
            throw err;
        }
    }

    // update salaries record
    const handleUpdateSalary = async (salaryId: string) => {
        const salary: any = salariesWithEmployees.find((t: any) => t._id === salaryId);
        if (salary) {
            setFormData({
                ...salary,
                date: moment(salary.date).format('YYYY-MM-DD')
            });
            setClose(true);
            setEditMode(true);
        }
    }

    // delete single salary item
    const handleDeleteSalary = async (salaryId: string) => {
        try {
            const {data} = await HttpInterceptor.delete(`/salary/${salaryId}`)
            toast.success(data.message)
            fetchSalaries()
        } catch (err) {
            CatchError(err)
        }
    }

    // reset all form data
    const resetForm = () => {
        setFormData({})
    }

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
                            All Salaries Data
                        </h2>
                    </div>
                    <div className="flex items-center gap-5">
                        <Input
                            type="search"
                            name="search"
                            placeholder="Search Salaries data"
                            className="w-64"
                        />
                        <Select
                            name="salaries-export"
                            id="salaries-export"
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
                            <span>Add new Salary</span>
                        </button>
                    </div>
                </header>
                <div className="border-b border-gray-200 mt-4 -ml-5 -mr-5 mb-5" />

                {salariesWithEmployees.length === 0 ?
                        <div className="flex flex-col items-center justify-center h-64 w-full text-center bg-gray-50 rounded-md border border-dashed border-gray-300 p-6 mt-10">
                            <i className="ri-money-rupee-circle-line text-4xl text-gray-400 mb-4"></i>
                            <h2 className="text-lg font-semibold text-gray-600">
                                No Salaries Found
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Try adding a new salary record or check your filters.
                            </p>
                        </div>
                    :
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <i className="ri-receipt-line text-blue-500"></i>
                                            Name
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
                                            Salary
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
                                {salariesWithEmployees.map((salary, index) => (
                                    <tr key={salary._id || index} className="hover:bg-[#f8fafc] hover:transform hover:translate-x-1 hover:transition hover:duration-300">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <span className="font-medium text-gray-900">{salary.employeeName}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-600 capitalize">{salary.description}</td>
                                        <td className="py-4 px-6">
                                            <span className="text-lg font-semibold text-gray-900">
                                                ₹ {Number(salary.salary || 0).toLocaleString("en-IN")}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <StatusBadge status={salary.status} />
                                        </td>
                                        <td className="py-4 px-6 text-gray-600">
                                            <div className="flex flex-col">
                                                <span>{moment(salary.date).format('ll')}</span>
                                                <span className="text-xs text-gray-400">{moment(salary.createdAt).format('LT')}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => handleUpdateSalary(salary._id)} 
                                                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 px-3 rounded-lg transition duration-300 hover:shadow-xl hover:transform hover:-translate-y-0.5" 
                                                    title="Edit"
                                                >
                                                    <i className="ri-edit-2-fill text-sm"></i>
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteSalary(salary._id)} 
                                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg transition duration-300 hover:shadow-xl hover:transform hover:-translate-y-0.5" 
                                                    title="Delete"
                                                >
                                                    <i className="ri-delete-bin-7-line text-sm"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>

            <Drawer
                title="Add a new Salary"
                onClose={close}
                setClose={handleCloseDrawer}
            >
                <Form onValue={handleSalaries}>
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="employee" required>
                                Employee
                            </Label>
                            <Select 
                                id="employee" 
                                name="employee" 
                                value={formData.employee || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, employee: e.target.value }))
                                }
                                required
                            >
                                <option value="">Select a employee</option>
                                {employeesList.map((employee, index) => (
                                    <option key={employee._id || index} value={employee._id}>
                                        {employee.employeeName}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label htmlFor="salary" required>
                                Salary
                            </Label>
                            <Input
                                type="number"
                                name="salary"
                                placeholder="00.00"
                                id="salary"
                                value={formData.salary || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, salary: e.target.value }))
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-5">
                        <div className="w-full">
                            <Label htmlFor="description" required>Description</Label>
                            <Textarea 
                                rows={6} 
                                name="description" 
                                id="description"
                                value={formData.description || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, description: e.target.value }))
                                }
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="date" required>Date</Label>
                            <Input
                                type="date"
                                name="date"
                                id="date"
                                value={formData.date || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, date: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="status" required>Status</Label>
                            <Select 
                                id="status" 
                                name="status"
                                value={formData.status || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, status: e.target.value }))
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

                    <button 
                        type="submit"
                        className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white hover:scale-103 transition duration-300 cursor-pointer space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="ri-arrow-right-line"></i>
                        <span>{editMode ? "Update Salary" : "Add now" }</span>
                    </button>
                </Form>
            </Drawer>
        </div>
    );
};

export default Salaries;