"use client"

import React from 'react';
import {useAddIncomeMutation, useDeleteIncomeMutation, useUpdateIncomeMutation} from "@/configuration/api/incomes-api";
import MoneyOperationCard from "@/components/cards/money-operation-card/money-operation-card";
import {OperationType} from "@/types/operation-type";

export default function IncomeCard({ income }) {
    return (
        <MoneyOperationCard
            moneyOperation={income}
            operationType={OperationType.INCOME}
            useDeleteOperationMutation={useDeleteIncomeMutation}
            useUpdateOperationMutation={useUpdateIncomeMutation}
            useAddOperationMutation={useAddIncomeMutation}
        />
    );
}
