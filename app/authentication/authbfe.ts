"use server"
export async function registerUser(formData: FormData) {

    const rawFormData = {
        wallet: formData.get('wallet'),
        email: formData.get('email'),
        password: formData.get('password'),
    }

    console.log(rawFormData);

    const response = await fetch('https://api.example.com/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rawFormData),
    })

    return { message: `Registered user  ${rawFormData.email}` };
}