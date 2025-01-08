import React from "react";

const About = ()=> {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container my-5" id="top">
      <h5 className="">Welcome to Our Website!</h5>
      <p>
        At{" "}
        <b>
          Phone<span className="text-danger">X</span>
        </b>
        , we're passionate about providing you with the latest and greatest in
        mobile technology. Our mission is to offer top-quality smartphones at
        competitive prices while ensuring an exceptional shopping experience for
        our customers. Whether you're in the market for the newest flagship
        device or seeking a budget-friendly option, we've got you covered.
      </p>
      <hr />
      <h5>Why Choose Us?</h5>

      <p>
        {" "}
        1. Wide Selection: We offer a diverse range of smartphones and other
        electronic gadgets from leading brands, catering to every budget and
        preference. From iPhones to Android devices, we have something for
        everyone.
      </p>

      <p>
        {" "}
        2. Quality Assurance: Each phone undergoes rigorous testing to ensure it
        meets our high standards for performance and reliability. You can shop
        with confidence knowing that you're getting a top-notch product.
      </p>

      <p>
        {" "}
        3. Competitive Pricing: We believe in fair and transparent pricing. Our
        goal is to provide value to our customers by offering competitive prices
        without compromising on quality.
      </p>

      <p>
        {" "}
        4. Exceptional Customer Service: Our dedicated team is here to assist
        you every step of the way. Whether you have questions about our products
        or need help with your purchase, we're always ready to lend a hand.
      </p>

      <p>
        {" "}
        5. Fast and Secure Shipping: We understand the importance of receiving
        your order promptly and securely. That's why we partner with trusted
        shipping carriers to ensure timely delivery while keeping your
        information safe.
      </p>
      <hr />

      <h5>Our Commitment to Sustainability</h5>

      <p>
        At{" "}
        <b>
          Phone<span className="text-danger">X</span>
        </b>
        , we're committed to reducing our environmental footprint. We strive to
        minimize waste by implementing eco-friendly packaging practices and
        promoting responsible disposal of electronic devices.
      </p>

      <h5>Get in Touch</h5>

      <p>
        We value your feedback and are continuously striving to improve our
        services. If you have any questions, comments, or suggestions, please
        don't hesitate to contact us. Our friendly team is here to assist you.
      </p>

      <p>
        {" "}
        Thank you for choosing{" "}
        <b>
          Phone<span className="text-danger">X</span>
        </b>{" "}
        for all your smartphone and other electronics item need! Happy shopping!
      </p>
    </div>
  );
}

export default About;
