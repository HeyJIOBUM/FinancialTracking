import React, {useEffect, useRef, useState} from 'react';

export default function Select({ options, selectedOptions, setSelectedOptions, isMultiSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionToggle = (option) => {
        if (isMultiSelect) {
            setSelectedOptions(prev => {
                if (prev.includes(option)) {
                    return prev.filter(o => o !== option);
                } else {
                    return [...prev, option];
                }
            });
        } else {
            setSelectedOptions([option]);
            setIsOpen(false);
        }
    };

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
                {isMultiSelect ? "Select Categories" : selectedOptions[0]}
            </button>
            {isOpen && (
                <div className="absolute z-20 mt-1 w-full rounded border border-gray-300 bg-white shadow-lg">
                    {options.map(option => (
                        <label key={option.id} className="flex items-center p-2 hover:bg-gray-100">
                            <input
                                type={isMultiSelect ? "checkbox" : "radio"}
                                checked={selectedOptions.includes(option.name)}
                                onChange={() => handleOptionToggle(option.name)}
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
