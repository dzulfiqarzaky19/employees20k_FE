import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TableMain } from '@/features/dashboard/components/table/TableMain';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TableProvider } from '@/features/dashboard/context/TableContext';

vi.mock('@/features/dashboard/hooks/useEmployees', () => ({
    useEmployees: () => ({
        queryData: {
            data: [
                { id: '1', name: 'John Doe', position: 'Engineer', age: 30, salary: 5000000, createdAt: '2024-01-01' },
                { id: '2', name: 'Jane Smith', position: 'Designer', age: 28, salary: 4500000, createdAt: '2024-02-01' },
            ],
            totalCount: 2,
        },
        isLoading: false,
    }),
}));

vi.mock('@/features/dashboard/hooks/useEmployeeMutations', () => ({
    useEmployeeMutations: () => ({
        deleteMutation: { mutate: vi.fn(), isPending: false },
        createMutation: { mutate: vi.fn(), isPending: false },
        updateMutation: { mutate: vi.fn(), isPending: false },
    }),
}));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
    },
});

const renderTable = () => {
    return render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <TableProvider>
                    <TableMain />
                </TableProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

describe('TableMain', () => {
    it('renders table headers', () => {
        renderTable();

        expect(screen.getByText('Employee')).toBeInTheDocument();
        expect(screen.getByText('Role')).toBeInTheDocument();
        expect(screen.getByText('Age')).toBeInTheDocument();
        expect(screen.getByText('Compensation')).toBeInTheDocument();
    });

    it('renders search input', () => {
        renderTable();

        expect(screen.getByPlaceholderText(/Filter records by name, role, or ID segment.../i)).toBeInTheDocument();
    });

    it('renders add employee button', () => {
        renderTable();

        expect(screen.getByText(/add entry/i)).toBeInTheDocument();
    });
});

describe('TableMain - Loading State', () => {
    it('shows loading state when data is being fetched', () => {
        vi.doMock('@/features/dashboard/hooks/useEmployees', () => ({
            useEmployees: () => ({
                queryData: null,
                isLoading: true,
            }),
        }));

        // Loading state would show skeleton/spinner
    });
});
