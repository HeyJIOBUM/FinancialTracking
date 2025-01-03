"use client";

import {useDispatch, useSelector} from 'react-redux';
import {changeMoneyFlowFilterData} from "@/redux/slices/filter-data-slice";
import {useGetExpensesQuery} from "@/configuration/api/expenses-api";
import {useGetIncomesQuery} from "@/configuration/api/incomes-api";
import React, {useEffect, useState} from "react";
import {formatDateToISO, isDateInRange, subtractMonthsFromDate} from "@/utils/date-utils";
import Loading from "@/components/loading";
import MoneyFlowSankeyChart from "@/components/graphic/money-flow-sankey-chart";

export default function MoneyFlowPage() {
    const dispatch = useDispatch();
    const filterData = useSelector(state => state.filterDataReducer.value.moneyFlow);

    const {data: expenses, error: expensesError, isLoading: isExpensesLoading} = useGetExpensesQuery();
    const {data: incomes, error: incomesError, isLoading: isIncomesLoading} = useGetIncomesQuery();

    const dataRangeInitialState = {
        fromDate: filterData.fromDate || formatDateToISO(subtractMonthsFromDate(new Date(), 1)),
        toDate: filterData.toDate || formatDateToISO(new Date()),
    };

    const [dataRange, setDataRange] = useState(dataRangeInitialState);

    const filterOperations = (operations) => {
        return operations.filter(operation => isDateInRange(operation.date, dataRange.fromDate, dataRange.toDate));
    };

    const handleDateChange = (e) => {
        const {name, value} = e.target;
        setDataRange(prevData => ({
            ...prevData, [name]: value
        }));
    };

    useEffect(() => {
        dispatch(changeMoneyFlowFilterData({
            fromDate: dataRange.fromDate, toDate: dataRange.toDate,
        }));
    }, [dataRange, dispatch]);

    if (isExpensesLoading || isIncomesLoading) {
        return <Loading/>;
    }

    if (incomesError) {
        throw new Error(incomesError.error);
    }

    if (expensesError) {
        throw new Error(expensesError.error);
    }

    const filteredExpenses = filterOperations(expenses);
    const filteredIncomes = filterOperations(incomes);

    return (<>
        <div className="mb-4 flex justify-center rounded-md border border-gray-300 px-8 py-4">
            <div className="flex space-x-4">
                <input
                    type="date"
                    value={dataRange.fromDate}
                    name={'fromDate'}
                    onChange={handleDateChange}
                    className="rounded border border-gray-300 p-2"
                />
                <input
                    type="date"
                    value={dataRange.toDate}
                    name={'toDate'}
                    onChange={handleDateChange}
                    className="rounded border border-gray-300 p-2"
                />
            </div>
        </div>
        <MoneyFlowSankeyChart
            expenses={filteredExpenses}
            incomes={filteredIncomes}
        />
    </>);
}