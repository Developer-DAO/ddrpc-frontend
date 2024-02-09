"use server"
export async function registerUser(formData: FormData) {

  const rawFormData = {
    email: formData.get('email'),
    wallet: formData.get('wallet'),
    password: formData.get('password'),
  }

  console.log(rawFormData);

  const response = await fetch('http://127.0.0.1:2345/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rawFormData),
  })

  console.info(await response.text());

  return { message: `Registered user  ${rawFormData.email}` };
}