'use server'
import {signIn,signOut} from "@/auth";
export async function doSocialLogin(formData)
{
    const action= formData.get('action');
    await signIn(action,{redirectTo:"/"});
<<<<<<< HEAD
}

export async function doLogout()
{
await signOut({redirectTo:"/"})
=======
>>>>>>> d2a73fc59bc64d5474bb022daa9106b147ef1e2b
}