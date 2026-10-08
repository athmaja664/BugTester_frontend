import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { createBugAPI, getProjectsAPI, getUsersAPI } from "../../../../services/allAPI";

// change to true if you also want at least 1 attachment to be compulsory
const ATTACHMENTS_REQUIRED = false
const MAX_FILES = 5
const MAX_FILE_SIZE_MB = 5

const baseField = "px-3.5 rounded-[8px] bg-white/[0.03] border text-[13.5px] text-white placeholder:text-[#5b606c] outline-none transition-colors"

const allPriorities = ["Low", "Medium", "High", "Critical"]

function Required() {
    return <span className="text-[#f26d6d] ml-0.5">*</span>
}

function FieldError({ message }) {
    if (!message) return null
    return <p className="text-[12px] text-[#f26d6d] -mt-0.5">{message}</p>
}

// single-select dropdown that closes when the mouse leaves it
function SingleSelect({ value, options, placeholder, onChange, hasError }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    // close when clicking outside it (touch screens have no hover)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const selected = options.find((o) => String(o.value) === String(value))

    return (
        <div className="relative" ref={ref} onMouseLeave={() => setOpen(false)}>

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`w-full h-[42px] text-left cursor-pointer flex items-center justify-between ${baseField} ${hasError ? "border-[#f26d6d]" : "border-white/10 focus:border-[#f0a83b]"}`}
            >
                <span className={`truncate ${selected ? "text-white" : "text-[#5b606c]"}`}>
                    {selected ? selected.label : placeholder}
                </span>
                <span className="text-[#6a6f7b] text-xs ml-2 flex-shrink-0">
                    {open ? "▲" : "▼"}
                </span>
            </button>

            {open && (
                <div className="absolute top-full left-0 right-0 z-10 pt-1">
                    <div className="bg-[#1c202b] border border-white/10 rounded-[8px] shadow-lg max-h-[180px] overflow-y-auto p-1.5">
                        {options.length === 0 && (
                            <p className="text-[12.5px] text-[#5b606c] px-2 py-1">No options found</p>
                        )}
                        {options.map((o) => {
                            const isSelected = String(o.value) === String(value)
                            return (
                                <button
                                    type="button"
                                    key={o.value}
                                    onClick={() => {
                                        onChange(o.value)
                                        setOpen(false)
                                    }}
                                    className={`w-full flex items-center justify-between gap-2 text-left text-[13px] px-2.5 py-2 rounded-[6px] cursor-pointer hover:bg-white/[0.05] ${isSelected ? "text-[#f0a83b]" : "text-white"}`}
                                >
                                    <span className="truncate">{o.label}</span>
                                    {isSelected && <span className="text-xs flex-shrink-0">✓</span>}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}

        </div>
    )
}

function ReportBugModal({ onClose, getBugs }) {
    const allStatuses = ["New", "Assigned", "In Progress"]
    const allTags = ["Bug", "Enhancement", "Feature"]
    const [bugData, setBugData] = useState({
        title: "",
        description: "",
        project_id: "",
        status: "New",
        priority: "Medium",
        assignedTo: [],
        tag: "Bug",
        attachments: []
    })

    const [errors, setErrors] = useState({})
    const [projects, setProjects] = useState([])
    const [developers, setDevelopers] = useState([])
    const [loading, setLoading] = useState(false)
    const [assignDropdownOpen, setAssignDropdownOpen] = useState(false)
    const assignDropdownRef = useRef(null)
    const token = localStorage.getItem('token')

    const getProjects = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getProjectsAPI(reqHeader)
            if (response.status === 200) {
                setProjects(response.data.projects)
            }
        } catch (err) {
            toast.error('Failed to load projects')
        }
    }

    const getDevelopers = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getUsersAPI(reqHeader)
            if (response.status === 200) {
                const devs = response.data.users.filter((u) => u.role === 'Developer')
                setDevelopers(devs)
            }
        } catch (err) {
            toast.error('Failed to load developers')
        }
    }

    useEffect(() => {
        getProjects()
        getDevelopers()
    }, [])

    // close the assign-to dropdown when clicking outside it
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (assignDropdownRef.current && !assignDropdownRef.current.contains(e.target)) {
                setAssignDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // remove the error of one field as soon as the user fixes it
    const clearError = (name) => {
        setErrors((prev) => {
            if (!prev[name]) return prev
            const next = { ...prev }
            delete next[name]
            return next
        })
    }

    const borderClass = (name) =>
        errors[name] ? "border-[#f26d6d]" : "border-white/10 focus:border-[#f0a83b]"

    const handleChange = (e) => {
        const { name, value } = e.target
        setBugData((prev) => ({ ...prev, [name]: value }))
        clearError(name)
    }

    // used by the custom dropdowns (Project, Status, Priority)
    const handleSelect = (name, value) => {
        setBugData((prev) => ({ ...prev, [name]: value }))
        clearError(name)
    }

    const handleTagSelect = (tag) => {
        setBugData((prev) => ({ ...prev, tag }))
        clearError('tag')
    }

    const handleAssigneeToggle = (devId) => {
        setBugData((prev) => {
            const isSelected = prev.assignedTo.includes(devId)
            return {
                ...prev,
                assignedTo: isSelected
                    ? prev.assignedTo.filter((id) => id !== devId)
                    : [...prev.assignedTo, devId]
            }
        })
        clearError('assignedTo')
    }

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files)
        const combined = [...bugData.attachments, ...newFiles]

        if (combined.length > MAX_FILES) {
            toast.error(`You can attach up to ${MAX_FILES} files`)
            e.target.value = ""
            return
        }
        if (newFiles.some((f) => f.size > MAX_FILE_SIZE_MB * 1024 * 1024)) {
            toast.error(`Each file must be under ${MAX_FILE_SIZE_MB}MB`)
            e.target.value = ""
            return
        }
        setBugData((prev) => ({ ...prev, attachments: combined }))
        clearError('attachments')
        e.target.value = "" // lets the user pick the same file again if needed
    }

    const handleRemoveFile = (index) => {
        setBugData((prev) => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }))
    }

    // checks every field and returns an object of error messages
    const validate = () => {
        const newErrors = {}

        if (!bugData.title.trim()) newErrors.title = 'Bug title is required'
        if (!bugData.description.trim()) newErrors.description = 'Description is required'
        if (!bugData.project_id) newErrors.project_id = 'Please select a project'
        if (!bugData.status) newErrors.status = 'Please select a status'
        if (!bugData.priority) newErrors.priority = 'Please select a priority'
        if (!bugData.tag) newErrors.tag = 'Please select a tag'
        if (bugData.assignedTo.length === 0) newErrors.assignedTo = 'Assign at least one developer'
        if (ATTACHMENTS_REQUIRED && bugData.attachments.length === 0) {
            newErrors.attachments = 'Please attach at least one file'
        }

        return newErrors
    }

    const handleSubmit = async () => {
        if (loading) return

        const newErrors = validate()
        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            toast.error('Please fill all the required fields')
            return
        }

        try {
            setLoading(true)
            const reqHeader = { Authorization: `Bearer ${token}` }

            // FormData is needed because we are sending files
            const formData = new FormData()
            formData.append('title', bugData.title.trim())
            formData.append('description', bugData.description.trim())
            formData.append('project_id', bugData.project_id)
            formData.append('status', bugData.status)
            formData.append('priority', bugData.priority)
            formData.append('tag', bugData.tag)
            formData.append('assignedTo', JSON.stringify(bugData.assignedTo))
            bugData.attachments.forEach((file) => {
                formData.append('attachments', file)
            })

            const response = await createBugAPI(formData, reqHeader)

            if (response.status === 200) {
                toast.success('Bug reported successfully')
                getBugs()
                onClose()
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to report bug')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] px-4">
            <div className="bg-[#161922] border border-white/[0.08] rounded-[16px] shadow-lg w-full max-w-[720px] max-h-[90vh] overflow-y-auto">

                {/* header */}
                <div className="flex items-center justify-between px-5 sm:px-7 pt-6 sm:pt-7 pb-5 border-b border-white/[0.06]">
                    <h3 className="text-lg font-semibold text-white">Report Bug</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-[8px] text-[#5b606c] hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
                    >
                        <AiOutlineClose size={16} />
                    </button>
                </div>

                {/* two-column form */}
                <div className="px-5 sm:px-7 py-6 grid grid-cols-2 gap-8 max-[560px]:grid-cols-1">

                    {/* LEFT column */}
                    <div className="flex flex-col gap-5">
                        <p className="text-xs font-semibold text-[#f0a83b] uppercase tracking-wide">
                            Bug Details
                        </p>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Bug Title<Required />
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={bugData.title}
                                onChange={handleChange}
                                placeholder="e.g. Login button not responding on Safari"
                                className={`h-[42px] ${baseField} ${borderClass('title')}`}
                            />
                            <FieldError message={errors.title} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Description<Required />
                            </label>
                            <textarea
                                name="description"
                                value={bugData.description}
                                onChange={handleChange}
                                placeholder="Steps to reproduce, expected vs actual behavior..."
                                rows={4}
                                className={`py-2.5 resize-none ${baseField} ${borderClass('description')}`}
                            />
                            <FieldError message={errors.description} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Project<Required />
                            </label>
                            <SingleSelect
                                value={bugData.project_id}
                                options={projects.map((p) => ({ value: p.id, label: p.name }))}
                                placeholder="Select a project"
                                onChange={(val) => handleSelect('project_id', val)}
                                hasError={!!errors.project_id}
                            />
                            <FieldError message={errors.project_id} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Attachments ({ATTACHMENTS_REQUIRED ? "required" : "optional"}, max {MAX_FILES} files, {MAX_FILE_SIZE_MB}MB each)
                                {ATTACHMENTS_REQUIRED && <Required />}
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="text-[13px] text-[#a8abb8] file:mr-3 file:px-3 file:py-1.5 file:rounded-[6px] file:border-0 file:bg-[#f0a83b]/[0.15] file:text-[#f0a83b] file:text-[12.5px] file:cursor-pointer cursor-pointer"
                            />
                            <p className="text-[12px] text-[#5b606c]">
                                {bugData.attachments.length} of {MAX_FILES} files added
                            </p>
                            {bugData.attachments.length > 0 && (
                                <div className="flex flex-col gap-1.5 mt-1">
                                    {bugData.attachments.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-[6px] bg-white/[0.03] border border-white/10"
                                        >
                                            <span className="text-[12.5px] text-white truncate">{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile(index)}
                                                className="text-[#6a6f7b] hover:text-white flex-shrink-0 cursor-pointer"
                                            >
                                                <AiOutlineClose size={13} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <FieldError message={errors.attachments} />
                        </div>
                    </div>

                    {/* RIGHT column */}
                    <div className="flex flex-col gap-5">
                        <p className="text-xs font-semibold text-[#f0a83b] uppercase tracking-wide">
                            Classification
                        </p>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Status<Required />
                            </label>
                            <SingleSelect
                                value={bugData.status}
                                options={allStatuses.map((s) => ({ value: s, label: s }))}
                                placeholder="Select a status"
                                onChange={(val) => handleSelect('status', val)}
                                hasError={!!errors.status}
                            />
                            <FieldError message={errors.status} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Priority<Required />
                            </label>
                            <SingleSelect
                                value={bugData.priority}
                                options={allPriorities.map((p) => ({ value: p, label: p }))}
                                placeholder="Select a priority"
                                onChange={(val) => handleSelect('priority', val)}
                                hasError={!!errors.priority}
                            />
                            <FieldError message={errors.priority} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Tag<Required />
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {allTags.map((tag) => (
                                    <button
                                        type="button"
                                        key={tag}
                                        onClick={() => handleTagSelect(tag)}
                                        className={bugData.tag === tag
                                            ? "px-3 py-1.5 rounded-[6px] text-[12.5px] font-medium border cursor-pointer transition-colors bg-[#f0a83b]/[0.15] text-[#f0a83b] border-[#f0a83b]/40"
                                            : "px-3 py-1.5 rounded-[6px] text-[12.5px] font-medium border cursor-pointer transition-colors bg-white/[0.03] text-[#a8abb8] border-white/10 hover:border-white/20"
                                        }
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                            <FieldError message={errors.tag} />
                        </div>

                        {/* Assign To — click-to-open multi-select, closes when the mouse leaves */}
                        <div
                            className="flex flex-col gap-2 relative"
                            ref={assignDropdownRef}
                            onMouseLeave={() => setAssignDropdownOpen(false)}
                        >
                            <label className="text-[12.5px] font-medium text-[#a8abb8]">
                                Assign To<Required />
                            </label>

                            <button
                                type="button"
                                onClick={() => setAssignDropdownOpen((prev) => !prev)}
                                className={`w-full h-[42px] text-left cursor-pointer flex items-center justify-between ${baseField} ${borderClass('assignedTo')}`}
                            >
                                <span className={`truncate ${bugData.assignedTo.length === 0 ? "text-[#5b606c]" : "text-white"}`}>
                                    {bugData.assignedTo.length === 0
                                        ? "Select developers"
                                        : developers
                                            .filter((d) => bugData.assignedTo.includes(d.id))
                                            .map((d) => d.name)
                                            .join(", ")
                                    }
                                </span>
                                <span className="text-[#6a6f7b] text-xs ml-2 flex-shrink-0">
                                    {assignDropdownOpen ? "▲" : "▼"}
                                </span>
                            </button>

                            {assignDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 z-10 pt-1">
                                    <div className="bg-[#1c202b] border border-white/10 rounded-[8px] shadow-lg max-h-[180px] overflow-y-auto p-2">
                                        {developers.length === 0 && (
                                            <p className="text-[12.5px] text-[#5b606c] px-2 py-1">No developers found</p>
                                        )}
                                        {developers.map((d) => (
                                            <label
                                                key={d.id}
                                                className="flex items-center gap-2 text-[13px] text-white px-2 py-2 rounded-[6px] cursor-pointer hover:bg-white/[0.05]"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={bugData.assignedTo.includes(d.id)}
                                                    onChange={() => handleAssigneeToggle(d.id)}
                                                    className="accent-[#f0a83b]"
                                                />
                                                {d.name}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <FieldError message={errors.assignedTo} />
                        </div>
                    </div>

                </div>

                {/* footer */}
                <div className="flex items-center justify-center gap-3 px-5 sm:px-7 py-5 border-t border-white/[0.06]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-[44px] px-5 text-sm font-medium text-[#a8abb8] hover:text-white cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="h-[44px] px-6 text-sm font-bold text-[#0d0f14] bg-[#f0a83b] rounded-[8px] hover:bg-[#f5bc6b] disabled:opacity-60 cursor-pointer"
                    >
                        {loading ? 'Reporting...' : 'Report Bug'}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ReportBugModal;