import { useContext, useEffect, useState } from "react";
import Drawer from "../../../components/common/Drawer";
import Form, { type FormDataType } from "../../../components/common/Form";
import Input from "../../../components/common/Input";
import Label from "../../../components/common/Label";
import Select from "../../../components/common/Select";
import AuthContext from "../../../context/AuthContext";
import HttpInterceptor from "../../../utils/HttpInterceptor";
import { toast } from "react-toastify";
import CatchError from "../../../utils/error";

interface SubjectInterface {
    _id: string;
    subject: string;
    fullmarks: number;
}

interface FormDataInterface {
    _id?: string;
    subject?: string;
    fullmarks?: number;
}

const Subjects = () => {
    const [close, setClose] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const {session, sessionYear} = useContext(AuthContext);
    const [subjectsData, setSubjectsData] = useState<SubjectInterface[]>([]);
    const [formData, setFormData] = useState<FormDataInterface>({});

    useEffect(() => {
        if (session?.id && sessionYear) {
            fetchSubjects();
        }
    }, [session?.id, sessionYear]);

    const handleSubject = async (values: FormDataType) => {
        const payload = {
            ...values,
            school: session.id,
        };
        try {
            let response;
            if(editMode && formData?._id){
                response = await HttpInterceptor.put(
                    `/subject/${formData._id}`,
                    payload
                );
            }else{
                response = await HttpInterceptor.post("/subject", payload);
            }
            toast.success(response.data.message);
            setClose(false);
            fetchSubjects();
            resetForm()
        } catch (err) {
            CatchError(err);
        }
    }

    // fetching all subjects by school ID and session Year
    const fetchSubjects = async () => {
        try {
            const {data} = await HttpInterceptor.get(`/subject/${session.id}/${sessionYear}`)
            setSubjectsData(data)
        } catch (err) {
            CatchError(err)
        }
    }

    // update subject record
    const handleUpdateSubject = async (subjectId: string) => {
        const subjectInfo = subjectsData.find((t) => t._id === subjectId);
        if (subjectInfo) {
            setFormData({...subjectInfo});
            setClose(true);
            setEditMode(true);
        }
    }

    // deleting subject
    const handleDeleteSubject = async (subjectId: string) => {
        try {
            const {data} = await HttpInterceptor.delete(`/subject/${subjectId}`)
            toast.success(data.message)
            fetchSubjects()
        } catch (err) {
            CatchError(err)
        }
    }

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
                            All Subjects Data
                        </h2>
                    </div>
                    <div className="flex items-center gap-5">
                        <Input
                            type="search"
                            name="search"
                            placeholder="Search subjects list"
                            className="w-64"
                        />
                        <Select
                            name="subject-export"
                            id="subject-export"
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
                            <i className="ri-book-line"></i>
                            <span>Add subject</span>
                        </button>
                    </div>
                </header>
                <div className="border-b border-gray-200 mt-4 -ml-5 -mr-5" />

                {
                    subjectsData.length === 0 ?
                        <div className="flex flex-col items-center justify-center h-64 w-full text-center bg-gray-50 rounded-md border border-dashed border-gray-300 p-6 mt-10">
                            <i className="ri-user-unfollow-line text-4xl text-gray-400 mb-4"></i>
                            <h2 className="text-lg font-semibold text-gray-600">
                                No Subjects Found
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Try adding a new subject or check your filters.
                            </p>
                        </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-10">
                        {
                            subjectsData.map((subject, index: number) => (
                                <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                                    <div className="pt-10 pb-6 px-6">
                                        <div className="text-center mb-6">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                {subject.subject}
                                            </h3>
                                            <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm mb-3">
                                                <i className="ri-trophy-fill text-yellow-500"></i>
                                                <span className="font-semibold">
                                                    {subject.fullmarks} Marks
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex space-x-3">
                                            <button onClick={() => handleUpdateSubject(subject._id)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-200">
                                                <i className="ri-edit-2-line text-sm"></i>
                                                <span>Edit</span>
                                            </button>
                                            <button onClick={() => handleDeleteSubject(subject._id)} className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 font-medium py-2.5 px-3 rounded-lg transition-all duration-200 border border-gray-200 hover:border-red-200">
                                                <i className="ri-delete-bin-7-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>

            <Drawer
                title={editMode ? "Update Subject" : "Add a new subject"}
                onClose={close}
                setClose={handleCloseDrawer}
            >
                <Form onValue={handleSubject}>
                    <div className="flex justify-between items-center gap-5 mb-5">
                        <div className="w-full">
                            <Label htmlFor="subject" required>
                                Subject`s Name
                            </Label>
                            <Input
                                type="text"
                                name="subject"
                                placeholder="Enter subject's name"
                                id="subject"
                                value={formData.subject || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        subject: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="fullmarks" required>
                                Fullmarks
                            </Label>
                            <Input
                                type="number"
                                name="fullmarks"
                                placeholder="100"
                                id="fullmarks"
                                value={formData.fullmarks || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        fullmarks: Number(e.target.value),
                                    }))
                                }
                                required
                            />
                        </div>
                    </div>

                    <button className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white hover:scale-103 transition duration-300 cursor-pointer space-x-1">
                        <i className="ri-arrow-right-line"></i>
                        <span>{editMode ? "Update now" : "Add now"}</span>
                    </button>
                </Form>
            </Drawer>
        </div>
    );
};

export default Subjects;
