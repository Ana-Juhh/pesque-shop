import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { pb } from "../lib/pocketbase";

type LoginPageProps = {
  onSuccess: () => void;
  onBack: () => void;
};

type AuthMode = "login" | "register";

export default function LoginPage({ onSuccess, onBack }: LoginPageProps) {
  const [authMode, setAuthMode] = useState<AuthMode>("register");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function resetMessages() {
    setMessage("");
    setError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetMessages();

    if (!email.trim() || !password.trim()) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }

    if (authMode === "register" && !name.trim()) {
      setError("Preencha seu nome para criar a conta.");
      return;
    }

    try {
      setLoading(true);

      if (authMode === "register") {
        await pb.collection("users").create({
          name,
          email,
          password,
          passwordConfirm: password,
        });

        await pb.collection("users").authWithPassword(email, password);

        setMessage("Conta criada com sucesso!");
        onSuccess();
        return;
      }

      await pb.collection("users").authWithPassword(email, password);

      setMessage("Login realizado com sucesso!");
      onSuccess();
    } catch (err: any) {
      console.error(err);

      const pocketBaseMessage =
        err?.response?.message ||
        "Não foi possível continuar. Confira os dados e tente novamente.";

      setError(pocketBaseMessage);
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleLogin() {
    resetMessages();
    setLoading(true);

    pb.collection("users")
      .authWithOAuth2({ provider: "google" })
      .then(() => {
        setMessage("Login com Google realizado com sucesso!");
        onSuccess();
      })
      .catch((err) => {
        console.error(err);

        setError(
          "Não foi possível entrar com Google. Confira a configuração do OAuth2 no PocketBase."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <section className="min-h-[75vh] bg-paper px-4 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 items-center">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-primary shadow-sm border border-primary/10 hover:bg-primary/5"
          >
            <ArrowLeft size={18} />
            Voltar para a loja
          </button>

          <p className="mt-10 text-sm font-black uppercase tracking-[0.35em] text-secondary">
            Pesque Shop
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-black uppercase leading-none text-primary">
            Entre para continuar
          </h1>

          <p className="mt-5 max-w-xl text-lg text-ink/70 font-medium">
            Crie sua conta ou faça login para adicionar produtos ao carrinho,
            acompanhar pedidos e finalizar sua compra com Pix ou link de
            pagamento.
          </p>

          <div className="mt-8 rounded-3xl bg-white border border-primary/10 p-6 shadow-sm max-w-xl">
            <h2 className="text-xl font-black text-primary">
              Por que criar uma conta?
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-ink/70 font-medium">
              <li>• Salvar seus pedidos com segurança.</li>
              <li>• Facilitar a finalização da compra.</li>
              <li>• Permitir acompanhamento e suporte pelo WhatsApp.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-primary/10 shadow-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black text-primary">
            Minha conta
          </h2>

          <p className="mt-2 text-sm text-ink/60 font-medium">
            Use e-mail e senha ou entre rapidamente com o Google.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setAuthMode("register");
                resetMessages();
              }}
              className={`rounded-xl py-3 font-black transition ${
                authMode === "register"
                  ? "bg-primary text-white"
                  : "bg-primary/5 text-primary hover:bg-primary/10"
              }`}
            >
              Criar conta
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode("login");
                resetMessages();
              }}
              className={`rounded-xl py-3 font-black transition ${
                authMode === "login"
                  ? "bg-primary text-white"
                  : "bg-primary/5 text-primary hover:bg-primary/10"
              }`}
            >
              Entrar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            {authMode === "register" && (
              <input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
              />
            )}

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary text-white py-4 font-black hover:bg-primary/90 disabled:opacity-60"
            >
              {loading
                ? "Aguarde..."
                : authMode === "register"
                  ? "Criar conta"
                  : "Entrar"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-bold text-gray-400 uppercase">
              ou
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-5 py-3 text-[15px] font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-60"
          >
            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24.5c0-1.57-.14-3.08-.4-4.5H24v9.02h12.65c-.55 2.96-2.2 5.47-4.7 7.15l7.27 5.64C43.47 37.89 46.5 31.68 46.5 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.98-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.27-5.64c-2.02 1.36-4.6 2.16-8.63 2.16-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>

            {loading ? "Entrando..." : "Sign in with Google"}
          </button>

          {message && (
            <p className="mt-5 rounded-xl bg-green-50 text-green-800 px-4 py-3 text-sm font-bold">
              {message}
            </p>
          )}

          {error && (
            <p className="mt-5 rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm font-bold">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}