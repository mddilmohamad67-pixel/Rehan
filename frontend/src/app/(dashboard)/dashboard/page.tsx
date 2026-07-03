'use client';

import React from 'react';
import { useAuthStore } from '@/store/authstore';
import { BarChart3, Zap, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { userProfile } = useAuthStore();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Welcome back, {userProfile?.fullName}! 👋</h1>
        <p className="text-muted-foreground mt-2">Track your AI usage and manage your account</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Credits Card */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Available Credits</h3>
            <Zap className="text-yellow-500" size={24} />
          </div>
          <div>
            <p className="text-4xl font-bold">{userProfile?.credits?.available || 0}</p>
            <p className="text-muted-foreground text-sm mt-1">of {userProfile?.credits?.total || 0}</p>
          </div>
        </div>

        {/* Plan Card */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Current Plan</h3>
            <BarChart3 className="text-blue-500" size={24} />
          </div>
          <div>
            <p className="text-4xl font-bold capitalize">{userProfile?.subscription?.plan || 'Free'}</p>
            <p className="text-muted-foreground text-sm mt-1">Status: {userProfile?.subscription?.status}</p>
          </div>
        </div>

        {/* Usage Card */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Total Usage</h3>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <div>
            <p className="text-4xl font-bold">{userProfile?.credits?.used || 0}</p>
            <p className="text-muted-foreground text-sm mt-1">Credits used this month</p>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
        <p className="text-muted-foreground">Your recent projects will appear here</p>
      </div>
    </div>
  );
}
