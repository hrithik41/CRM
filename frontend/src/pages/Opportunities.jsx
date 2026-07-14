import { useState, useEffect } from "react";
import {
  Download,
  Upload,
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Loader2,
} from "lucide-react";
import Button from "../components/ui/Button";
import { api } from "../utils/api";
import AddOpportunityModal from "../components/modals/AddOpportunityModal";

// Reusing the ResizableHeader from Accounts
const ResizableHeader = ({ children, initialWidth }) => {
  const [width, setWidth] = useState(initialWidth || 150);

  const startResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (moveEvent) => {
      setWidth(Math.max(50, startWidth + moveEvent.clientX - startX));
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <th
      className="relative border-r border-b border-slate-200 px-4 py-3 font-semibold tracking-wider text-[11px] uppercase text-slate-500 bg-slate-50 select-none whitespace-nowrap"
      style={{ width: width, minWidth: width, maxWidth: width }}
    >
      <div className="overflow-hidden text-ellipsis w-full pr-2">
        {children}
      </div>
      <div
        className="absolute right-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-blue-400 z-10 transition-colors"
        onMouseDown={startResize}
      />
    </th>
  );
};

const Opportunities = () => {
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [opportunitiesData, setOpportunitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);

  // Modal states - ready for when we build the components!
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [opportunityToEdit, setOpportunityToEdit] = useState(null);
  const [viewOpportunityId, setViewOpportunityId] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchOpportunities();
    }, 300); // 300ms debounce for search

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentPage]);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const query = `?page=${currentPage}&limit=${limit}${
        searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""
      }`;

      const response = await api.get(`/api/opportunities${query}`);
      if (response.success) {
        setOpportunitiesData(response.data);
        setTotalRecords(response.pagination.totalRecords);
      }
    } catch (error) {
      console.error("Failed to fetch opportunities", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      setSelectedRows(opportunitiesData.map((opp) => opp.opportunity_id));
      setSelectAll(true);
    }
  };

  const toggleRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      setSelectAll(false);
    } else {
      const newSelected = [...selectedRows, id];
      setSelectedRows(newSelected);
      if (newSelected.length === opportunitiesData.length) {
        setSelectAll(true);
      }
    }
  };

  const getStageColorClass = (stage) => {
    switch (stage) {
      case "Closed Won":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-500";
      case "Closed Lost":
        return "bg-red-50 text-red-700 border-red-200 focus:ring-red-500";
      case "Pitch Done":
        return "bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-500";
      case "Follow Up":
        return "bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-500";
      default:
        return "bg-white text-slate-700 border-slate-300 focus:ring-blue-500";
    }
  };

  const getStageBadgeClass = (stage) => {
    if (!stage) return "bg-orange-50 text-orange-600 border-orange-200";
    const normalized = stage.replace(/_/g, " ").toUpperCase();
    switch (normalized) {
      case "CLOSED WON":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "CLOSED LOST":
        return "bg-red-50 text-red-600 border-red-200";
      case "PITCH DONE":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "FOLLOW UP":
        return "bg-amber-50 text-amber-600 border-amber-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-fade-in relative overflow-hidden">
      {/* Section 1: Header */}
      <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-slate-200 shadow-sm z-10 shrink-0">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Opportunities
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Total Records: {totalRecords}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="default"
            className="gap-2 text-slate-700 font-semibold shadow-sm border-slate-300"
          >
            <Upload size={16} className="text-slate-500" />
            Import
          </Button>
          <Button
            variant="secondary"
            size="default"
            className="gap-2 text-slate-700 font-semibold shadow-sm border-slate-300"
          >
            <Download size={16} className="text-slate-500" />
            Export
          </Button>
          <Button
            variant="default"
            size="default"
            className="gap-2 font-semibold shadow-sm bg-[#0066cc] hover:bg-[#0055b3]"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} />
            Add Opportunity
          </Button>
        </div>
      </div>

      {/* Section 2: Tabs and Filters */}
      <div className="px-6 border-b border-slate-200 bg-white flex flex-col shrink-0">
        {/* Tabs Row */}
        <div className="flex items-center gap-1 pt-2">
          <button className="px-4 py-2 text-sm font-semibold text-blue-600 border-b-2 border-blue-600">
            My Opportunities
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border-b-2 border-transparent transition-colors">
            Project Wise
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border-b-2 border-transparent transition-colors">
            Opportunity Report
          </button>
        </div>

        {/* Filters Row */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            {/* Search Opportunities */}
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={14} className="text-blue-500" />
              </div>
              <input
                type="text"
                placeholder="Search opportunities..."
                className="w-full pl-9 pr-4 py-1.5 border border-slate-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Stages Dropdown */}
            <select 
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className={`w-50 border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 cursor-pointer font-medium transition-colors ${getStageColorClass(stageFilter)}`}
            >
              <option value="All Stages" className="bg-white text-slate-700 font-normal">All Stages</option>
              <option value="Pitch Done" className="bg-white text-slate-700 font-normal">Pitch Done</option>
              <option value="Follow Up" className="bg-white text-slate-700 font-normal">Follow Up</option>
              <option value="Closed Won" className="bg-white text-slate-700 font-normal">Closed Won</option>
              <option value="Closed Lost" className="bg-white text-slate-700 font-normal">Closed Lost</option>
            </select>

            {/* Filter by Account */}
            <div className="relative w-84">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={14} className="text-blue-500" />
              </div>
              <input
                type="text"
                placeholder="Filter by account..."
                className="w-full pl-9 pr-4 py-1.5 border border-slate-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Clear Button */}
            <Button
              variant="secondary"
              size="sm"
              className="gap-1.5 h-[34px] text-blue-600 border-slate-300 bg-white hover:bg-blue-50"
            >
              <span className="text-blue-600 font-bold text-lg leading-none mt-[-2px]">
                &times;
              </span>{" "}
              Clear
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            {selectedRows.length > 0 && (
              <span className="text-blue-600 font-semibold bg-blue-50 px-3 py-1.5 rounded border border-blue-100">
                {selectedRows.length} selected
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Data Table */}
      <div className="flex-1 p-6 overflow-hidden flex flex-col">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col flex-1 overflow-hidden">
          <div className="overflow-auto flex-1 bg-white relative">
            <table
              className="w-full text-left text-sm border-collapse"
              style={{ tableLayout: "fixed" }}
            >
              <thead className="sticky top-0 z-20 shadow-[0_1px_0_rgba(226,232,240,1)] bg-slate-50">
                <tr>
                  <th className="border-r border-b border-slate-200 px-4 py-3 bg-slate-50 w-12 min-w-[48px] max-w-[48px] text-center z-20">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <ResizableHeader initialWidth={150}>
                    OPPORTUNITY NAME
                  </ResizableHeader>
                  <ResizableHeader initialWidth={100}>CONTACT</ResizableHeader>
                  <ResizableHeader initialWidth={100}>ACCOUNT</ResizableHeader>
                  <ResizableHeader initialWidth={100}>OWNER</ResizableHeader>
                  <ResizableHeader initialWidth={100}>STAGE</ResizableHeader>
                  <ResizableHeader initialWidth={100}>WON TYPE</ResizableHeader>
                  <ResizableHeader initialWidth={100}>AMOUNT</ResizableHeader>
                  <ResizableHeader initialWidth={100}>
                    CLOSE DATE
                  </ResizableHeader>
                  <ResizableHeader initialWidth={100}>TYPE</ResizableHeader>
                  <ResizableHeader initialWidth={100}>
                    CALL STATUS
                  </ResizableHeader>
                  <ResizableHeader initialWidth={100}>PROB %</ResizableHeader>
                  <ResizableHeader initialWidth={100}>
                    CREATED AT
                  </ResizableHeader>
                  <th className="border-b border-slate-200 px-4 py-3 font-semibold tracking-wider text-[11px] uppercase text-slate-500 bg-slate-50 w-24 min-w-[96px] text-center sticky right-0 shadow-[-1px_0_0_rgba(226,232,240,1)] z-20">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                {loading ? (
                  <tr>
                    <td
                      colSpan="13"
                      className="py-12 text-center text-slate-500"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2
                          className="animate-spin text-blue-500"
                          size={24}
                        />
                        <span>Loading opportunities...</span>
                      </div>
                    </td>
                  </tr>
                ) : opportunitiesData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="13"
                      className="py-12 text-center text-slate-500 font-medium"
                    >
                      No opportunities found.
                    </td>
                  </tr>
                ) : (
                  opportunitiesData.map((opp) => (
                    <tr
                      key={opp.opportunity_id}
                      onClick={() => setViewOpportunityId(opp.opportunity_id)}
                      className={`hover:bg-blue-50/50 group cursor-pointer ${selectedRows.includes(opp.opportunity_id) ? "bg-blue-50/30" : ""}`}
                    >
                      <td
                        className="border-r border-slate-100 px-4 py-3 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                          checked={selectedRows.includes(opp.opportunity_id)}
                          onChange={() => toggleRow(opp.opportunity_id)}
                        />
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 font-semibold text-[#0066cc] hover:underline cursor-pointer truncate">
                        {opp.opportunity_name}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 font-semibold text-[#0066cc] hover:underline cursor-pointer truncate">
                        {opp.opportunity_contact
                          ? `${opp.opportunity_contact.contact_firstname || ""} ${opp.opportunity_contact.contact_lastname || ""}`.trim()
                          : "-"}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate">
                        {opp.opportunity_account?.account_name || "-"}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate">
                        {opp.opportunity_owner?.user_name || "-"}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate">
                        {opp.opportunity_stage ? (
                          <span className={`px-2.5 py-1 text-[11px] font-bold rounded border uppercase tracking-wide ${getStageBadgeClass(opp.opportunity_stage)}`}>
                            {opp.opportunity_stage.replace(/_/g, " ")}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-400 truncate">
                        —
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-400 truncate">
                        —
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate">
                        {opp.opportunity_close_date
                          ? new Date(
                              opp.opportunity_close_date,
                            ).toLocaleDateString("en-GB")
                          : "-"}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate capitalize">
                        {opp.opportunity_type?.toLowerCase() || "-"}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate capitalize">
                        {opp.opportunity_call_status
                          ?.replace(/_/g, " ")
                          .toLowerCase() || "-"}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate">
                        10.00%
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate">
                        {new Date(
                          opp.opportunity_created_at,
                        ).toLocaleDateString("en-GB")}
                      </td>
                      <td
                        className={`px-4 py-3 text-center sticky right-0 group-hover:bg-blue-50/50 shadow-[-1px_0_0_rgba(241,245,249,1)] ${selectedRows.includes(opp.opportunity_id) ? "bg-blue-50/30" : "bg-white"}`}
                      >
                        <div className="flex items-center justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 transition-colors cursor-pointer"
                            title="View"
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewOpportunityId(opp.opportunity_id);
                            }}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 transition-colors cursor-pointer"
                            title="Edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpportunityToEdit(opp);
                              setIsAddModalOpen(true);
                            }}
                          >
                            <Edit2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
            <span className="text-xs text-slate-500 font-medium">
              Showing {totalRecords === 0 ? 0 : (currentPage - 1) * limit + 1}{" "}
              to {Math.min(currentPage * limit, totalRecords)} of {totalRecords}{" "}
              records
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="text-xs px-3 shadow-sm border-slate-300"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="text-xs px-3 shadow-sm border-slate-300"
                disabled={currentPage * limit >= totalRecords}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddOpportunityModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setOpportunityToEdit(null);
        }}
        onSuccess={fetchOpportunities}
        opportunityToEdit={opportunityToEdit}
      />
    </div>
  );
};

export default Opportunities;
