import { useContext, useEffect, useRef, useState } from "react";
import Drawer from "../../../components/common/Drawer";
import Form, { type FormDataType } from "../../../components/common/Form";
import Input from "../../../components/common/Input";
import Label from "../../../components/common/Label";
import Select from "../../../components/common/Select";
import AuthContext from "../../../context/AuthContext";
import CatchError from "../../../utils/error";
import HttpInterceptor from "../../../utils/HttpInterceptor";
import { toast } from "react-toastify";
import {v4 as uuid} from 'uuid'
import StudentCard from "./StudentCard";
import Modal from "../../../components/common/Modal";
import moment from "moment";

interface StudentDataInterface {
    _id: string;
    studentName: string;
    studentPhoto?: string;
    dob: string;
    gender: string;
    religion: string;
    email: string;
    mobile: string;
    qualification: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    subjects: string[];
    previousSchool?: string;
    classNumber?: string;
    section?: string;
    rollNumber?: string;
}

interface FormDataInterface {
    _id?: string;
    studentName?: string;
    studentPhoto?: string;
    fatherName?: string;
    motherName?: string;
    gender?: string;
    dob?: string;
    religion?: string;
    email?: string;
    mobile?: string;
    class?: string; 
    section?: string;
    qualification?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    subjects?: string[];
    previousSchool?: string;
}

