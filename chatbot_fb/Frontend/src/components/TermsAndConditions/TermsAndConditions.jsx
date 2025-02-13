import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const TermsAndConditions = () => {
  return (
    <>
    <title>Terms and conditions</title>
      <Navbar />
      <div>
        <header className="text-dark p-3 text-center">
          <h1>Terms and Conditions</h1>
        </header>

        <div className="container mt-5">
          <section>
            <h2>Introduction</h2>
            <p>
              Welcome to [Hospital Name]! These terms and conditions outline the rules and regulations for the use of [Hospital Name]'s website, located at [hospital website URL].
            </p>
            <p>
              By accessing this website, we assume you accept these terms and conditions. Do not continue to use [Hospital Name]'s website if you do not agree to all of the terms and conditions stated on this page.
            </p>
          </section>

          <section>
            <h2>Intellectual Property Rights</h2>
            <p>
              Except for content you own, under these Terms, [Hospital Name] and/or its licensors own all intellectual property rights and materials contained on this website.
            </p>
            <p>
              You are granted a limited license only for purposes of viewing the material on this website for personal, non-commercial use.
            </p>
          </section>

          <section>
            <h2>Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul>
              <li>Publishing any website material in any other media;</li>
              <li>Selling, sublicensing, or commercializing any website material;</li>
              <li>Publicly performing or displaying any website material;</li>
              <li>Using this website in any way that is damaging to the website;</li>
              <li>Using this website in a way that impacts user access to the website;</li>
              <li>Using this website contrary to applicable laws and regulations;</li>
              <li>Engaging in data mining, harvesting, or similar activities;</li>
              <li>Using this website for advertising or marketing purposes.</li>
            </ul>
            <p>
              Certain areas of this website are restricted from access, and [Hospital Name] may further restrict access to any areas at any time, in its absolute discretion.
            </p>
          </section>

          <section>
            <h2>Your Content</h2>
            <p>
              In these terms, "Your Content" refers to any audio, video, text, images, or other material you choose to display on this website. By displaying Your Content, you grant [Hospital Name] a non-exclusive, worldwide, irrevocable, sub-licensable license to use, reproduce, adapt, publish, and distribute it in any media.
            </p>
            <p>
              Your Content must be your own and must not infringe on any third-party rights. [Hospital Name] reserves the right to remove any of Your Content from this website at any time.
            </p>
          </section>

          <section>
            <h2>Your Privacy</h2>
            <p>Please review our <a href="/privacy-policy">Privacy Policy</a> to understand how we handle your data.</p>
          </section>

          <section>
            <h2>No Warranties</h2>
            <p>
              This website is provided "as is," with all faults, and [Hospital Name] makes no representations or warranties of any kind related to the website or the materials contained on it. Nothing on this website shall be interpreted as medical advice.
            </p>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>
              In no event shall [Hospital Name], nor any of its officers, directors, or employees, be held liable for any damages arising out of or in connection with your use of this website.
            </p>
          </section>

          <section>
            <h2>Indemnification</h2>
            <p>
              You agree to indemnify [Hospital Name] to the fullest extent from any and all liabilities, costs, demands, damages, and expenses arising from your breach of these Terms.
            </p>
          </section>

          <section>
            <h2>Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid, the remaining provisions will remain in effect.
            </p>
          </section>

          <section>
            <h2>Changes to Terms</h2>
            <p>
              [Hospital Name] reserves the right to revise these Terms at any time. You are expected to review these Terms regularly.
            </p>
          </section>

          <section>
            <h2>Assignment</h2>
            <p>
              [Hospital Name] is allowed to assign or transfer its rights and obligations under these Terms without notice.
            </p>
          </section>

          <section>
            <h2>Entire Agreement</h2>
            <p>
              These Terms constitute the entire agreement between you and [Hospital Name] regarding your use of this website.
            </p>
          </section>

          <section>
            <h2>Governing Law & Jurisdiction</h2>
            <p>
              These Terms will be governed by the laws of [Your State]. You submit to the jurisdiction of the courts in [Your State].
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
