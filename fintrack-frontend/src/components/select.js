import React, {useEffect, useRef, useState} from 'react';

// Option - object with id and name fields
export default function Select({ options, selectedOptionIds, setSelectedOptions, isMultiSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionToggle = (optionId) => {
        if (isMultiSelect) {
            let newSelectedOptions;
            
            if (selectedOptionIds.includes(optionId))
                newSelectedOptions = selectedOptionIds.filter(o => o !== optionId);
            else
                newSelectedOptions = [...selectedOptionIds, optionId];

            setSelectedOptions(newSelectedOptions);
        } else {
            setSelectedOptions([optionId]);
            setIsOpen(false);
        }
    };

    // Close dropdown when mouse click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectRef]);

    return (
        <div className="relative w-full max-w-[240px]" ref={selectRef}>
            <button
                onClick={toggleDropdown}
                className="w-full rounded border border-gray-300 bg-black p-2 text-center text-white"
            >
                {isMultiSelect ? "Select Categories" : options.filter((option) => selectedOptionIds.includes(option.id))[0]?.name}
            </button>
            {isOpen && (
                <div className="absolute z-20 mt-1 w-full rounded border border-gray-300 bg-white shadow-lg">
                    {options.map(option => (
                        <label key={option.id} className="flex items-center p-2 hover:bg-gray-100">
                            <input
                                type={isMultiSelect ? "checkbox" : "radio"}
                                checked={selectedOptionIds.includes(option.id)}
                                onChange={() => handleOptionToggle(option.id)}
                                className="mr-2"
                            />
                            {option.name}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
