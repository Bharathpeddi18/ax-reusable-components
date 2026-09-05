'use client';

import React, { useState, useMemo } from 'react';
import { AXIcon } from '../../assets/icons';
import { AXCheckbox } from '../ax-inputs/ax-checkbox';

export interface AXTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AXTable: React.FC<AXTableProps> = ({
  striped = false,
  bordered = false,
  hoverable = true,
  compact = false,
  stickyHeader = false,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className="ax-table-wrapper">
      <table
        className={`ax-table ${striped ? 'ax-table-striped' : ''} ${
          bordered ? 'ax-table-bordered' : ''
        } ${hoverable ? 'ax-table-hoverable' : ''} ${
          compact ? 'ax-table-compact' : ''
        } ${stickyHeader ? 'ax-table-sticky-header' : ''} ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

export const AXTableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <thead className={`ax-table-thead ${className}`} {...props}>
    {children}
  </thead>
);

export const AXTableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <tbody className={`ax-table-tbody ${className}`} {...props}>
    {children}
  </tbody>
);

export interface AXTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

export const AXTableRow: React.FC<AXTableRowProps> = ({
  selected = false,
  children,
  className = '',
  ...props
}) => (
  <tr className={`ax-table-row ${selected ? 'is-selected' : ''} ${className}`} {...props}>
    {children}
  </tr>
);

export interface AXTableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
}

export const AXTableHead: React.FC<AXTableHeadProps> = ({
  sortable = false,
  sortDirection = null,
  onSort,
  children,
  className = '',
  ...props
}) => (
  <th
    className={`ax-table-th ${sortable ? 'is-sortable' : ''} ${className}`}
    onClick={sortable ? onSort : undefined}
    {...props}
  >
    <div className="ax-table-th-content">
      {children}
      {sortable && (
        <span className="ax-table-sort-icon">
          {sortDirection === 'asc' ? (
            <AXIcon name="arrow-up" size={14} />
          ) : sortDirection === 'desc' ? (
            <AXIcon name="arrow-down" size={14} />
          ) : (
            <AXIcon name="chevrons-up-down" size={14} />
          )}
        </span>
      )}
    </div>
  </th>
);

export const AXTableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <td className={`ax-table-td ${className}`} {...props}>
    {children}
  </td>
);

/* ==========================================================================
   AXDataTable - High Productivity Data Grid Component
   ========================================================================== */

export interface AXColumnDef<T> {
  key: string;
  header: React.ReactNode;
  render?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface AXDataTableProps<T> {
  columns: AXColumnDef<T>[];
  data: T[];
  rowKey: (item: T, index: number) => string | number;
  selectable?: boolean;
  selectedKeys?: (string | number)[];
  onSelectionChange?: (selectedKeys: (string | number)[], selectedRows: T[]) => void;
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
  hoverable?: boolean;
  stickyHeader?: boolean;
  loading?: boolean;
  emptyText?: React.ReactNode;
  className?: string;
  onRowClick?: (item: T, index: number) => void;
}

export function AXDataTable<T>({
  columns,
  data,
  rowKey,
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  striped = false,
  bordered = false,
  compact = false,
  hoverable = true,
  stickyHeader = false,
  loading = false,
  emptyText = 'No data available',
  className = '',
  onRowClick
}: AXDataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else if (sortDirection === 'desc') {
        setSortKey(null);
        setSortDirection(null);
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return data;
    return [...data].sort((a: any, b: any) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      const res = aVal > bVal ? 1 : -1;
      return sortDirection === 'asc' ? res : -res;
    });
  }, [data, sortKey, sortDirection]);

  const allKeys = useMemo(() => data.map((item, i) => rowKey(item, i)), [data, rowKey]);
  const isAllSelected = allKeys.length > 0 && allKeys.every((k) => selectedKeys.includes(k));
  const isSomeSelected = selectedKeys.length > 0 && !isAllSelected;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange?.(allKeys, data);
    } else {
      onSelectionChange?.([], []);
    }
  };

  const handleSelectRow = (key: string | number, row: T) => {
    const isSelected = selectedKeys.includes(key);
    let nextKeys: (string | number)[];
    let nextRows: T[];
    if (isSelected) {
      nextKeys = selectedKeys.filter((k) => k !== key);
      nextRows = data.filter((item, i) => nextKeys.includes(rowKey(item, i)));
    } else {
      nextKeys = [...selectedKeys, key];
      nextRows = data.filter((item, i) => nextKeys.includes(rowKey(item, i)));
    }
    onSelectionChange?.(nextKeys, nextRows);
  };

  return (
    <AXTable
      striped={striped}
      bordered={bordered}
      compact={compact}
      hoverable={hoverable}
      stickyHeader={stickyHeader}
      className={className}
    >
      <AXTableHeader>
        <AXTableRow>
          {selectable && (
            <AXTableHead className="ax-table-cell-checkbox">
              <AXCheckbox
                checked={isAllSelected}
                indeterminate={isSomeSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                size="sm"
              />
            </AXTableHead>
          )}
          {columns.map((col) => (
            <AXTableHead
              key={col.key}
              sortable={col.sortable}
              sortDirection={sortKey === col.key ? sortDirection : null}
              onSort={() => handleSort(col.key)}
              style={{ width: col.width, textAlign: col.align || 'left' }}
            >
              {col.header}
            </AXTableHead>
          ))}
        </AXTableRow>
      </AXTableHeader>

      <AXTableBody>
        {loading ? (
          <AXTableRow>
            <AXTableCell
              colSpan={columns.length + (selectable ? 1 : 0)}
              className="ax-table-loading"
            >
              Loading data...
            </AXTableCell>
          </AXTableRow>
        ) : sortedData.length === 0 ? (
          <AXTableRow>
            <AXTableCell
              colSpan={columns.length + (selectable ? 1 : 0)}
              className="ax-table-empty"
            >
              {emptyText}
            </AXTableCell>
          </AXTableRow>
        ) : (
          sortedData.map((item, index) => {
            const key = rowKey(item, index);
            const isSelected = selectedKeys.includes(key);

            return (
              <AXTableRow
                key={key}
                selected={isSelected}
                onClick={() => onRowClick?.(item, index)}
                style={{ cursor: onRowClick ? 'pointer' : undefined }}
              >
                {selectable && (
                  <AXTableCell
                    className="ax-table-cell-checkbox"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AXCheckbox
                      checked={isSelected}
                      onChange={() => handleSelectRow(key, item)}
                      size="sm"
                    />
                  </AXTableCell>
                )}
                {columns.map((col) => (
                  <AXTableCell
                    key={col.key}
                    style={{ textAlign: col.align || 'left' }}
                  >
                    {col.render ? col.render(item, index) : (item as any)[col.key]}
                  </AXTableCell>
                ))}
              </AXTableRow>
            );
          })
        )}
      </AXTableBody>
    </AXTable>
  );
}
