import React from "react";

const FormElement = ({ element }) => {
    return (
        <div>
            <button
                id={element.id}
                className="outline-none border border-slate-100 shadow-md px-4 py-2 text-black w-full h-[60px] my-2"
            >
                {element.content}
            </button>
        </div>
    );
};

export default FormElement;
