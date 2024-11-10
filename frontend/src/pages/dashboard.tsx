import { AppShell } from "../components/app-shell";
import { ListBooks } from "../components/book/list-book";

export function DashboardPage() {
  return (
    <AppShell>
      <ListBooks />
    </AppShell>
  );
}
