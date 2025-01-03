import {createSlice} from '@reduxjs/toolkit';
import {addMonthsToDate, formatDateToISO, subtractMonthsFromDate} from "@/utils/date-utils";
import {DataViewMode} from "@/types/data-view-mode";

const filterDataInitialState = {
    value: {
        moneyFlow: {
            fromDate: formatDateToISO(subtractMonthsFromDate(new Date(), 1)),
            toDate: formatDateToISO(new Date()),
        },
        budgets: {
            chosenCategories: [],
            fromDate: formatDateToISO(subtractMonthsFromDate(new Date(), 1)),
            toDate: formatDateToISO(addMonthsToDate(new Date(), 1)),
            dataViewMode: DataViewMode.LIST
        },
        expenses: {
            chosenCategories: [],
            fromDate: formatDateToISO(subtractMonthsFromDate(new Date(), 1)),
            toDate: formatDateToISO(new Date()),
            dataViewMode: DataViewMode.LIST
        },
        incomes: {
            chosenCategories: [],
            fromDate: formatDateToISO(subtractMonthsFromDate(new Date(), 1)),
            toDate: formatDateToISO(new Date()),
            dataViewMode: DataViewMode.LIST
        }
    },
};

export const filterDataSlice = createSlice({
    name: 'filterData',
    initialState: filterDataInitialState,
    reducers: {
        changeMoneyFlowFilterData: (state, action) => {
            const { fromDate, toDate } = action.payload;
            if (fromDate) state.value.moneyFlow.fromDate = fromDate;
            if (toDate) state.value.moneyFlow.toDate = toDate;
        },
        changeBudgetsFilterData: (state, action) => {
            const { chosenCategories, fromDate, toDate, dataViewMode } = action.payload;
            if (chosenCategories !== undefined) state.value.budgets.chosenCategories = chosenCategories;
            if (fromDate) state.value.budgets.fromDate = fromDate;
            if (toDate) state.value.budgets.toDate = toDate;
            if (dataViewMode) state.value.budgets.dataViewMode = dataViewMode;
        },
        changeExpensesFilterData: (state, action) => {
            const { chosenCategories, fromDate, toDate, dataViewMode } = action.payload;
            if (chosenCategories !== undefined) state.value.expenses.chosenCategories = chosenCategories;
            if (fromDate) state.value.expenses.fromDate = fromDate;
            if (toDate) state.value.expenses.toDate = toDate;
            if (dataViewMode) state.value.expenses.dataViewMode = dataViewMode;
        },
        changeIncomesFilterData: (state, action) => {
            const { chosenCategories, fromDate, toDate, dataViewMode } = action.payload;
            if (chosenCategories !== undefined) state.value.incomes.chosenCategories = chosenCategories;
            if (fromDate) state.value.incomes.fromDate = fromDate;
            if (toDate) state.value.incomes.toDate = toDate;
            if (dataViewMode) state.value.incomes.dataViewMode = dataViewMode;
        },
        clearFilterData: (state, action) => {
            return filterDataInitialState;
        }
    }
});

export const {
    changeMoneyFlowFilterData,
    changeBudgetsFilterData,
    changeExpensesFilterData,
    changeIncomesFilterData,
    clearFilterData
} = filterDataSlice.actions;

export default filterDataSlice.reducer;
