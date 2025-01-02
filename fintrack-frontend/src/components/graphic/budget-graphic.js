import React from "react";
import BudgetProgress from "@/components/graphic/budget-progress";


export default function BudgetGraphic({ enrichedBudgets }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-4 rounded border border-gray-300 p-4">
                {enrichedBudgets.map((budget) => (
                    <BudgetProgress key={budget.id} budget={budget} />
                ))}
            </div>
        </div>
    );
}
