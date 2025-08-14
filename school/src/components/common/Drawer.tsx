import type { FC, ReactNode } from "react";

interface DrawerInterface {
    title?: string;
    children?: ReactNode;
    onClose: boolean;
    setClose: (data: boolean) => void;
}

const Drawer: FC<DrawerInterface> = ({title = "Drawer Title", children, onClose, setClose}) => {

  return (
    <div className={`fixed bg-white top-0 right-0 ${onClose ? "w-1/3 p-5" : "w-0 p-0"} h-screen transition-width duration-300 overflow-auto`}>
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={() => setClose(false)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-rose-500 hover:text-white transition duration-300 cursor-pointer"><i className="ri-close-line text-xl"></i></button>
        </div>

        <div className="border-b border-gray-200 mt-4 -ml-5 -mr-5" />
        <div className="py-5 px-2">
            {
                children
            }
        </div>
    </div>
  )
}

export default Drawer