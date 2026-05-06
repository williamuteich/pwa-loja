"use client"

import { UnifiedScanner } from "./UnifiedScanner"

interface ScannerModalProps {
    isOpen: boolean
    onClose: () => void
    onScan: (text: string) => void
}

export function ScannerModal({ isOpen, onClose, onScan }: ScannerModalProps) {
    if (!isOpen) return null

    return (
        <UnifiedScanner 
            onScan={onScan}
            onClose={onClose}
            title="Escanear Produto"
            isPage={false}
        />
    )
}
