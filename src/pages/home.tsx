import { Banner, Blog, New } from "@/components/index";
const HomePage = () => {
  return (
    <>
      <Banner />
      <New />
      <div className="container">
        <hr />
      </div>
      <Blog />
    </>
  );
};

export default HomePage;
