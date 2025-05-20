import React, { useState } from 'react';

const WorkersCompRenewalForm = () => {
  const [formData, setFormData] = useState({
    payroll_estimates: '',
    full_time_employees: '',
    total_owners: '',
    part_time_employees: '',
    fein_ssn: '',
    email: '',
    operation_changes: '',
    policy_updates_comments: '',
    contact_info_changes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = 'Workers Compensation Renewal Form Submission';
    const body = `Workers Compensation Insurance Renewal Form

Estimate annual payroll for each class (including class, type of work, estimated annual payroll, and hourly pay):
${formData.payroll_estimates}

Total number of full-time employees: ${formData.full_time_employees}
Total number of owners: ${formData.total_owners}
Number of part-time employees: ${formData.part_time_employees}
Federal Employer Identification Number (FEIN) or Social Security Number (SS #): ${formData.fein_ssn}
Email Address: ${formData.email}

Have there been any changes in your operations?
${formData.operation_changes}

Please provide currently valued loss runs for the past 3 years for policy periods not covered through Target Insurance. (Note: "Currently valued" means printed from previous carriers within the last 45 days.)

Do you have any updates or comments regarding your policy?
${formData.policy_updates_comments}

Has your contact information changed? If yes, please review the company name, mailing address, and phone/fax provided and note any changes:
${formData.contact_info_changes}
    `;
    window.location.href = `mailto:customerservice@wccis.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
      <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
        <div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Workers Compensation Insurance Renewal Form</h3>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Payroll Estimates */}
            <div className="sm:col-span-6">
              <label htmlFor="payroll_estimates" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Estimate annual payroll for each class on your policy
              </label>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Please include the class, type of work, estimated annual payroll, and hourly pay for the upcoming year.</p>
              <div className="mt-1">
                <textarea
                  id="payroll_estimates"
                  name="payroll_estimates"
                  rows={5}
                  value={formData.payroll_estimates}
                  onChange={handleChange}
                  className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>

            {/* Full-Time Employees */}
            <div className="sm:col-span-2">
              <label htmlFor="full_time_employees" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Full-Time Employees
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

            {/* Total Owners */}
            <div className="sm:col-span-2">
              <label htmlFor="total_owners" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Owners
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="total_owners"
                  id="total_owners"
                  value={formData.total_owners}
                  onChange={handleChange}
                  className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>

            {/* Part-Time Employees */}
            <div className="sm:col-span-2">
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

            {/* FEIN or SSN */}
            <div className="sm:col-span-3">
              <label htmlFor="fein_ssn" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                FEIN or SS #
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="fein_ssn"
                  id="fein_ssn"
                  value={formData.fein_ssn}
                  onChange={handleChange}
                  className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="sm:col-span-3">
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
                Have there been any changes in your operations?
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

            {/* Loss Runs Note */}
            <div className="sm:col-span-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-700/30">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Loss Runs:</strong> Please provide currently valued loss runs for the past 3 years for policy periods not covered through Target Insurance. (Note: "Currently valued" means printed from previous carriers within the last 45 days.)
                </p>
              </div>
            </div>

            {/* Policy Updates/Comments */}
            <div className="sm:col-span-6">
              <label htmlFor="policy_updates_comments" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Do you have any updates or comments regarding your policy?
              </label>
              <div className="mt-1">
                <textarea
                  id="policy_updates_comments"
                  name="policy_updates_comments"
                  rows={3}
                  value={formData.policy_updates_comments}
                  onChange={handleChange}
                  className="block w-full border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition duration-200 ease-in-out border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>

            {/* Contact Info Changes */}
            <div className="sm:col-span-6">
              <label htmlFor="contact_info_changes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Has your contact information changed?
              </label>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">If yes, please review the company name, mailing address, and phone/fax provided and note any changes.</p>
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

export default WorkersCompRenewalForm; 