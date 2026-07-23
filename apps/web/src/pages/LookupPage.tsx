import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

export default function LookupPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <Search className="h-6 w-6 text-blue-600" />
            Lookup Student Scores
          </CardTitle>
          <CardDescription>
            Search examination score details for a student using their 8-digit registration number.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 border border-dashed border-slate-300 rounded-lg text-center text-slate-500 font-medium">
            Lookup Page Placeholder
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
