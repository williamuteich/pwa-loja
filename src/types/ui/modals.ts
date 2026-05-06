export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    variant?: "danger" | "warning" | "info";
}

export interface ManualInputModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (ean: string, sku: string) => void;
    title?: string;
    description?: string;
}

export interface ScannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onScan: (text: string) => void;
}
