import React from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

const statusColors = {
    "New": "bg-white/[0.05] text-[#a8abb8] border-white/10",
    "Assigned": "bg-[#576aff]/[0.12] text-[#8b98ff] border-[#576aff]/25",
    "In Progress": "bg-[#f0a83b]/[0.12] text-[#f0a83b] border-[#f0a83b]/25",
    "Resolved": "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/25",
    "Ready for QA": "bg-[#c084fc]/[0.12] text-[#c084fc] border-[#c084fc]/25",
    "Retest": "bg-[#c084fc]/[0.12] text-[#c084fc] border-[#c084fc]/25",
    "Verified": "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/25",
    "Closed": "bg-white/[0.04] text-[#6a6f7b] border-white/10",
}

const priorityColors = {
    Low: "bg-white/[0.05] text-[#8b909c] border-white/10",
    Medium: "bg-[#f0a83b]/[0.12] text-[#f0a83b] border-[#f0a83b]/25",
    High: "bg-[#f26d6d]/[0.12] text-[#f26d6d] border-[#f26d6d]/25",
    Critical: "bg-[#f26d6d]/[0.2] text-[#f26d6d] border-[#f26d6d]/40",
}

const tagColors = {
    Bug: "bg-[#f26d6d]/[0.12] text-[#f26d6d] border-[#f26d6d]/25",
    Enhancement: "bg-[#576aff]/[0.12] text-[#8b98ff] border-[#576aff]/25",
    Feature: "bg-[#4ade80]/[0.12] text-[#4ade80] border-[#4ade80]/25",
}

// onEdit and onDelete are optional - a button only shows if the page passes it
function BugsTable({ bugs, projectsMap, onEdit, onDelete }) {
    if (bugs.length === 0) {
        return (
            <div className="py-8 text-center text-[13.5px] text-[#5b606c]">
                No bugs found
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left">
                <thead>
                    <tr className="text-[11.5px] uppercase tracking-wide text-[#6a6f7b] border-b border-white/[0.06]">
                        <th className="px-4 py-3 font-medium">ID</th>
                        <th className="px-4 py-3 font-medium">Title</th>
                        <th className="px-4 py-3 font-medium">Tag</th>
                        <th className="px-4 py-3 font-medium">Priority</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Assignees</th>
                        <th className="px-4 py-3 font-medium text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {bugs.map((item) => {
                        const names = (item.assignees || []).map((a) => a.name)

                        return (
                            <tr
                                key={item.id}
                                className="border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.03] transition-colors"
                            >
                                <td className="px-4 py-3 text-[12.5px] font-semibold text-[#f0a83b] whitespace-nowrap">
                                    BUG-{item.id}
                                </td>

                                <td className="px-4 py-3">
                                    <p className="text-[13.5px] font-medium text-white truncate max-w-[300px]" title={item.title}>
                                        {item.title}
                                    </p>
                                    <p className="text-[11.5px] text-[#5b606c] mt-0.5 truncate max-w-[300px]">
                                        {projectsMap[item.project_id] || "—"}
                                    </p>
                                </td>

                                <td className="px-4 py-3">
                                    <span className={`inline-flex px-2.5 py-1 text-[11.5px] font-medium rounded-[5px] border whitespace-nowrap ${tagColors[item.tag] || "bg-white/[0.05] text-[#8b909c] border-white/10"}`}>
                                        {item.tag || "Bug"}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    <span className={`inline-flex px-2.5 py-1 text-[11.5px] font-medium rounded-[5px] border ${priorityColors[item.priority] || "bg-white/[0.05] text-[#8b909c] border-white/10"}`}>
                                        {item.priority}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    <span className={`inline-flex px-2.5 py-1 text-[11.5px] font-medium rounded-[5px] border whitespace-nowrap ${statusColors[item.status] || "bg-white/[0.05] text-[#8b909c] border-white/10"}`}>
                                        {item.status}
                                    </span>
                                </td>

                                <td className="px-4 py-3 text-[12.5px]">
                                    {names.length === 0 ? (
                                        <span className="text-[#5b606c]">Unassigned</span>
                                    ) : (
                                        <span className="text-[#a8abb8]" title={names.join(", ")}>
                                            {names.slice(0, 2).join(", ")}
                                            {names.length > 2 && ` +${names.length - 2}`}
                                        </span>
                                    )}
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-end gap-1">
                                        {onEdit && (
                                            <button
                                                type="button"
                                                title="Edit"
                                                onClick={() => onEdit(item)}
                                                className="w-8 h-8 flex items-center justify-center rounded-[8px] text-[#6a6f7b] hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
                                            >
                                                <HiOutlinePencilSquare size={16} />
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                type="button"
                                                title="Delete"
                                                onClick={() => onDelete(item)}
                                                className="w-8 h-8 flex items-center justify-center rounded-[8px] text-[#6a6f7b] hover:bg-[#f26d6d]/[0.08] hover:text-[#f26d6d] transition-colors cursor-pointer"
                                            >
                                                <HiOutlineTrash size={16} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default BugsTable;