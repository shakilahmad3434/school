import type { FC, FormEvent, FormHTMLAttributes } from "react";

export type FormDataType = Record<string, string | string[] | File | File[]>;

interface FormInterface extends FormHTMLAttributes<HTMLFormElement> {
  onValue?: (data: FormDataType) => void;
}

const Form: FC<FormInterface> = ({ onValue, children }) => {
  const handleInput = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: FormDataType = {};

    for (const [name] of formData.entries()){
        const values = formData.getAll(name)

        if(values.length > 1){
            if(values[0] instanceof File){
                data[name] = values as File[]
            } else{
                data[name] = values.map(v => v.toString());
            }
        } else {
            const value = values[0];
            data[name] = value instanceof File ? value : value.toString()
        }
    }

    onValue?.(data);
  };

  return <form onSubmit={handleInput}>{children}</form>;
};

export default Form;
