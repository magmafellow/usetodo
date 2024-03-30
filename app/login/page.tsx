import LoginForm from "../ui/login-form";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-300 flex justify-center items-center">
      <div>
        <h1 className="pt-10 text-center text-2xl mb-4 font-bold decoration-wavy text-sky-700 underline underline-offset-4">
          Login
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
