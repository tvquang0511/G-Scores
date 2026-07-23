import { useState } from 'react';
import { Loader2, AlertCircle, PieChart as PieChartIcon } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useStatistics } from '@/hooks';

const LEVEL_COLORS = {
  excellent: '#10b981', // Emerald green (Giỏi >= 8)
  good: '#3b82f6', // Blue (Khá 6-8)
  average: '#f59e0b', // Amber/Orange (TB 4-6)
  poor: '#ef4444', // Red (Yếu < 4)
};

export default function StatisticsPage() {
  const { data: statistics, isLoading, isError } = useStatistics();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  if (isLoading) {
    return (
      <Card className="border-slate-200 shadow-sm py-12 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-3" />
        <p className="text-slate-600 font-medium">Đang tải dữ liệu thống kê môn thi...</p>
      </Card>
    );
  }

  if (isError || !statistics) {
    return (
      <Card className="border-red-200 bg-red-50/50 shadow-sm p-6 text-center text-red-700">
        <AlertCircle className="h-8 w-8 mx-auto mb-2 text-red-600" />
        <p className="font-semibold text-lg">Không thể tải dữ liệu thống kê</p>
        <p className="text-sm text-red-600 mt-1">Đã xảy ra lỗi khi kết nối tới máy chủ. Vui lòng thử lại sau.</p>
      </Card>
    );
  }

  // Filter subjects based on selection
  const filteredStatistics =
    selectedSubject === 'all'
      ? statistics
      : statistics.filter((s) => s.subject === selectedSubject);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                <PieChartIcon className="h-6 w-6 text-blue-600" />
                Thống Kê Biểu Đồ Tròn Phổ Điểm Theo Môn
              </CardTitle>
              <CardDescription className="mt-1">
                Tỷ lệ phân bố học lực: Giỏi (≥ 8.0), Khá (6.0 - &lt; 8.0), Trung Bình (4.0 - &lt; 6.0), Yếu (&lt; 4.0).
              </CardDescription>
            </div>

            {/* Subject Filter Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="subject-filter" className="text-xs font-semibold text-slate-600 uppercase">
                Môn thi:
              </label>
              <select
                id="subject-filter"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="h-10 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">Tất cả môn thi ({statistics.length})</option>
                {statistics.map((s) => (
                  <option key={s.subject} value={s.subject}>
                    {s.subjectName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Grid of Pie Chart Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStatistics.map((sub) => {
          const total = sub.excellent + sub.good + sub.average + sub.poor;

          const chartData = [
            { name: 'Giỏi (≥ 8.0)', value: sub.excellent, color: LEVEL_COLORS.excellent },
            { name: 'Khá (6.0 - < 8.0)', value: sub.good, color: LEVEL_COLORS.good },
            { name: 'Trung bình (4.0 - < 6.0)', value: sub.average, color: LEVEL_COLORS.average },
            { name: 'Yếu (< 4.0)', value: sub.poor, color: LEVEL_COLORS.poor },
          ];

          return (
            <Card
              key={sub.subject}
              className="border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
            >
              <CardHeader className="pb-2 border-b border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold text-slate-900">{sub.subjectName}</CardTitle>
                  <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-semibold">
                    {total.toLocaleString('vi-VN')} thí sinh
                  </span>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                {/* Recharts Pie Chart Container */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val: any) => [
                          `${Number(val).toLocaleString('vi-VN')} thí sinh (${
                            total > 0 ? ((Number(val) / total) * 100).toFixed(1) : 0
                          }%)`,
                          'Số lượng',
                        ]}
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          fontSize: '12px',
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Score Level Summary List */}
                <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                    <span className="font-semibold text-emerald-800">Giỏi:</span>
                    <span className="font-bold text-emerald-900">
                      {total > 0 ? ((sub.excellent / total) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50/60 border border-blue-100">
                    <span className="font-semibold text-blue-800">Khá:</span>
                    <span className="font-bold text-blue-900">
                      {total > 0 ? ((sub.good / total) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/60 border border-amber-100">
                    <span className="font-semibold text-amber-800">TB:</span>
                    <span className="font-bold text-amber-900">
                      {total > 0 ? ((sub.average / total) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-red-50/60 border border-red-100">
                    <span className="font-semibold text-red-800">Yếu:</span>
                    <span className="font-bold text-red-900">
                      {total > 0 ? ((sub.poor / total) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
