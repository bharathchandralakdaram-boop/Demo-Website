import React from "react";
import LegalPage from "../components/LegalPage.jsx";

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="Draft — not yet finalised">
      <p>
        This is placeholder text outlining the structure terms & conditions would typically follow.
        It is not a finished legal document — please have it reviewed by a qualified professional
        before publishing the site live.
      </p>

      <h3>Orders</h3>
      <p>
        Placing an order through this site is an offer to purchase, which we may accept or decline
        (for example, if a product is out of stock).
      </p>

      <h3>Pricing</h3>
      <p>
        All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless
        stated otherwise. We reserve the right to correct pricing errors.
      </p>

      <h3>Returns & refunds</h3>
      <p>
        Unopened products in original packaging may be eligible for return within a defined window
        if there is a genuine quality issue. Exact timelines will be finalised and published here.
      </p>

      <h3>Limitation of liability</h3>
      <p>
        Products should be used strictly according to the instructions and cautions printed on
        their packaging. Sree Raghavendra Enterprises is not liable for damage arising from misuse.
      </p>

      <h3>Governing law</h3>
      <p>These terms are governed by the laws of India.</p>
    </LegalPage>
  );
}
