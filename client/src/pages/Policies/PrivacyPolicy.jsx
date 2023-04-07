import React from "react";
// eslint-disable-next-line no-unused-vars
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Asset_2.png";
import MenuPolicies from "../../components/Policies/MenuPolicies";
import ParagraphPolicy from "../../components/Policies/ParagraphPolicy";

const PrivacyPolicy = () => {
  const data = [
    { name: "What private data do we collect from the people who visit our Platform?", path: "private_data" },
    { name: "How do we use your details?", path: "assent_acceptance" },
    { name: "Who do we share your data with?", path: "services" },
    { name: "How does our Platform handle Do Not Track signals?", path: "general_condition" },
    { name: "How do we protect your details?", path: "license" },
    { name: "Do we use cookies?", path: "user_content" },
    { name: "Limitation of Liability", path: "intelectual_property" },
    { name: "Indemnification", path: "user_obligation" },
    { name: "Changes to This Privacy Notice", path: "illegal_use" },
  ];

  return (
    <div className="px-10 w-full">
      <div className="mx-auto flex justify-between items-center my-5">
        <div className="basis-[28%] md:basis-[12%] ">
          <Link className="" to="../">
            <div className="text-lg font-bold w-[100px] md:w-[150px] mr-10 py-2 flex">
              {" "}
              <img className="justify-center" src={logo} alt="logo_vwanu" />
            </div>
          </Link>
        </div>
        <div className="space-x-5">
          <Link to="#" className="text-primary hover:text-secondary font-semibold">
            Privacy Policy Archives
          </Link>
          <button className="px-6 bg-primary text-white rounded-full py-2 hover:bg-secondary text-md">Download Pdf</button>
        </div>
      </div>
      <div className="bg-gradient-to-tr from-g-one/[0.78] to-g-two/[0.78] h-52 rounded-xl mx-auto flex items-center justify-center align-middle flex-col">
        <div className="">
          <p className="text-5xl text-white align-middle font-semibold mx-auto">PRIVACY POLICY</p>
          <p className="py-6 font-semibold mx-auto text-white">Effective: January 28, 2023</p>
          <p className="font-semibold mx-auto text-white italic text-sm">This Document is last updated on August 20, 2021</p>
        </div>
      </div>

      <div className="flex py-5 px-24 w-full h-fit sticky">
        <MenuPolicies data={data} />
        <div className="lg:w-[70%] h-fit max-h-[92vh] overflow-y-scroll">
          <ParagraphPolicy
            name=""
            heading=""
            description={`<p class="py-1">This online privacy policy has been put together to better provide those who find themselves worried about how their' Personally Identifiable Information' (PII) has been used online. PII, as defined in US privacy regulation and information security, is Information that can be used alone or with other Information to recognize, contact, or find a single person, or even to identify a person in a framework. Please read our online privacy policy carefully to obtain a clear knowledge of how we accumulate, use, protect or elsewhere take care of your Personally Identifiable Information relative to our Platform.</p>

            <ul class="py-1 pl-16 list-disc">
            <li>Your privacy is essential to us, and we are firmly dedicated to making our works with respect to your own Information increasingly straightforward and more attractive. It would be ideal if you read this Privacy Policy cautiously and make sure that you completely comprehend and consent to it. 
</li>
            <li>You are not legitimately required to give us any Personal Data (characterized underneath), and may do as such (or on the other hand abstain from doing as such) at your own through and through freedom. 
</li>
            <li>In the event that you don't wish to furnish us with such Personal Data, or to have it prepared by us or any of our Service Providers (characterized underneath), if you don't mind just don't enter our Platform or utilize our Services.</li>
            <li>You may likewise decide not to give us "discretionary" Personal Data, however please remember that without it we will most likely be unable to give you the full scope of our administrations or with the best client experience when utilizing our Services.</li>
            <li>Vwanu Provides social media platform.</li>
            </ul>
`}
          />

          <ParagraphPolicy
            name=""
            heading=""
            subHeading="What private data do we collect from the people who visit our Platform?"
            description={`
            
            <p class="py-1">When enlisting on our Platform, as suitable, you could be approached to type in your name, email, address information, or different subtleties to assist you with your experience.</p>

            <p class="py-1">When you create an account and use the Services, including through a third-party platform, we collect any data you provide directly, including:</p>

            <ul class="py-1 pl-16 list-disc">
            <li><span class="font-semibold">Account Data:</span> To use certain features, you need to create a user account. When you create or update your account, we collect and store the Data you provide, like your email address, password, gender, and date of birth, and assign you a unique identifying number ("Account Data").</li>
            <li>Location Data: is information that is derived from your GPS, Wi-Fi, compass, accelerometer, IP address, or public posts that contain location information. Location information will be disclosed (either to us, to other users, or both):
            
            <ul class="py-1 pl-10 list-disc">
            <li>when you use location-based features, such as People Nearby, POI search, and when you share your location with other Vwanu users; and</li>
            <li>when you access Vwanu, we derive location information from your IP address, device, or internet service to prevent multiple or fraudulent log-ins to your account.</li>
            </ul>

            </li>
            <li><span class="font-semibold">Personal Data:</span> Personal Data is information that can be used to identify you specifically, including your name, email, time zone, email address, or demographic information like your age, gender, or hometown. You consent to give us this information by providing it to us voluntarily on our mobile application. You provide some of this information when you register with or make purchases from our Platform. You may also give this information by participating in various activities associated with our Platform, including responding to blogs, contacting us with questions, or participating in group training. Your decision to disclose this Data is entirely voluntary. You are under no obligation to provide this information, but your refusal may prevent you from accessing certain benefits from our Platform.</li>

            <li><span class="font-semibold">Profile Data:</span> You can also choose to provide profile information like a photo, headline, Platform link, social media profiles, or other data. Your Profile Data will be publicly viewable by others.
</li>
            <li><span class="font-semibold">Financial Data:</span> Financial data is related to your payment methods, such as credit card or bank transfer details. We collect financial data to allow you to purchase, order, return or exchange products or services from our website and any related mobile apps. We store limited financial data. Most financial data is transferred to our payment processor, Stripe, and you should review these processors' Privacy Policy to determine how they use, disclose and protect your financial data. 

            <ul class="py-1 pl-10 list-disc">
            <li>Stripe Privacy Policy can be found here https://stripe.com/gb/privacy</li>
            </ul>
</li>
            </ul>

            `}
          />

          <ParagraphPolicy
            name=""
            subHeading="When do we acquire information?"
            description={`<p class="py-1">We get data from you when you get enlisted on our Platform, respond to an audit, give us reactions on our items or enter information on our Platform below are the examples:</p>

            <ul class="py-1 pl-16 list-disc">
            <li>if you register to become a user of Our Services;
</li>
            <li>if you send Us a message through Our Services or correspond with Us by telephone in writing or otherwise;
</li>
            <li>as you visit our Platform;
</li>
            <li>if you subscribe to one of Our Services;
</li>
            <li>participate in a discussion board or other social media functions on Our Services;
</li>
            <li>if you enter a competition, promotion, or survey;
</li>
            <li>if you report a problem to us; and
</li>
            <li>from any of your activities in connection with your use of Our Services.
</li>
            <li>To register on our Platform to get updated about new posts.
</li>
            <li>To deal with our relationship with you, including notifying you about changes to our terms or security arrangement. Request that you leave an auditor to take an overview. 
</li>
            <li>To manage and ensure our business and this Platform (counting investigating, information examination, testing, framework upkeep, backing, announcing, and facilitating information).
</li>
            <li>To send you our email pamphlet and other robotized email correspondences. 
</li>
            <li>To make proposals and suggestions to you about merchandise or administrations that might hold any importance with you.
</li>
            <li>This Information is registered automatically with the visit by own configuration or manual of each tool on the Platform
</li>
            </ul>

            <p class="py-1">This Information is registered automatically with the visit by own configuration or manual of each tool on the Platform:</p>
              <ul class="py-1 pl-16 list-disc">
<li>When you visit, connect with, or utilize our service, we may gather, record or create specific specialized data about you. We do so either autonomously or with the assistance of third gathering Service Providers, including using "cookies" and other following innovations. 
</li>
<li>Such data comprises of availability, specialized and collected utilization data, for example, IP locations and general areas, gadget data (like sort, working framework, cell phone id, program form, region and language settings, Browser Information, Geographic location, Time of Visit, Referring Platform, applications or service, search engine utilized), date and time stamps of use, the and pixels introduced or used on such gadget and the recorded movement (meetings, clicks and further cooperation) of Visitors and Users regarding our Service. for purposes including examination, service-, tasks, and business quality control and enhancements, and record-keeping purposes.
</li>
              </ul>

              <p class="py-1">This is to improve the Platform, services, and security, among which we include security inspection by the administration of the Platform and third parties.</p>
`}
          />

          <ParagraphPolicy
            name=""
            subHeading="How do we use your details?"
            description={`<p class="py-1">We may utilize the Data we procure from you when you enlist, join our bulletin, respond to an examination or promoting correspondence, peruse the Platform, or use specific other Platform includes in the following ways:</p>

             <ul class="py-1 pl-16 list-disc">
<li>To set up and log in to a user account on Vwanu;
</li>
<li>To notify you about changes to Vwanu;
</li>
<li>To facilitate communication;
</li>
<li>to verify your identity account security.
</li>
<li>To provide you with user support;
</li>
<li>To enforce our terms, conditions, and policies;
</li>
<li>To place VOIP calls using Vwanu;
</li>
<li>To communicate with you;
</li>
<li>To provide personalized help and instructions;
</li>
<li>To better understand how you access and use Vwanu;</li>
<li>To develop new and improve existing services;
</li>
<li>To provide language and location customization;
</li>
<li>To protect any rights, property, or safety of ours, our affiliate companies, or other users of Vwanu; and
</li>
<li>To administer Vwanu and internal operations, including troubleshooting, data analysis, testing, research, security, fraud-detection, account management, and survey purposes.
</li>
<li>Where we have to play out the Agreement, we are going to go into or have gone into with you
</li>
<li>To tweak your experience and permit us to give the kind of substance and item contributions you are generally intrigued by.
</li>
<li>To help our Platform that will be ready to serve you better.
</li>
<li>To allow us to brought administration to you up in furnishing a response to your client assistance demands.
</li>
<li>To procure rankings and audits of items
</li>
<li>To send messages after a certain time routinely, for your administrations or items and different items.
</li>
<li>To catch up after correspondence with (live talk, email, or telephone requests)
</li>
<li>To furnish you with the data, items, and administrations that you demand from the Platform.
</li>
             </ul>
`}
          />

          <ParagraphPolicy
            name=""
            subHeading="Who do we share your data with?"
            description={`<p class="py-1">Only where necessary will we share your information with selected recipients who have a legal basis and valid jurisdiction to request such data. These categories of recipients include government, public, regulatory, judicial, and law enforcement bodies or authorities: there are circumstances in which we are legally required to disclose information, including to comply with a legal obligation or processes, such as a court order, subpoena or another legal process, to enforce our terms, address issues relating to security or fraud, or protect our users and provided the requesting entity has proper jurisdiction to obtain your personal information.</p>
`}
          />

          <ParagraphPolicy
            name=""
            subHeading="How can I exercise my rights over my data?"
            description={`<p class="py-1">Some countries' laws grant specific rights to users of Vwanu, which are set out in this section.</p>
            
            <p class="py-2 text-lg font-semibold">USA-SPECIFIC TERMS</p>

              <ul class="py-1 pl-16 list-disc">
<li>If you are a user of Vwanu in the United States of America, the below Additional Terms: (a) are incorporated into these Terms; (b) apply to your use of Vwanu; and (c) override the head terms of these Terms to the extent of any inconsistency.
</li>
<li>If you are a user of Vwanu in the United States of America, the following terms expressly replaces the above "Governing law and dispute resolution" section of these Terms.
</li>
<li>If you live in (or, if a business, your principal place of business is in) the United States, the laws of the state where you live govern all claims, regardless of conflict of law principles, except that the Federal Arbitration Act governs all provisions relating to arbitration. You and we irrevocably consent to the exclusive jurisdiction and venue of the state or federal courts of California, for all disputes arising out of or relating to these Terms that are heard in court (excluding arbitration).
</li>
              </ul>

              <p class="py-1">EACH OF THE PARTIES HERETO IRREVOCABLY WAIVES ANY AND ALL RIGHT TO TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION IN ANY LEGAL PROCEEDING ARISING OUT OF OR RELATING TO THESE TERMS OR THE TRANSACTIONS CONTEMPLATED HEREBY.
</p>

              <p class="py-1">In the event of a dispute, you and we agree to try for sixty (60) days to resolve it informally. If you and we are unable to come to informal resolution within sixty (60) days, you and we agree to binding individual arbitration before the American Arbitration Association ("AAA") under the Federal Arbitration Act ("FAA") (with such arbitration to be conducted under the AAA's Commercial Arbitration Rules), and not to sue in court in front of a judge or jury. Instead, a neutral arbitrator will decide and the arbitrator's decision will be final except for a limited right of appeal under the FAA. Class action lawsuits, class-wide arbitrations, private attorney-general actions, and any other proceeding where someone acts in a representative capacity are not allowed, and nor is combining individual proceedings without the consent of all parties. These Terms govern to the extent they conflict with the AAA's Commercial Arbitration Rules or Consumer Arbitration Rules. You and we must file in arbitration any claim or dispute (except intellectual property disputes) within one year from when it first could be filed. If the class action waiver is found to be illegal or unenforceable as to all or some parts of a dispute, then those parts won't be arbitrated but will proceed in court, with the rest proceeding in arbitration. If any other provision of these provisions regarding arbitration is found to be illegal or unenforceable, that provision will be severed but the rest of these provisions regarding arbitration still apply.
</p>

              <p class="py-1">If you are a California resident, then (except to the extent prohibited by applicable laws) you agree to waive California Civil Code Section 1542, and any similar provision in any other jurisdiction (if you are a resident of such other jurisdiction), which states: "A general release does not extend to claims which the creditor does not know or suspect to exist in his favor at the time of executing the release, which, if known by him must have materially affected his settlement with the debtor".
</p>

            <p class="py-2 text-lg font-semibold">AUSTRALIA-SPECIFIC TERMS</p>

            <p class="py-1">If you are a user of Vwanu in Australia, the below Additional Terms: (a) are incorporated into these Terms; (b) apply to your use of Vwanu; and (c) override the head terms of these Terms to the extent of any inconsistency.
</p>

            <p class="py-1">All express or implied guarantees, warranties, representations, or other terms and conditions relating to these Terms or their subject matter, not contained in these Terms, are excluded from these Terms to the maximum extent permitted by applicable laws and regulations.
</p>

            <p class="py-1">Nothing in these Terms excludes, restricts or modifies any guarantee, warranty, term or condition, right or remedy implied or imposed by any applicable laws and regulations which cannot lawfully be excluded, restricted or modified.
</p>

            <p class="py-1">If any guarantee, condition, warranty or term is implied or imposed by any applicable laws and regulations and cannot be excluded (a "Non-Excludable Provision"), and we are able to limit your remedy for a breach of the Non-Excludable Provision, then our liability for breach of the Non-Excludable Provision is limited to one or more of the following at our option:
</p>

<ul class="py-1 pl-16 list-disc">
<li>in the case of goods, the replacement of the goods or the supply of equivalent goods, the repair of the goods, the payment of the cost of replacing the goods or of acquiring equivalent goods, or the payment of the cost of having the goods repaired; or
</li>
<li>in the case of services, the supplying of the services again, or the payment of the cost of having the services supplied again.
</li>
</ul>

<p class="text-md font-semibold py-2">Customer Data Processing Appendix:</p>

<p class="py-1">Customer Data" means any personal data that Vwanu processes on behalf of Customer via the Service, as more particularly described in this DPA.</p>

<p class="py-1">"Data Protection Laws" signifies all information protection laws and guidelines appropriate to a gathering's handling of Customer Data under the Agreement, including, where pertinent, EU Data Protection Law and Non-EU Data Protection Laws.</p>

<p class="py-2 text-lg font-semibold">GDPR-Eu Data Protection Law</p>

<p class="py-1">"EU Data Protection Law" signifies all data protection laws and guidelines appropriate to Europe, including (I) Regulation 2016/679 of the European Parliament and the Council on the insurance of ordinary people concerning the preparing of individual information and on the free development of such information (General Data Protection Regulation) ("GDPR"); (ii) Directive 2002/58/EC concerning the processing of personal data and the protection of privacy in the electronic communications sector; (iii) applicable national implementations of (i) and (ii); and (iii) in respect of the United Kingdom ("UK") any applicable national legislation that replaces or converts in domestic law the GDPR or any other law relating to Data and privacy as a consequence of the UK leaving the European Union).
</p>

<p class="py-1">"Europe" signifies, for the motivations behind this DPA, the European Union, the European Economic Area as well as their part states, Switzerland and the United Kingdom. </p>

<p class="py-1">"Non-EU Data Protection Laws" means the California Consumer Privacy Act ("CCPA"); the Canadian Personal Information Protection and Electronic Documents Act ("PIPEDA"); and the Brazilian General Data Protection Law ("LGPD"), Federal Law no. 13,709/2018.</p>

<ul class="py-1 pl-16 list-disc">
<li><span class="font-semibold">Parties' roles:</span> If EU Data Protection Law or the LGPD applies to either party's processing of Customer Data, the parties acknowledge and agree that about the processing of Customer Data, Customer is the controller and Vwanu is a processor acting on behalf of Customer, as further described in Annex A (Details of Data Processing) of this DPA.
</li>
<li><span class="font-semibold">Purpose limitation:</span> Vwanu shall process Customer Data only following Customer’s documented lawful instructions as outlined in this DPA, as necessary to comply with applicable law, or as otherwise agreed in writing ("Permitted Purposes"). The parties agree that the Agreement sets out the Customer’s complete and final instructions to Vwanu to processing Customer Data. Processing outside the scope of these instructions (if any) shall require a prior written agreement between the parties.
</li>
<li><span class="font-semibold">Customer compliance:</span> Customer represents and warrants that (i) it has complied, and will continue to comply, with all applicable laws, including Data Protection Laws, in respect of its processing of Customer Data and any processing instructions it issues to Vwanu; and (ii) it has provided, and will continue to provide, all notice and has obtained, and will continue to obtain, all consents and rights necessary under Data Protection Laws for Vwanu to process Customer Data for the purposes described in the Agreement. Customer shall have sole responsibility for the accuracy, quality, and legality of Customer Data and how Customer acquired Customer Data. Without prejudice to the generality of the preceding, Customer agrees that it shall be responsible for complying with all laws (including Data Protection Laws) applicable to any emails or other content created, sent, or managed through the Service, including those relating to obtaining consents (where required) to send emails, the content of the emails and its email deployment practices.
</li>
<li><span class="font-semibold">Lawfulness of Customer's instructions:</span> Customer will ensure that Vwanu’s processing of the Customer Data in accordance with Customer’s instructions will not cause Vwanu to violate any applicable law, regulation, or rule, including, without limitation, Data Protection Laws. Vwanu shall promptly notify Customer in writing, unless prohibited from doing so under EU Data Protection Laws, if it becomes aware or believes that any data processing instruction from Customer violates the GDPR or any UK implementation of the GDPR.
</li>
</ul>

<p class="py-2 text-lg font-semibold">California Online Privacy Protection Act</p>

<p class="py-1">CCPPA is the first state law in the country to require commercial Platforms and online services to create an online privacy policy. 
</p>

<p class="py-1">The law’s reach extends well beyond California to require anybody or company in America (and possibly the entire world) that functions Platforms collecting (PII) Personally Identifiable Information from California consumers to create a visible online privacy policy on its Platform declaring the information being accumulated and the individuals or companies with whom it has been distributed. –See more at https://consumercal.org/about-cfc/cfc-education-foundation/california-online-privacy-protection-act-caloppa-3/
</p>

<p class="py-2 font-semibold">According to CalOPPA, we agree to the following:</p>

<ul class="py-1 pl-16 list-disc">
<li>Users can visit our Platform anonymously.
</li>
<li>Once this online privacy policy is established, we will put a link to it on our Platform, on the first significant web page after getting into our Platform.
</li>
<li>Request we disclose to you free of charge the following information covering the 12 months preceding your request:
</li>
<li>The categories of personal information about you that we collected;
</li>
<li>The categories of sources from which the personal information was collected;
</li>
<li>The purpose for collecting personal information about you;
</li>
<li>The categories of third parties to whom we disclosed personal information about you and the categories of personal information that was disclosed (if applicable) and the purpose for disclosing the personal information about you; and
</li>
<li>The specific pieces of personal information we collected about you;
</li>
<li>Our online privacy policy link includes the term ‘privacy’ and can certainly be on the page given above.
</li>
<li>You’ll be notified of any online privacy policy changes:
</li>
<li>Via email
</li>
</ul>

<p class="py-2 text-lg font-semibold">Your Brazilian Privacy Rights</p>

<p class="py-1">If you are located in Brazil, you may learn more about your Brazilian privacy rights. users and others who reside in Brazil (“consumers” or “you”). We adopt this notice to comply with the Brazilian Data Protection Law Lei Geral de Proteção de Dados Pessoais (Law No. 13,709/2018) ("LGPD"). Any terms defined in the LGPD have the same meaning when used in this notice.</p>

<p class="py-2 text-lg font-semibold">LGPD</p>

<p class="py-1">On September 18, 2020, the Lei Geral de Proteção de Dados Pessoais (LGPD) will come into effect for Brazilian residents. The LGPD embraces many of the privacy rights for which we have advocated for years. We want to assure you that we still advocate for those rights and more. For those of you who are located in Brazil, this page will help you understand the LGPD and our compliance with it.</p>

<p class="py-1">In addition to the rights outlined in the Vwanu Privacy Policy, as a user located in Brazil, you may be able to exercise the following rights with respect to your personal information that we have collected, subject to certain limitations:</p>

<ul class="py-1 pl-16 list-disc">
<li>The right to confirmation of the existence of the processing. You have the right to ask that we confirm whether we process your personal data.
</li>
<li>The right to access the data. You have the right to access the personal Data we hold about you and certain information about how we use it and who we share it with, including information about any public and private entities we have shared your personal data with. Most of this Data can be reviewed in your account panel and related content and services that you have purchased.
</li>
<li>The right to correct incomplete, inaccurate or out-of-date data. If you want to correct or revise any of the data, we retain on you, you may do so by accessing your account and the information contained within it. This includes Who is information collected for domains that you have purchased.
</li>
<li>The right to anonymize, block, or delete unnecessary or excessive data or data that is not being processed in compliance with the LGPD. Please note that, depending on the request, this may result in a suspension or discontinuation of certain services and is also governed by legal and/or contractual retention guidelines.
</li>
<li>The right to the portability of data to another service provider, by means of an express request. We provide you with the ability to move any of your account data to a third party, at any time.
</li>
<li>The right to delete personal data processed with the consent of the data subject. You have a right to request the permanent deletion of your data, subject to certain exceptions. However, please note that exercising this right may result in a suspension or discontinuation of services and is also governed by legal and/or contractual retention guidelines.
</li>
<li>The right to information about the possibility of not giving consent and about the consequences of the refusal. You have the right to ask us to provide information about the possibility of not giving consent for the processing of your personal data and the consequences of such refusal.
</li>
<li>The right to revoke consent.
</li>
</ul>

<p class="py-1">Please note that not all of these rights listed above are absolute, and limitations/exceptions apply in some cases. For example, we may not be able to fully comply with your request if we are bound by certain legal restrictions or contractual requirements, but in those circumstances, we will still respond to notify you of such a decision.
</p>

            `}
          />

          <ParagraphPolicy
            name=""
            subHeading="Exercising Data Portability and Deletion Rights"
            description={`<p class="py-1">To exercise the data portability and deletion rights described above, please submit a verifiable consumer request to us by:</p>

            <ul class="py-1 pl-16 list-disc">
            <li>You can contact us Contact Us</li>
            <li>We will need to verify your identity before processing your request. The verifiable consumer request must:</li>
            <li>Provide sufficient information that allows us to reasonably verify you are the person about whom we collected personal information or a legal representative.</li>
            <li>Describe your request with sufficient detail that allows us to properly understand, evaluate and respond to it.</li>
            </ul>

            <p class="py-1">We cannot respond to your request or provide you with personal information if we cannot verify your identity or authority to make the request and confirm the personal information relates to you. Making a verifiable consumer request does not require you to create an account with us. We will only use personal information provided in a verifiable consumer request to verify the requestor's identity or authority to make the request.</p>
`}
          />

          <ParagraphPolicy
            name=""
            subHeading="How does our Platform handle Do Not Track signals?"
            description={`<p class="py-1">We honor USUALLY DO NOT Track signals and don’t Track, place cookies, or use advertising whenever a Do Not Track (DNT) browser method is set up.</p>
`}
          />

          <ParagraphPolicy
            name=""
            subHeading="COPPA (Children Online Privacy Protection Action)"
            description={`<p class="py-1">With regards to the assortment of private information from children under age 13 years, the Children’s Online Privacy Protection Act (COPPA) puts parents in charge. The Federal Trade Commission, United States’ consumer safety firm, enforces the COPPA Guideline, which spells out what providers of Platforms and online services should do to safeguard children privatizes and security online.</p>
`}
          />

          <ParagraphPolicy
            name=""
            subHeading="Fair Information Practices"
            description={`<p class="py-1">The Fair Information Practices Rules form the backbone of the level of privacy law and the ideas they include have played an important role in the introduction of data protection laws and regulations around the world. Understanding the Good Information Practice Guidelines and how they must be implemented is fundamental to adhere to the various privation laws and regulations that protect private information.</p>

            <p class="py-1"><span class="font-semibold">To become consistent with Fair Information Methods we will need the following responsive action, should a data breach happen:</span></p>

             <ul class="py-1 pl-16 list-disc">
            <li>We will inform you via email</li>
            <li>within 7 business days</li>
            <li>We will inform the users via in-Platform notification</li>
            <li>Within 1 working day</li>
             </ul>

             <p class="py-1">We also agree to the average person Redress Rule which requires that people have the right to legally go after enforceable privileges against data collectors and processors who neglect to adhere to the law. This theory requires not just that people have enforceable protection under the law against data users, but also that people have recourse to courts or federal government agencies to research and/or prosecute non-compliance by data processors.</p>
`}
          />

          <ParagraphPolicy
            name=""
            subHeading="CAN-SPAM Act"
            description={`<p class="py-1">The CAN-SPAM Take action is a regulation that sets the guidelines for commercial email, establishes requirements for commercial announcements, offers recipients to have emails ceased from being delivered to them, and spells out hard fines for violations.</p>

            <p class="py-1">We accumulate your email to be able to:</p>

            <ul class="py-1 pl-16 list-disc">
            <li>Send information, react to questions, and/or other demands or questions</li>
            <li>To maintain compliance with CANSPAM, we consent to the next:</li>
            <li>Not use untrue or misleading subject matter or email addresses.</li>
            <li>Identify the concept as an advertisement in some realistic way.</li>
            <li>Include the physical address of our Platform headquarters or business</li>
            <li>Screen third-party email marketing services for conformity, if one can be used.</li>
            <li>Honor opt-out/unsubscribe demands quickly.</li>
            <li>Allow users to unsubscribe utilizing the link at the bottom of every email.</li>
            <li>If anytime you want to unsubscribe from receiving future email, you can email us at by using contact form at our Platform Vwanu and we’ll immediately remove you from ALL communication.</li>
            </ul>
`}
          />

          <ParagraphPolicy
            name=""
            subHeading="How do we protect your details?"
            description={` <ul class="py-1 pl-16 list-disc">
            <li>We do not use vulnerability scanning and/or scanning to PCI specifications.</li>
            <li>We only provide articles and information. We never require credit card volumes.</li>
            <li>We use regular Malware Scanning.</li>
            <li>Your individual information is comprised behind secured systems and is merely accessible by a restricted number of folks who’ve special access privileges to such systems, and must carefully keep the information confidential. Furthermore, all very sensitive/credit information you resource is encrypted via Secure Socket Layer (SSL) technology.</li>
            <li>We implement a number of security measures whenever a user gets into, submits, or accesses their information to keep up the protection of your individual information.</li>
            </ul>

            <p class="py-1">All deals are processed through the gateway service provider and aren’t stored or refined on our machines.</p>
`}
          />

          <ParagraphPolicy
            name=""
            subHeading="Do we use cookies?"
            description={`<p class="py-1">Yes. Cookies are small documents a Platform or its provider exchanges to your computer’s hard drive through your Browser (if you allow) that permits the Platform’s or service provider’s systems to identify your internet browser and capture please remember certain information. For example, we use cookies to help us keep in mind and process the things in your shopping cart software. Also, they are used to help us understand your requirements based on prior or current Platform activity, which permits us to offer you improved services. We also use cookies to help us put together aggregate data about Platform traffic and Platform conversation so that people may offer better Platform experience and tools in the foreseeable future.</p>

            <p class="py-2 text-lg font-semibold">We use cookies to:</p>

            <ul class="py-1 pl-16 list-disc">
            <li>Understand and save user’s tastes for future views or visits to our Website.</li>
            <li>Keep an eye on advertisements.</li>
            <li>Compile aggregate data about Website traffic and Website connections in order to provide better Website activities and tools in the foreseeable future.</li>
            <li>We also use third party advertisements on Vwanu to support our Website. Some of these advertisers may use technology such as cookies and web beacons when they advertise on our Website, which will also send these advertisers (such as Google through the Google AdSense program) information including your IP address, your ISP, the browser you used to visit our Website, and in some cases, whether you have Flash installed. This is generally used for geo targeting purposes (Serving Online Booking ads to Travelers) or showing certain ads based on specific Websites visited (such as showing marketing ads to someone who frequents marketing Websites or blogs).</li>
            <li><span class="italic">We might also use third-party services that monitor these details on our behalf.</span></li>
            </ul>

            <p class="py-1">You are able to choose whether your personal computer warns you whenever a cookie has been directed, or you can select to carefully turn off all cookies. You can perform that through your web browser settings. Since the internet browser is just a little different, check out your browser’s Help Menu to learn the way in which to change your cookies.</p>

            <p class="py-1">If you change cookies off, a number of the features that produce your Website experience better might not exactly function properly. It will not have an impact on the user’s experience that produces your Website experience better and might not exactly function properly.</p>


`}
          />

          <ParagraphPolicy
            name=""
            subHeading="Limitation of Liability"
            description={`<ul class="py-1 pl-16 list-disc">
            <li>Some jurisdictions do not allow the limitation or exclusion of liability for incidental or consequential damages so some of the above limitations may not apply to you.</li>
            <li>We make no legal representation that the Website or services are appropriate or available for use in locations outside UNITED STATES. You may access the Website from outside UNITED STATES.at your own risk and initiative and must bear all responsibility for compliance with any applicable foreign laws.</li>
            </ul>
`}
          />

          <ParagraphPolicy
            name=""
            subHeading="Indemnification"
            description={`<ul class="py-1 pl-16 list-disc">
            <li>Upon visiting this Website you agree release, indemnify, defend and hold harmless Vwanu and any of its contractors, agents, employees, officers, directors, shareholders, affiliates and assigns from all liabilities, claims, damages, costs and expenses, including reasonable attorneys’ fees and expenses, of third parties relating to or arising out of your use of the Website content; your use of the services; your violation of any provision of these terms; any unauthorized information or data you supplied to us. You will have sole responsibility to defend us against any claim, but you must receive our prior written consent regarding any related settlement.</li>
            </ul>
`}
          />

          <ParagraphPolicy
            name=""
            subHeading="Governing Law and Jurisdiction"
            description={`<ul class="py-1 pl-16 list-disc">
            <li>This Website originates from the UNITED STATES. The laws of UNITED STATES. Without regard to its conflict of law, principles will govern these terms to the contrary. You, hereby agree that, all disputes arising out of or in connection with these terms shall be submitted to the exclusive jurisdiction of the UNITED STATES. By using this Website, you consent to the jurisdiction and venue of such courts in connection with any action, suit, proceeding or claim arising under or by reason of these terms. You now waive any right to trial by jury arising out of these terms.</li>
            </ul>
`}
          />

          <ParagraphPolicy
            name=""
            subHeading="Changes to This Privacy Notice"
            description={`<p class="py-1">We reserve the right to alter this privacy notice at any time. Such alterations will be posted on our website. You can also obtain an up-to-date copy of our privacy notice by contacting us.</p>
`}
          />

          <ParagraphPolicy
            name=""
            subHeading="Contacting Us"
            description={`<p class="py-1">If you would like to contact us to understand more about this Policy or wish to contact us concerning any matter relating to individual rights and your Personal Information, you may email us at info@vwanu.com</p>
`}
          />

          <p className="py-1 font-semibold">Vwanu </p>
          <p className="">info@vwanu.com</p>
          <p className="">United States</p>
          <p className="pt-10">This document was last updated on August 20, 2021</p>
        </div>
      </div>
    </div>
  );
};

// PrivacyPolicy.propTypes = {};

export default PrivacyPolicy;
