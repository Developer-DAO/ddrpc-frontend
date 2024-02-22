import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Date.now() + 5184000000)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function register(formData: FormData) {
  // Create the user
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const response = await fetch('http://')
}

export async function login(formData: FormData) {
  // Verify credentials && get the user
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const response = await fetch('http://0.0.0.0:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rawFormData),
  })
  const result = await response;
  const responsetext = (await result.text());
  //console.log(responsetext, result.status);
  if (result.status != 200) {
    return { message: `Error: ${responsetext}`, success: false };
  }


  const user = { email: formData.get("email"), token: responsetext };

  // Create the session
  const expires = new Date(Date.now() + 5184000000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 5184000000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}