import Navbar from "@/components/Navbar";
import TopicsList from "@/components/TopicsList";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <Navbar />
      <div className="mt-8">{children}</div>
    </div>
  );
}
