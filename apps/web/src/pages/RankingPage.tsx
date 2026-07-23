import { useState } from 'react';
import { Trophy, Loader2, AlertCircle, Medal } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRanking } from '@/hooks';

const GROUPS = [
  { code: 'a', label: 'Khối A', subjects: 'Toán - Lý - Hóa' },
  { code: 'a1', label: 'Khối A1', subjects: 'Toán - Lý - Anh' },
  { code: 'b', label: 'Khối B', subjects: 'Toán - Hóa - Sinh' },
  { code: 'c', label: 'Khối C', subjects: 'Văn - Sử - Địa' },
  { code: 'd', label: 'Khối D', subjects: 'Toán - Văn - Anh' },
];

export default function RankingPage() {
  const [selectedGroup, setSelectedGroup] = useState('a');
  const { data: ranking, isLoading, isError } = useRanking(selectedGroup);

  const activeGroupInfo = GROUPS.find((g) => g.code === selectedGroup);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Bảng Xếp Hạng Top 10 Thí Sinh Chi Hướng
          </CardTitle>
          <CardDescription>
            Xem danh sách Top 10 học sinh có tổng điểm cao nhất theo từng khối thi Đại học.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Group Selector Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {GROUPS.map((g) => {
              const isActive = selectedGroup === g.code;
              return (
                <Button
                  key={g.code}
                  variant={isActive ? 'default' : 'outline'}
                  onClick={() => setSelectedGroup(g.code)}
                  className={`flex flex-col items-center h-auto py-2.5 px-4 transition-all ${
                    isActive ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' : 'hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold text-sm">{g.label}</span>
                  <span className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>{g.subjects}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card className="border-slate-200 shadow-sm py-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-3" />
          <p className="text-slate-600 font-medium">Đang tính toán bảng xếp hạng {activeGroupInfo?.label}...</p>
        </Card>
      )}

      {/* Error State */}
      {isError && (
        <Card className="border-red-200 bg-red-50/50 shadow-sm p-6 text-center text-red-700">
          <AlertCircle className="h-8 w-8 mx-auto mb-2 text-red-600" />
          <p className="font-semibold text-lg">Không thể tải dữ liệu xếp hạng</p>
          <p className="text-sm text-red-600 mt-1">Đã xảy ra lỗi khi kết nối tới máy chủ. Vui lòng thử lại sau.</p>
        </Card>
      )}

      {/* Ranking Table Card */}
      {ranking && !isLoading && (
        <Card className="border-slate-200 shadow-md bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-bold text-slate-900">
                Top 10 Thí Sinh Dẫn Đầu {activeGroupInfo?.label} ({activeGroupInfo?.subjects})
              </CardTitle>
              <span className="text-xs px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-semibold flex items-center gap-1">
                <Medal className="h-3.5 w-3.5" /> 10 Thủ khoa & Á khoa
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {ranking.length === 0 ? (
              <div className="p-8 text-center text-slate-500">Chưa có dữ liệu xếp hạng cho khối này.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-100/70 text-slate-700 font-semibold uppercase text-xs border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4 text-center w-16">Hạng</th>
                      <th className="py-3.5 px-4">Số Báo Danh</th>
                      <th className="py-3.5 px-4 text-center">Tổng Điểm</th>
                      <th className="py-3.5 px-4 text-center">Chi tiết môn 1</th>
                      <th className="py-3.5 px-4 text-center">Chi tiết môn 2</th>
                      <th className="py-3.5 px-4 text-center">Chi tiết môn 3</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ranking.map((student, idx) => {
                      const rank = idx + 1;
                      const scoreKeys = Object.keys(student).filter(
                        (k) => k !== 'registrationNumber' && k !== 'total',
                      );

                      return (
                        <tr
                          key={student.registrationNumber}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            rank === 1 ? 'bg-yellow-50/40' : rank === 2 ? 'bg-slate-50/60' : rank === 3 ? 'bg-amber-50/30' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4 text-center font-bold">
                            {rank === 1 ? (
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-yellow-950 font-black shadow-xs">
                                🥇 1
                              </span>
                            ) : rank === 2 ? (
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-300 text-slate-900 font-black shadow-xs">
                                🥈 2
                              </span>
                            ) : rank === 3 ? (
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-400/80 text-amber-950 font-black shadow-xs">
                                🥉 3
                              </span>
                            ) : (
                              <span className="text-slate-500 font-semibold">#{rank}</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900 tracking-wider">
                            {student.registrationNumber}
                          </td>
                          <td className="py-3.5 px-4 text-center font-black text-blue-700 text-base">
                            {student.total.toFixed(2)}
                          </td>
                          {scoreKeys.map((key) => (
                            <td key={key} className="py-3.5 px-4 text-center font-medium text-slate-700">
                              {student[key as keyof typeof student]}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
