import React, { useState, useEffect, useRef } from "react";

// options = [{ id, name }], selected = [id, id], onToggle(id) flips one user on/off
function AssigneeDropdown({ options, selected, onToggle }) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    // close the dropdown when clicking outside it
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const selectedNames = options
        .filter((o) => selected.includes(o.id))
        .map((o) => o.name)

    return (
        <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
            <label className="text-[12.5px] font-medium text-[#a8abb8]">Assign To</label>

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b] flex items-center justify-between"
            >
                <span className={`truncate ${selectedNames.length === 0 ? "text-[#5b606c]" : "text-white"}`}>
                    {selectedNames.length === 0 ? "Select developers" : selectedNames.join(", ")}
                </span>
                <span className="text-[#6a6f7b] text-xs ml-2 flex-shrink-0">
                    {open ? "▲" : "▼"}
                </span>
            </button>

            {open && (
                <div className="absolute top-full mt-1 left-0 right-0 z-10 bg-[#1c202b] border border-white/10 rounded-[8px] shadow-lg max-h-[180px] overflow-y-auto p-2">
                    {options.length === 0 && (
                        <p className="text-[12.5px] text-[#5b606c] px-2 py-1">No developers found</p>
                    )}
                    {options.map((o) => (
                        <label
                            key={o.id}
                            className="flex items-center gap-2 text-[13px] text-white px-2 py-2 rounded-[6px] cursor-pointer hover:bg-white/[0.05]"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(o.id)}
                                onChange={() => onToggle(o.id)}
                                className="accent-[#f0a83b]"
                            />
                            {o.name}
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AssigneeDropdown;