import React from 'react';
import { Flag, CheckCircle, XCircle } from 'lucide-react';
import { useReportedContent } from '../../hooks/useReportedContent';

// Define the type for the report object
interface Report {
  id: string;
  reason: string;
  postTitle: string;
}

export function ReportedContent() {
  const { data: reports, isLoading, approveReport, rejectReport } = useReportedContent();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Reported Content</h2>
        <div className="mt-6 flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {reports?.map((report: Report) => (
              <li key={report.id} className="py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Flag className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {report.reason}
                      </p>
                      <p className="text-sm text-gray-500">
                        {report.postTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => approveReport(report.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => rejectReport(report.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
