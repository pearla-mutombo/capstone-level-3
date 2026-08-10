import useInputTWE from "../hooks/useInputTWE";

export default function Login({ setLogin }) {
    useInputTWE();

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend className="text-2xl font-bold mb-6">User Login</legend>

        <div className="relative mb-3 w-96" data-twe-input-wrapper-init>
          <input
            type="email"
            className="p-3 border-lime-500 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
            id="email"
            name="email"
            placeholder="Email"
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary">
            Email:
          </label>
        </div>

        <div className="relative mb-3 w-96" data-twe-input-wrapper-init>
          <input
            type="password"
            className="p-3 border-lime-500 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
            id="password"
            name="password"
            placeholder="Password"
          />
          <label
            htmlFor="password"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary">
            Password:
          </label>
        </div>
      </fieldset>
      <button type="submit">Login</button>
    </form>
  );

  function handleSubmit(event) {
    event. preventDefault();
    const form = event.target;
    const data = {
        email: form.elements.email.value,
        password: form.elements.password.value,
  };

  // check if the user entered both fields.
  if (email === "" || password === "") {
    alert("Please enter your email and password.");
    return;
  }
  const loginData = {
    email: email,
    password: password
  };

  // Send the lofin information to the parent component
    setLogin(data);
  // Clear the form after login  
    form.reset();
  }
}
