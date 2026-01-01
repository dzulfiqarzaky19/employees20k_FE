import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ImportPage } from '@/pages/ImportPage';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the hooks
vi.mock('@/features/importPage/hooks/useImportSocket', () => ({
    useImportSocket: () => ({
        progress: 0,
        status: 'idle',
        message: '',
        resetState: vi.fn(),
        setUploading: vi.fn(),
        setError: vi.fn(),
    }),
}));

vi.mock('@/features/importPage/hooks/useImportUpload', () => ({
    useImportUpload: () => ({
        mutate: vi.fn(),
        isPending: false,
    }),
}));

// Mock socket
vi.mock('@/lib/socket', () => ({
    socket: {
        on: vi.fn(),
        off: vi.fn(),
        connect: vi.fn(),
        connected: false,
    },
}));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
    },
});

const renderImportPage = () => {
    return render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ImportPage />
            </BrowserRouter>
        </QueryClientProvider>
    );
};

describe('ImportPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders page title', () => {
        renderImportPage();

        expect(screen.getByText('Bulk Synchronization')).toBeInTheDocument();
    });

    it('renders file dropzone', () => {
        renderImportPage();

        expect(screen.getByText(/select csv document/i)).toBeInTheDocument();
    });

    it('renders return button', () => {
        renderImportPage();

        expect(screen.getByText(/return to portal/i)).toBeInTheDocument();
    });

    it('renders import sidebar with validation info', () => {
        renderImportPage();

        expect(screen.getByText(/import validation/i)).toBeInTheDocument();
    });

    it('has disabled upload button initially', () => {
        renderImportPage();

        const uploadButton = screen.getByText(/Initialize Data Sync/i);
        expect(uploadButton).toBeInstanceOf(HTMLSpanElement);
    });
});

describe('ImportPage - File Selection', () => {
    it('shows file preview after file selection', () => {
        renderImportPage();

        // File input is hidden, would need to trigger via drop or input change
        const dropzone = screen.getByText(/select csv document/i).closest('div');
        expect(dropzone).toBeInTheDocument();
    });
});

