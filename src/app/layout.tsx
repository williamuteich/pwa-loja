import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./components/providers"

export const metadata: Metadata = {
    title: "StoreFlow - Controle de E-commerce",
    description: "Sincronização de estoque e produtos via scanner para seu e-commerce.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-br">
            <body className="min-h-full flex flex-col">
                <Providers>
                    <main className="flex-1">{children}</main>
                </Providers>
            </body>
        </html>
    )
}
