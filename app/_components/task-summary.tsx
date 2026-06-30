type TaskSummaryProps = {
  completedCount: number;
  openCount: number;
  totalCount: number;
};

export function TaskSummary({ completedCount, openCount, totalCount }: TaskSummaryProps) {
  return (
    <dl className="grid grid-cols-3 gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
      <SummaryItem label="Total" value={totalCount} />
      <SummaryItem label="Open" value={openCount} />
      <SummaryItem label="Done" value={completedCount} />
    </dl>
  );
}

function SummaryItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-16 rounded-md bg-slate-50 px-3 py-2 text-center">
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-slate-950">{value}</dd>
    </div>
  );
}
