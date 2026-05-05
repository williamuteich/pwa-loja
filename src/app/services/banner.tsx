import { cookies } from "next/headers"

export default async function getBanner() {
    const cookieStore = await cookies()

    const token = cookieStore.get("next-auth.session-token")?.value;

    const data = await fetch(`https://bazarelegance.com.br/api/private/banner`,
        {
            headers: {
                Cookie: `${cookieStore.toString()}; __Secure-next-auth.session-token=${token}`
            }
        });

    return await data.json();
}