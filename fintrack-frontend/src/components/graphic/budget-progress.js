import React from 'react';
import {calculateDaysBetween, isDateInRange} from "@/utils/date-utils";

export default function BudgetProgress({budget}) {
    const {
        id,
        title,
        amount,
        fromDate,
        toDate,
        totalExpensesAmount,
    } = budget;
    const progressBarSize = {
        height: 40,
        width: 500,
    }

    const currentDate = new Date();

    const totalDays = calculateDaysBetween(fromDate, toDate);
    const daysPassed = calculateDaysBetween(fromDate, currentDate);
    const passedDaysProportion = daysPassed / totalDays
    const passedDaysWidth = passedDaysProportion * progressBarSize.width
    const isCurrentInRange = isDateInRange(currentDate, fromDate, toDate);

    const remainingAmount = amount - totalExpensesAmount;
    const expenseAmountProportion = totalExpensesAmount / amount;
    const spentAmountWidth = expenseAmountProportion * progressBarSize.width
    const isExceededBudget = remainingAmount < 0;

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md hover:scale-[1.01]">
            <h2 className="mb-4 text-xl font-semibold">
                {title}
            </h2>

            {/* Progress Bar for Days Passed */}
            {
                !isCurrentInRange ? (
                    <div style={{
                        width: progressBarSize.width + 'px',
                        height: progressBarSize.height + 'px',
                        lineHeight: progressBarSize.height + 'px',
                    }}
                         className={"mb-2 rounded-lg bg-gray-200 text-center"}>
                        <div className="font-semibold">Current date is out of budget period</div>
                    </div>
                ) : (
                    <>
                        <div style={{width: progressBarSize.width + 'px', height: progressBarSize.height + 'px'}}
                            className="relative overflow-hidden rounded-lg">
                            {/*Separator*/}
                            <div
                                className="absolute top-0 h-full border-r-2 border-black"
                                style={{width: passedDaysWidth}}
                            />
                            {/*Passed days progress*/}
                            <div
                                className="inline-block h-full bg-red-400"
                                style={{width: passedDaysWidth}}
                            />
                            {/*Remaining days progress*/}
                            <div
                                className="inline-block h-full bg-blue-400"
                                style={{width: progressBarSize.width - passedDaysWidth}}
                            />
                        </div>
                        <div className="mb-2 mt-1 text-sm text-gray-600">
                            Days Passed: {daysPassed} / {totalDays}
                        </div>
                    </>
                )
            }


            {/* Progress Bar for spent amount */}
            {
                isExceededBudget ? (
                    <div style={{
                        width: progressBarSize.width + 'px',
                        height: progressBarSize.height + 'px',
                        lineHeight: progressBarSize.height + 'px',
                    }}
                         className={"rounded-lg bg-red-500 text-center"}>
                        <div className="font-semibold">You exceeded your budget</div>
                    </div>
                ) : (
                    <>
                        <div style={{width: progressBarSize.width + 'px', height: progressBarSize.height + 'px'}}
                             className="relative overflow-hidden rounded-lg">
                            {/*Separator*/}
                            <div
                                className="absolute top-0 h-full border-r-2 border-black"
                                style={{width: spentAmountWidth}}
                            />
                            {/*Spent amount progress*/}
                            <div
                                className="inline-block h-full bg-red-400"
                                style={{width: spentAmountWidth}}
                            />
                            {/*Available amount progress*/}
                            <div
                                className="inline-block h-full bg-blue-400"
                                style={{width: progressBarSize.width - spentAmountWidth}}
                            />
                        </div>
                    </>
                )
            }
            <div className="mb-2 mt-1 text-sm text-gray-600">
                Spent: {totalExpensesAmount.toFixed(2)} Br | Remaining: {remainingAmount.toFixed(2)} Br
            </div>
        </div>
    );
}
