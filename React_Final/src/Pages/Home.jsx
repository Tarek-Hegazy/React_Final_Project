import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/custom.css";


export default function Home() {
  return (
    <div>
      {/* Hero Section with Carousel */}
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://soliloquywp.com/wp-content/uploads/2018/03/slider-placement-featured.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to BlogSphere</h3>
            <p>Where ideas find their voice.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://muffingroup.com/betheme/assets/images/placeholders/blog-pic3.webp"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Empowering Readers & Writers</h3>
            <p>Share your stories, inspire the world.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://soliloquywp.com/wp-content/uploads/2017/10/responsive-slider-for-envira-gallery.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Join Our Community</h3>
            <p>Create. Discover. Connect.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* About Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4">About BlogSphere</h2>
        <p className="lead text-center">
          BlogSphere is a modern blogging platform built for passionate writers and curious readers.
          Whether you're here to publish your stories, explore diverse ideas, or connect with creators —
          this is your space.
        </p>
      </div>

      {/* Creator Section - Redesigned */}
      <div className="creator-section py-5 text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY9DcIkPW-wL6qCvwW_M3ikeFyJSvFve5hWwdr0mmFfXEX2KX4LFVKmDgl_pGix7RcqwI&usqp=CAU"
                alt="Creator"
                className="rounded-circle img-fluid shadow-lg creator-img"
              />
            </div>
            <div className="col-md-8">
              <h3 className="fw-bold">
                Meet the <span className="text-warning">Creator</span>
              </h3>
              <p className="fs-5">
                Hi, I'm <span className="text-info fw-semibold">Tarek</span> — a front-end developer with a passion
                for clean design and meaningful content. This blog platform was built as part of my React learning journey.
              </p>
              <p className="fs-5">
                Feel free to explore the posts, share your thoughts, and enjoy the experience.
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4">What You Can Do Here</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <i className="bi bi-pencil-square display-5 text-primary mb-3"></i>
            <h5>Write Posts</h5>
            <p>Share your thoughts and stories with an easy-to-use post editor.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-search display-5 text-success mb-3"></i>
            <h5>Explore Content</h5>
            <p>Browse posts by others, discover trending topics, and stay inspired.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-person-circle display-5 text-warning mb-3"></i>
            <h5>Your Profile</h5>
            <p>Edit your details, manage your posts, and personalize your space.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
