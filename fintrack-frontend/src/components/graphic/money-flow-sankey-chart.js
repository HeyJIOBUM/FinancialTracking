"use client";

import React from "react";
import {Chart} from "react-google-charts";
import {OperationType} from "@/types/operation-type";

export default function MoneyFlowSankeyChart({expenses, incomes}) {
    const flattenMoneyOperations = (moneyOperations) => {
        return moneyOperations.reduce((acc, op) => {
            const existingCategory = acc.find(item => item.id === op.category.id);
            if (existingCategory) {
                existingCategory.amount += op.amount;
                existingCategory.tooltip = `${op.category.operationType}: ${op.category.name}, ${existingCategory.amount} Br`
            } else {
                acc.push({
                    id: op.category.id,
                    from: op.category.name,
                    to: op.category.operationType,
                    amount: op.amount,
                    tooltip: `${op.category.operationType}: ${op.category.name}, ${op.amount} Br`,
                });
            }
            return acc;
        }, []);
    }

    if (expenses.length === 0 && incomes.length === 0) {
        return (
            <div className="flex flex-col gap-4 rounded border border-gray-300 p-4">
                <p>No expenses and incomes available.</p>
            </div>
        );
    }

    const totalExpensesAmount = expenses.reduce((acc, op) => acc + op.amount, 0);
    const totalIncomesAmount = incomes.reduce((acc, op) => acc + op.amount, 0);

    const flattenedExpenses = flattenMoneyOperations(expenses);
    const flattenedIncomes = flattenMoneyOperations(incomes);

    const prepareSankeysData = () => {
        const sankeysData = [["From", "To", "Weight", {type: 'string', role: 'tooltip'}]]

        flattenedExpenses.forEach(expense => {
            sankeysData.push([expense.from, expense.to, expense.amount, expense.tooltip]);
        });

        flattenedIncomes.forEach(income => {
            sankeysData.push([income.from, income.to, income.amount, income.tooltip]);
        });

        return sankeysData;
    };


    const sankeysData = prepareSankeysData();

    sankeysData.push(
        [OperationType.EXPENSE, "Result", totalExpensesAmount, `Overall expense: ${totalExpensesAmount} Br`],
        [OperationType.INCOME, "Result", totalIncomesAmount, `Overall income: ${totalIncomesAmount} Br`],
    )

    const options = {
        sankey: {
            node: {
                label: {
                    fontSize: 16,
                },
                nodePadding: 20
            },
        },
    };

    return (
        <div className="rounded border border-gray-300 p-4">
            <Chart
                chartType="Sankey"
                data={sankeysData}
                height={400}
                options={options}
            />
        </div>
    );
}
