"use client";

import {useGetExpensesQuery} from "@/configuration/api/expenses-api";
import Loading from "@/components/loading";
import ExpenseCard from "@/components/cards/money-operation-card/expense-card";
import DataHeader from "@/components/data-header";
import React, {useState} from "react";
import {DataViewMode} from "@/types/data-view-mode";
import {OperationType} from "@/types/operation-type";
import ExpenseEditModal from "@/components/edit-modals/money-operation-edit-modal/expense-edit-modal";
import AddElementButton from "@/configuration/action-buttons/add-element-button";

export default function ExpensesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data: expenses, error, isLoading} = useGetExpensesQuery();

    const dataHeaderInitialState = {
        chosenCategories: [],
        fromDate: "2020-01-01",
        toDate: new Date().toJSON().slice(0, 10),
        dataViewMode: DataViewMode.LIST
    };

    const [dataHeaderState, setDataHeaderState] = useState(dataHeaderInitialState);

    const handleModalOpenToggle = () => {
        setIsModalOpen(!isModalOpen);
    }

    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        throw Error(error.error);
    }

    let { chosenCategories, fromDate, toDate } = dataHeaderState;
    fromDate = new Date(fromDate);
    toDate = new Date(toDate);

    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return (
            (chosenCategories.length === 0 || chosenCategories.includes(expense.category)) &&
            expenseDate >= fromDate &&
            expenseDate <= toDate
        );
    });

    return (
        <div>
            <DataHeader
                categoriesOperationType={OperationType.EXPENSE}
                dataHeaderState={dataHeaderState}
                setDataHeaderState={setDataHeaderState}
            />

            {/*Expenses*/}
            <div className="flex flex-col gap-4 rounded border border-gray-300 p-4">
                {filteredExpenses.length > 0 ? (
                    filteredExpenses.map(expense => (
                        <ExpenseCard key={expense.id} expense={expense}/>
                    ))
                ) : (
                    <p>
                        No expenses available.
                    </p>
                )}
            </div>

            <AddElementButton onClick={handleModalOpenToggle}/>

            <ExpenseEditModal
                isOpen={isModalOpen}
                onClose={handleModalOpenToggle}
                onSave={handleModalOpenToggle}
                isEditing={false}
            />
        </div>
    );
}