import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <title>Privacy Policy - [Hospital Name]</title>

      <div>
        <header className="text-dark p-3 text-center">
          <h1>Privacy Policy</h1>
        </header>

        <div className="container mt-5">
          <section>
            <h2>Introduction</h2>
            <p>
              Welcome to [Hospital Name]. We prioritize protecting your personal information and privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [hospital website URL], including any other media form, media channel, mobile website, or mobile application related to our healthcare services.
            </p>
            <p>
              Please read this privacy policy carefully. By accessing or using our site, you agree to the terms outlined in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <p>
              We collect information about you in a variety of ways. This includes:
            </p>
            <ul>
              <li>
                <strong>Personal Health Information:</strong> Information such as your name, date of birth, contact details, and any medical data or health-related information you provide during registration, appointment bookings, or when interacting with our healthcare services.
              </li>
              <li>
                <strong>Derivative Data:</strong> Information automatically collected by our servers when you access our site, like IP address, browser type, operating system, access times, and pages viewed before and after visiting our site.
              </li>
              <li>
                <strong>Financial Data:</strong> Payment details, such as your billing address, payment method (e.g., credit card number), used for appointment fees, lab services, or any other paid services offered by the hospital.
              </li>
              <li>
                <strong>Device Information:</strong> Information about your device, including the mobile device ID, model, manufacturer, and location data, if accessing our services from a mobile device.
              </li>
            </ul>
          </section>

          <section>
            <h2>Use of Your Information</h2>
            <p>
              We may use information collected about you to:
            </p>
            <ul>
              <li>Provide healthcare services and manage your medical records securely.</li>
              <li>Schedule and confirm your appointments and follow-ups.</li>
              <li>Notify you of important updates, reminders, or test results.</li>
              <li>Personalize your experience with our healthcare services.</li>
              <li>Analyze trends to improve our website and patient care.</li>
              <li>Assist with billing, payments, and other financial transactions.</li>
              <li>Comply with legal obligations and respond to any legal requests.</li>
            </ul>
          </section>

          <section>
            <h2>Disclosure of Your Information</h2>
            <p>
              We may share your information in certain situations:
            </p>
            <ul>
              <li>
                <strong>By Law or to Protect Rights:</strong> If required, we may disclose your information to comply with legal processes, safeguard rights, or protect the safety of our patients and staff.
              </li>
              <li>
                <strong>Medical Providers:</strong> We may share your medical information with healthcare providers involved in your care, such as specialists, labs, or pharmacies.
              </li>
              <li>
                <strong>Third-Party Service Providers:</strong> For services like payment processing, data analysis, and customer service, we may share information with trusted partners who uphold data privacy standards.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger or sale, patient data may be transferred as part of the transaction.
              </li>
            </ul>
          </section>

          <section>
            <h2>Security of Your Information</h2>
            <p>
              We implement administrative, technical, and physical measures to secure your information. While we strive to protect your data, please remember that no system is entirely foolproof. If you have concerns, please reach out to us.
            </p>
          </section>

          <section>
            <h2>Policy for Children</h2>
            <p>
              We do not knowingly collect information from or market to children under 13 without parental consent. If we discover such information, we will delete it as soon as possible. Contact us if you are aware of any data collected from children under 13.
            </p>
          </section>

          <section>
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy to reflect changes in our practices or legal requirements. Any updates will be posted here, so we encourage you to review this policy regularly.
            </p>
          </section>

       
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
