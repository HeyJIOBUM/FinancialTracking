"use client";

import {useGetIncomesQuery} from "@/configuration/api/incomes-api";
import Loading from "@/components/loading";
import IncomeCard from "@/components/cards/money-operation-card/income-card";
import DataHeader from "@/components/data-header";
import React, {useState} from "react";
import {DataViewMode} from "@/types/data-view-mode";
import {OperationType} from "@/types/operation-type";
import IncomeEditModal from "@/components/edit-modals/money-operation-edit-modal/income-edit-modal";
import AddElementButton from "@/configuration/action-buttons/add-element-button";

export default function IncomesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data: incomes, error, isLoading} = useGetIncomesQuery();

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

    const filteredIncomes = incomes.filter(income => {
        const incomeDate = new Date(income.date);
        return (
            (chosenCategories.length === 0 || chosenCategories.includes(income.category)) &&
            incomeDate >= fromDate &&
            incomeDate <= toDate
        );
    });

    return (
        <div>
            <DataHeader
                categoriesOperationType={OperationType.INCOME}
                dataHeaderState={dataHeaderState}
                setDataHeaderState={setDataHeaderState}
            />

            {/*Incomes*/}
            <div className="flex flex-col gap-4 rounded border border-gray-300 p-4">
                {filteredIncomes.length > 0 ? (
                    filteredIncomes.map(income => (
                        <IncomeCard key={income.id} income={income}/>
                    ))
                ) : (
                    <p>
                        No incomes available.
                    </p>
                )}
            </div>

            <AddElementButton onClick={handleModalOpenToggle}/>

            <IncomeEditModal
                isOpen={isModalOpen}
                onClose={handleModalOpenToggle}
                onSave={handleModalOpenToggle}
                isEditing={false}
            />
        </div>
    );
}