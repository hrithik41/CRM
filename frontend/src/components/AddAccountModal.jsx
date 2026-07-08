import React, { useState, useEffect } from 'react';
import { X, Loader2, User } from 'lucide-react';
import Button from './ui/button';
import Modal from './ui/Modal';
import { api } from '../utils/api';

const AddAccountModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerId, setOwnerId] = useState('');
  
  const [formData, setFormData] = useState({
    account_name: '',
    account_type: 'CUSTOMER',
    account_phone: '',
    account_website: '',
    account_email: '',
    account_city: '',
    account_country: '',
    account_industry: '',
    account_employees_size: '',
    account_description: '',
    account_account_status: 'ACTIVE',
    account_annual_revenue: '',
    
    // Billing
    billing_street: '',
    billing_city: '',
    billing_state: '',
    billing_zip: '',
    billing_country: '',
    
    // Shipping
    shipping_street: '',
    shipping_city: '',
    shipping_state: '',
    shipping_zip: '',
    shipping_country: ''
  });

  useEffect(() => {
    if (isOpen) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setOwnerName(user.user_name || user.name || 'Unknown User');
          setOwnerId(user.user_id || user.id);
        } catch (e) {
          console.error("Failed to parse user", e);
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!ownerId) {
        throw new Error("You must be logged in to create an account.");
      }

      const payload = {
        ...formData,
        account_owner_fk: ownerId 
      };

      const response = await api.post("/api/accounts", payload);
      
      if (response.success) {
        onSuccess(); // Refresh the table
        onClose(); // Close the modal
      } else {
        setError(response.message || "Failed to create account");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const headerActions = (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="bg-blue-100 p-1 rounded-full text-blue-600">
        <User size={14} />
      </div>
      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Owner:</span>
      <span className="text-sm font-bold text-slate-800">{ownerName}</span>
    </div>
  );

  const footerActions = (
    <>
      <Button type="button" variant="ghost" onClick={onClose} className="text-slate-600 hover:bg-slate-100">
        Cancel
      </Button>
      <Button type="submit" form="add-account-form" variant="default" disabled={loading} className="bg-[#0066cc] hover:bg-[#0055b3] min-w-[120px] shadow-sm">
        {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
        {loading ? "Saving..." : "Save Account"}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Account"
      widthClass="w-[60vw]"
      headerActions={headerActions}
      footer={footerActions}
    >
      <form id="add-account-form" onSubmit={handleSubmit}>
        {error && (
          <div className="m-6 mb-0 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-6 p-6">
          
          {/* Section 2: Account Info */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
              Account Information
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Account Name *</label>
                  <input required type="text" name="account_name" value={formData.account_name} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="e.g. Google India" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Account Type</label>
                  <select name="account_type" value={formData.account_type} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white">
                    <option value="CUSTOMER">Customer</option>
                    <option value="PARTNER">Partner</option>
                    <option value="PROSPECT">Prospect</option>
                    <option value="COMPETITER">Competitor</option>
                    <option value="RESELLER">Reseller</option>
                    <option value="DISTRIBUTOR">Distributor</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email</label>
                  <input type="email" name="account_email" value={formData.account_email} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="contact@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Phone</label>
                  <input type="tel" name="account_phone" value={formData.account_phone} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="+1 234 567 8900" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Industry</label>
                  <input type="text" name="account_industry" value={formData.account_industry} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="e.g. Technology" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Website</label>
                  <input type="text" name="account_website" value={formData.account_website} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="www.example.com" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Employee Size</label>
                  <input type="number" name="account_employees_size" value={formData.account_employees_size} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="e.g. 10000" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Annual Revenue</label>
                  <input type="number" step="0.01" name="account_annual_revenue" value={formData.account_annual_revenue} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="e.g. 1500000.00" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Description</label>
                <textarea name="account_description" value={formData.account_description} onChange={handleChange} rows="2" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none" placeholder="Enter account description..."></textarea>
              </div>
            </div>
          </div>

          {/* Section 3: Billing & Shipping */}
          <div className="grid grid-cols-2 gap-6">
            
            {/* Billing */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-purple-500 rounded-full"></span>
                Billing Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Street</label>
                  <input type="text" name="billing_street" value={formData.billing_street} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="Street Address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">City</label>
                    <input type="text" name="billing_city" value={formData.billing_city} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="City" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">State</label>
                    <input type="text" name="billing_state" value={formData.billing_state} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="State/Province" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Zip/Postal</label>
                    <input type="text" name="billing_zip" value={formData.billing_zip} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="Zip Code" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Country</label>
                    <input type="text" name="billing_country" value={formData.billing_country} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="Country" />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
                Shipping Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Street</label>
                  <input type="text" name="shipping_street" value={formData.shipping_street} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="Street Address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">City</label>
                    <input type="text" name="shipping_city" value={formData.shipping_city} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="City" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">State</label>
                    <input type="text" name="shipping_state" value={formData.shipping_state} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="State/Province" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Zip/Postal</label>
                    <input type="text" name="shipping_zip" value={formData.shipping_zip} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="Zip Code" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Country</label>
                    <input type="text" name="shipping_country" value={formData.shipping_country} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="Country" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddAccountModal;
