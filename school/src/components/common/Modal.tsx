import type { FC } from "react"
import { useNavigate } from "react-router-dom";

interface ModalInterface {
    description?: string;
    buttonText?: string;
    link?: string
    modalClose?: boolean;
    setModalClose?: (data: boolean) => void
}

const Modal: FC<ModalInterface> = ({modalClose= false, setModalClose, description="modal description", buttonText="button", link="/app/dashboard"}) => {
    if(!modalClose)
        return null

    const navigation = useNavigate()

  return (
    <div className="fixed inset-0 z-100 bg-black/70 py-10">
        <div className="bg-white mx-auto shadow w-full max-w-md px-5 py-2 border border-indigo-500 rounded transition-all duration-500 animate__animated animate__slideInDown">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">EduDash</h2>
                <button onClick={() => setModalClose?.(false)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-rose-500 hover:text-white transition duration-300 cursor-pointer"><i className="ri-close-line text-xl"></i></button>
            </div>
            <div className="border-b border-gray-200 mt-4 -ml-5 -mr-5" />
            <div className="py-5 px-2">
                {description}
            </div>
            <div className="border-b border-gray-200 mt-4 -ml-5 -mr-5" />
            <div className="flex justify-end mt-3">
                <button onClick={() => navigation(link)} className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded text-white hover:scale-105 transition duration-300">{buttonText}</button>
            </div>
        </div>
    </div>
  )
}

export default Modal