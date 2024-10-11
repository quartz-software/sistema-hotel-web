import viteLogo from "/vite.svg";
import reactLogo from "./../common/assets/react.svg";
import FormField from "../common/FormField/FormField";
const Home = () => {
  return (
    <>
      <div>Home</div>
      <img src={viteLogo} alt="" />
      <img src={reactLogo} alt="" />
      <FormField
        title="Nombre"
      />
    </>
  );
};

export default Home;
