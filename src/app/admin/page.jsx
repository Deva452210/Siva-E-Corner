"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Users, FileText, ArrowRight, ExternalLink } from "lucide-react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("applications");

  // useSWR automatically handles fetching, caching, and background revalidation!
  const { data, error, isLoading } = useSWR(isAdmin ? "/api/admin/data" : null, fetcher, {
    revalidateOnFocus: false, // Don't refetch just because they changed tabs
    dedupingInterval: 60000, // Cache for 60 seconds
  });

  const applications = data?.applications || [];
  const users = data?.users || [];

  useEffect(() => {
    // Check auth client-side
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === 'admin') {
        setIsAdmin(true);
      } else {
        window.location.href = "/";
      }
    } else {
      window.location.href = "/";
    }
  }, []);

  if (!isAdmin) {
    return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-2">Manage all service applications and registered users.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div 
              onClick={() => setActiveTab("applications")}
              className={`bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all ${activeTab === 'applications' ? 'border-purple-600 shadow-md' : 'border-transparent shadow-sm hover:border-gray-200'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Total Applications</p>
                  <h3 className="text-4xl font-black text-gray-900">{applications.length}</h3>
                </div>
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <FileText className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div 
              onClick={() => setActiveTab("users")}
              className={`bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all ${activeTab === 'users' ? 'border-blue-600 shadow-md' : 'border-transparent shadow-sm hover:border-gray-200'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Registered Users</p>
                  <h3 className="text-4xl font-black text-gray-900">{users.length}</h3>
                </div>
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Users className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">
                {activeTab === 'applications' ? 'Recent Applications' : 'Registered Users'}
              </h2>
            </div>

            {isLoading ? (
              <div className="p-12 text-center text-gray-500">Loading data...</div>
            ) : activeTab === 'applications' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">App ID</th>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Applicant</th>
                      <th className="px-6 py-4">Phone</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Documents</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {applications.length === 0 && (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No applications found.</td>
                      </tr>
                    )}
                    {applications.map((app, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-gray-500">{new Date(app.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-mono text-xs text-gray-500">{app.applicationId}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{app.serviceName}</td>
                        <td className="px-6 py-4 text-gray-700">{app.firstName} {app.lastName}</td>
                        <td className="px-6 py-4 text-gray-700">{app.phone}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            app.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 
                            app.paymentStatus === 'Free' ? 'bg-blue-100 text-blue-700' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {app.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <a href={app.folderUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 font-semibold text-xs bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-lg transition-colors">
                            View Drive <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4">Join Date</th>
                      <th className="px-6 py-4">Phone Number</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.length === 0 && (
                      <tr>
                        <td colSpan="2" className="px-6 py-8 text-center text-gray-500">No users found.</td>
                      </tr>
                    )}
                    {users.map((user, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-gray-500">{new Date(user.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{user.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
