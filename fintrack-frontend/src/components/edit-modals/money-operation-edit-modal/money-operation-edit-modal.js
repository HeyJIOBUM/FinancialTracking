"use client";

import {CircleX} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useGetCategoriesQuery} from "@/configuration/api/categories-api";
import {formatDateToISO} from "@/utils/date-utils";

export default function MoneyOperationEditModal({
                                                    isOpen,
                                                    onClose,
                                                    onSave,
                                                    isEditing,
                                                    moneyOperation,
                                                    operationType,
                                                    useUpdateOperationMutation,
                                                    useAddOperationMutation,
                                                }) {
    const [updateMoneyOperation, updateMutationResult] = useUpdateOperationMutation();
    const [addMoneyOperation, addMutationResult] = useAddOperationMutation();

    const [errorMessage, setErrorMessage] = useState(null);

    const initialFormData = {
        category: isEditing ? moneyOperation.category.id : -1,
        amount: isEditing ? moneyOperation.amount : 10.00,
        date: isEditing ? formatDateToISO(moneyOperation.date) : formatDateToISO(new Date()),
        description: isEditing ? moneyOperation.description : ""
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const clearErrorMessage = () => {
        setErrorMessage(null);
    };

    useEffect(() => {
        clearErrorMessage();
    }, [formData]);

    const handleModalClose = () => {
        setFormData(initialFormData);
        onClose();
    };

    const {data: categories, error: categoriesError, isLoading: isCategoriesLoading} = useGetCategoriesQuery();

    if (isCategoriesLoading) {
        return <></>;
    }

    if (categoriesError) {
        throw new Error(categoriesError.error);
    }

    const filteredCategories = categories.filter(category => category.operationType === operationType);

    if (formData.category === -1 && filteredCategories.length > 0) {
        formData.category = filteredCategories[0].id;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.amount <= 0) {
            setErrorMessage("Amount must be positive number");
            return;
        }

        if (isEditing) {
            updateMoneyOperation({id: moneyOperation.id, [operationType.toLowerCase()]: formData})
                .unwrap()
                .then(() => {
                    clearErrorMessage()
                    onSave(formData);
                })
                .catch((err) => {
                    setErrorMessage(err.error);
                });
        } else {
            addMoneyOperation({[operationType.toLowerCase()]: formData})
                .unwrap()
                .then(() => {
                    clearErrorMessage()
                    onSave(formData);
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
                        <CircleX strokeWidth={1}/>
                    </button>

                    <form onSubmit={handleSubmit}>
                        <h2 className="mb-4 text-lg font-semibold">
                            {isEditing ? `Edit ${operationType}` : `Create ${operationType}`}
                        </h2>

                        {/* Category select */}
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700">{operationType} category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleFormChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                            >
                                {filteredCategories.map((category) => (
                                    <option value={category.id} key={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        {/*Amount input*/}
                        <div className="mb-4">
                            <div className="text-sm font-medium text-gray-700">{operationType} amount</div>
                            <input
                                type="number"
                                step='0.01'
                                min='0'
                                name="amount"
                                value={formData.amount}
                                onChange={handleFormChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                                placeholder="Enter expense amount"
                                required
                            />
                        </div>

                        {/*Date input*/}
                        <div className="mb-4">
                            <div className="text-sm font-medium text-gray-700">{operationType} date</div>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleFormChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                                required
                            />
                        </div>

                        {/*Description input*/}
                        <div className="mb-1">
                            <div className="text-sm font-medium text-gray-700">{operationType} description</div>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleFormChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                                placeholder="Enter expense description"
                            />
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
