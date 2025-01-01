'use client';

import {useGetCategoriesQuery} from "@/configuration/api/categories-api";
import Loading from "@/components/loading";
import Select from "@/components/select";
import {DataViewMode} from "@/types/data-view-mode";

export default function DataHeader({
                                       categoriesOperationType,
                                       chosenCategories,
                                       setChosenCategories,
                                       fromDate,
                                       setFromDate,
                                       toDate,
                                       setToDate,
                                       dataViewMode,
                                       setDataViewMode
                                   }) {
    const {data: categories, error: categoriesError, isLoading: isCategoriesLoading} = useGetCategoriesQuery();

    if (categoriesError) {
        throw new Error(categoriesError.error);
    }

    if (isCategoriesLoading) {
        return <Loading/>;
    }

    const availableCategories = categories.filter(category => category.operationType === categoriesOperationType);

    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
    };

    const toggleDataViewMode = (mode) => {
        setDataViewMode(mode);
    };

    return (<div className="mb-4 flex items-center justify-between rounded-md border border-gray-300 px-8 py-4">
        <div className="flex items-center space-x-4">
            <button
                className={`rounded border-b-4 px-4 py-2 ${dataViewMode === DataViewMode.GRAPHIC ? 'border-black' : 'border-transparent'} bg-white`}
                onClick={() => toggleDataViewMode(DataViewMode.GRAPHIC)}
            >
                Graphic View
            </button>
            <button
                className={`rounded border-b-4 px-4 py-2 ${dataViewMode === DataViewMode.LIST ? 'border-black' : 'border-transparent'} bg-white`}
                onClick={() => toggleDataViewMode(DataViewMode.LIST)}
            >
                List View
            </button>
        </div>


        <div className="flex items-center space-x-4">
            <input
                type="date"
                value={fromDate}
                onChange={handleFromDateChange}
                className="rounded border border-gray-300 p-2"
            />
            <input
                type="date"
                value={toDate}
                onChange={handleToDateChange}
                className="rounded border border-gray-300 p-2"
            />
        </div>

        <Select
            options={availableCategories}
            selectedOptions={chosenCategories}
            setSelectedOptions={setChosenCategories}
            isMultiSelect={true}/>
    </div>);
}
