import React from "react";

function Term() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container my-5" id="top">
      <h1 className="text-center my-3">Term & Condition</h1>
      <p>
        These terms and conditions apply to the purchase and use of devices from{" "}
        <b>
          Phone<span style={{ color: "red" }}>X</span>{" "}
        </b>
        . By purchasing or using a device from us, you agree to abide by these
        Terms.
      </p>
      <hr />

      <h3>1. Product Information:</h3>

      <p>
        We strive to provide accurate and up-to-date information about our
        devices, including specifications, features, and pricing. However, we do
        not guarantee that all information is free from errors or omissions.
      </p>
      <hr />
      <h3>2. Orders, Payment and Discount:</h3>

      <p>
        Placing an order for a device constitutes an offer to purchase, subject
        to our acceptance. Prices are subject to change without notice. Any
        applicable taxes or fees will be added to the total purchase price.
        Payment must be made in full at the time of purchase.
      </p>
      <br />
      <p>
        <span>
          <b>Discount:</b>
        </span>
        Unlock Savings: Get up to 40% off on the latest iPhone models at our
        mobile store! Discover unbeatable deals on cutting-edge technology, from
        the sleek iPhone 15 to the powerful iPhone 13 Pro Max. Upgrade your
        mobile experience without breaking the bank. Limited time offer. Shop
        now and enjoy premium features at discounted prices!
      </p>
      <hr />
      <h3>3. Shipping and Delivery:</h3>

      <p>
        We will make reasonable efforts to ship your device within the estimated
        delivery time. However, we are not responsible for delays caused by
        shipping carriers or unforeseen circumstances. You are responsible for
        providing accurate shipping information. Any additional charges incurred
        due to incorrect information will be your responsibility.
      </p>
      <hr />
      <h3>4. Warranty and Support:</h3>

      <p>
        Our devices may come with a manufacturer's warranty, which covers
        defects in materials and workmanship under normal use. Please refer to
        the warranty terms provided with your device for more details. We offer
        customer support for issues related to your device. Contact our support
        team for assistance.
      </p>
      <hr />
      <h3>5. Limitation of Liability:</h3>

      <p>
        To the fullest extent permitted by law, we shall not be liable for any
        indirect, incidental, special, or consequential damages arising from the
        use or inability to use our devices, including but not limited to loss
        of profits, data, or goodwill. Our liability for any claim related to
        your purchase of a device shall not exceed the purchase price of the
        device.
      </p>
      <hr />
      <h3>6. Intellectual Property:</h3>

      <p>
        All intellectual property rights, including trademarks and copyrights,
        related to our devices and services are owned by the Company or its
        licensors. You may not use our trademarks or copyrighted material
        without our prior written consent.
      </p>
      <hr />
      <h3>7. Modifications to Terms:</h3>

      <p>
        We reserve the right to modify or update these Terms at any time. Any
        changes will be effective immediately upon posting on our website or
        notifying you by other means.
      </p>
      <hr />
      <h3>8. Contact Information:</h3>

      <p>
        If you have any questions or concerns about these Terms or our devices,
        please contact us at{" "}
        <a
          href="mailto:phonex@gmail.com"
          style={{ textDecoration: "none", color: "red" }}
        >
          PhoneX@gmail.com.
        </a>
        . By purchasing or using a device from us, you acknowledge that you have
        read, understood, and agreed to these Terms and Conditions.
      </p>
    </div>
  );
}

export default Term;
