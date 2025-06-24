import AddButton from "@/component/AddButton";
import Dashboard from "@/component/Dashboard";
import Filter from "@/component/Filter";

export default function Home() {

  return (
    <>
      <div className="hidden w-full h-screen lg:flex flex-col justify-center bg-zinc-50 p-12">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-4xl font-semibold mb-4">Dashboard Beeldi</h1>
          <AddButton />
        </div>
        <Filter />
        <Dashboard />
      </div>
      <div className="flex lg:hidden flex-col h-screen justify-center items-center bg-zinc-50">
        <h1 className="text-4xl font-semibold mb-4">Dashboard Beeldi</h1>
        <p className="text-lg text-center px-6">Merci de passer en version desktop pour accéder à toutes les fonctionnalités.</p>
      </div>
    </>
  );
}
