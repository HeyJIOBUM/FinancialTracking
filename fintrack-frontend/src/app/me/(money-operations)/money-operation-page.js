import React, {useState} from "react";
import {DataViewMode} from "@/types/data-view-mode";
import Loading from "@/components/loading";
import DataHeader from "@/components/data-header";
import AddElementButton from "@/configuration/action-buttons/add-element-button";
import MoneyOperationCard from "@/components/cards/money-operation-card/money-operation-card";
import MoneyOperationEditModal from "@/components/edit-modals/money-operation-edit-modal/money-operation-edit-modal";
import MoneyOperationGraphic from "@/components/graphic/money-operation-graphic";

export default function MoneyOperationPage({
                                               operationType,
                                               useGetOperationsQuery,
                                               useDeleteOperationMutation,
                                               useUpdateOperationMutation,
                                               useAddOperationMutation
                                           }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data: moneyOperations, error, isLoading} = useGetOperationsQuery();

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

    const filteredMoneyOperations = moneyOperations.filter(operation => {
        const operationDate = new Date(operation.date);
        return (
            (chosenCategories.length === 0 || chosenCategories.includes(operation.category.id)) &&
            operationDate >= fromDate &&
            operationDate <= toDate
        );
    });

    return (
        <div>
            <DataHeader
                categoriesOperationType={operationType}
                dataHeaderState={dataHeaderState}
                setDataHeaderState={setDataHeaderState}
            />

            {/*Operations*/}
            {
                filteredMoneyOperations.length > 0 ? (
                    dataHeaderState.dataViewMode === DataViewMode.LIST ? (
                        <div className="flex flex-col gap-4 rounded border border-gray-300 p-4">
                            {
                                filteredMoneyOperations.map(operation => (
                                    <MoneyOperationCard
                                        key={operation.id}
                                        moneyOperation={operation}
                                        operationType={operationType}
                                        useDeleteOperationMutation={useDeleteOperationMutation}
                                        useUpdateOperationMutation={useUpdateOperationMutation}
                                        useAddOperationMutation={useAddOperationMutation}
                                    />
                                ))
                            }
                        </div>
                    ) : (
                        <MoneyOperationGraphic
                            operationType={operationType}
                            moneyOperations={filteredMoneyOperations}
                            toDate={toDate}
                            fromDate={fromDate}
                        />
                    )
                ) : (
                    <p>
                        No {operationType.toLowerCase()}s available.
                    </p>
                )
            }

            <AddElementButton onClick={handleModalOpenToggle}/>

            <MoneyOperationEditModal
                isOpen={isModalOpen}
                onClose={handleModalOpenToggle}
                onSave={handleModalOpenToggle}
                isEditing={false}
                operationType={operationType}
                useUpdateOperationMutation={useUpdateOperationMutation}
                useAddOperationMutation={useAddOperationMutation}
            />
        </div>
    );
}