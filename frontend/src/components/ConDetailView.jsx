import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import { 
  MoreHorizontal, 
  UserPlus, 
  Edit, 
  Phone, 
  Mail, 
  CheckCircle, 
  Bell, 
  Save, 
  Link, 
  Clock, 
  ChevronDown, 
  ChevronRight,
  Building2,
  User
} from "lucide-react";
import Button from "./ui/Button";

const ConDetailView = ({ isOpen, onClose, contactId }) => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState("Details");
  const [activeSidebarTab, setActiveSidebarTab] = useState("Call");

  useEffect(() => {
    if (isOpen && contactId) {
      setLoading(true);
      api
        .get(`/api/contacts/${contactId}`)
        .then((res) => {
          if (res.success) {
            setContactData(res.data);
          }
        })
        .catch((error) => console.error("Error fetching contact details:", error))
        .finally(() => setLoading(false));
    } else {
      setContactData(null);
      setActiveMainTab("Details");
      setActiveSidebarTab("Call");
    }
  }, [isOpen, contactId]);

  if (!isOpen) return null;

  const fullName = `${contactData?.contact_firstname || ""} ${contactData?.contact_lastname || ""}`.trim();
  const title = contactData?.contact_title || contactData?.contact_designation || "No Title";
  const accountName = contactData?.account?.account_name || "-";
  const mobile = contactData?.contact_mobile || contactData?.contact_phone || "-";
  const email = contactData?.contact_professional_email || contactData?.contact_personal_email || "-";
  const owner = contactData?.contact_owner?.user_name || "Unknown";

  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-slate-50 font-sans animate-fade-in h-full">
      
      <div className="flex-1 overflow-y-auto bg-slate-50">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : contactData ? (
          <div className="w-full mx-auto pb-6">
            
            {/* Top Section */}
            <div className="bg-white px-6 pt-4 shadow-sm border-b border-slate-200">
              
              {/* Breadcrumb & Actions */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-[13px] text-blue-600 mb-1 font-semibold flex items-center gap-2">
                    <span onClick={onClose} className="hover:underline cursor-pointer">Contacts</span> 
                    <span className="text-slate-400">&gt;</span> 
                    <span className="text-slate-600">{fullName}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none mb-1.5">
                    {fullName}
                  </h1>
                  <p className="text-[11px] font-semibold text-slate-500 flex items-center gap-2">
                    <span>{contactData.contact_code || "UNKNOWN"}</span>
                    <span className="text-slate-300">•</span>
                    <span>{title}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-blue-600 cursor-pointer hover:underline">{accountName}</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" className="gap-2 text-blue-600 font-semibold border-slate-300">
                    <UserPlus size={14} strokeWidth={2.5} /> Add to Campaign
                  </Button>
                  <Button variant="primary" size="sm" className="gap-2 font-semibold bg-blue-600">
                    <Edit size={14} strokeWidth={2.5} /> Edit
                  </Button>
                  <Button variant="secondary" size="sm" className="border-slate-300 px-2">
                    <MoreHorizontal size={14} className="text-slate-600" />
                  </Button>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex border-t border-slate-100 mt-4 py-3">
                <div className="flex-1 border-r border-slate-100 px-4 first:pl-0 last:border-r-0">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-blue-600 flex items-center gap-1.5">
                      <Phone size={14} /> {mobile}
                    </span>
                    <button className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      <Phone size={10} /> Log Call
                    </button>
                  </div>
                </div>
                <div className="flex-1 border-r border-slate-100 px-4 last:border-r-0">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email</span>
                  <span className="text-sm font-semibold text-slate-400">{email !== "-" ? email : "—"}</span>
                </div>
                <div className="flex-1 border-r border-slate-100 px-4 last:border-r-0">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Account</span>
                  <span className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer">{accountName}</span>
                </div>
                <div className="flex-1 border-r border-slate-100 px-4 last:border-r-0">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Call Status</span>
                  <span className="text-sm font-semibold text-slate-400">{contactData.contact_call_status || "—"}</span>
                </div>
                <div className="flex-1 px-4 last:border-r-0">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Owner</span>
                  <span className="text-sm font-semibold text-slate-800">{owner}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-slate-200 px-6">
              <div className="flex gap-6">
                {['Details', 'Opportunities', 'Accuracy', 'Related'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveMainTab(tab)}
                    className={`py-3 text-[13px] font-bold transition-colors border-b-2 ${
                      activeMainTab === tab
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Layout */}
            {activeMainTab === 'Details' && (
              <div className="flex flex-col lg:flex-row gap-4 p-4 lg:p-6">
                
                {/* Left Column - Details Form */}
                <div className="flex-1 bg-white border border-slate-200 shadow-sm">
                  
                  {/* Section Header */}
                  <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50/50">
                    <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Contact Information</h3>
                    <ChevronDown size={16} className="text-slate-400" />
                  </div>

                  {/* Two Column Grid */}
                  <div className="flex flex-col">
                    <GridRow 
                      left={{ label: "First Name", value: contactData.contact_firstname || "—", isLink: true }}
                      right={{ label: "Contact Owner", value: owner, isLink: true }}
                    />
                    <GridRow 
                      left={{ label: "Last Name", value: contactData.contact_lastname || "—", isLink: true }}
                      right={{ label: "Campaign", value: contactData.contact_campaign?.campaign_name || "—" }}
                    />
                    <GridRow 
                      left={{ label: "Account Name", value: accountName, isLink: true, icon: <Edit size={12} className="ml-1 opacity-50" /> }}
                      right={{ label: "Project Name", value: contactData.contact_project?.project_name || "—" }}
                    />
                    <GridRow 
                      left={{ label: "Designation", value: title, isLink: true }}
                      right={{ label: "Call Status", value: contactData.contact_call_status || "—" }}
                    />
                    <GridRow 
                      left={{ label: "Email ID (Professional)", value: contactData.contact_professional_email || "—" }}
                      right={{ label: "Partner Name", value: contactData.contact_partner_name || "—" }}
                    />
                    <GridRow 
                      left={{ label: "Mobile No", value: contactData.contact_mobile || contactData.contact_phone || "—", isLink: true }}
                      right={{ label: "Email Status", value: contactData.contact_email_status || "Not Found", isLink: true }}
                    />
                    <GridRow 
                      left={{ label: "Department", value: contactData.contact_department || "—", isLink: true }}
                      right={{ label: "Number Status", value: contactData.contact_phone_status || "Generated", isLink: true }}
                    />
                    <GridRow 
                      left={{ label: "Profile Link", value: contactData.contact_profile_link ? "View Profile" : "—", isLink: !!contactData.contact_profile_link }}
                      right={{ label: "Employee Size", value: contactData.contact_employee_size || "—" }}
                    />
                    <GridRow 
                      left={{ label: "Level", value: contactData.contact_level_field || "—" }}
                      right={{ label: "Email ID (Personal)", value: contactData.contact_personal_email || "—" }}
                    />
                    <GridRow 
                      left={{ label: "Alternate No", value: contactData.contact_alternate_number || "—" }}
                      right={{ label: "Industry", value: contactData.contact_industry?.industry_name || "—" }}
                    />
                    <GridRow 
                      left={{ label: "Segment", value: contactData.contact_segment || "—" }}
                      right={{ label: "Navigator Link", value: contactData.contact_navigator_link || "—" }}
                    />
                  </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="w-full lg:w-[320px] xl:w-[380px] space-y-4">
                  
                  {/* Activity Form Block */}
                  <div className="bg-white border border-slate-200 shadow-sm">
                    {/* Activity Tabs */}
                    <div className="flex items-center justify-between border-b border-slate-200 px-2 pt-2 bg-slate-50/50">
                      <div className="flex">
                        {[
                          { id: 'Call', label: 'Call', icon: Phone },
                          { id: 'Task', label: 'Task', icon: CheckCircle },
                          { id: 'Email', label: 'Email', icon: Mail }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveSidebarTab(tab.id)}
                            className={`flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider border-b-2 transition-colors ${
                              activeSidebarTab === tab.id
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                          >
                            <tab.icon size={14} /> {tab.label}
                          </button>
                        ))}
                      </div>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600">
                        <Bell size={14} />
                      </button>
                    </div>

                    {/* Log A Call Form */}
                    {activeSidebarTab === 'Call' && (
                      <div className="p-4">
                        <h4 className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-4">
                          <Phone size={14} /> Log A Call
                        </h4>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                              Subject <span className="text-red-500">*</span>
                            </label>
                            <input 
                              type="text" 
                              placeholder="Select an outcome or type your own..."
                              className="w-full border border-slate-200 rounded px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400"
                            />
                            <p className="text-[10px] text-slate-400 mt-1">Pick an outcome from the list or type your own.</p>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                              Call Notes / Description
                            </label>
                            <textarea 
                              placeholder="What was discussed..."
                              rows={3}
                              className="w-full border border-slate-200 rounded px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 resize-none"
                            />
                          </div>

                          <div className="flex gap-2">
                            <div className="flex-1 border border-slate-200 rounded bg-slate-50 px-3 py-2 flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                              <Clock size={12} className="text-slate-400" />
                              05:28:00 pm 13 Jul 2026
                            </div>
                            <div className="flex-1 border border-slate-200 rounded bg-slate-50 px-3 py-2 flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                              <User size={12} className="text-slate-400" />
                              {contactData.contact_owner?.user_name || "Unknown"}
                            </div>
                          </div>

                          <Button variant="primary" className="w-full gap-2 font-bold justify-center bg-blue-600 py-2.5">
                            <Save size={14} /> Save Call
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Timestamps */}
                  <div className="text-[10px] font-medium text-slate-400 flex items-center justify-center gap-2">
                    <span><Clock size={10} className="inline mr-1"/> Created: {contactData.contact_created_at ? new Date(contactData.contact_created_at).toLocaleString() : "Unknown"}</span>
                    <span>|</span>
                    <span><Edit size={10} className="inline mr-1"/> Updated: {contactData.contact_updated_at ? new Date(contactData.contact_updated_at).toLocaleString() : "Unknown"}</span>
                  </div>

                  {/* Related Records */}
                  <div>
                    <h3 className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
                      <Link size={14} /> Related Records
                    </h3>
                    <div className="bg-white border border-slate-200 shadow-sm flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <Building2 size={16} />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Account</div>
                          <div className="text-sm font-bold text-slate-800">{accountName}</div>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300" />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
                      <Clock size={14} /> Timeline
                    </h3>
                    <div className="bg-white border border-slate-200 shadow-sm p-4">
                      <div className="flex gap-3">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full border border-emerald-200 flex items-center justify-center text-emerald-600 bg-white z-10 relative">
                            <Phone size={14} />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 mb-0.5">Contact Searched</div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1">
                            <User size={10} /> {owner} @ 10 Jul 2026, 01:27 PM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent */}
                  <div className="bg-slate-50 p-4 border border-slate-200">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Recent</h3>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] font-bold uppercase tracking-wider">
                      <span className="text-blue-600 cursor-pointer hover:underline">CONTACT {fullName}</span>
                      <span className="text-blue-600 cursor-pointer hover:underline">CONTACT Rishika Malhotra</span>
                      <span className="text-blue-600 cursor-pointer hover:underline">CONTACT Anjali .</span>
                      <span className="text-blue-600 cursor-pointer hover:underline">CONTACT Naresh Kumar</span>
                    </div>
                  </div>

                </div>
              </div>
            )}
            
            {activeMainTab !== 'Details' && (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                  <MoreHorizontal className="text-slate-400" size={24} />
                </div>
                <h3 className="text-sm font-semibold text-slate-700 mb-1">No {activeMainTab} yet</h3>
                <p className="text-xs text-slate-500">There is no {activeMainTab.toLowerCase()} data for this contact.</p>
              </div>
            )}
            
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-slate-500 font-medium">Contact not found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Components
const GridRow = ({ left, right }) => (
  <div className="flex flex-col md:flex-row border-b border-slate-200 last:border-b-0">
    <div className="flex-1 p-4 md:border-r border-slate-200 flex flex-col justify-center">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{left.label}</span>
      <span className={`text-[13px] font-semibold flex items-center ${left.isLink ? 'text-blue-600 hover:underline cursor-pointer' : 'text-slate-700'} ${left.value === '—' ? 'text-slate-300' : ''}`}>
        {left.value}
        {left.icon && left.icon}
      </span>
    </div>
    <div className="flex-1 p-4 flex flex-col justify-center">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{right.label}</span>
      <span className={`text-[13px] font-semibold flex items-center ${right.isLink ? 'text-blue-600 hover:underline cursor-pointer' : 'text-slate-700'} ${right.value === '—' ? 'text-slate-300' : ''}`}>
        {right.value}
        {right.icon && right.icon}
      </span>
    </div>
  </div>
);

export default ConDetailView;
