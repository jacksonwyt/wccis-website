import React, { useState } from 'react';

const RenewalForm = () => {
  const [formData, setFormData] = useState({
    active_owners: '',
    total_payroll: '',
    full_time_employees: '',
    part_time_employees: '',
    projected_gross_receipts: '',
    sub_contracted_gross_receipts: '',
    commercial_new: '',
    commercial_remodeling: '',
    commercial_service_repair: '',
    residential_new: '',
    residential_remodeling: '',
    residential_service_repair: '',
    condos_operations: '',
    condos_new_remodeling: '',
    new_structures: '',
    email: '',
    operation_changes: '',
    requested_renewal_limits: '',
    contact_info_changes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // @ts-ignore
    const isRadio = type === 'radio';
    setFormData(prevData => ({
      ...prevData,
      [name]: isRadio ? (e.target as HTMLInputElement).value : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = 'Insurance Renewal Form Submission';
    const body = `Insurance Renewal Update Form

Total number of Active (in the field) Owners: ${formData.active_owners}
Total payroll (not including owners and clerical): $${formData.total_payroll}
Number of Full-Time Employees: ${formData.full_time_employees}
Number of Part-Time Employees: ${formData.part_time_employees}
Total projected gross receipts for the upcoming policy year: $${formData.projected_gross_receipts}
Total gross receipts sub-contracted out: $${formData.sub_contracted_gross_receipts}

Percentage Breakdown of Operations:
Commercial Operations: 
  New: ${formData.commercial_new}%
  Remodeling: ${formData.commercial_remodeling}%
  Service/Repair: ${formData.commercial_service_repair}%

Residential Operations:
  New: ${formData.residential_new}%
  Remodeling: ${formData.residential_remodeling}%
  Service/Repair Additions: ${formData.residential_service_repair}%

Are you performing any operations on Condos, Apartments, or Tracts? ${formData.condos_operations}
If yes, is this New or Remodeling? ${formData.condos_new_remodeling}

Do you build entire new structures from the ground up? ${formData.new_structures}

Email Address: ${formData.email}
Please note any changes in your operations: ${formData.operation_changes}
Requested Renewal Limits: ${formData.requested_renewal_limits}
Has your contact information changed? Please note: ${formData.contact_info_changes}
    `;
    window.location.href = `mailto:customerservice@wccis.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
      <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
        <div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Insurance Renewal Update Form</h3>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Active Owners */}
            <div className="sm:col-span-3">
              <label htmlFor="active_owners" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total number of Active (in the field) Owners
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="active_owners"
                  id="active_owners"
                  value={formData.active_owners}
                  onChange={handleChange}
                  className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>

            {/* Total Payroll */}
            <div className="sm:col-span-3">
              <label htmlFor="total_payroll" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total payroll (not including owners and clerical)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="total_payroll"
                  id="total_payroll"
                  value={formData.total_payroll}
                  onChange={handleChange}
                  placeholder="$"
                  className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>
            
            {/* Full-Time Employees */}
            <div className="sm:col-span-3">
              <label htmlFor="full_time_employees" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of Full-Time Employees
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="full_time_employees"
                  id="full_time_employees"
                  value={formData.full_time_employees}
                  onChange={handleChange}
                  className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>

            {/* Part-Time Employees */}
            <div className="sm:col-span-3">
              <label htmlFor="part_time_employees" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of Part-Time Employees
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="part_time_employees"
                  id="part_time_employees"
                  value={formData.part_time_employees}
                  onChange={handleChange}
                  className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>

            {/* Projected Gross Receipts */}
            <div className="sm:col-span-3">
              <label htmlFor="projected_gross_receipts" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total projected gross receipts for upcoming year
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="projected_gross_receipts"
                  id="projected_gross_receipts"
                  value={formData.projected_gross_receipts}
                  onChange={handleChange}
                  placeholder="$"
                  className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>

            {/* Sub-Contracted Gross Receipts */}
            <div className="sm:col-span-3">
              <label htmlFor="sub_contracted_gross_receipts" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total gross receipts sub-contracted out
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="sub_contracted_gross_receipts"
                  id="sub_contracted_gross_receipts"
                  value={formData.sub_contracted_gross_receipts}
                  onChange={handleChange}
                  placeholder="$"
                  className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>

            {/* Percentage Breakdown of Operations */}
            <div className="sm:col-span-6">
              <fieldset className="mt-6">
                <legend className="text-base font-medium text-gray-900 dark:text-white">Percentage Breakdown of Operations</legend>
                
                <div className="mt-4 space-y-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Commercial Operations: (%)</p>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="commercial_new" className="block text-xs font-medium text-gray-700 dark:text-gray-400">New (%)</label>
                      <input type="number" name="commercial_new" id="commercial_new" value={formData.commercial_new} onChange={handleChange} className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"/>
                    </div>
                    <div>
                      <label htmlFor="commercial_remodeling" className="block text-xs font-medium text-gray-700 dark:text-gray-400">Remodeling (%)</label>
                      <input type="number" name="commercial_remodeling" id="commercial_remodeling" value={formData.commercial_remodeling} onChange={handleChange} className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"/>
                    </div>
                    <div>
                      <label htmlFor="commercial_service_repair" className="block text-xs font-medium text-gray-700 dark:text-gray-400">Service/Repair (%)</label>
                      <input type="number" name="commercial_service_repair" id="commercial_service_repair" value={formData.commercial_service_repair} onChange={handleChange} className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"/>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">(Total should equal 100%)</p>
                </div>

                <div className="mt-4 space-y-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Residential Operations: (%)</p>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="residential_new" className="block text-xs font-medium text-gray-700 dark:text-gray-400">New (%)</label>
                      <input type="number" name="residential_new" id="residential_new" value={formData.residential_new} onChange={handleChange} className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"/>
                    </div>
                    <div>
                      <label htmlFor="residential_remodeling" className="block text-xs font-medium text-gray-700 dark:text-gray-400">Remodeling (%)</label>
                      <input type="number" name="residential_remodeling" id="residential_remodeling" value={formData.residential_remodeling} onChange={handleChange} className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"/>
                    </div>
                    <div>
                      <label htmlFor="residential_service_repair" className="block text-xs font-medium text-gray-700 dark:text-gray-400">Service/Repair Additions (%)</label>
                      <input type="number" name="residential_service_repair" id="residential_service_repair" value={formData.residential_service_repair} onChange={handleChange} className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"/>
                    </div>
                  </div>
                   <p className="text-xs text-gray-500 dark:text-gray-400">(Total should equal 100%)</p>
                </div>
              </fieldset>
            </div>
            
            {/* Condos, Apartments, or Tracts Operations */}
            <div className="sm:col-span-6">
              <fieldset className="mt-2">
                <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">Are you performing any operations on Condos, Apartments, or Tracts?</legend>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex items-center">
                    <input id="condos_yes" name="condos_operations" type="radio" value="Yes" checked={formData.condos_operations === 'Yes'} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600" />
                    <label htmlFor="condos_yes" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input id="condos_no" name="condos_operations" type="radio" value="No" checked={formData.condos_operations === 'No'} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600" />
                    <label htmlFor="condos_no" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">No</label>
                  </div>
                </div>
              </fieldset>
            </div>

            {/* If yes, New or Remodeling for Condos */}
            <div className="sm:col-span-6">
                <label htmlFor="condos_new_remodeling" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                If yes to above, is this New or Remodeling?
                </label>
                <div className="mt-1">
                <input
                    type="text"
                    name="condos_new_remodeling"
                    id="condos_new_remodeling"
                    value={formData.condos_new_remodeling}
                    onChange={handleChange}
                    className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
                </div>
            </div>
            
            {/* Build Entire New Structures */}
            <div className="sm:col-span-6">
              <fieldset className="mt-2">
                <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">Do you build entire new structures from the ground up?</legend>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex items-center">
                    <input id="new_structures_yes" name="new_structures" type="radio" value="Yes" checked={formData.new_structures === 'Yes'} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600" />
                    <label htmlFor="new_structures_yes" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input id="new_structures_no" name="new_structures" type="radio" value="No" checked={formData.new_structures === 'No'} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600" />
                    <label htmlFor="new_structures_no" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">No</label>
                  </div>
                </div>
              </fieldset>
            </div>

            {/* Email Address */}
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>

            {/* Operation Changes */}
            <div className="sm:col-span-6">
              <label htmlFor="operation_changes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Please note any changes in your operations
              </label>
              <div className="mt-1">
                <textarea
                  id="operation_changes"
                  name="operation_changes"
                  rows={3}
                  value={formData.operation_changes}
                  onChange={handleChange}
                  className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>

            {/* Requested Renewal Limits */}
            <div className="sm:col-span-6">
              <label htmlFor="requested_renewal_limits" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Requested Renewal Limits
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="requested_renewal_limits"
                  id="requested_renewal_limits"
                  value={formData.requested_renewal_limits}
                  onChange={handleChange}
                  className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>

            {/* Contact Info Changes */}
            <div className="sm:col-span-6">
              <label htmlFor="contact_info_changes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Has your contact information changed? Please note
              </label>
              <div className="mt-1">
                <textarea
                  id="contact_info_changes"
                  name="contact_info_changes"
                  rows={3}
                  value={formData.contact_info_changes}
                  onChange={handleChange}
                  className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <div className="flex justify-end">
          {/* <button
            type="button"
            className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button> */}
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
          >
            Submit via Email
          </button>
        </div>
      </div>
    </form>
  );
};

export default RenewalForm; 