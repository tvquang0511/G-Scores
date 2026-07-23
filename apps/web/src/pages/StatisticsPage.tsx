import { BarChart3, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useStatistics } from '@/hooks';

export default function StatisticsPage() {
  const { data: statistics, isLoading, isError } = useStatistics();

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

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            Thống Kê Phổ Điểm Theo Môn Thi
          </CardTitle>
          <CardDescription>
            Phân bố điểm thi thành 4 mức độ: Giỏi (≥ 8.0), Khá (6.0 - &lt; 8.0), Trung Bình (4.0 - &lt; 6.0), Yếu (&lt; 4.0).
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statistics.map((sub) => {
          const totalStudents = sub.excellent + sub.good + sub.average + sub.poor;

          return (
            <Card key={sub.subject} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold text-slate-900">{sub.subjectName}</CardTitle>
                  <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full font-semibold">
                    {totalStudents.toLocaleString('vi-VN')} thí sinh
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {/* Giỏi */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-emerald-700 font-semibold">Giỏi (≥ 8)</span>
                    <span className="text-slate-600">
                      {sub.excellent.toLocaleString('vi-VN')} (
                      {totalStudents > 0 ? ((sub.excellent / totalStudents) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${totalStudents > 0 ? (sub.excellent / totalStudents) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {/* Khá */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-blue-700 font-semibold">Khá (6 - &lt; 8)</span>
                    <span className="text-slate-600">
                      {sub.good.toLocaleString('vi-VN')} (
                      {totalStudents > 0 ? ((sub.good / totalStudents) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${totalStudents > 0 ? (sub.good / totalStudents) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {/* Trung bình */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-amber-700 font-semibold">TB (4 - &lt; 6)</span>
                    <span className="text-slate-600">
                      {sub.average.toLocaleString('vi-VN')} (
                      {totalStudents > 0 ? ((sub.average / totalStudents) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-amber-500 h-2 rounded-full transition-all"
                      style={{ width: `${totalStudents > 0 ? (sub.average / totalStudents) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {/* Yếu */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-red-700 font-semibold">Yếu (&lt; 4)</span>
                    <span className="text-slate-600">
                      {sub.poor.toLocaleString('vi-VN')} (
                      {totalStudents > 0 ? ((sub.poor / totalStudents) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all"
                      style={{ width: `${totalStudents > 0 ? (sub.poor / totalStudents) * 100 : 0}%` }}
                    />
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
