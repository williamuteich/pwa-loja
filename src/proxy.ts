import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const session = request.cookies.get("next-auth.session-token")

    if (!session) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - Todos os arquivos com extensão (png, jpg, js, webmanifest, etc) <--- NOVO
         */
        '/((?!api|_next/static|_next/image|login|favicon.ico|.*\\..*|$).*)',
    ],
};
