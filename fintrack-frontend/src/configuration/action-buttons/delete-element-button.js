import {Trash2} from "lucide-react";

export default function DeleteElementButton({ onClick }) {
    return (
        <button onClick={onClick}>
            <Trash2 size={20} color={"red"}/>
        </button>
    );
}