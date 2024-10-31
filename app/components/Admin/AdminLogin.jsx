"use client";

import { login } from "@/lib/actions";
import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import ErrorMessage from "./ErrorMessage";

export function AdminLogin() {
    const [seePassword, setSeePassword] = useState(false);

    const handleSeePassword = () => {
      	setSeePassword(!seePassword);
    };

	const [state, loginAction] = useActionState(login, undefined);
    
    return (
        <form 
			action={loginAction}
			className="mt-8 ml-auto mr-auto p-8 pb-16 pt-16 w-96 min-w-2/3 bg-tugAni-white flex-col border border-solid border-gray-300 rounded-xl"
		>
            <h1 className="text-center text-3xl font-openSansBold mb-12 text-tugAni-red">Login</h1>
            <div className="flex-col mb-8">
              	<div className="m-2 ml-4">
                	<label className="font-openSansRegular" htmlFor="email">Email</label>
              	</div>
              	<div>
                	<input required
						className="rounded-full p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white"  
						type="email" 
						id="email" 
						name="email"
                	/>
              	</div>
            </div>
            <div className="flex-col">
              	<div className="m-2 ml-4">
                	<label className="font-openSansRegular" htmlFor="password">Password</label>
              	</div>
              	<div>
					<input required
						className="rounded-full p-2 pl-4 pr-4 outline-none font-openSansRegular box-border w-full border border-solid border-slate-300 focus:border-tugAni-red bg-tugAni-white"  
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
						<label className="cursor-pointer font-openSansRegular text-sm" htmlFor="checkbox">See password</label>
					</div>
            	</div>
        	</div>
			{
				(state?.errors?.password || state?.errors?.email) && 
				<ErrorMessage header="Invalid credentials (; ꒪ö꒪)" message="The email or password you entered does not match our records." />
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
			className="font-openSansRegular bg-tugAni-red text-tugAni-white p-2 pl-5 pr-5 border rounded-full"
		>
			Login
		</button>
	);
}