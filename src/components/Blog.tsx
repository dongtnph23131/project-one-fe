const Blog = () => {
  return (
    <section className="blog">
      <div className="container">
        <div className="section-heading section-blog-heading">
          <h2 className="section-heading__title">Blog</h2>
        </div>
        <div className="section-body">
          <div className="post-list">
            <div className="post-item">
              <div className="post-image">
                <a>
                  <img
                    src="https://res.cloudinary.com/dtsfrv4lf/image/upload/v1715350414/top-phong-cach-thoi-trang-hot-2024_vgfw3m.jpg"
                    alt=""
                    className="post__thumbnail"
                  />
                </a>
              </div>
              <div className="post-info">
                <h3 className="post__title">
                  <a className="post__link">
                    Nắm bắt top xu hướng các phong cách thời trang hot năm 2024
                  </a>
                </h3>
                <p className="post__excerpt">
                  Xu hướng thời trang luôn thay đổi và được cập nhật không ngừng
                  qua mỗi năm, cách phối đồ cũng được xem là một trong những sở
                  thích cũng như ngôn ngữ của các bạn trẻ hiện nay khi ai ai
                  cũng muốn mình xuất hiện thật xinh xắn, nổi bật và phong cách
                  tại các sự kiện quan trọng. Để bắt kịp xu hướng các phong cách
                  thời trang nổi bật trong năm không chỉ giúp bạn theo kịp thời
                  đại, tự tin trong việc lựa chọn trang phục mà còn thể hiện sự
                  tinh tế và tạo ra phong cách cá nhân. Hãy cùng Routine khám
                  phá việc lựa trong trang phục phù hợp và đón nhận những xu
                  hướng mới nhất trong năm 2024 để tạo nên những phong cách thời
                  trang độc đáo, phá cách của riêng bạn nhé!
                </p>
              </div>
            </div>
            <div className="post-item">
              <div className="post-image">
                <a>
                  <img
                    src="https://res.cloudinary.com/dtsfrv4lf/image/upload/v1715350554/bi-quyet-phoi-do-nam-han-quoc2_qk1ewg.jpg"
                    alt=""
                    className="post__thumbnail"
                  />
                </a>
              </div>
              <div className="post-info">
                <h3 className="post__title">
                  <a className="post__link">
                    Bí quyết phối đồ style Hàn Quốc dành cho nam trong mùa hè
                    2024
                  </a>
                </h3>
                <p className="post__excerpt">
                  Style Hàn Quốc là xu hướng thời trang "hot" luôn được giới trẻ
                  quan tâm đến và theo đuổi, nhưng không phải ai cũng biết cách
                  phối đồ nam Hàn Quốc mùa hè sao cho chuẩn phong cách. Tạo cho
                  bản thân một phong cách thời trang Hàn Quốc đẳng cấp và cuốn
                  hút không chỉ đơn thuần là việc mua sắm những món đồ mới mà
                  còn là khám phá bí quyết phối đồ sao cho ngầu, cho chất hơn.
                  Vậy bạn có muốn tạo cho riêng mình một phong cách thời trang
                  nam Hàn Quốc mùa hè đẳng cấp và cuốn hút? Cùng Routine khám
                  phá bí quyết phối đồ chuẩn soái ca ngay tại bài viết này!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
