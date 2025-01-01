import {Pencil} from "lucide-react";

export default function EditElementButton({ onClick }) {
    return (
        <button onClick={onClick}>
            <Pencil size={20} color={"blue"}/>
        </button>
    );
}