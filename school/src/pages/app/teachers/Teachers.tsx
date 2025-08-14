import { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import Drawer from "../../../components/common/Drawer";
import Form from "../../../components/common/Form";
import Input from "../../../components/common/Input";
import Label from "../../../components/common/Label";
import Select from "../../../components/common/Select";
import CatchError from "../../../utils/error";
import HttpInterceptor from "../../../utils/HttpInterceptor";
import { toast } from "react-toastify";
import moment from "moment";
import AuthContext from "../../../context/AuthContext";
import TeacherCard from "./TeacherCard";

interface TeacherDataInterface {
    teacherPhoto?: File;
    _id?: string;
}

interface FormDataInterface {
    teacherName?: string;
    teacherPhoto?: File;
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
    subjects?: string[];
    previousSchool?: string;
}

interface TeacherInterface {
    _id: string;
    teacherName: string;
    teacherPhoto?: string;
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
}


const Teachers = () => {
    const { session, sessionYear } = useContext(AuthContext);
    const [close, setClose] = useState(false);
    const [teacherList, setTeacherList] = useState<TeacherInterface[]>([]);
    const [teacherData, setTeacherData] = useState<TeacherDataInterface>({});
    const [formData, setFormData] = useState<FormDataInterface>({});
    const [editMode, setEditMode] = useState(false);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        getTeacherList();
        return () => {
        if (imgRef.current && imgRef.current.src.startsWith("blob:")) {
            URL.revokeObjectURL(imgRef.current.src);
        }
    };
    }, []);

    // fetching all teachers list
    const getTeacherList = async () => {
        try {
            const { data } = await HttpInterceptor.get(`/teacher/${session.id}/${sessionYear}`);
            setTeacherList(data);
        } catch (err) {
            CatchError(err);
        }
    };

    // handle choose image
    const handleChooseImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.name = "teacherPhoto";
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

    // create new teacher
    const handleTeacher = async (values: any) => {
        if (!editMode) {
            // Creating new teacher
            if (!(values.teacherPhoto instanceof File)) {
                toast.error("Please upload a photo.");
                return;
            }

            const path = `profile-pictures/${uuid()}.${
                values.teacherPhoto.name.split(".").pop()?.toLowerCase() ||
                "jpg"
            }`;

            const payload = {
                path,
                type: values.teacherPhoto.type,
            };

            try {
                const option = {
                    headers: {
                        "Content-Type": values.teacherPhoto.type,
                    },
                };
                const { data } = await HttpInterceptor.post(
                    "/storage/upload",
                    payload
                );
                await HttpInterceptor.put(
                    data.url,
                    values.teacherPhoto,
                    option
                );
                const { data: teacherRes } = await HttpInterceptor.post(
                    "/teacher",
                    { ...values, teacherPhoto: path, school: session.id }
                );
                toast.success(teacherRes.message);
                setClose(false);
                resetForm();
                getTeacherList();
            } catch (err) {
                CatchError(err);
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
                    updatedValues.teacherPhoto = path;
                }

                const { data: teacherRes } = await HttpInterceptor.put(
                    `/teacher/${values._id}`,
                    { ...updatedValues, school: session.id }
                );
                toast.success(teacherRes.message);
                setClose(false);
                resetForm();
                getTeacherList();
            } catch (err) {
                CatchError(err);
            }
        }
    };

    // update teacher
    const handleUpdateTeacher = (id: string) => {
        const teacher: any = teacherList.find((t: any) => t._id === id);
        if (teacher) {
            const formattedTeacher = {
                ...teacher,
                dob: moment(teacher.dob).format("YYYY-MM-DD"),
            };
            setTeacherData(formattedTeacher);
            setFormData(formattedTeacher);
            setClose(true);
            setEditMode(true);
            setProfilePic(null);
        }
    };

    // delete teacher
    const handleDeleteTeacher = async (id: string) => {
        setTeacherList(prev => prev.filter(t => t._id !== id));
        try {
            const { data } = await HttpInterceptor.delete(`/teacher/${id}`);
            toast.success(data.message);
            getTeacherList();
        } catch (err) {
            CatchError(err);
        }
    };

    // get image string src
    const getImageSrc = (): string => {
        if (profilePic && profilePic instanceof File) {
            return URL.createObjectURL(profilePic);
        }
        if (
            teacherData.teacherPhoto &&
            typeof teacherData.teacherPhoto === "string"
        ) {
            return teacherData.teacherPhoto;
        }
        return "/logo.png";
    };

    // reset form
    const resetForm = () => {
        setTeacherData({});
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
                            All Teacher Data
                        </h2>
                    </div>
                    <div className="flex items-center gap-5">
                        <Input
                            type="search"
                            name="search"
                            placeholder="Search Teacher's List"
                            className="w-64"
                        />
                        <Select
                            name="teacher-export"
                            id="teacher-export"
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
                            <span>New teacher</span>
                        </button>
                    </div>
                </header>
                <div className="border-b border-gray-200 mt-4 -ml-5 -mr-5" />

                {
                    teacherList.length === 0 ?
                    <div className="flex flex-col items-center justify-center h-64 w-full text-center bg-gray-50 rounded-md border border-dashed border-gray-300 p-6 mt-10">
                        <i className="ri-user-unfollow-line text-4xl text-gray-400 mb-4"></i>
                        <h2 className="text-lg font-semibold text-gray-600">
                            No Teachers Found
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Try adding a new teacher or check your filters.
                        </p>
                    </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-10">
                        {teacherList.map((teacher: any, index) => (
                            <TeacherCard key={teacher._id || index} dob={teacher.dob} teacherPhoto={teacher.teacherPhoto} teacherName={teacher.teacherName} qualification={teacher.qualification} email={teacher.email} mobile={teacher.mobile} address={teacher.address} subjects={teacher.subjects} id={teacher._id} setUpdateTeacherValue={handleUpdateTeacher} setDeleteTeacherValue={handleDeleteTeacher} />
                        ))}
                    </div>
                }

            </div>

            <Drawer
                title={editMode ? "Edit Teacher" : "Add a new teacher"}
                onClose={close}
                setClose={handleCloseDrawer}
            >
                <Form onValue={handleTeacher}>
                    <div className="p-5 pt-2">
                        {!editMode ? (
                            <>
                                <Label htmlFor="teacherPhoto">
                                    Upload Teacher Photo (150px X 150px)
                                </Label>
                                <Input
                                    key={editMode ? "edit-photo" : `new-photo-${close}`}
                                    type="file"
                                    accept="image/*"
                                    name="teacherPhoto"
                                    id="teacherPhoto"
                                />
                            </>
                        ) : (
                            <div className="w-full flex gap-10">
                                <div className="w-40 h-40 rounded-full border-2 border-indigo-500 overflow-hidden">
                                    <img
                                        ref={imgRef}
                                        src={getImageSrc()}
                                        alt="teacher profile pic"
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
                            value={teacherData._id || ""}
                        />
                    )}

                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="teacherName" required>
                                Teacher's Name
                            </Label>
                            <Input
                                type="text"
                                name="teacherName"
                                value={formData.teacherName || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, teacherName: e.target.value }))
                                }
                                placeholder="Enter Teacher's name"
                                id="teacherName"
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
                                required
                                value={formData.dob || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, dob: e.target.value }))
                                }
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="religion" required>
                                Religion
                            </Label>
                            <Select
                                id="religion"
                                name="religion"
                                required
                                value={formData.religion || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, religion: e.target.value }))
                                }
                            >
                                <option value="">Select Religion</option>
                                <option value="hindu">Hindu</option>
                                <option value="muslim">Muslim</option>
                                <option value="christian">Christian</option>
                                <option value="jain">Jain</option>
                                <option value="sikh">Sikh</option>
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
                                required
                                value={formData.email || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, email: e.target.value }))
                                }
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
                                required
                                value={formData.mobile || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, mobile: e.target.value }))
                                }
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
                                required
                                value={formData.qualification || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, qualification: e.target.value }))
                                }
                            >
                                <option value="">Select Qualification</option>
                                <option value="bachelors">Bachelor's</option>
                                <option value="masters">Master's</option>
                                <option value="graduate">Graduate</option>
                                <option value="postgraduate">
                                    Postgraduate
                                </option>
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
                                required
                                value={formData.address || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, address: e.target.value }))
                                }
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
                                required
                                value={formData.city || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, city: e.target.value }))
                                }
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
                                required
                                value={formData.state || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, state: e.target.value }))
                                }
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
                                required
                                value={formData.country || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, country: e.target.value }))
                                }
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
                                required
                                value={formData.pincode || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, pincode: e.target.value }))
                                }
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="subjects" required>
                                Subjects
                            </Label>
                            <Select
                                id="subjects"
                                name="subjects"
                                required
                                multiple
                                value={formData.subjects || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(
                                        e.target.selectedOptions,
                                        (option) => option.value
                                    );
                                    setFormData(prev => ({ ...prev, subjects: selectedOptions }));
                                }}
                            >
                                <option value="english">English</option>
                                <option value="mathematics">Mathematics</option>
                                <option value="science">Science</option>
                                <option value="history">History</option>
                                <option value="geography">Geography</option>
                                <option value="physics">Physics</option>
                                <option value="chemistry">Chemistry</option>
                                <option value="computer science">
                                    Computer Science
                                </option>
                            </Select>
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
                        <span>
                            {editMode ? "Update Teacher" : "Submit now"}
                        </span>
                    </button>
                </Form>
            </Drawer>
        </div>
    );
};

export default Teachers;
