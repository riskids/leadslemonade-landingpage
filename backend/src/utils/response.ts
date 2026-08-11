/**
 * Standardized API envelope used by every controller response.
 *
 * Success: { success: true, data: T }
 * Error:   { success: false, message: string, errors: string[] }
 */
export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function ok<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

export function paginated<T>(
  items: T[],
  total: number,
  page: number,
  pageSize: number
): ApiResponse<PaginatedData<T>> {
  return {
    success: true,
    data: {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    },
  };
}

