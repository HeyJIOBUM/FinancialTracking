"use client";

import {CircleX} from "lucide-react";
import {useEffect, useState} from "react";
import {OperationType} from "@/types/operation-type";
import {useAddCategoryMutation, useUpdateCategoryMutation} from "@/configuration/api/categories-api";

export default function CategoryEditModal({ isOpen, onClose, onSave, isEditing, category }) {
    const [ updateCategory, updateMutationResult ] = useUpdateCategoryMutation();
    const [ addCategory, addMutationResult ] = useAddCategoryMutation();

    const [errorMessage, setErrorMessage] = useState(null);

    const [name, setName] = useState(isEditing ? category.name : "");
    const [operationType, setOperationType] = useState(isEditing ? category.operationType : OperationType.EXPENSE);

    const clearErrorMessage = () => {
        setErrorMessage(null);
    };

    useEffect(() => {
        setErrorMessage(null);
    }, [name, operationType]);

    const handleModalClose = () => {
        setName(isEditing ? category.name : name);
        setOperationType(isEditing ? category.operationType : operationType);

        onClose();
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const categoryData = {
            id: isEditing ? category.id : undefined,
            name: name,
            operationType: operationType,
        };

        if (isEditing) {
            updateCategory({id: categoryData.id, category: categoryData})
                .unwrap()
                .then(() => {
                    clearErrorMessage()
                    onSave(categoryData);
                })
                .catch((err) => {
                    setErrorMessage(err.error);
                });
        }
        else {
            addCategory({category: categoryData})
                .unwrap()
                .then(() => {
                    clearErrorMessage()
                    onSave(categoryData);
                })
                .catch((err) => {
                    setErrorMessage(err.error);
                });
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
                <div className="relative max-w-screen-sm rounded bg-white p-6 pt-3 shadow-md">
                    {/* Close Button */}
                    <button
                        onClick={handleModalClose}
                        aria-label="Close"
                        className="absolute right-2 top-[13px]"
                    >
                        <CircleX strokeWidth={1} />
                    </button>

                    <form onSubmit={handleSubmit}>
                        <h2 className="mb-4 text-lg font-semibold">
                            {isEditing ? "Edit Category" : "Create Category"}
                        </h2>

                        {/* Category Name Input */}
                        <div className="mb-4">
                            <div className="text-sm font-medium text-gray-700">Category Name</div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                placeholder="Enter category name"
                                required
                            />
                        </div>

                        {/* Operation Type Select */}
                        <div className="mb-1">
                            <label className="block text-sm font-medium text-gray-700">Operation Type</label>
                            <select
                                value={operationType}
                                onChange={(e) => setOperationType(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                            >
                                <option value="Expense">Expense</option>
                                <option value="Income">Income</option>
                            </select>
                        </div>

                        {/* Error Message */}
                        {errorMessage && (
                            <p className="mb-[-12px] mt-1 text-center text-xs text-red-600">
                                {errorMessage}
                            </p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="mt-4 rounded bg-black px-4 py-2 text-white transition duration-200 hover:bg-gray-800"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    );
}
