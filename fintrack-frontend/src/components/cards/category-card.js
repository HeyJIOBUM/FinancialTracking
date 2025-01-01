"use client"

import React, {useState} from 'react';
import EditElementButton from "@/configuration/action-buttons/edit-element-button";
import DeleteElementButton from "@/configuration/action-buttons/delete-element-button";
import CategoryEditModal from "@/components/edit-modals/category-edit-modal";

export default function CategoryCard({ category }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id, operationType, name } = category;

    const handleModalOpenToggle = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleCategoryStartEditing = () => {
        setIsModalOpen(true);
    }

    const handleCategoryDelete = () => {
        
    }
    

    const handleCategorySave = () => {
        setIsModalOpen(!isModalOpen);
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
                    <EditElementButton onClick={handleCategoryStartEditing}/>
                    <DeleteElementButton onClick={handleCategoryDelete}/>
                </div>
            </div>

            <CategoryEditModal
                isOpen={isModalOpen}
                onClose={handleModalOpenToggle}
                onSave={handleCategorySave}
                isEditing={true}
                category={category}
            />
        </>
    );
}
