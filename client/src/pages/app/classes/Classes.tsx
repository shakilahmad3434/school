import { useContext, useEffect, useState } from "react";
import Drawer from "../../../components/common/Drawer";
import Form, { type FormDataType } from "../../../components/common/Form";
import Input from "../../../components/common/Input";
import Label from "../../../components/common/Label";
import Select from "../../../components/common/Select";
import CatchError from "../../../utils/error";
import HttpInterceptor from "../../../utils/HttpInterceptor";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import ClassCard from "./ClassCard";
import Modal from "../../../components/common/Modal";

interface FormDataInterface {
    _id?: string;
    class?: string;
    fee?: string;
    classTeacher?: TeacherInterface;
    sections?: string[];
}

interface TeacherInterface {
    _id: string;
    teacherName: string;
}

interface ClassInfoInterface {
    _id: string;
    class: string;
    fee: number;
    classTeacher?: TeacherInterface;
    sections: string[];
}

const Classes = () => {
    const [close, setClose] = useState(false);
    const [modalClose, setModalClose] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState<FormDataInterface>({});
    const [classTeacher, setClassTeacher] = useState<TeacherInterface[]>([]);
    const [classData, setClassData] = useState<ClassInfoInterface[]>([]);
    const { session, sessionYear } = useContext(AuthContext);


    // adding a new class
    const handleClasses = async (values: FormDataType) => {
    try {
        const payload = {
            ...values,
            classTeacher: formData.classTeacher?._id,
            school: session.id,
        };

        let response;
        if (editMode && formData._id) {
            response = await HttpInterceptor.put(`/class/${formData._id}`, payload);
        } else {
            response = await HttpInterceptor.post("/class", payload);
        }

        toast.success(response.data.message);
        setClose(false);
        resetForm();
        fetchClasses();
    } catch (err) {
        CatchError(err);
    }
};


    useEffect(() => {
    if (session?.id && sessionYear) {
        fetchTeachers();
        fetchClasses();
    }
}, [session, sessionYear]);

    // fetching a total classes
    const fetchClasses = async () => {
        try {
            const { data } = await HttpInterceptor.get(
                `/class/${session.id}/${sessionYear}`
            );

            setClassData(data);
        } catch (err) {
            CatchError(err);
        }
    };

    // fetching the all teachers
    const fetchTeachers = async () => {
        try {
            const { data } = await HttpInterceptor.get(`/teacher/${session.id}/${sessionYear}`);
            setClassTeacher(data);

            if(data.length === 0)
                setModalClose(true)
        } catch (err) {
            CatchError(err);
        }
    };

    const resetForm = () => {
        setFormData({});
        setEditMode(false);
    };

    // update teacher
        const handleUpdateClass = (id: string) => {
            const classInfo: any = classData.find((t: any) => t._id === id);
            if (classInfo) {
                setFormData(classInfo);
                setClose(true);
                setEditMode(true);
            }
        };

    // delete class
    const deleteClass = async (classId: string) => {
        try {
            const {data} = await HttpInterceptor.delete(`/class/${classId}`)
            toast.success(data.message)
            fetchClasses()
        } catch (err) {
            CatchError(err)
        }
    }

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
                            All Classes Data
                        </h2>
                    </div>
                    <div className="flex items-center gap-5">
                        <Input
                            type="search"
                            name="search"
                            placeholder="Search Classes List"
                            className="w-64"
                        />
                        <Select
                            name="class-export"
                            id="class-export"
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
                            <span>Add New Class</span>
                        </button>
                    </div>
                </header>
                <div className="border-b border-gray-200 mt-4 -ml-5 -mr-5" />

                {
                    classData?.length === 0 ?
                        <div className="flex flex-col items-center justify-center h-64 w-full text-center bg-gray-50 rounded-md border border-dashed border-gray-300 p-6 mt-10">
                            <i className="ri-user-unfollow-line text-4xl text-gray-400 mb-4"></i>
                            <h2 className="text-lg font-semibold text-gray-600">
                                No Classes Found
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Try adding a new class or check your filters.
                            </p>
                        </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-10">
                        {
                            classData.map((classInfo: any, index: number) => (
                                <ClassCard key={index} className={classInfo.class} teacherName={classInfo.classTeacher?.teacherName} fee={classInfo.fee} sections={classInfo.sections} id={classInfo._id} setDeleteValue={deleteClass} setUpdateValue={handleUpdateClass} />
                            ))
                        }
                    </div>
                }
                
            </div>

            <Drawer title={editMode ? "Edit Class" : "Add a new class"} onClose={close} setClose={handleCloseDrawer}>
                <Form onValue={handleClasses}>
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="class" required>
                                Class
                            </Label>
                            <Input
                                type="text"
                                name="class"
                                placeholder="KG"
                                id="class"
                                value={formData.class || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, class: e.target.value }))
                                }
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="fee" required>
                                Fee
                            </Label>
                            <Input
                                type="number"
                                name="fee"
                                placeholder="100"
                                id="fee"
                                value={formData.fee || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, fee: e.target.value }))
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="classTeacher" required>
                                Class Teacher
                            </Label>
                            <Select
                                id="classTeacher"
                                name="classTeacher"
                                value={formData.classTeacher?._id || ""}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, classTeacher: classTeacher?.find((t: any) => t._id === e.target.value) }))
                                }
                                required
                            >
                                <option value="">Select Teacher</option>
                                {classTeacher?.map(
                                    (teacher: any, index: number) => (
                                        <option key={index} value={teacher._id}>
                                            {teacher.teacherName}
                                        </option>
                                    )
                                )}
                            </Select>
                        </div>
                    </div>

                    <div className="mb-5">
                        <Label htmlFor="sections" required>
                            Sections
                        </Label>
                        <Select 
                            id="sections" 
                            name="sections"
                            value={formData.sections || []}
                            onChange={(e) =>{
                                const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value)
                                setFormData(prev => ({ ...prev, sections: selectedOptions }));
                            }
                            }
                            required 
                            multiple>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                        </Select>
                    </div>

                    <button className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white hover:scale-103 transition duration-300 cursor-pointer space-x-1">
                        <i className="ri-arrow-right-line"></i>
                        <span>{editMode ? "Update now" : "Add now"}</span>
                    </button>
                </Form>
            </Drawer>

            <Modal modalClose={modalClose} setModalClose={setModalClose} description="0 Teachers ! Please add a Teacher first." buttonText="Ok, Add teacher" link="/app/teachers" />
        </div>
    );
};

export default Classes;
