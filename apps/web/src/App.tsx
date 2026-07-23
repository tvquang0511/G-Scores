import { useState } from 'react';
import { Search, Trophy, BarChart3, GraduationCap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function App() {
  const [sbd, setSbd] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-600 rounded-xl text-white shadow-md">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">G-Scores</h1>
              <p className="text-sm text-slate-500">Hệ thống tra cứu & Thống kê điểm thi THPT 2024</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Thống kê
            </Button>
            <Button variant="default" size="sm" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" /> Bảng Xếp Hạng
            </Button>
          </div>
        </div>

        {/* Tra cứu SBD Card */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Search className="h-5 w-5 text-blue-600" />
              Tra cứu điểm thi cá nhân
            </CardTitle>
            <CardDescription>Nhập mã số báo danh 8 chữ số để xem chi tiết điểm thi các môn.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-4">
              <Input
                placeholder="Nhập SBD (Ví dụ: 01000001)"
                value={sbd}
                onChange={(e) => setSbd(e.target.value)}
                className="max-w-md text-base"
                maxLength={8}
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4 mr-2" /> Tra cứu
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
