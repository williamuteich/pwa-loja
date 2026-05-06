"use client"

import { UnifiedScanner } from "./UnifiedScanner"

import { ScannerModalProps } from "@/src/types/ui/modals"

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
