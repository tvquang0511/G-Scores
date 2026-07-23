import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function StatisticsPage() {
  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            Score Statistics
          </CardTitle>
          <CardDescription>
            View score distribution statistics across all high school exam subjects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 border border-dashed border-slate-300 rounded-lg text-center text-slate-500 font-medium">
            Statistics Page Placeholder
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
