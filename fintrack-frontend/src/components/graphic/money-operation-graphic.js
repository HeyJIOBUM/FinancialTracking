import React from "react";
import {pieArcLabelClasses, PieChart} from '@mui/x-charts/PieChart';


export default function MoneyOperationGraphic({ moneyOperations, operationType, fromDate, toDate }) {
    const totalAmount = moneyOperations.reduce((acc, op) => acc + op.amount, 0);
    const passedDays = Math.ceil((toDate - fromDate) / (1000 * 3600 * 24));
    const averageMoneyValue = (totalAmount / passedDays).toFixed(2);

    const getArcLabel = (params) => {
        const percent = params.value / totalAmount;
        return `${(percent * 100).toFixed(0)}%`;
    };

    const sizing = {
        margin: { right: 5 },
        width: 200,
        height: 200,
        legend: { hidden: true },
    };

    const preparedData = moneyOperations.reduce((acc, op) => {
        const existingCategory = acc.find(item => item.id === op.category.id);
        if (existingCategory) {
            existingCategory.value += op.amount;
        } else {
            acc.push({
                id: op.category.id,
                label: op.category.name,
                value: op.amount,
            });
        }
        return acc;
    }, []);

    const minValueCategory = preparedData.reduce((min, op) => {
        return op.value < min.value ? op : min ;
    }, {value: Infinity});

    const maxValueCategory = preparedData.reduce((max, op) => {
        return op.value > max.value ? op : max;
    }, {value: 0});

    return (
        <div className="flex h-[400px] w-full justify-around">
            <PieChart
                width={600}
                series={[
                    {
                        data : preparedData,
                        arcLabel: getArcLabel,
                        arcLabelMinAngle: 15,
                        arcLabelRadius: '60%',
                        paddingAngle: 3,
                        cornerRadius: 5,
                    }
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                        fontSize: 14,
                    },
                }}
                slotProps={{
                    legend: {
                        direction: 'column',
                        position: {
                            vertical: 'middle',
                            horizontal: 'right',
                        },
                        labelStyle: {
                            fontSize: 14,
                        },
                    }
                }}
            />
            <div className="w-[400px] rounded-lg border p-4">
                <div className="text-xl font-semibold text-gray-800">
                    Details
                </div>

                <div className={"mt-2"}>
                    Min {operationType.toLowerCase()} category:
                    <div>
                        {minValueCategory.label} {minValueCategory.value}
                    </div>
                </div>

                <div className={"mt-2"}>
                    Max {operationType.toLowerCase()} category:
                    <div>
                        {maxValueCategory.label} {maxValueCategory.value}
                    </div>
                </div>
            </div>
        </div>

    );
}
