import jsPDF, { GState } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
applyPlugin(jsPDF);

export interface ExportColumn<T = any> {
  title: string;
  dataIndex?: keyof T & string;
  key?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: T, index: number) => string;
}

export interface ExportOptions<T = any> {
  filename: string;
  columns: ExportColumn<T>[];
  data: T[];
  title?: string;
  subtitle?: string;
}

const BRAND = {
  name: 'tiply.ng',
  primary: [59, 130, 246] as const,
  primaryDark: [30, 64, 175] as const,
  accent: [212, 175, 55] as const,
  text: [30, 30, 40] as const,
  textMuted: [100, 100, 110] as const,
  bgAlt: [248, 249, 250] as const,
  border: [220, 222, 228] as const,
  headerBg: [30, 30, 40] as const,
};

function isNumericColumn(values: string[]): boolean {
  if (values.length === 0) return false;
  const sample = values.filter(Boolean).slice(0, 10);
  if (sample.length === 0) return false;
  return sample.every((v) => /^[\d,]+$/.test(v.replace(/[₦$€£NGN]/g, '').trim()));
}

function resolveValue<T>(record: T, column: ExportColumn<T>, index: number): string {
  if (column.render) {
    const val = column.dataIndex ? record[column.dataIndex] : undefined;
    return column.render(val, record, index);
  }
  if (column.dataIndex) {
    const val = record[column.dataIndex];
    return val == null ? '' : String(val);
  }
  return '';
}

export function exportToCSV<T>({ filename, columns, data }: ExportOptions<T>): string | void {
  const headers = columns.map((c) => c.title);
  const rows = data.map((record, i) =>
    columns.map((col) => {
      const val = resolveValue(record, col, i);
      return `"${String(val).replace(/"/g, '""')}"`;
    }),
  );

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const bom = '\uFEFF';
  const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

