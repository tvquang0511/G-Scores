import { useState } from 'react';
import { Search, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStudentLookup } from '@/hooks';

const SUBJECT_NAMES: Record<string, string> = {
  math: 'Toán',
  literature: 'Ngữ Văn',
  foreignLanguage: 'Ngoại Ngữ',
  physics: 'Vật Lý',
  chemistry: 'Hóa Học',
  biology: 'Sinh Học',
  history: 'Lịch Sử',
  geography: 'Địa Lý',
  civicEducation: 'GDCD',
};

export default function LookupPage() {
  const [inputSbd, setInputSbd] = useState('');
  const [activeSbd, setActiveSbd] = useState('');
  const [validationError, setValidationError] = useState('');

  const { data: student, isLoading, isError, error } = useStudentLookup(activeSbd);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputSbd.trim();

    if (!trimmed) {
      setValidationError('Vui lòng nhập mã số báo danh.');
      return;
    }

    if (!/^[0-9]{8}$/.test(trimmed)) {
      setValidationError('Mã số báo danh phải chứa đúng 8 chữ số (ví dụ: 01000001).');
      return;
    }

    setValidationError('');
    setActiveSbd(trimmed);
  };

  return (
    <div className="space-y-6">
      {/* Search Header Card */}
      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <Search className="h-6 w-6 text-blue-600" />
            Tra Cứu Điểm Thi THPT 2024
          </CardTitle>
          <CardDescription>
            Nhập mã số báo danh gồm 8 chữ số để xem chi tiết điểm thi của thí sinh.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Nhập SBD (Ví dụ: 01000001)"
                value={inputSbd}
                onChange={(e) => {
                  setInputSbd(e.target.value);
                  if (validationError) setValidationError('');
                }}
                maxLength={8}
                className="text-base h-11"
              />
              {validationError && (
                <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" /> {validationError}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isLoading} className="h-11 px-6 bg-blue-600 hover:bg-blue-700">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Đang tra cứu...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" /> Tra cứu điểm
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Error Message */}
      {isError && (
        <Card className="border-red-200 bg-red-50/50 shadow-sm">
          <CardContent className="py-6 flex items-center gap-3 text-red-700">
            <AlertCircle className="h-6 w-6 flex-shrink-0" />
            <div>
              <p className="font-semibold text-base">Không tìm thấy thông tin thí sinh</p>
              <p className="text-sm text-red-600">
                {(error as any)?.response?.data?.message ||
                  `Không tồn tại thí sinh với số báo danh ${activeSbd}. Vui lòng kiểm tra lại.`}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {student && (
        <Card className="border-slate-200 shadow-md bg-white">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" /> Kết quả thi SBD: {student.registrationNumber}
                </CardTitle>
                <CardDescription className="text-sm text-slate-500">
                  Mã ngoại ngữ: {student.foreignLanguageCode || 'Không có'}
                </CardDescription>
              </div>
              <div className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-semibold text-blue-700 w-fit">
                Kỳ thi THPT Quốc Gia 2024
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Object.entries(SUBJECT_NAMES).map(([key, label]) => {
                const score = (student as any)[key];
                const hasScore = score !== null && score !== undefined;

                return (
                  <div
                    key={key}
                    className={`p-4 rounded-xl border transition-all ${
                      hasScore
                        ? 'border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:shadow-xs'
                        : 'border-slate-100 bg-slate-50/30 opacity-60'
                    }`}
                  >
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
                    <p className="text-2xl font-bold mt-1">
                      {hasScore ? (
                        <span className={score >= 8 ? 'text-emerald-600' : score < 5 ? 'text-amber-600' : 'text-slate-900'}>
                          {score}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-base font-normal">Chưa thi</span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
