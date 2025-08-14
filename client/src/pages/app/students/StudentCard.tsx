import type { FC } from "react";

interface StudentCardInterface {
    classNumber: number;
    studentPhoto: string;
    studentName: string;
    section: string;
    rollNumber: number;
    email: string;
    mobile: number;
    address: string;
    id: string;
    setStudentValue?: (data: string) => void
    setUpdateStudentValue?: (data: string) => void
}

const StudentCard: FC<StudentCardInterface> = ({classNumber, studentPhoto, studentName, section, rollNumber, email, mobile, address, id, setStudentValue, setUpdateStudentValue}) => {
  return (
    <div className="max-w-sm w-full">
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="bg-gradient-to-r from-gray-700 to-gray-800 h-20 relative">
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                Grade {classNumber}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative px-6 pb-6">
                                        <div className="flex justify-center -mt-10 mb-4">
                                            <div className="relative">
                                                <div className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg overflow-hidden">
                                                    <img
                                                    src={studentPhoto || "https://res.cloudinary.com/dqxwawaiz/image/upload/v1745391977/avt_uhehme.png"}
                                                    alt="Student"
                                                    className="object-cover w-full h-full"
                                                />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center mb-5">
                                            <h2 className="text-xl font-bold text-gray-800 mb-1 capitalize">
                                                {studentName}
                                            </h2>
                                            <p className="text-gray-500 text-sm mb-3">
                                                Class {classNumber}-{section} | Roll No. {rollNumber}
                                            </p>
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <i className="ri-mail-line w-4 font-semibold"></i>
                                                <span className="truncate">{email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <i className="ri-phone-line w-4 font-semibold"></i>
                                                <span>+91 {mobile}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <i className="ri-map-pin-line w-4 font-semibold"></i>
                                                <span>{address}</span>
                                            </div>
                                        </div>

                                        <div className="flex space-x-3">
                                            <button onClick={() => setUpdateStudentValue?.(id)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-200">
                                                <i className="ri-edit-2-line text-sm"></i>
                                                <span>Edit</span>
                                            </button>
                                            <button onClick={() => setStudentValue?.(id)} className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 font-medium py-2.5 px-3 rounded-lg transition-all duration-200 border border-gray-200 hover:border-red-200">
                                                <i className="ri-delete-bin-7-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
  )
}

export default StudentCard