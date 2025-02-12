"use client";

import { login, signup, oauth } from "../actions/login";

export default function LoginPage() {
    return (
        <div>
            <form>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required />
                <button formAction={login}>Log in</button>
                <button formAction={signup}>Sign up</button>
            </form>
            <button
                onClick={() => {
                    oauth("google");
                }}
            >
                Google
            </button>
        </div>
    );
}
