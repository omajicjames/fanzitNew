// ----------------------
// Cookie Notice Page
// Location: /app/(public)/legal/cookies/page.tsx
// Purpose: Minimal cookie notice page that banner links to
// ----------------------

export default function CookieNoticePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 prose prose-invert">
      <h1>Cookie Notice</h1>
      <p>
        We use strictly necessary cookies for security and core functionality. With your
        consent we also use analytics, personalization, and advertising cookies. You can
        change your preference at any time via the footer link "Cookie preferences".
      </p>
      
      <h2>Types of Cookies We Use</h2>
      
      <h3>Strictly Necessary Cookies</h3>
      <p>
        These cookies are essential for the website to function properly. They enable core
        functionality such as security, network management, and accessibility. You cannot
        opt-out of these cookies.
      </p>
      
      <h3>Analytics Cookies</h3>
      <p>
        These cookies help us understand how visitors interact with our website by
        collecting and reporting information anonymously. This helps us improve our
        website's performance and user experience.
      </p>
      
      <h3>Personalization Cookies</h3>
      <p>
        These cookies allow us to remember your preferences and settings to provide you
        with a more personalized experience when you visit our website.
      </p>
      
      <h3>Advertising Cookies</h3>
      <p>
        These cookies are used to make advertising messages more relevant to you and your
        interests. They perform functions like preventing the same ad from continuously
        reappearing and ensuring that ads are properly displayed.
      </p>
      
      <h2>Managing Your Cookie Preferences</h2>
      <p>
        You can manage your cookie preferences at any time by clicking the "Cookie
        preferences" link in our website footer. You can also adjust your browser
        settings to refuse cookies, though this may affect website functionality.
      </p>
      
      <h2>Contact Us</h2>
      <p>
        If you have any questions about our use of cookies, please contact us at
        privacy@fanzit.com.
      </p>
    </main>
  );
}

/* End of CookieNoticePage */