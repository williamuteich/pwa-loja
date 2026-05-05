import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm";

export default async function LoginPage() {
    const session = await getServerSession(auth);

    if (session) {
        redirect("/dashboard");
    }

    return <LoginForm />;
}