import moment from "moment";
import type { FC } from "react";

export interface EmployeeCardInterface {
    dob?: string;
    employeePhoto?: string;
    employeeName?: string;
    qualification?: string;
    email?: string;
    mobile?: string;
    address?: string;
    _id: string;
    setDeleteValue?: (data: string) => void;
    setUpdateValue?: (data: string) => void;
}

const EmployeeCard: FC<EmployeeCardInterface> = ({dob, employeePhoto, employeeName, qualification, email, mobile, address, _id, setDeleteValue, setUpdateValue}) => {
    return (
        <div className="bg-white rounded-xl shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group border border-gray-100">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 h-20 relative">
                <div className="absolute top-4 left-4">
                    <span className="bg-white/20 text-white px-3 py-1 text-xs font-medium rounded-md">
                        {moment(dob).format("ll")}
                    </span>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-20 h-20 bg-white rounded-full shadow-lg ring-4 ring-white overflow-hidden">
                        <img
                            src={
                                employeePhoto ||
                                "https://res.cloudinary.com/dqxwawaiz/image/upload/v1745391977/avt_uhehme.png"
                            }
                            alt="employee"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-10 pb-6 px-6">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {employeeName}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm mb-4">
                        <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full text-xs font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-300 cursor-pointer transform hover:scale-105">
                            {qualification}
                        </span>
                    </div>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <i className="ri-mail-line w-4 font-semibold"></i>
                            <span className="truncate">
                                {email}
                            </span>
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
                </div>

                <div className="flex space-x-3">
                    <button onClick={() => setUpdateValue?.(_id)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-200">
                        <i className="ri-edit-2-line text-sm"></i>
                        <span>Edit</span>
                    </button>
                    <button onClick={() => setDeleteValue?.(_id)} className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 font-medium py-2.5 px-3 rounded-lg transition-all duration-200 border border-gray-200 hover:border-red-200">
                        <i className="ri-delete-bin-7-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard;
