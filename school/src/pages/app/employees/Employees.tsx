import { useContext, useEffect, useRef, useState } from "react";
import Drawer from "../../../components/common/Drawer";
import Form, { type FormDataType } from "../../../components/common/Form";
import Input from "../../../components/common/Input";
import Label from "../../../components/common/Label";
import Select from "../../../components/common/Select";
import CatchError from "../../../utils/error";
import HttpInterceptor from "../../../utils/HttpInterceptor";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";
import {v4 as uuid} from 'uuid'
import EmployeeCard, { type EmployeeCardInterface } from "./EmployeeCard";
import moment from "moment";

interface FormDataInterface {
    _id?: string;
    employeeName?: string;
    employeePhoto?: string;
    gender?: string;
    dob?: string;
    religion?: string;
    email?: string;
    mobile?: string;
    qualification?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    designation?: string;
}

const Employees = () => {
    const [close, setClose] = useState(false);
    const {session, sessionYear} = useContext(AuthContext);
    const [employeeData, setEmployeeData] = useState<EmployeeCardInterface[]>([]);
    const [formData, setFormData] = useState<FormDataInterface>({});
    const [editMode, setEditMode] = useState(false);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
    return () => {
        if (profilePic && profilePic instanceof File) {
            const url = URL.createObjectURL(profilePic);
            URL.revokeObjectURL(url);
        }
    };
}, [profilePic]);

    // create a new employee record
    const handleEmployee = async (values: FormDataType) => {
        if(!editMode) {
            if (!(values.employeePhoto instanceof File)) {
                toast.error("Please upload a photo.");
                return;
            }

            const path = `profile-pictures/${uuid()}.${
                values.employeePhoto.name.split(".").pop()?.toLowerCase() ||
                "jpg"
            }`;

            const payload = {
                path,
                type: values.employeePhoto.type,
            };
            try {
                const option = {
                    headers: {
                        "Content-Type": values.employeePhoto.type,
                    },
                };
                const { data } = await HttpInterceptor.post("/storage/upload", payload);
                await HttpInterceptor.put(data.url, values.employeePhoto, option)
                const {data: employeeRes} = await HttpInterceptor.post('/employee', {...values, employeePhoto: path, school: session.id});
                toast.success(employeeRes.message)
                setClose(false);
                fetchEmployees();
                resetForm();
            } catch (err) {
                CatchError(err)
            }
        } else {
            // Updating existing teacher
            try {
                let updatedValues = { ...values };

                // Handle image upload logic
                if (profilePic && profilePic instanceof File) {
                    // New image selected - upload it
                    const path = `profile-pictures/${uuid()}.${
                        profilePic.name.split(".").pop()?.toLowerCase() || "jpg"
                    }`;

                    const payload = {
                        path,
                        type: profilePic.type,
                    };

                    const option = {
                        headers: {
                            "Content-Type": profilePic.type,
                        },
                    };

                    const { data } = await HttpInterceptor.post(
                        "/storage/upload",
                        payload
                    );
                    await HttpInterceptor.put(data.url, profilePic, option);
                    updatedValues.employeePhoto = path;
                }

                const { data: employeeRes } = await HttpInterceptor.put(
                    `/employee/${values._id}`,
                    { ...updatedValues, school: session.id }
                );
                toast.success(employeeRes.message);
                setClose(false);
                resetForm();
                fetchEmployees();
            } catch (err) {
                CatchError(err);
            }
        }
    }

    // fetching the all employee record
    const fetchEmployees = async () => {
        try {
            const {data} = await HttpInterceptor.get(`/employee/${session.id}/${sessionYear}`)
            setEmployeeData(data)
        } catch (err) {
            CatchError(err)
        }
    }

    // updating a employee
    const handleUpdateEmployee = async (id: string) => {
    const employee: any = employeeData?.find((t: any) => t._id === id);
    if (employee) {
        const formattedEmployee = {
            ...employee,
            dob: moment(employee.dob).format("YYYY-MM-DD"),
        };
        setFormData(formattedEmployee); // Only set form data
        setClose(true);
        setEditMode(true);
        setProfilePic(null);
    }
}

    // deleting the employee record
    const handleDeleteEmployee = async (employeeId: string) => {
        try {
            const {data} = await HttpInterceptor.delete(`/employee/${employeeId}`)
            toast.success(data.message)
            fetchEmployees()
        } catch (err) {
            CatchError(err)
        }
    }

    // handle choose image
    const handleChooseImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.name = "employeePhoto";
        input.accept = "image/*";

        input.onchange = () => {
            if (!input.files || input.files.length === 0) return;

            const file = input.files[0];
            setProfilePic(file);

            const url = URL.createObjectURL(file);
            if (imgRef.current) imgRef.current.src = url;

            setTimeout(() => URL.revokeObjectURL(url), 1000);
        };

        input.click();
    };

    // get image string src
    const getImageSrc = (): string => {
    if (profilePic && profilePic instanceof File) {
        return URL.createObjectURL(profilePic);
    }
    if (formData?.employeePhoto && typeof formData.employeePhoto === "string") {
        return formData.employeePhoto;
    }
    return "/logo.png";
};

    // reset all data
    const resetForm = () => {
        setFormData({});
        setProfilePic(null);
        setEditMode(false);

        if (imgRef.current && imgRef.current.src.startsWith("blob:")) {
            URL.revokeObjectURL(imgRef.current.src);
        }
        if (imgRef.current) {
            imgRef.current.src = "/logo.png";
        }
    };

    // handle drawer and reset form
    const handleCloseDrawer = () => {
        setClose(false);
        resetForm();
    };

    return (
        <div className="p-5 flex justify-center overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="relative w-full h-full bg-white shadow rounded-2xl p-5">
                <header className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-work-sans font-semibold">
                            All Employees Data
                        </h2>
                    </div>
                    <div className="flex items-center gap-5">
                        <Input
                            type="search"
                            name="search"
                            placeholder="Search Employees"
                            className="w-64"
                        />
                        <Select
                            name="student-export"
                            id="student-export"
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
                            <i className="ri-user-add-line"></i>
                            <span>New employee</span>
                        </button>
                    </div>
                </header>
                <div className="border-b border-gray-200 mt-4 -ml-5 -mr-5" />

                {
                    employeeData?.length === 0 ?
                    <div className="flex flex-col items-center justify-center h-64 w-full text-center bg-gray-50 rounded-md border border-dashed border-gray-300 p-6 mt-10">
                        <i className="ri-user-unfollow-line text-4xl text-gray-400 mb-4"></i>
                        <h2 className="text-lg font-semibold text-gray-600">
                            No Employees Found
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Try adding a new employee or check your filters.
                        </p>
                    </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-10">
                        {
                            employeeData?.map((employee: any, index: number) => (
                                <EmployeeCard key={index} dob={employee.dob} employeePhoto={employee.employeePhoto} employeeName={employee.employeeName} qualification={employee.qualification} email={employee.email} mobile={employee.mobile} address={employee.address} _id={employee._id} setDeleteValue={handleDeleteEmployee} setUpdateValue={handleUpdateEmployee} />
                            ))
                        }
                    </div>
                }
            </div>

            <Drawer
                title={editMode ? "Update Employee" : "Add a new employee"}
                onClose={close}
                setClose={handleCloseDrawer}
            >
                <Form onValue={handleEmployee}>
                    <div className="p-5 pt-2">
                        {!editMode ? (
                            <>
                                <Label htmlFor="employeePhoto">
                                    Upload Employee Photo (150px X 150px)
                                </Label>
                                <Input
                                    key={editMode ? "edit-photo" : `new-photo-${close}`}
                                    type="file"
                                    accept="image/*"
                                    name="employeePhoto"
                                    id="employeePhoto"
                                />
                            </>
                        ) : (
                            <div className="w-full flex gap-10">
                                <div className="w-40 h-40 rounded-full border-2 border-indigo-500 overflow-hidden">
                                    <img
                                        ref={imgRef}
                                        src={getImageSrc()}
                                        alt="employee profile pic"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={handleChooseImage}
                                        type="button"
                                        className="px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 w-fit text-white transition-all duration-300 cursor-pointer transform hover:scale-105"
                                    >
                                        <i className="ri-image-line mr-1"></i>
                                        Choose Image
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Hidden input to pass _id for edit mode */}
                    {editMode && (
                        <Input
                            type="hidden"
                            name="_id"
                            value={formData?._id || ""}
                        />
                    )}
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="employeeName" required>
                                Employee`s Name
                            </Label>
                            <Input
                                type="text"
                                name="employeeName"
                                placeholder="Enter employee's name"
                                id="employeeName"
                                value={formData?.employeeName || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, employeeName: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="gender" required>
                                Gender
                            </Label>
                            <Select
                                id="gender"
                                name="gender"
                                value={formData?.gender || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, gender: e.target.value }))
                                }
                                required
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="dob" required>
                                DOB
                            </Label>
                            <Input 
                                type="date" 
                                name="dob" 
                                id="dob" 
                                value={formData?.dob || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, dob: e.target.value }))
                                }
                                required 
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="religion" required>
                                Religion
                            </Label>
                            <Select 
                                id="religion" 
                                name="religion" 
                                value={formData?.religion || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, religion: e.target.value }))
                                }
                                required
                            >
                                <option value="">Choose a religion</option>
                                <option value="hindu">Hindu</option>
                                <option value="muslim">Muslim</option>
                                <option value="christian">Christian</option>
                                <option value="jain">Jain</option>
                                <option value="other">Other</option>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="email" required>
                                Email
                            </Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter email address"
                                value={formData?.email || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, email: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="mobile" required>
                                Mobile
                            </Label>
                            <Input
                                type="number"
                                name="mobile"
                                id="mobile"
                                placeholder="Enter mobile number"
                                value={formData?.mobile || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, mobile: e.target.value }))
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="qualification" required>
                                Qualification
                            </Label>
                            <Select 
                                id="qualification" 
                                name="qualification" 
                                value={formData?.qualification || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, qualification: e.target.value }))
                                }
                                required
                            >
                                <option value="">Select Qualification</option>
                                <option value="bachelors">Bachelor's</option>
                                <option value="masters">Master's</option>
                                <option value="graduate">Graduate</option>
                                <option value="postgraduate">Postgraduate</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label htmlFor="address" required>
                                Address
                            </Label>
                            <Input
                                type="text"
                                name="address"
                                id="address"
                                placeholder="178 Giraffe Hill Drive Plano, TX 75074"
                                value={formData?.address || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, address: e.target.value }))
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="city" required>
                                City
                            </Label>
                            <Input
                                type="text"
                                name="city"
                                id="city"
                                placeholder="Enter city name"
                                value={formData?.city || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, city: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="state" required>
                                State
                            </Label>
                            <Input
                                type="text"
                                name="state"
                                id="state"
                                placeholder="Enter state name"
                                value={formData?.state || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, state: e.target.value }))
                                }
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="country" required>
                                Country
                            </Label>
                            <Input
                                type="text"
                                name="country"
                                id="country"
                                placeholder="Enter country name"
                                value={formData?.country || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, country: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="pincode" required>
                                Pincode
                            </Label>
                            <Input
                                type="number"
                                name="pincode"
                                id="pincode"
                                placeholder="Enter pincode/zipcode"
                                value={formData?.pincode || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, pincode: e.target.value }))
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-5">
                        <Label htmlFor="designation" required>
                            Designation
                        </Label>
                        <Select 
                            id="designation" 
                            name="designation" 
                            value={formData?.designation || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, designation: e.target.value }))
                                }
                            required
                        >
                            <option value="">Select Designation</option>
                            <option value="peon">Peon</option>
                            <option value="manager">Manager</option>
                            <option value="counsiller">Counsiller</option>
                        </Select>
                    </div>

                    <button className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-103 transition duration-300 cursor-pointer space-x-1">
                        <i className="ri-arrow-right-line"></i>
                        <span>{editMode ? "Update Employee" : "Add employee now"}</span>
                    </button>
                </Form>
            </Drawer>
        </div>
    );
};

export default Employees;
