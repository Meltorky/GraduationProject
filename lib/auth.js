// /lib/auth.js
import Cookies from 'js-cookie';

export const login = async (email, password) => {
  const res = await fetch(
    "https://ecommerceapi-dve9edbbasgxbfg9.uaenorth-01.azurewebsites.net/Account/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await res.json();
  console.log("[LOGIN RESPONSE]", data);

  const token = Array.isArray(data) ? data[0]?.message : data?.message;
  const status = Array.isArray(data) ? data[0]?.statusCode : data?.statusCode;

  // Reject login if status is not 200 or token is missing
  if (status !== 200 || !token || token.length < 100) {
    throw new Error("Invalid login");
  }

  Cookies.set("token", token, { expires: 7, path: "/" });

  return { token };
};



export const setToken = (token) => {
  Cookies.set("token", token, { expires: 7 }); // Store for 7 days
};

export const getToken = () => {
  const token = Cookies.get("token");
  console.log("[getToken] from cookies:", token);
  return token;
};

export const removeToken = () => {
  Cookies.remove("token");
};




export const signup = async (userData) => {
  const res = await fetch("https://your-api.com/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error("Signup failed");
  const data = await res.json();
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
};


