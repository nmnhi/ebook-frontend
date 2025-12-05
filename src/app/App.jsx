import AppRoutes from "@/routes";
import MainLayout from "@/shared/components/layouts/MainLayout/MainLayout";

const App = () => {
  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
};

export default App;
