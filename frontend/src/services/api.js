export const login = async (email, password) => {
  const response = await fetch('http://localhost:8081/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const fetchUsers = async (token) => {
  const response = await fetch('http://localhost:8081/api/users', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.ok) {
    return response.json();
  } else if (response.status === 401) {
    throw new Error('Unauthorized');
  } else {
    throw new Error('Failed to fetch users');
  }
};