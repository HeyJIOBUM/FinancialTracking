"use client";

import {useGetExpensesQuery} from "@/configuration/api/expenses-api";
import {useGetIncomesQuery} from "@/configuration/api/incomes-api";
import React, {useState} from "react";
import {formatDateToISO, isDateInRange, subtractMonthsFromDate} from "@/utils/date-utils";
import Loading from "@/components/loading";
import MoneyFlowSankeyChart from "@/components/graphic/money-flow-sankey-chart";

export default function MoneyFlowPage() {
    const {data: expenses, error: expensesError, isLoading: isExpensesLoading} = useGetExpensesQuery();
    const {data: incomes, error: incomesError, isLoading: isIncomesLoading} = useGetIncomesQuery();

    const dataRangeInitialState = {
        fromDate: formatDateToISO(subtractMonthsFromDate(new Date(), 1)),
        toDate: formatDateToISO(new Date()),
    };

    const [dataRange, setDataRange] = useState(dataRangeInitialState);

    const filterOperations = (operations) => {
        return operations.filter(operation =>
            isDateInRange(operation.date, dataRange.fromDate, dataRange.toDate)
        );
    };
    const handleDateChange = (e) => {
        const {name, value} = e.target;
        setDataRange(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    if (isExpensesLoading || isIncomesLoading) {
        return <Loading />;
    }

    if (incomesError) {
        throw new Error(incomesError.error);
    }

    if (expensesError) {
        throw new Error(expensesError.error);
    }

    const filteredExpenses = filterOperations(expenses);
    const filteredIncomes = filterOperations(incomes);

    return (
        <>
            <div className="mb-4 flex justify-center rounded-md border border-gray-300 px-8 py-4">
                <div className="flex space-x-4">
                    <input
                        type="date"
                        value={dataRange.fromDate}
                        onChange={handleDateChange}
                        className="rounded border border-gray-300 p-2"
                    />
                    <input
                        type="date"
                        value={dataRange.toDate}
                        onChange={handleDateChange}
                        className="rounded border border-gray-300 p-2"
                    />
                </div>
            </div>
            <MoneyFlowSankeyChart
                expenses={filteredExpenses}
                incomes={filteredIncomes}
            />
        </>
    );
}