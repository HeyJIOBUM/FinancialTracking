"use client";

import React from "react";
import {useAddExpenseMutation, useUpdateExpenseMutation} from "@/configuration/api/expenses-api";
import {OperationType} from "@/types/operation-type";
import MoneyOperationEditModal from "@/components/edit-modals/money-operation-edit-modal/money-operation-edit-modal";

export default function ExpenseEditModal({ isOpen, onClose, onSave, isEditing, expense }) {
    return (
        <MoneyOperationEditModal
            isOpen={isOpen}
            onClose={onClose}
            onSave={onSave}
            isEditing={isEditing}
            moneyOperation={expense}
            operationType={OperationType.EXPENSE}
            useUpdateOperationMutation={useUpdateExpenseMutation}
            useAddOperationMutation={useAddExpenseMutation}
        />
    );
}
