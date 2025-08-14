import type { FC } from "react";

interface ClassCardInterface {
    className: string;
    teacherName: string;
    fee: number;
    sections: string[];
    id: string;
    setDeleteValue?: (data: string) => void;
    setUpdateValue?: (data: string) => void;
}

const ClassCard: FC<ClassCardInterface> = ({className, teacherName, fee, sections, id, setDeleteValue, setUpdateValue}) => {
    const sectionColors = [
    "border-emerald-300 text-emerald-700 hover:bg-emerald-50",
    "border-blue-300 text-blue-700 hover:bg-blue-50",
    "border-purple-300 text-purple-700 hover:bg-purple-50",
    "border-pink-300 text-pink-700 hover:bg-pink-50",
    "border-rose-300 text-rose-700 hover:bg-rose-50",
    "border-gray-300 text-gray-700 hover:bg-gray-50",
    ];

    return (
        <div
            className="bg-white rounded-xl shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group border border-gray-100"
        >
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 h-20 relative">
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-white overflow-hidden">
                        <h2 className="text-lg font-bold text-gray-700">
                            {className}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="pt-12 pb-6 px-6">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {teacherName}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm mb-4">
                        <span className="font-bold text-lg text-gray-800">
                            ₹ {fee.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {sections.map(
                            (section: any, colorIndex: number) => (
                                <span
                                    key={section}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                        sectionColors[
                                            colorIndex % sectionColors.length
                                        ]
                                    }`}
                                >
                                    Section {section}
                                </span>
                            )
                        )}
                    </div>
                </div>

                <div className="flex space-x-3">
                    <button onClick={() => setUpdateValue?.(id)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-200">
                        <i className="ri-edit-2-line text-sm"></i>
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={() => setDeleteValue?.(id)}
                        className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 font-medium py-2.5 px-3 rounded-lg transition-all duration-200 border border-gray-200 hover:border-red-200"
                    >
                        <i className="ri-delete-bin-7-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;
