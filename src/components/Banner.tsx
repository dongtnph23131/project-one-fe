import { BannerImage } from "./icons";
const Banner = () => {
  return (
    <section className="banner">
      <img
        src={BannerImage}
        alt=""
        className="banner__img"
      />
    </section>
  );
};

export default Banner;
