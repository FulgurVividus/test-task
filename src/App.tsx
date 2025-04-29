import Sidebar from "./components-app/Sidebar";
import CustomerList from "./components-app/CustomerList";

function App() {
  return (
    <>
      <div className="flex bg-gray-50 h-screen">
        <Sidebar />
        <CustomerList />
      </div>
    </>
  );
}

export default App;
