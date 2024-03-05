import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <Navbar />
      {children}
    </div>
  );
}
