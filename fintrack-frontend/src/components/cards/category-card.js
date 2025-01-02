"use client"

import React, {useState} from 'react';
import EditElementButton from "@/configuration/action-buttons/edit-element-button";
import DeleteElementButton from "@/configuration/action-buttons/delete-element-button";
import CategoryEditModal from "@/components/edit-modals/category-edit-modal";
import {useDeleteCategoryMutation} from "@/configuration/api/categories-api";
import {toast} from "react-toastify";

export default function CategoryCard({ category }) {
    const [ deleteCategory, deleteMutationResult ] = useDeleteCategoryMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id, operationType, name } = category;

    const handleModalOpenToggle = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleCategoryDelete = () => {
        deleteCategory({id: id})
            .unwrap()
            .catch(() => {
                toast.error("Cannot delete a category you are using!");
            })
    }

    return (
        <>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md hover:scale-[1.01]">
                <div className="text-xl font-semibold text-gray-800">
                    {name}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Operation type: <span className="font-medium">{operationType}</span>
                </div>
                <div className="mt-4 flex gap-6">
                    <EditElementButton onClick={handleModalOpenToggle}/>
                    <DeleteElementButton onClick={handleCategoryDelete}/>
                </div>
            </div>

            <CategoryEditModal
                isOpen={isModalOpen}
                onClose={handleModalOpenToggle}
                onSave={handleModalOpenToggle}
                isEditing={true}
                category={category}
            />
        </>
    );
}
