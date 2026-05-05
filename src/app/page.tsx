import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
    return (
        <Suspense fallback={<LoginLoading />}>
            <LoginAuthCheck />
        </Suspense>
    );
}

async function LoginAuthCheck() {
    const session = await getServerSession(auth);

    if (session) {
        redirect("/dashboard");
    }

    return <LoginForm />;
}

function LoginLoading() {
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
    );
}