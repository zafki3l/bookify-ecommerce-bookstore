export type LoginApiRequest = {
  email: string;
  password: string;
};

export type LoginApiResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function loginApi(
  payload: LoginApiRequest,
): Promise<LoginApiResponse> {
  const response = await fetch(`/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Email or password wrong.');
  }

  return (await response.json()) as LoginApiResponse;
}
