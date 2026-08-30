import Navbar from "./_components/Navbar";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {children}
      </main>
    </div>
  );
};

export default layout;
