"use client";

import {useDispatch, useSelector} from 'react-redux';
import {changeBudgetsFilterData} from "@/redux/slices/filter-data-slice";
import {useGetBudgetsQuery} from "@/configuration/api/budgets-api";
import Loading from "@/components/loading";
import BudgetCard from "@/components/cards/budget-card";
import {useGetExpensesQuery} from "@/configuration/api/expenses-api";
import React, {useEffect, useState} from "react";
import {DataViewMode} from "@/types/data-view-mode";
import DataHeader from "@/components/data-header";
import {OperationType} from "@/types/operation-type";
import BudgetGraphic from "@/components/graphic/budget-graphic";
import AddElementButton from "@/configuration/action-buttons/add-element-button";
import BudgetEditModal from "@/components/edit-modals/budget-edit-modal";
import {addMonthsToDate, formatDateToISO, subtractMonthsFromDate} from "@/utils/date-utils";

export default function BudgetsPage() {
    const dispatch = useDispatch();
    const filterData = useSelector(state => state.filterDataReducer.value.budgets);

    const {data: budgets, error: budgetsError, isLoading: isBudgetsLoading} = useGetBudgetsQuery();
    const {data: expenses, error: expensesError, isLoading: isExpensesLoading} = useGetExpensesQuery();

    const dataHeaderInitialState = {
        chosenCategories: filterData.chosenCategories || [],
        fromDate: filterData.fromDate || formatDateToISO(subtractMonthsFromDate(new Date(), 1)),
        toDate: filterData.toDate || formatDateToISO(addMonthsToDate(new Date(), 1)),
        dataViewMode: filterData.dataViewMode || DataViewMode.LIST,
    };

    const [dataHeaderState, setDataHeaderState] = useState(dataHeaderInitialState);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpenToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const filterBudgets = (budgets) => {
        let {chosenCategories, fromDate, toDate} = dataHeaderState;
        fromDate = new Date(fromDate);
        toDate = new Date(toDate);

        return budgets.filter(budget => {
            const budgetFromDate = new Date(budget.fromDate);
            const budgetToDate = new Date(budget.toDate);

            const allCategoriesMatch = chosenCategories.length === 0 || budget.categories.every(category => chosenCategories.includes(category.id));

            return (allCategoriesMatch && fromDate <= budgetFromDate && budgetFromDate <= toDate);
        });
    };

    const extractExpensesFromBudgets = (budgets, expenses) => {
        return budgets.map(budget => {
            const budgetCategoriesIds = budget.categories.map(category => category.id);
            const fromDate = new Date(budget.fromDate);
            const toDate = new Date(budget.toDate);

            const relevantExpenses = expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return (budgetCategoriesIds.length === 0 || budgetCategoriesIds.includes(expense.category.id) && expenseDate >= fromDate && expenseDate <= toDate);
            });

            const totalExpensesAmount = relevantExpenses.reduce((total, expense) => total + expense.amount, 0);
            return {
                ...budget, totalExpensesAmount,
            };
        });
    };

    useEffect(() => {
        dispatch(changeBudgetsFilterData({
            chosenCategories: dataHeaderState.chosenCategories,
            fromDate: dataHeaderState.fromDate,
            toDate: dataHeaderState.toDate,
            dataViewMode: dataHeaderState.dataViewMode,
        }));
    }, [dataHeaderState, dispatch]);

    if (isBudgetsLoading || isExpensesLoading) {
        return <Loading/>;
    }

    if (budgetsError) {
        throw Error(budgetsError.error);
    }

    if (expensesError) {
        throw Error(expensesError.error);
    }

    const filteredBudgets = filterBudgets(budgets);
    const enrichedBudgets = extractExpensesFromBudgets(filteredBudgets, expenses);

    return (<div>
            <DataHeader
                categoriesOperationType={OperationType.EXPENSE}
                dataHeaderState={dataHeaderState}
                setDataHeaderState={setDataHeaderState}
            />

            {/* Budgets */}
            {enrichedBudgets.length > 0 ? (dataHeaderState.dataViewMode === DataViewMode.LIST ? (
                    <div className="flex flex-col gap-4 rounded border border-gray-300 p-4">
                        {enrichedBudgets.map(enrichedBudget => (
                            <BudgetCard key={enrichedBudget.id} enrichedBudget={enrichedBudget}/>))}
                    </div>) : (<BudgetGraphic
                        enrichedBudgets={enrichedBudgets}
                    />)) : (<div className="flex flex-col gap-4 rounded border border-gray-300 p-4">
                    No budgets available.
                </div>)}

            <AddElementButton onClick={handleModalOpenToggle}/>

            <BudgetEditModal
                isOpen={isModalOpen}
                onClose={handleModalOpenToggle}
                onSave={handleModalOpenToggle}
                isEditing={false}
            />
        </div>);
}