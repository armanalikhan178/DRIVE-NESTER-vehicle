import { useState } from "react";

const Signin= () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.status === 201) setForm({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      setMessage("Signin failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 border rounded shadow">
        <h2 className="text-2xl font-bold text-center">Signup</h2>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded"/>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded"/>
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="border p-2 rounded"/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
        {message && <p className="text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Signin;
