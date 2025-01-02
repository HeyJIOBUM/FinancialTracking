"use client"

import {useGetBudgetsQuery} from "@/configuration/api/budgets-api";
import Loading from "@/components/loading";
import BudgetCard from "@/components/cards/budget-card";
import {useGetExpensesQuery} from "@/configuration/api/expenses-api";
import React, {useState} from "react";
import {DataViewMode} from "@/types/data-view-mode";
import DataHeader from "@/components/data-header";
import {OperationType} from "@/types/operation-type";
import BudgetGraphic from "@/components/graphic/budget-graphic";
import AddElementButton from "@/configuration/action-buttons/add-element-button";
import BudgetEditModal from "@/components/edit-modals/budget-edit-modal";

export default function BudgetsPage() {
    const {data: budgets, error: budgetsError, isLoading: isBudgetsLoading} = useGetBudgetsQuery();
    const {data: expenses, error: expensesError, isLoading: isExpensesLoading} = useGetExpensesQuery();

    const dataHeaderInitialState = {
        chosenCategories: [],
        fromDate: "2020-01-01",
        toDate: new Date().toJSON().slice(0, 10),
        dataViewMode: DataViewMode.LIST
    };

    const [dataHeaderState, setDataHeaderState] = useState(dataHeaderInitialState);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpenToggle = () => {
        setIsModalOpen(!isModalOpen);
    }

    function extractExpensesFromBudgets(budgets, expenses) {
        return budgets.map(budget => {
            const budgetCategoriesIds = budget.categories.map(category => category.id);
            const fromDate = new Date(budget.fromDate);
            const toDate = new Date(budget.toDate);

            const relevantExpenses = expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return (
                    budgetCategoriesIds.length === 0 || budgetCategoriesIds.includes(expense.category.id) &&
                    expenseDate >= fromDate &&
                    expenseDate <= toDate
                );
            });


            const totalExpensesAmount = relevantExpenses.reduce((total, expense) => total + expense.amount, 0);
            return {
                ...budget,
                totalExpensesAmount,
            };
        });
    }

    if (isBudgetsLoading || isExpensesLoading) {
        return <Loading />;
    }

    if (budgetsError) {
        throw Error(budgetsError.error);
    }
    if (expensesError) {
        throw Error(expensesError.error);
    }

    const enrichedBudgets = extractExpensesFromBudgets(budgets, expenses);

    return (
        <div>
            <DataHeader
                categoriesOperationType={OperationType.EXPENSE}
                dataHeaderState={dataHeaderState}
                setDataHeaderState={setDataHeaderState}
            />

            {/*Budgets*/}
            {
                enrichedBudgets.length > 0 ? (
                    dataHeaderState.dataViewMode === DataViewMode.LIST ? (
                        <div className="flex flex-col gap-4 rounded border border-gray-300 p-4">
                            {
                                enrichedBudgets.map(enrichedBudget => (
                                    <BudgetCard key={enrichedBudget.id} enrichedBudget={enrichedBudget} />
                                ))
                            }
                        </div>
                    ) : (
                        <BudgetGraphic
                            enrichedBudgets={enrichedBudgets}
                            toDate={toDate}
                            fromDate={fromDate}
                        />
                    )
                ) : (
                    <p>
                        No budgets available.
                    </p>
                )
            }

            <AddElementButton onClick={handleModalOpenToggle}/>

            <BudgetEditModal
                isOpen={isModalOpen}
                onClose={handleModalOpenToggle}
                onSave={handleModalOpenToggle}
                isEditing={false}
            />
        </div>
    );
}