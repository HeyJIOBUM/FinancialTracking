"use client"

import React, {useState} from 'react';
import EditElementButton from "@/configuration/action-buttons/edit-element-button";
import DeleteElementButton from "@/configuration/action-buttons/delete-element-button";
import ExpenseEditModal from "@/components/edit-modals/expense-edit-modal";
import {useDeleteExpenseMutation} from "@/configuration/api/expenses-api";

export default function ExpenseCard({ expense }) {
    const [ deleteExpense, deleteMutationResult ] = useDeleteExpenseMutation();
    const { id, category, amount, date, description } = expense;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpenToggle = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleExpenseDelete = () => {
        deleteExpense({id: id})
    }

    return (
        <>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md hover:scale-[1.01]">
                <div className="text-xl font-semibold text-gray-800">
                    Expense: {category.name}, {amount.toFixed(2)}Br
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Category: <span className="font-medium">{category.name}</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Amount: <span className="font-medium">{amount.toFixed(2)}Br</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Date: <span className="font-medium">{new Date(date).toJSON().slice(0, 10)}</span>
                </div>
                {
                    description?.length !== 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                            Description: <span className="font-medium">{description}</span>
                        </div>
                    )
                }
                <div className="mt-4 flex gap-6">
                    <EditElementButton onClick={handleModalOpenToggle}/>
                    <DeleteElementButton onClick={handleExpenseDelete} />
                </div>
            </div>

            <ExpenseEditModal
                isOpen={isModalOpen}
                onClose={handleModalOpenToggle}
                onSave={handleModalOpenToggle}
                isEditing={true}
                expense={expense}
            />
        </>
    );
}
