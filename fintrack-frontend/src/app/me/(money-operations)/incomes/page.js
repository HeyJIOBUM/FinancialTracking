"use client";

import {
    useAddIncomeMutation,
    useDeleteIncomeMutation,
    useGetIncomesQuery,
    useUpdateIncomeMutation
} from "@/configuration/api/incomes-api";
import React from "react";
import {OperationType} from "@/types/operation-type";
import MoneyOperationPage from "@/app/me/(money-operations)/money-operation-page";

export default function IncomesPage() {
    return (
        <MoneyOperationPage
            operationType={OperationType.INCOME}
            useGetOperationsQuery={useGetIncomesQuery}
            useDeleteOperationMutation={useDeleteIncomeMutation}
            useUpdateOperationMutation={useUpdateIncomeMutation}
            useAddOperationMutation={useAddIncomeMutation}
        />
    );
}