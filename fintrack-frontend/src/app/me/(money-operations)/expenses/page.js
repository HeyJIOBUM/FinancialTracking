"use client";

import {
    useAddExpenseMutation,
    useDeleteExpenseMutation,
    useGetExpensesQuery,
    useUpdateExpenseMutation
} from "@/configuration/api/expenses-api";
import React from "react";
import {OperationType} from "@/types/operation-type";
import MoneyOperationPage from "@/app/me/(money-operations)/money-operation-page";

export default function ExpensesPage() {
    return (
        <MoneyOperationPage
            operationType={OperationType.EXPENSE}
            useGetOperationsQuery={useGetExpensesQuery}
            useDeleteOperationMutation={useDeleteExpenseMutation}
            useUpdateOperationMutation={useUpdateExpenseMutation}
            useAddOperationMutation={useAddExpenseMutation}
      />
    );
}