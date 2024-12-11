import { useReportedContent } from '../../hooks/useReportedContent';
import { Loader } from '../../components/ui/Loader';

interface Report {
  id: string;
  postTitle: string;
  reason: string;
  count: number;
  createdAt: string;
}

export function ReportsPage() {
  const { data: reports, isLoading, approveReport, rejectReport } = useReportedContent();

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reported Content</h1>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reports
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports?.map((report: Report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{report.postTitle}</div>
                  <div className="text-sm text-gray-500">{report.reason}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.count}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => approveReport(report.id)}
                    className="text-green-600 hover:text-green-900 mr-4"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectReport(report.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
