import {Plus} from "lucide-react";
import React from "react";

export default function AddElementButton({ onClick }) {
    return (
        <div className="fixed bottom-10 right-10 z-20">
            <button
                onClick={onClick}
                className="rounded-full bg-green-400 p-3 shadow-lg hover:bg-green-600">
                <Plus size={30} color={"white"}/>
            </button>
        </div>
    );
}

