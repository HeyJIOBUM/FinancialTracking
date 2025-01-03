import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {changeExpensesFilterData, changeIncomesFilterData} from "@/redux/slices/filter-data-slice";
import {DataViewMode} from "@/types/data-view-mode";
import Loading from "@/components/loading";
import DataHeader from "@/components/data-header";
import AddElementButton from "@/configuration/action-buttons/add-element-button";
import MoneyOperationCard from "@/components/cards/money-operation-card/money-operation-card";
import MoneyOperationEditModal from "@/components/edit-modals/money-operation-edit-modal/money-operation-edit-modal";
import MoneyOperationGraphic from "@/components/graphic/money-operation-graphic";
import {formatDateToISO, subtractMonthsFromDate} from "@/utils/date-utils";
import {OperationType} from "@/types/operation-type";

export default function MoneyOperationPage({
                                               operationType,
                                               useGetOperationsQuery,
                                               useDeleteOperationMutation,
                                               useUpdateOperationMutation,
                                               useAddOperationMutation
                                           }) {
    const filterDataNameInReducer = operationType.toLowerCase() + 's'

    const dispatch = useDispatch();
    const filterData = useSelector(state => state.filterDataReducer.value[filterDataNameInReducer]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data: moneyOperations, error, isLoading} = useGetOperationsQuery();

    const dataHeaderInitialState = {
        chosenCategories: filterData.chosenCategories || [],
        fromDate: filterData.fromDate || formatDateToISO(subtractMonthsFromDate(new Date(), 1)),
        toDate: filterData.toDate || formatDateToISO(new Date()),
        dataViewMode: filterData.dataViewMode || DataViewMode.LIST
    };

    const [dataHeaderState, setDataHeaderState] = useState(dataHeaderInitialState);

    const handleModalOpenToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        if (operationType === OperationType.INCOME) {
            dispatch(changeIncomesFilterData({
                chosenCategories: dataHeaderState.chosenCategories,
                fromDate: dataHeaderState.fromDate,
                toDate: dataHeaderState.toDate,
                dataViewMode: dataHeaderState.dataViewMode,
            }));
        } else if (operationType === OperationType.EXPENSE) {
            dispatch(changeExpensesFilterData({
                chosenCategories: dataHeaderState.chosenCategories,
                fromDate: dataHeaderState.fromDate,
                toDate: dataHeaderState.toDate,
                dataViewMode: dataHeaderState.dataViewMode,
            }));
        }
    }, [dataHeaderState, dispatch, operationType]);

    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        throw new Error(error.error);
    }

    let {chosenCategories, fromDate, toDate} = dataHeaderState;
    fromDate = new Date(fromDate);
    toDate = new Date(toDate);

    const filteredMoneyOperations = moneyOperations.filter(operation => {
        const operationDate = new Date(operation.date);
        return ((chosenCategories.length === 0 || chosenCategories.includes(operation.category.id)) && operationDate >= fromDate && operationDate <= toDate);
    });

    return (<div>
            <DataHeader
                categoriesOperationType={operationType}
                dataHeaderState={dataHeaderState}
                setDataHeaderState={setDataHeaderState}
            />

            {/* Operations */}
            {filteredMoneyOperations.length > 0 ? (dataHeaderState.dataViewMode === DataViewMode.LIST ? (
                    <div className="flex flex-col gap-4 rounded border border-gray-300 p-4">
                        {filteredMoneyOperations.map(operation => (<MoneyOperationCard
                                key={operation.id}
                                moneyOperation={operation}
                                operationType={operationType}
                                useDeleteOperationMutation={useDeleteOperationMutation}
                                useUpdateOperationMutation={useUpdateOperationMutation}
                                useAddOperationMutation={useAddOperationMutation}
                            />))}
                    </div>) : (<MoneyOperationGraphic
                        operationType={operationType}
                        moneyOperations={filteredMoneyOperations}
                        toDate={toDate}
                        fromDate={fromDate}
                    />)) : (<div className="flex flex-col gap-4 rounded border border-gray-300 p-4">
                    No {operationType.toLowerCase()}s available.
                </div>)}

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
        </div>);
}