const Students = () => {
    const [close, setClose] = useState(false);
    const [modalClose, setModalClose] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const {session, sessionYear} = useContext(AuthContext);
    const [studentData, setStudentData] = useState<StudentDataInterface[]>([]);
    const [classesData, setClassesData] = useState<any[]>([]);
    const [formData, setFormData] = useState<FormDataInterface>({});
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [currentStudent, setCurrentStudent] = useState<StudentDataInterface | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        fetchStudents();
        fetchClasses();
        return () => {
            if (imgRef.current && imgRef.current.src.startsWith("blob:")) {
                URL.revokeObjectURL(imgRef.current.src);
            }
        };
    }, []);

    // handle choose image
    const handleChooseImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.name = "studentPhoto";
        input.accept = "image/*";

        input.onchange = () => {
            if (!input.files || input.files.length === 0) return;

            const file = input.files[0];
            setProfilePic(file);

            // Clean up previous blob URL
            if (imgRef.current && imgRef.current.src.startsWith("blob:")) {
                URL.revokeObjectURL(imgRef.current.src);
            }

            const url = URL.createObjectURL(file);
            if (imgRef.current) imgRef.current.src = url;
        };

        input.click();
    };

    // adding a new student
    const handleStudent = async (values: FormDataType) => {
        console.log(values)
        if(!editMode) {
            if (!(values.studentPhoto instanceof File)) {
                toast.error("Please upload a photo.");
                return;
            }

            const path = `profile-pictures/${uuid()}.${
                values.studentPhoto.name.split(".").pop()?.toLowerCase() ||
                "jpg"
            }`;

            const payload = {
                path,
                type: values.studentPhoto.type,
            };
            try {
                const option = {
                    headers: {
                        "Content-Type": values.studentPhoto.type,
                    },
                };
                const { data } = await HttpInterceptor.post("/storage/upload", payload);
                await HttpInterceptor.put(data.url, values.studentPhoto, option);
                const {data: studentRes} = await HttpInterceptor.post('/student', {...values, studentPhoto: path, school: session.id})
                toast.success(studentRes.message)
                setClose(false)
                fetchStudents()
                resetForm();
            } catch (err) {
                CatchError(err)
            }
        } else {
            // Updating existing student
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
                    updatedValues.studentPhoto = path; // Fixed: was teacherPhoto
                }

                const { data: studentRes } = await HttpInterceptor.put(
                    `/student/${values._id}`,
                    { ...updatedValues, school: session.id }
                );
                toast.success(studentRes.message);
                setClose(false);
                resetForm();
                fetchStudents();
            } catch (err) {
                CatchError(err);
            }
        }
    }

    // update student - Fixed function name and logic
    const handleUpdateStudent = (id: string) => {
        const student = studentData.find((s) => s._id === id);
        if (student) {
            const formattedStudent = {
                ...student,
                dob: moment(student.dob).format("YYYY-MM-DD"),
            };
            setCurrentStudent(student); // Fixed: set current student data
            setFormData(formattedStudent);
            setClose(true);
            setEditMode(true);
            setProfilePic(null);
        }
    };

    // fetching a total students
    const fetchStudents = async () => {
        try {
            const {data} = await HttpInterceptor.get(`/student/${session.id}/${sessionYear}`)
            setStudentData(data)
        } catch (err) {
            CatchError(err)
        }
    }

    // fetching a classes for class number
    const fetchClasses = async () => {
        try {
            const { data } = await HttpInterceptor.get(
                `/class/${session.id}/${sessionYear}`
            );
            setClassesData(data)

            if(data.length === 0)
                setModalClose(true)
        } catch (err) {
            CatchError(err)
        }
    }

    // delete student
    const deleteStudent = async (studentId: string) => {
        try {
            const {data} = await HttpInterceptor.delete(`/student/${studentId}`)
            toast.success(data.message)
            fetchStudents()
        } catch (err) {
            CatchError(err)
        }
    }

    // get image string src
    const getImageSrc = (): string => {
        if (profilePic && profilePic instanceof File) {
            return URL.createObjectURL(profilePic);
        }
        if (
            currentStudent?.studentPhoto &&
            typeof currentStudent.studentPhoto === "string"
        ) {
            return currentStudent.studentPhoto;
        }
        return "/logo.png";
    };

    // handle drawer close
    const handleDrawerClose = () => {
        setClose(false);
        resetForm();
    }

    // reset form
    const resetForm = () => {
        setCurrentStudent(null); // Fixed: reset current student
        setFormData({});
        setProfilePic(null);
        setEditMode(false);

        if (imgRef.current && imgRef.current.src.startsWith("blob:")) {
            URL.revokeObjectURL(imgRef.current.src);
        }
        if (imgRef.current) {
            imgRef.current.src = "/logo.png";
        }
    }

    return (
        <div className="p-5 flex justify-center overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="relative w-full h-full bg-white shadow rounded-2xl p-5">
                <header className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-work-sans font-semibold">
                            All Student Data
                        </h2>
                    </div>
                    <div className="flex items-center gap-5">
                        <Input
                            type="search"
                            name="search"
                            placeholder="Search Student List"
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
                            <span>New Admission</span>
                        </button>
                    </div>
                </header>
                <div className="border-b border-gray-200 mt-4 -ml-5 -mr-5" />

                {
                    studentData.length === 0 ?
                    <div className="flex flex-col items-center justify-center h-64 w-full text-center bg-gray-50 rounded-md border border-dashed border-gray-300 p-6 mt-10">
                        <i className="ri-user-unfollow-line text-4xl text-gray-400 mb-4"></i>
                        <h2 className="text-lg font-semibold text-gray-600">
                            No Students Found
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Try adding a new student or check your filters.
                        </p>
                    </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-10">
                        {
                            studentData.map((student: any) => (
                                <StudentCard 
                                    key={student._id} 
                                    classNumber={student.class} 
                                    studentPhoto={student.studentPhoto} 
                                    studentName={student.studentName} 
                                    section={student.section} 
                                    rollNumber={student.rollNumber} 
                                    email={student.email} 
                                    mobile={student.mobile} 
                                    address={student.address} 
                                    id={student._id} 
                                    setStudentValue={deleteStudent} 
                                    setUpdateStudentValue={handleUpdateStudent} 
                                />
                            ))
                        }
                    </div>
                }
            </div>

            <Drawer title={editMode ? "Update Student" : "New admission"} onClose={close} setClose={handleDrawerClose}>
                <Form onValue={handleStudent}>
                    <div className="p-5 pt-2">
                        {!editMode ? (
                            <>
                                <Label htmlFor="studentPhoto">
                                    Upload Student Photo (150px X 150px)
                                </Label>
                                <Input
                                    key={editMode ? "edit-photo" : `new-photo-${close}`}
                                    type="file"
                                    accept="image/*"
                                    name="studentPhoto"
                                    id="studentPhoto"
                                />
                            </>
                        ) : (
                            <div className="w-full flex gap-10">
                                <div className="w-40 h-40 rounded-full border-2 border-indigo-500 overflow-hidden">
                                    <img
                                        ref={imgRef}
                                        src={getImageSrc()}
                                        alt="student profile pic"
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
                    {editMode && currentStudent && (
                        <Input
                            type="hidden"
                            name="_id"
                            value={currentStudent._id || ""}
                        />
                    )}
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="studentName" required>
                                Student's Name
                            </Label>
                            <Input
                                type="text"
                                name="studentName"
                                placeholder="Enter student's name"
                                id="studentName"
                                value={formData.studentName || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, studentName: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="fatherName" required>
                                Father's Name
                            </Label>
                            <Input
                                type="text"
                                name="fatherName"
                                placeholder="Enter father's name"
                                id="fatherName"
                                value={formData.fatherName || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, fatherName: e.target.value }))
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="motherName" required>
                                Mother's Name
                            </Label>
                            <Input
                                type="text"
                                name="motherName"
                                placeholder="Enter mother's name"
                                id="motherName"
                                value={formData.motherName || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, motherName: e.target.value }))
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
                                value={formData.gender || "male"}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, gender: e.target.value }))
                                }
                                required
                            >
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
                                value={formData.dob || ""}
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
                                value={formData.religion || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, religion: e.target.value }))
                                }
                                required
                            >
                                <option value="">Select Religion</option>
                                <option value="hindu">Hindu</option>
                                <option value="muslim">Muslim</option>
                                <option value="sikh">Sikh</option>
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
                                value={formData.email || ""}
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
                                type="tel"
                                name="mobile"
                                id="mobile"
                                placeholder="Enter mobile number"
                                value={formData.mobile || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, mobile: e.target.value }))
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="class" required>
                                Class
                            </Label>
                            <Select 
                                id="class" 
                                name="class" 
                                value={formData.class || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, class: e.target.value }))
                                }
                                required
                            >
                                <option value="">Choose a class</option>
                                {
                                    classesData.map((classInfo: any, index: number) => (
                                        <option key={index} value={classInfo.class}>
                                            {classInfo.class}
                                        </option>
                                    ))
                                }
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label htmlFor="section" required>
                                Section
                            </Label>
                            <Select 
                                id="section" 
                                name="section" 
                                value={formData.section || "A"}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, section: e.target.value }))
                                }
                                required
                            >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="address" required>
                                Address
                            </Label>
                            <Input
                                type="text"
                                name="address"
                                id="address"
                                placeholder="178 Giraffe Hill Drive Plano, TX 75074"
                                value={formData.address || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, address: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="city" required>
                                City
                            </Label>
                            <Input
                                type="text"
                                name="city"
                                id="city"
                                placeholder="Enter city name"
                                value={formData.city || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, city: e.target.value }))
                                }
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="state" required>
                                State
                            </Label>
                            <Input
                                type="text"
                                name="state"
                                id="state"
                                placeholder="Enter state name"
                                value={formData.state || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, state: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="country" required>
                                Country
                            </Label>
                            <Input
                                type="text"
                                name="country"
                                id="country"
                                placeholder="Enter country name"
                                value={formData.country || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, country: e.target.value }))
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="pincode" required>
                                Pincode
                            </Label>
                            <Input
                                type="text"
                                name="pincode"
                                id="pincode"
                                placeholder="Enter pincode/zipcode"
                                value={formData.pincode || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, pincode: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="previousSchool">
                                Previous School
                            </Label>
                            <Input
                                type="text"
                                name="previousSchool"
                                id="previousSchool"
                                placeholder="Enter previous school name"
                                value={formData.previousSchool || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, previousSchool: e.target.value }))
                                }
                            />
                        </div>
                    </div>

                    <button className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white hover:scale-103 transition duration-300 cursor-pointer space-x-1">
                        <i className="ri-arrow-right-line"></i>
                        <span>{editMode ? "Update Student" : "Submit now"}</span>
                    </button>
                </Form>
            </Drawer>

            <Modal modalClose={modalClose} setModalClose={setModalClose} description="No Class has been found. Please add at least one Class before to access this feature." buttonText="Ok, Add class" link="/app/classes" />
        </div>
    );
};

export default Students;