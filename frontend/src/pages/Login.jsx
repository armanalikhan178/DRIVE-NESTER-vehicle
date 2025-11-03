import { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("✅ Welcome " + data.user.name);
      }
    } catch (err) {
      console.error(err);
      setMessage("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 border rounded shadow">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded"/>
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="border p-2 rounded"/>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Login</button>
        {message && <p className="text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
