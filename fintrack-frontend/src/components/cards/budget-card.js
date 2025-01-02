"use client"

import React, {useState} from 'react';
import EditElementButton from "@/configuration/action-buttons/edit-element-button";
import DeleteElementButton from "@/configuration/action-buttons/delete-element-button";
import BudgetEditModal from "@/components/edit-modals/budget-edit-modal";
import {useDeleteBudgetMutation} from "@/configuration/api/budgets-api";
import {toast} from "react-toastify";

export default function BudgetCard({ enrichedBudget }) {
    const [deleteBudget, deleteMutationResult] = useDeleteBudgetMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        id,
        title,
        categories,
        amount,
        fromDate,
        toDate,
        description,
        totalExpensesAmount,
    } = enrichedBudget;

    const handleModalOpenToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleBudgetDelete = () => {
        deleteBudget({ id: id })
            .unwrap()
            .catch(() => {
                toast.error("Cannot delete this budget!");
            });
    };

    const remainingBudget = amount - totalExpensesAmount
    const remainingLabel = remainingBudget >= 0 ? 'remaining' : 'overspending'

    return (
        <>
            <div
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-transform duration-200 hover:scale-[1.01]">
                <div className="text-xl font-semibold text-gray-800">
                    {title}, {remainingLabel} : {remainingBudget.toFixed(2)} Br
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Categories: <span className="font-medium">
                        {categories.length === 0 ? (
                            " All categories"
                        ) : (
                            categories.map(category => category.name).join(", ")
                        )}
                    </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Amount: <span className="font-medium">{amount.toFixed(2)} Br</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Total Expenses: <span className="font-medium">{totalExpensesAmount.toFixed(2)} Br</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Remaining: <span className="font-medium">{remainingBudget.toFixed(2)} Br</span>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                    From: <span className="font-medium">{new Date(fromDate).toJSON().slice(0, 10)}</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    To: <span className="font-medium">{new Date(toDate).toJSON().slice(0, 10)}</span>
                </div>
                {
                    description?.length !== 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                            Description: <span className="font-medium">{description}</span>
                        </div>
                    )
                }

                <div className="mt-4 flex gap-4">
                    <EditElementButton onClick={handleModalOpenToggle}/>
                    <DeleteElementButton onClick={handleBudgetDelete}/>
                </div>
            </div>

            {/* Edit Modal */}
            <BudgetEditModal
                isOpen={isModalOpen}
                onClose={handleModalOpenToggle}
                onSave={handleModalOpenToggle}
                isEditing={true}
                budget={enrichedBudget}
            />
        </>
    );
}
