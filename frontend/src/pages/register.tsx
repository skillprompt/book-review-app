import { AppShell } from "../components/app-shell";
import { RegisterForm } from "../components/register-form";

export function RegisterPage() {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <RegisterForm />
      </div>
    </AppShell>
  );
}
