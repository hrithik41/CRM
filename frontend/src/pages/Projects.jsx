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
import AddProjectModal from "../components/modals/AddProjectModal";
import Button from "../components/ui/Button";
import { api } from "../utils/api";
import toast from "react-hot-toast";

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

const Projects = () => {
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [projectToEdit, setProjectToEdit] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProjects();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentPage]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const query = `?page=${currentPage}&limit=${limit}${
        searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""
      }`;
      const response = await api.get(`/api/projects${query}`);
      if (response.success) {
        setProjectsData(response.data);
        setTotalRecords(response.pagination.totalRecords);
      }
    } catch (error) {
      console.error("Failed to fetch projects", error);
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      setSelectedRows(projectsData.map((proj) => proj.project_id));
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
      if (newSelected.length === projectsData.length) {
        setSelectAll(true);
      }
    }
  };

  const handleDelete = async () => {
    if (selectedRows.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedRows.length} project(s)?`)) {
      try {
        const res = await api.post("/api/projects/delete", { ids: selectedRows });
        if (res.success) {
          toast.success("Projects deleted successfully");
          setSelectedRows([]);
          setSelectAll(false);
          fetchProjects();
        } else {
          toast.error(res.message || "Failed to delete");
        }
      } catch (err) {
        toast.error("An error occurred while deleting.");
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-fade-in relative overflow-hidden">
      {/* Section 1: Header */}
      <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-slate-200 shadow-sm z-10 shrink-0">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Projects
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Total Records: {totalRecords}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedRows.length > 0 && (
             <Button
                variant="danger"
                size="default"
                onClick={handleDelete}
                className="gap-2 font-semibold shadow-sm bg-red-600 text-white hover:bg-red-700"
              >
                Delete Selected ({selectedRows.length})
              </Button>
          )}
          <Button
            variant="default"
            size="default"
            className="gap-2 font-semibold shadow-sm bg-[#0066cc] hover:bg-[#0055b3]"
            onClick={() => {
              setProjectToEdit(null);
              setIsAddModalOpen(true);
            }}
          >
            <Plus size={16} />
            New Project
          </Button>
        </div>
      </div>

      {/* Section 2: Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-200 z-10 shrink-0">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-80 group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search projects by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm placeholder:text-slate-400"
            />
          </div>
          <Button
            variant="secondary"
            size="default"
            className="gap-2 text-slate-600 bg-white border-slate-200 shadow-sm hover:bg-slate-50"
          >
            <Filter size={16} className="text-slate-400" />
            Filters
          </Button>
        </div>
      </div>

      {/* Section 3: Data Table */}
      <div className="flex-1 overflow-hidden p-6 relative z-0 flex flex-col min-h-0">
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
                  <ResizableHeader initialWidth={250}>PROJECT NAME</ResizableHeader>
                  <ResizableHeader initialWidth={200}>LOCATION</ResizableHeader>
                  <ResizableHeader initialWidth={150}>TYPE</ResizableHeader>
                  <ResizableHeader initialWidth={150}>STATUS</ResizableHeader>
                  <ResizableHeader initialWidth={150}>DATE</ResizableHeader>
                  <th className="border-b border-slate-200 px-4 py-3 font-semibold tracking-wider text-[11px] uppercase text-slate-500 bg-slate-50 w-24 min-w-[96px] text-center sticky right-0 shadow-[-1px_0_0_rgba(226,232,240,1)] z-20">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="animate-spin text-blue-500" size={24} />
                        <span>Loading projects...</span>
                      </div>
                    </td>
                  </tr>
                ) : projectsData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-slate-500 font-medium">
                      No projects found.
                    </td>
                  </tr>
                ) : (
                  projectsData.map((proj) => (
                    <tr
                      key={proj.project_id}
                      className={`hover:bg-blue-50/50 group ${selectedRows.includes(proj.project_id) ? "bg-blue-50/30" : ""}`}
                    >
                      <td className="border-r border-slate-100 px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                          checked={selectedRows.includes(proj.project_id)}
                          onChange={() => toggleRow(proj.project_id)}
                        />
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 font-semibold text-[#0066cc] truncate">
                        {proj.project_name || "-"}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate">
                        {proj.project_location || "-"}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate">
                        {proj.project_type || "-"}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate">
                        {proj.project_is_active ? proj.project_is_active.replace(/_/g, " ") : "-"}
                      </td>
                      <td className="border-r border-slate-100 px-4 py-3 text-slate-600 truncate">
                        {proj.project_date ? new Date(proj.project_date).toLocaleDateString() : "-"}
                      </td>
                      <td className={`px-4 py-3 text-center sticky right-0 group-hover:bg-blue-50/50 shadow-[-1px_0_0_rgba(241,245,249,1)] ${selectedRows.includes(proj.project_id) ? "bg-blue-50/30" : "bg-white"}`}>
                        <div className="flex items-center justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 transition-colors cursor-pointer"
                            title="Edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              setProjectToEdit(proj);
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

          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
            <span className="text-xs text-slate-500 font-medium">
              Showing {(currentPage - 1) * limit + 1} to{" "}
              {Math.min(currentPage * limit, totalRecords)} of {totalRecords}{" "}
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
      
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setProjectToEdit(null);
        }}
        onSuccess={fetchProjects}
        projectToEdit={projectToEdit}
      />
    </div>
  );
};

export default Projects;
