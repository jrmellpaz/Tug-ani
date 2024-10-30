"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { auth } from "./firebase";
import { createSession, deleteSession } from "./sessions";
import { signInWithEmailAndPassword } from "firebase/auth";

const testUser = {
    id: "1",
    email: "contact@cosdensolutions.io",
    password: "12345678",
};

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
     password: z
        .string()
        .min(6, { message: "Password must be at least 8 characters." })
        .trim(),
});

export async function login(prevState, formData) {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const { email, password } = result.data;
    console.log(email, password);

    try {
        await signInWithEmailAndPassword(auth, email, password);
        const userIdToken = await auth.currentUser.getIdToken(true);
        await createSession(userIdToken);
    }
    catch (error) {
        console.log(error, "================");
        return {
            errors: {
                email: ["Invalid email or password"],
            },
        };
    }

    redirect("/admin/dashboard");
}

export async function logout() {
    await deleteSession();
    redirect("/admin/login");
}