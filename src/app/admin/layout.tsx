import AdminSidebar from "./adminSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:h-[50rem]">
          <AdminSidebar />
        </div>
        <div className="w-full bg-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
}