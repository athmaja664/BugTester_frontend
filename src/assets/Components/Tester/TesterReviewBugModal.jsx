import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlinePaperClip } from "react-icons/hi";
import toast from "react-hot-toast";
import { updateBugAPI, getSingleBugAPI } from "../../../../services/allAPI";

const allStatuses = ["New", "Assigned", "In Progress", "Resolved", "Ready for QA", "Retest", "Verified", "Closed"]

const tagColors = {
    Bug: "bg-[#f26d6d]/[0.12] text-[#f26d6d] border-[#f26d6d]/25",
    Enhancement: "bg-[#576aff]/[0.12] text-[#8b98ff] border-[#576aff]/25",
    Feature: "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/25",
}

// Testers can only change status - not title, tag, priority or assignees
function TesterReviewBugModal({ bug, onClose, getBugs }) {
    const [status, setStatus] = useState(bug.status || "New")
    const [attachments, setAttachments] = useState([])
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('token')

    const getAttachments = async () => {
        try {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await getSingleBugAPI(bug.id, reqHeader)
            if (response.status === 200) {
                setAttachments(response.data.attachments || [])
            }
        } catch (err) {
            toast.error('Failed to load attachments')
        }
    }

    useEffect(() => {
        getAttachments()
    }, [])

    const handleSubmit = async () => {
        if (loading) return
        try {
            setLoading(true)
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await updateBugAPI(bug.id, { status }, reqHeader)

            if (response.status === 200) {
                toast.success('Status updated')
                getBugs()
                onClose()
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to update status')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] px-4">
            <div className="bg-[#161922] border border-white/[0.08] rounded-[16px] shadow-lg w-full max-w-[460px] p-6">

                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">
                        BUG-{bug.id}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-[8px] text-[#5b606c] hover:bg-white/[0.04] hover:text-white transition-colors cursor-pointer"
                    >
                        <AiOutlineClose size={16} />
                    </button>
                </div>

                <div className="flex flex-col gap-4">

                    <div>
                        <h4 className="text-[15px] font-medium text-white">{bug.title}</h4>
                        {bug.description && (
                            <p className="text-[13px] text-[#8b909c] mt-1.5 leading-relaxed">{bug.description}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2.5 py-1 text-[11.5px] font-medium rounded-[5px] border ${tagColors[bug.tag] || "bg-white/[0.05] text-[#8b909c] border-white/10"}`}>
                            {bug.tag || "Bug"}
                        </span>
                        <span className="inline-flex px-2.5 py-1 text-[11.5px] font-medium rounded-[5px] border bg-white/[0.05] text-[#8b909c] border-white/10">
                            {bug.priority}
                        </span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">Assigned To</label>
                        <p className="text-[13px] text-white">
                            {bug.assignees && bug.assignees.length > 0
                                ? bug.assignees.map((a) => a.name).join(", ")
                                : "Unassigned"
                            }
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">Attachments</label>
                        {attachments.length === 0 ? (
                            <p className="text-[12.5px] text-[#5b606c]">No attachments</p>
                        ) : (
                            <div className="flex flex-col gap-1.5">
                                {attachments.map((file) => (
                                    <button
                                        type="button"
                                        key={file.id}
                                        onClick={() => window.open(file.file_url, "_blank", "noopener,noreferrer")}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-white/[0.03] border border-white/10 text-[12.5px] text-white text-left hover:border-[#f0a83b] transition-colors cursor-pointer"
                                    >
                                        <HiOutlinePaperClip size={14} className="text-[#f0a83b] shrink-0" />
                                        <span className="truncate">{file.file_name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[12.5px] font-medium text-[#a8abb8]">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full h-[42px] px-3.5 rounded-[8px] bg-white/[0.03] border border-white/10 text-[13.5px] text-left text-white cursor-pointer outline-none focus:border-[#f0a83b]"
                        >
                            {allStatuses.map((s) => (
                                <option className="bg-[#161922]" key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <p className="text-[11.5px] text-[#5b606c]">
                            Mark as <span className="text-[#c084fc]">Verified</span> once you've confirmed the fix, or <span className="text-[#f26d6d]">Retest</span> if it's still broken.
                        </p>
                    </div>

                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-[#a8abb8] border border-white/10 rounded-[8px] hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-semibold text-[#0d0f14] bg-[#f0a83b] rounded-[8px] hover:bg-[#f5bc6b] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Update Status'}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default TesterReviewBugModal;