import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

export default function RankingPage() {
  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Group Rankings
          </CardTitle>
          <CardDescription>
            View Top 10 student rankings across university subject groups (A, A1, B, C, D).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 border border-dashed border-slate-300 rounded-lg text-center text-slate-500 font-medium">
            Ranking Page Placeholder
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
