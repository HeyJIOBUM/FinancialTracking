"use client";

import {CircleX} from "lucide-react";
import React, {useEffect, useState} from "react";
import Select from 'react-select';
import {OperationType} from "@/types/operation-type";
import {useGetCategoriesQuery} from "@/configuration/api/categories-api";
import {useAddBudgetMutation, useUpdateBudgetMutation} from "@/configuration/api/budgets-api";
import {formatDateToISO} from "@/utils/date-utils";


export default function BudgetEditModal({ isOpen, onClose, onSave, isEditing, budget }) {
    const [ updateBudget, updateMutationResult ] = useUpdateBudgetMutation();
    const [ addBudget, addMutationResult ] = useAddBudgetMutation();

    const [errorMessage, setErrorMessage] = useState(null);

    const convertCategoriesToSelectOptions = (categories) => {
        return categories.map((category) => ({value: category.id, label: category.name}))
    }

    const extractCategoryIdsFromSelectOptions = (selectOptions) => {
        return selectOptions.map((option) => (option.value));
    }

    const initialFormData = {
        title: isEditing ? budget.title : `New budget`,
        categories: isEditing ? convertCategoriesToSelectOptions(budget.categories) : [],
        amount: isEditing ? budget.amount : 100.00,
        fromDate: isEditing ? formatDateToISO(budget.fromDate) : formatDateToISO(new Date()),
        toDate: isEditing ? formatDateToISO(budget.toDate) : formatDateToISO(new Date()),
        description: isEditing ? budget.description : ""
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

    const filteredCategories = categories.filter(category => category.operationType === OperationType.EXPENSE);
    const availableCategoryOptions = convertCategoriesToSelectOptions(filteredCategories);

    const handleSelectChange = (selectedOptions) => {
        setFormData(prevData => ({
            ...prevData,
            categories: selectedOptions,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.fromDate > formData.toDate) {
            setErrorMessage("From date can not be after To date");
            return;
        }

        const budgetToSend = {
            ...formData,
            categories: extractCategoryIdsFromSelectOptions(formData.categories),
        }

        if (isEditing) {
            updateBudget({id: budget.id, budget: budgetToSend})
                .unwrap()
                .then(() => {
                    clearErrorMessage()
                    onSave(formData);
                })
                .catch((err) => {
                    setErrorMessage(err.error);
                });
        }
        else {
            addBudget({budget: budgetToSend})
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
                <div className="relative w-[400px] rounded bg-white p-6 pt-3 shadow-md">
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
                            {isEditing ? "Edit Budget" : "Create Budget"}
                        </h2>

                        {/* Title input */}
                        <div className="mb-1">
                            <div className="text-sm font-medium text-gray-700">Title</div>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleFormChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                                placeholder="Enter budget title"
                                maxLength={20}
                            />
                        </div>

                        {/* Categories Multi-Select */}
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700">Categories</label>
                            <Select
                                isMulti
                                name="categories"
                                options={availableCategoryOptions}
                                onChange={handleSelectChange}
                                value={formData.categories}
                                placeholder={`Select categories...`}
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        borderColor: '#d2d2e6',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            borderColor: '#d2d2e6',
                                        },
                                    }),
                                    option: (provided,{ data, isDisabled, isFocused, isSelected }) => {
                                        provided = {
                                            ...provided,
                                            ':active': {
                                                ...provided[':active'],
                                                backgroundColor: '#bcc5cc',
                                            },
                                            width : (provided.width - 10) + 'px',
                                            marginRight : '5px',
                                            marginLeft : '5px',
                                            borderRadius: '5px',
                                        }

                                        if (isFocused) {
                                            provided.backgroundColor = '#e3e9ef';
                                            provided.paddingLeft = '5px';
                                        }

                                        if (isSelected) {
                                            provided.backgroundColor = '#e3e9ef';
                                        }

                                        return {
                                            ...provided,
                                        };
                                    },
                                    multiValue: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#e3e9ef',
                                    }),
                                    multiValueLabel: (provided) => ({
                                        ...provided,
                                        color: '#101010',
                                    }),
                                    multiValueRemove: (provided) => ({
                                        ...provided,
                                        ':hover': {
                                            backgroundColor: '#dc5858',
                                            color: 'white',
                                        },
                                    }),
                                }}
                            />
                        </div>

                        {/* Amount input */}
                        <div className="mb-4">
                            <div className="text-sm font-medium text-gray-700">Budget amount</div>
                            <input
                                type="number"
                                step='0.01'
                                min='0'
                                name="amount"
                                value={formData.amount}
                                onChange={handleFormChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                                placeholder="Enter budget amount"
                                required
                            />
                        </div>

                        {/* From Date input */}
                        <div className="mb-4">
                            <div className="text-sm font-medium text-gray-700">From Date</div>
                            <input
                                type="date"
                                name="fromDate"
                                value={formData.fromDate}
                                onChange={handleFormChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                                required
                            />
                        </div>

                        {/* To Date input */}
                        <div className="mb-4">
                            <div className="text-sm font-medium text-gray-700">To Date</div>
                            <input
                                type="date"
                                name="toDate"
                                value={formData.toDate}
                                onChange={handleFormChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                                required
                            />
                        </div>

                        {/* Description input */}
                        <div className="mb-1">
                            <div className="text-sm font-medium text-gray-700">Budget description</div>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleFormChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                                placeholder="Enter budget description"
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