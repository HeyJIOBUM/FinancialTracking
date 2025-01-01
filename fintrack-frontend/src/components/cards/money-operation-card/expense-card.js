"use client"

import React from 'react';
import {
    useAddExpenseMutation,
    useDeleteExpenseMutation,
    useUpdateExpenseMutation
} from "@/configuration/api/expenses-api";
import MoneyOperationCard from "@/components/cards/money-operation-card/money-operation-card";
import {OperationType} from "@/types/operation-type";

export default function ExpenseCard({ expense }) {
    return (
        <MoneyOperationCard
            moneyOperation={expense}
            operationType={OperationType.EXPENSE}
            useDeleteOperationMutation={useDeleteExpenseMutation}
            useUpdateOperationsMutation={useUpdateExpenseMutation}
            useAddOperationsMutation={useAddExpenseMutation}
        />
    );
}
