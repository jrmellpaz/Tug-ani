"use client";

import { login } from "@/lib/actions";
import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";

export function AdminLogin() {
    const [seePassword, setSeePassword] = useState(false);

    const handleSeePassword = () => {
      	setSeePassword(!seePassword);
    };

	const [state, loginAction] = useActionState(login, undefined);
    
    return (
        <form 
			action={loginAction}
			className="mt-28 ml-auto mr-auto p-8 pb-16 pt-16 w-96 min-w-2/3 bg-white flex-col border border-solid border-gray-200 rounded-xl"
		>
            <h1 className="text-center text-3xl font-interBold mb-12">Login</h1>
            <div className="flex-col mb-8">
              	<div className="m-2 ml-4">
                	<label className="font-interRegular" htmlFor="email">Email</label>
              	</div>
              	<div>
                	<input required
						className="rounded-full p-2 pl-4 pr-4 outline-none font-interRegular box-border w-full border border-solid border-slate-300 focus:border-black"  
						type="email" 
						id="email" 
						name="email"
                	/>
              	</div>
            </div>
            <div className="flex-col">
              	<div className="m-2 ml-4">
                	<label className="font-interRegular" htmlFor="password">Password</label>
              	</div>
              	<div>
					<input required
						className="rounded-full p-2 pl-4 pr-4 outline-none font-interRegular box-border w-full border border-solid border-slate-300 focus:border-black"  
						type={seePassword ? "text" : "password"} 
						id="password" 
						name="password"
					/>
					<div className="m-4 mt-4 flex gap-2">
						<input 
							onChange={handleSeePassword}
							className="cursor-pointer"
							type="checkbox" 
							id="checkbox" /
						>
						<label className="cursor-pointer font-interRegular text-sm" htmlFor="checkbox">See password</label>
					</div>
            	</div>
        	</div>
			{
				(state?.errors?.password || state?.errors?.email) && 
				<div className="m-4 mt-4 flex gap-2">
					<p className="text-red-500 text-sm">
						Invalid email address or password.
					</p>
				</div>
			}
            <div className="flex justify-end mt-12">
				<SubmitButton />
            </div>
        </form>
    );
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button 
			disabled={pending}
			type="submit"
			className="font-interRegular bg-black text-white p-2 pl-4 pr-4 border rounded-xl"
		>
			Login
		</button>
	);
}