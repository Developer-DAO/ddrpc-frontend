"use server"
export async function registerUser(prevState: any, formData: FormData) {

  const rawFormData = {
    email: formData.get('email'),
    wallet: formData.get('wallet'),
    password: formData.get('password'),
  }

  //console.log(rawFormData);

  const response = await fetch('http://0.0.0.0:3000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rawFormData),
  })
  const result = await response;
  const responsetext = (await result.text());
  console.log(responsetext, result.status);
  if (result.status === 200) {
    return { message: `Registered user  ${rawFormData.email}`, success: true };
  }
  else {
    return { message: `Error: ${responsetext}`, success: false };
  }
}

export async function loginUser(prevState: any, formData: FormData) {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  console.log(rawFormData);
  const response = await fetch('http://0.0.0.0:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rawFormData),
  })
  const result = await response;
  const responsetext = (await result.text());
  console.log(responsetext, result.status);
  if (result.status === 200) {
    return { message: `${rawFormData.email} logged in`, success: true };
  }
  else {
    return { message: `Error: ${responsetext}`, success: false };
  }
}