import Navbar from "./_components/Navbar";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default layout;
