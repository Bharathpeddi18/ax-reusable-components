// region Interfaces
export interface MetricCard {
  id: string;
  title: string;
  value: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface ChartSegment {
  label: string;
  value: number;
  color: string;
  countLabel: string;
}

export interface BarDataPoint {
  label: string;
  value: number;
}
// endregion

// region KPI Summary Cards
export const kpiMetrics: MetricCard[] = [
  {
    id: 'total-req',
    title: 'Total Requirements',
    value: '48',
    icon: 'file-earmark-text',
    iconBg: 'ax-bg-blue-100',
    iconColor: 'ax-text-primary',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    value: '17',
    icon: 'search',
    iconBg: 'ax-bg-amber-100',
    iconColor: 'ax-text-amber-600',
  },
  {
    id: 'funded',
    title: 'Funded',
    value: '03',
    icon: 'check2-circle',
    iconBg: 'ax-bg-emerald-100',
    iconColor: 'ax-text-emerald-600',
  },
  {
    id: 'unfunded',
    title: 'Unfunded',
    value: '01',
    icon: 'x-circle',
    iconBg: 'ax-bg-red-100',
    iconColor: 'ax-text-red-500',
  },
];
// endregion

// region Card 1: By Priority
export const priorityChartData: ChartSegment[] = [
  { label: 'Critical', value: 5, color: '#5C3818', countLabel: '05' },
  { label: 'High', value: 4, color: '#8F5C00', countLabel: '04' },
  { label: 'Medium', value: 8, color: '#D65A00', countLabel: '08' },
  { label: 'Low', value: 6, color: '#BDA300', countLabel: '06' },
];

// region Card 2: By Category
export const categoryChartData: ChartSegment[] = [
  { label: '0-Must Pay', value: 10, color: '#00A887', countLabel: '10' },
  { label: '1-Mission Critical', value: 8, color: '#7C3AED', countLabel: '08' },
  { label: '2-Mission Essential', value: 20, color: '#A88C00', countLabel: '20' },
  { label: '3-Mission Enhancement', value: 10, color: '#C25700', countLabel: '10' },
];

// region Card 3: By EEIC
export const eeicChartData: BarDataPoint[] = [
  { label: '3780P', value: 68 },
  { label: '35AFX', value: 50 },
  { label: '35FED', value: 43 },
  { label: '35ATR', value: 57 },
  { label: '35VER', value: 38 },
];

// region Card 4: By BA
export const baChartData: BarDataPoint[] = [
  { label: '01', value: 68 },
  { label: '02', value: 51 },
  { label: '03', value: 44 },
  { label: '04', value: 55 },
  { label: '05', value: 37 },
];

// region Card 5: By SAG
export const sagChartData: BarDataPoint[] = [
  { label: '3400', value: 68 },
  { label: '3402', value: 51 },
  { label: '3404', value: 44 },
  { label: '3406', value: 55 },
  { label: '3408', value: 37 },
];

// region Card 6: By PEC
export const pecChartData: BarDataPoint[] = [
  { label: '27232F', value: 68 },
  { label: '27233F', value: 51 },
  { label: '27234F', value: 44 },
  { label: '27235F', value: 55 },
  { label: '27236F', value: 37 },
];

// region Card 7: By Requirement Amount
export const amountChartData: BarDataPoint[] = [
  { label: '<$50K', value: 94 },
  { label: '$50-$100K', value: 38 },
  { label: '$100-$200K', value: 68 },
  { label: '$200-$500K', value: 83 },
  { label: '>$500K', value: 27 },
];

// region Card 8: By Status
export const statusChartData: ChartSegment[] = [
  { label: 'Staff/CTF Initiate', value: 5, color: '#00A8B5', countLabel: '05' },
  { label: 'Resource Advisor (RA)', value: 5, color: '#EA580C', countLabel: '05' },
  { label: 'TEG', value: 8, color: '#9333EA', countLabel: '08' },
  { label: 'CCY/FM', value: 20, color: '#D49B00', countLabel: '20' },
  { label: 'Funded', value: 10, color: '#16A34A', countLabel: '10' },
];

// region Card 9: By Fund Status
export const fundStatusChartData: ChartSegment[] = [
  { label: 'Funded', value: 28, color: '#16A34A', countLabel: '28' },
  { label: 'Partially Funded', value: 10, color: '#F59E0B', countLabel: '10' },
  { label: 'Unfunded', value: 10, color: '#DC2626', countLabel: '10' },
];
