"use client"

import {useGetCategoriesQuery} from "@/configuration/api/categories-api";
import Loading from "@/components/loading";
import CategoryCard from "@/components/cards/category-card";
import {OperationType} from "@/types/operation-type";
import React, {useState} from "react";
import CategoryEditModal from "@/components/edit-modals/category-edit-modal";
import AddElementButton from "@/configuration/action-buttons/add-element-button";

export default function CategoriesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data: categories, error, isLoading} = useGetCategoriesQuery();
    const [selectedType, setSelectedType] = useState(OperationType.EXPENSE);

    const handleModalOpenToggle = () => {
        setIsModalOpen(!isModalOpen);
    }

    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        throw new Error(error.error);
    }

    const filteredCategories = categories.filter(category => category.operationType === selectedType);

    return (
        <div className="flex flex-col">
            {/*ToggleOperationType*/}
            <div className="mb-4 flex space-x-4">
                {/*Expense Categories*/}
                <button
                    onClick={() => setSelectedType(OperationType.EXPENSE)}
                    className={`rounded border-b-4 px-4 pb-2 ${selectedType === OperationType.EXPENSE ? 'border-black' : 'border-transparent'} bg-white`}
                >
                    Expense Categories
                </button>
                {/*Income Categories*/}
                <button
                    onClick={() => setSelectedType(OperationType.INCOME)}
                    className={`rounded border-b-4 px-4 pb-2 ${selectedType === OperationType.INCOME ? 'border-black' : 'border-transparent'} bg-white`}
                >
                    Income Categories
                </button>
            </div>

            {/*Categories*/}
            <div className="flex flex-col gap-4 rounded border border-gray-300 p-4">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map(category => (
                        <CategoryCard key={category.id} category={category}/>
                    ))
                ) : (
                    <p>No {selectedType.toLowerCase()} categories available.</p>
                )}
            </div>

            <AddElementButton onClick={handleModalOpenToggle}/>

            <CategoryEditModal
                isOpen={isModalOpen}
                onClose={handleModalOpenToggle}
                onSave={handleModalOpenToggle}
                isEditing={false}
            />
        </div>
    );
}