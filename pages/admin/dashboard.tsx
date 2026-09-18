import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { apiClient } from '@/lib/api';
import { Users, FileText, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [dashboard, setDashboard] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }

    const loadDashboard = async () => {
      try {
        const data = await apiClient.getAdminDashboard();
        setDashboard(data);
      } catch (error) {
        console.error('Failed to load dashboard', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [user, router]);

  if (isLoading || !dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const stats = [
    {
      icon: Users,
      label: 'Total Providers',
      value: dashboard.totalProviders,
      color: 'clear-gold',
    },
    {
      icon: CheckCircle,
      label: 'Approved',
      value: dashboard.approvedProviders,
      color: 'green',
    },
    {
      icon: FileText,
      label: 'Pending Review',
      value: dashboard.submittedApplications,
      color: 'blue',
    },
    {
      icon: Users,
      label: 'Total Users',
      value: dashboard.totalUsers,
      color: 'clear-navy',
    },
  ];

  return (
    <>
      <Head>
        <title>Admin Dashboard - Clear Path NEMT</title>
      </Head>

      <div className="min-h-screen bg-clear-light py-12">
        <div className="container-max">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold clear-heading mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage providers, applications, and rides</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Icon size={32} className={`text-${stat.color}`} />
                    <div className="text-3xl font-bold text-clear-navy">{stat.value}</div>
                  </div>
                  <p className="text-gray-600 font-semibold">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Provider Applications */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold clear-heading mb-4">Provider Applications</h2>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center p-3 border-l-4 border-orange-500">
                  <span className="text-gray-700">Pending Review</span>
                  <span className="text-2xl font-bold text-orange-500">{dashboard.submittedApplications}</span>
                </div>
                <div className="flex justify-between items-center p-3 border-l-4 border-gray-400">
                  <span className="text-gray-700">Draft Applications</span>
                  <span className="text-2xl font-bold text-gray-400">{dashboard.pendingApplications}</span>
                </div>
              </div>
              <Link href="/admin/applications">
                <a className="block w-full text-center clear-btn-primary px-6 py-2 rounded-lg font-semibold">
                  Review Applications
                </a>
              </Link>
            </div>

            {/* Ride Management */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold clear-heading mb-4">Ride Management</h2>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center p-3 border-l-4 border-blue-500">
                  <span className="text-gray-700">Total Rides</span>
                  <span className="text-2xl font-bold text-blue-500">{dashboard.totalRides}</span>
                </div>
                <div className="flex justify-between items-center p-3 border-l-4 border-green-500">
                  <span className="text-gray-700">Completed</span>
                  <span className="text-2xl font-bold text-green-500">{dashboard.completedRides}</span>
                </div>
              </div>
              <Link href="/admin/rides">
                <a className="block w-full text-center clear-btn-primary px-6 py-2 rounded-lg font-semibold">
                  View All Rides
                </a>
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold clear-heading mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/applications">
                <a className="block p-4 border-2 border-clear-navy/20 rounded-lg hover:border-clear-gold transition">
                  <FileText size={24} className="text-clear-gold mb-2" />
                  <p className="font-semibold">Review Applications</p>
                  <p className="text-xs text-gray-600">Approve or reject provider applications</p>
                </a>
              </Link>
              <Link href="/admin/providers">
                <a className="block p-4 border-2 border-clear-navy/20 rounded-lg hover:border-clear-gold transition">
                  <Users size={24} className="text-clear-gold mb-2" />
                  <p className="font-semibold">Manage Providers</p>
                  <p className="text-xs text-gray-600">View and manage provider accounts</p>
                </a>
              </Link>
              <Link href="/admin/settings">
                <a className="block p-4 border-2 border-clear-navy/20 rounded-lg hover:border-clear-gold transition">
                  <CheckCircle size={24} className="text-clear-gold mb-2" />
                  <p className="font-semibold">Settings</p>
                  <p className="text-xs text-gray-600">Manage system settings and configurations</p>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
