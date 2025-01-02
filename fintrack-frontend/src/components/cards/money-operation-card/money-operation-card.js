import EditElementButton from "@/configuration/action-buttons/edit-element-button";
import DeleteElementButton from "@/configuration/action-buttons/delete-element-button";
import {useState} from "react";
import MoneyOperationEditModal from "@/components/edit-modals/money-operation-edit-modal/money-operation-edit-modal";
import {formatDateToLocale} from "@/utils/date-utils";

export default function MoneyOperationCard({
                                               moneyOperation,
                                               operationType,
                                               useDeleteOperationMutation,
                                               useUpdateOperationMutation,
                                               useAddOperationMutation
                                           }) {
    const [deleteOperation, deleteOperationResult] = useDeleteOperationMutation();
    const {id, category, amount, date, description} = moneyOperation;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpenToggle = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleExpenseDelete = () => {
        deleteOperation({id: id})
    }

    console.log(new Date(moneyOperation.date))

    return (
        <>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md hover:scale-[1.01]">
                <div className="text-xl font-semibold text-gray-800">
                    {category.name}, {amount.toFixed(2)} Br
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Category: <span className="font-medium">{category.name}</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Amount: <span className="font-medium">{amount.toFixed(2)} Br</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Date: <span className="font-medium">{formatDateToLocale(date)}</span>
                </div>
                {
                    description?.length !== 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                            Description: <span className="font-medium">{description}</span>
                        </div>
                    )
                }
                <div className="mt-4 flex gap-6">
                    <EditElementButton onClick={handleModalOpenToggle}/>
                    <DeleteElementButton onClick={handleExpenseDelete}/>
                </div>
            </div>

            <MoneyOperationEditModal
                isOpen={isModalOpen}
                onClose={handleModalOpenToggle}
                onSave={handleModalOpenToggle}
                isEditing={true}
                moneyOperation={moneyOperation}
                operationType={operationType}
                useUpdateOperationMutation={useUpdateOperationMutation}
                useAddOperationMutation={useAddOperationMutation}
            />
        </>
    );
}
