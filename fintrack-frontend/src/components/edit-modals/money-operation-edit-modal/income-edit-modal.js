"use client";

import React from "react";
import {OperationType} from "@/types/operation-type";
import MoneyOperationEditModal from "@/components/edit-modals/money-operation-edit-modal/money-operation-edit-modal";
import {useAddIncomeMutation, useUpdateIncomeMutation} from "@/configuration/api/incomes-api";

export default function IncomeEditModal({ isOpen, onClose, onSave, isEditing, income }) {
    return (
        <MoneyOperationEditModal
            isOpen={isOpen}
            onClose={onClose}
            onSave={onSave}
            isEditing={isEditing}
            moneyOperation={income}
            operationType={OperationType.INCOME}
            useUpdateOperationMutation={useUpdateIncomeMutation}
            useAddOperationMutation={useAddIncomeMutation}
        />
    );
}
