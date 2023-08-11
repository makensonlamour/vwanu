import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Asset_2.png";
// eslint-disable-next-line no-unused-vars
import PropTypes from "prop-types";
import MenuTerms from "../../components/Policies/MenuTerms";
import ParagraphPolicy from "../../components/Policies/ParagraphPolicy";

const TermsConditions = () => {
  const data = [
    { name: "Definitions", path: "definitions" },
    { name: "Assent & Acceptance", path: "assent_acceptance" },
    { name: "Services", path: "services" },
    { name: "General Conditions", path: "general_condition" },
    { name: "License to use this platforms", path: "license" },
    { name: "User Content", path: "user_content" },
    { name: "Intellectual Property", path: "intelectual_property" },
    { name: "User Obligations", path: "user_obligation" },
    { name: "No Malicious Or Illegal Use", path: "illegal_use" },
    { name: "Acceptable Use", path: "acceptable_use" },
    { name: "Assumption Of Risk", path: "assumption_risk" },
    { name: "Reverse Engineering & Security", path: "reverse_engineering" },
    { name: "Indemnification", path: "indemnification" },
    { name: "Exclusion of Liability", path: "exclusion_liability" },
    { name: "Spam Policy", path: "spam_policy" },
    { name: "Third-Party Links & Content", path: "third_party_links" },
    { name: "Modification & Variation", path: "modification_variation" },
    { name: "Entire Agreement", path: "entire_agreement" },
    { name: "Service Interruptions", path: "service_interruption" },
    { name: "Term, Termination & Suspension", path: "term_termination" },
    { name: "No Warranties", path: "no_warranties" },
    { name: "Limitation On Liability", path: "limitation_liability" },
    { name: "Disclaimer", path: "disclaimer" },
    { name: "General Provisions", path: "general_provisions" },
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
            Terms And Conditions Archives
          </Link>
          {/* <button className="px-6 bg-primary text-white rounded-full py-2 hover:bg-secondary text-md">Download Pdf</button> */}
        </div>
      </div>

      <div className="bg-gradient-to-tr from-g-one/[0.78] to-g-two/[0.78] h-52 rounded-xl mx-auto flex items-center justify-center align-middle flex-col">
        <div className="">
          <p className="text-5xl text-white align-middle font-semibold mx-auto">TERMS AND CONDITIONS</p>
          <p className="py-6 font-semibold mx-auto text-white">Effective: January 28, 2023</p>
          <p className="font-semibold mx-auto text-white italic text-sm">This Document is last updated on August 20, 2021</p>
        </div>
      </div>

      <div className="px-24 py-5">
        <p
          className="py-4 font-normal leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: ` Welcome to 
            <strong>Vwanu</strong>’s Terms and conditions. Please read this carefully before using our website/Platform, or services. This is a
          contract between you and 
            <strong>Vwanu</strong>
          . We've also included several annotations that aren't a part of the contract itself but are intended
          to emphasize key sections and help you follow the text. We've tried to be fair and straightforward. Please feel free to contact us
          if you have any questions or suggestions!`,
          }}
        />

        <p
          className="py-4 font-normal leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: `THE AGREEMENT: The use of this Website and services on this Platform are provided by 
            <strong>Vwanu</strong> (hereinafter referred to as "Platform") is subject to the following Terms & Conditions, 
            all parts, and sub-parts of which are specifically incorporated by reference here. 
            This agreement shall govern the use of all pages on this App (hereinafter collectively 
              referred to as "Platform") and any services provided by or on this Platform ("Services").`,
          }}
        />
      </div>
      <div className="px-24">
        <p className="w-full h-[1px] bg-secondary" />
      </div>
      <div className="flex py-5 px-24 w-full h-fit sticky">
        <MenuTerms data={data} />

        <div className="lg:w-[70%] h-fit max-h-[92vh] overflow-y-scroll">
          <ParagraphPolicy
            name="definitions"
            heading="1. DEFINITIONS"
            description={`<p class="py-1">“Agreement” denotes to this Terms and Conditions and the Privacy Policy and other documents provided to you by the Platform;</p>
<p class="py-1">“We,” “us,” and “our” are references to <strong>Vwanu</strong>;</p>
<p class="py-1">“User,” “You,” and “your” denotes the person who is accessing the Platform for taking or availing any service from us. User shall include the company, partnership, sole trader, person, body corporate or association taking services of this Platform;</p>
<p class="py-1">“Platform” shall mean and include <strong>Vwanu</strong> and any successor Platform of the Company or any of its affiliates;</p>
<p class="py-1">Parties: Collectively, the parties to this Agreement (We and You) will be referred to as Parties.</p>
`}
          />

          <ParagraphPolicy
            name="assent_acceptance"
            heading="2. ASSENT & ACCEPTANCE"
            description={`By using the Platform, you warrant that you have read and reviewed this agreement and that you agree to be bound by it. If you do not agree to be bound by this agreement, please leave the Platform immediately. We only agree to provide the users of this Platform and Services to you if you assent to this agreement.
`}
          />

          <ParagraphPolicy
            name="services"
            heading="3. SERVICES"
            description={`<p class="py-1"><trong>The Services and the Platform are only for people 13 years old and over.</strong> </p>
            <p class="py-1">We will provide further information regarding how Vwanu uses and accesses your device within Vwanu or in another manner (e.g., via the relevant Platform store as part of the installation process for Vwanu on your device). You agree to give us such access to and use of your device, and you acknowledge that if you do not provide us with such right of use or access, we may not be able to provide Vwanu (or certain features within Vwanu) to you.</p>
<p class="py-1">We agree to provide you with the Vwanu Service. The Service includes all of the Vwanu products, features, applications, services, technologies, and software that we provide to advance Vwanu 's mission: To carry and bring you nearer to individuals and things you love in your life. The Service is made up of the following aspects</p>
<p class="py-1">

<ul class="list-disc pl-10">
<li class="font-semibold">Offering customized freedoms to make, associate, impart, find, and offer.</li>
<p class="py-1">People are different. We want to strengthen your relationships through shared experiences you care about. So, we build systems that try to understand who and what you and others care about and use that information to help you create, find, join, and share experiences that matter to you. Part of that is highlighting Content, features, offers, and accounts you might be interested in and offering ways for you to experience Vwanu, based on things you and others do on and off Vwanu.</p>

<ul class="py-1 pl-16 list-disc">
<li>The Services allow you to create, publish and share short-form videos and to consume videos other users have created and interact with those videos and other users. </li>
<li>Create and share videos: In particular:</li>
<li>You can record or import videos into the Services. </li>
<li>You can edit videos and enrich them with filters and additional elements. </li>
<li>You can also include Content from other users in your videos, provided the creator of the respective video allows the use of their Content for such purposes. Other users can use your Content in their videos if you will enable the use of your Content for such purposes. </li>
<li>You can publish videos in the Services so that other users can consume your videos. Videos you post publicly will be available in the Platform. </li>
</ul>

<li class="font-semibold pt-5">Offering customized freedoms to make, associate, impart, find, and offer.</li>
<p class="py-1">We create and use tools and offer assets to our local area individuals that help to make their encounters positive and comprehensive, including when we figure they may require help. We likewise have groups and frameworks that work to battle misuse and infringement of our Terms and approaches, just as hurtful and beguiling conduct. We utilize all the data we have-including your data to attempt to keep our foundation secure. We likewise may share data about abuse or unsafe substance with other law authorization.</p>

<ul class="pl-10 list-disc py-1">
<li>You can use the Services and the Platform via the Vwanu Platforms (“Platform”) and the Vwanu Platform (“Platform”). Certain functions are available only in the Platform. Further, not all Services or features may be available in your country or region. Different features may be available in different versions of the Services. Certain features are not available for users under a certain age. </li>
</ul>

<li class="font-semibold">Creating and utilizing innovations that assist us with serving our developing local area.</li>
<p class="py-1">Organizing and analyzing information for our growing community is central to our Service. A big part of our Service is creating and using cutting-edge technologies that help us personalize, protect, and improve our Service on an incredibly large scale for a broad global community. Technologies like artificial intelligence and machine learning give us the power to apply complex processes across our Service. Automated technologies also help us ensure the functionality and integrity of our Service.</p>

<ul class="pl-10 list-disc py-1">
<li>You can share your videos, or videos of others that have enabled sharing, via various messaging services and on third-party social media platforms (e.g. Instagram, Facebook, YouTube, Twitter) by the respective terms of Service.</li>
<li>You can enter a video description, tags, and various privacy settings when publishing a video.</li>
<li>You can enter a short biography text and profile picture in your public user profile.</li>
</ul>

<li class="font-semibold">Giving predictable and consistent encounters across the platform</li>
<p class="py-1">Vwanu, which shares technology, systems, insights, and information-including the information we have about you to provide services that are better, safer, and more secure. We also offer ways to interact across the Company Products that you use, and designed systems to achieve a seamless and consistent experience across the Vwanu Platform.</p>
<ul class="pl-10 list-disc py-1">
<li>You can consume videos that other users have shared publicly or by users you follow.</li>
<li>The Service provides you with a customized “For You” page in which the Service selects videos to show you based on what the Service determines could be interesting for you. For further information, please see the <a href="#" class="text-primary hover:text-secondary">Privacy Policy</a>. </li>
<li>The Service provides other ways to find Content for you to consume, e.g. a list of other users’ videos on their profile, a search function, and category selection.</li>
<li>You can watch live streams of other users.</li>
<li>Interact with other users: You can interact with users’ Content and other users. In particular:</li>
<li>Direct messages: You can send direct messages to users if they follow you. </li>
<li>Likes: You can like videos. </li>
<li>Comments: Subject to users’ settings, you can post comments on their videos.</li>
<li>Follows: You can track users. If users restrict their profile, you can only follow users if they approve your request to follow.</li>
</ul>

<li class="font-semibold">Ensuring access to our Service.</li>
<p class="py-1">To operate our global Service, we must store and transfer data across our systems around the world, including outside of your country of residence. The use of this global infrastructure is essential to provide our Service. </p>

<li class="font-semibold">Research and innovation.</li>
<p>We use the information we have to develop, test, and improve our Service and collaborate with others on research to make our Service better and contribute to the well-being of our community. This includes analyzing the data we have about our users and understanding how people use our Services, for example by conducting surveys and testing and troubleshooting new features.</p>

</ul>
</p>
`}
          />

          <ParagraphPolicy
            name="general_condition"
            heading="4. GENERAL CONDITION"
            description={`
          <p class="py-1">

<ul class="list-disc pl-10 space-y-1">
<li>We do not guarantee the accuracy, completeness, validity, or timeliness of information listed by us or other users.</li>
<li>We make material changes to these terms and conditions from time to time, we may notify you either by prominently posting a notice of such changes or via email communication.</li>
<li>The Platform is licensed to you on a limited, non-exclusive, non-transferable, non-sublicensable basis, solely to be used in connection with the Service for your private, personal, non-commercial use, subject to all the terms and conditions of this agreement as they apply to the Service.</li>
</ul>
</p>
          `}
          />

          <ParagraphPolicy
            name="license"
            heading="5. LICENSE TO USE PLATFORM"
            description={`
          <p class="py-1">
          We may provide you with certain information as a result of your use of the Platform or Services. Such information may include but is not limited to, documentation, data, or information developed by us, and other materials which may assist in your use of the Platform or Services ("Our Materials"). Subject to this agreement, we grant you a non-exclusive, limited, non-transferable, and revocable license to use Our Materials solely in connection with your use of the Platform and Services. Our Materials may not be used for any other purpose, and this license terminates upon your cessation of use of the Platform or Services or at the termination of this agreement.
          </p>
          `}
          />

          <ParagraphPolicy
            name="user_content"
            heading="6. USER CONTENT"
            description={`
          <p class="py-1">Content Responsibility. 
The Platform permits you to share Content, post comments, feedback, etc. but you are solely responsible for the Content posted by you. You represent that you have required permission to use the Content.
</p>

<p class="py-1">When posting Content to the Platform, please do not post Content that:</p>
<ul class="py-1 pl-16 list-disc">
<li>contains ill-mannered, profane, abusive, racist or hateful language or expressions, text, photographs or illustrations that are pornographic or in poor taste, inflammatory attacks of a personal, racial or religious nature;</li>
<li>is defamatory, threatening, disparaging, grossly inflammatory, false, misleading, fraudulent, inaccurate, unfair, contains gross exaggeration or unsubstantiated claims;</li>
<li>violates the privacy rights of any third party, is unreasonably harmful or offensive to any individual or community;</li>
<li>discriminates on the grounds of race, religion, national origin, gender, age, marital status, sexual orientation or disability, or refers to such matters in any manner prohibited by law;</li>
<li>violates or inappropriately encourages the violation of any municipal, state, federal, or international law, rule, regulation, or ordinance;</li>
<li>uses or attempts to use another's account, password, Service, or system except as expressly permitted by the Terms of use uploads or transmits viruses or other harmful, disruptive, or destructive files;</li>
<li>sends repeated messages related to another user and/or makes derogatory or offensive comments about another individual or repeats prior posting of the same message under multiple emails or subjects.</li>
<li>Any submitted content that includes, but is not limited to the following, will be refused. If repeated violations occur, we reserve the right to cancel user access to the Platform without advanced notice. </li>
<li>You Give to Us. As part of our agreement, you also give us the permissions that we need to provide the Service.</li>
<li>We do not claim ownership of your Permissions content, but you grant us a license to use it.</li>
<li>Nothing is changing about your rights in your Content. We do not claim ownership of the Content that you post on or through the Service and you are free to share your Content with anyone else, wherever you want. However, we need specific legal permissions from you (known as a “license”) to provide the Service. When you share, post, or upload Content that is covered by intellectual property rights (like photos or videos) on or in connection with our Service, you hereby grant to us a non-exclusive, royalty-free, transferable, sub-licensable, worldwide license to host, use, distribute, modify, run, copy, publicly perform or display, translate, and create derivative works of your Content (consistent with your privacy and application settings). This license will end when your Content is deleted from our systems. You can delete Content individually or all at once by deleting your account.</li>

</ul>
          `}
          />

          <ParagraphPolicy
            name="intelectual_property"
            heading="7. INTELLECTUAL PROPERTY"
            description={`
          <p class="py-1">You agree that the Platform and all Services provided by us are the property of Vwanu, including all copyrights, trademarks, trade secrets, patents, and other intellectual property ("Our IP"). You agree that we own all rights, title, and interest in and to Our IP and that you will not use Our IP for any unlawful or infringing purpose. You agree not to reproduce or distribute Our IP in any way, including electronically or via registration of any new trademarks, trade names, service marks, or Uniform Resource Locators (URLs), without express written permission from us.</p>
          <ul class="py-1 pl-16 list-disc">
          <li>To make the Platform and Services available to you, you hereby grant us a royalty-free, non-exclusive, worldwide license to copy, display, use, broadcast, transmit and make derivative works of any content you publish, upload, or otherwise make available to the Platform ("Your Content"). We claim no further proprietary rights in your Content.</li>
          <li>If you feel that any of your intellectual property rights have been infringed or otherwise violated by the posting of information or media by another of our users, please contact us and let us know.</li>
          </ul>
          
          `}
          />

          <ParagraphPolicy
            name="user_obligation"
            heading="8. USER OBLIGATIONS"
            description={`
          <p class="py-1">Only you have the right to access and use your account. You are responsible for ensuring that your login information remains confidential at all times. Vwanu will assume that if your login is used to access the Services, the user has the legal authority to use such login. If you become aware of unauthorized use of your login, you agree to notify VWANU immediately by email at Vwanu. You remain liable for any activity on your account until VWANU has been notified and has had an opportunity to take appropriate action.</p>
          <ul class="py-1 pl-16 list-disc">
          <li>You hereby acknowledge and understand that each User is solely responsible for all aspects of its own day-to-day operations, including the provision of products (by any method, including through delivery), Service, environment, and overall quality and accuracy.</li>
          <p class="font-semibold">Compliance.</p>
          <li>You hereby acknowledge and understand that each user is solely responsible for any marketing, selling, and provision of any products or services offered to Guests through the Services in compliance with all Applicable Law and Rules. VWANU makes no representation or warranty regarding whether a user holds any applicable permit, license, registration, or another credential for its business; whether terms by a user are true and accurate; or whether a user complies with Applicable Law and Rules, and Vwanu is not responsible for the quality of the products or services provided by any user on the platform.</li>
          </ul>
          `}
          />

          <ParagraphPolicy
            name="illegal_use"
            heading="9. NO MALICIOUS OR ILLEGAL USE"
            description={`
          <p class="py-1"><em>Account Owner and any Authorized User shall not (and shall not allow any third party to):</em></p>
          <ol class="py-1 pl-16 list-decimal">
          <li>distribute viruses or other harmful or malicious computer code via or into the Platform;</li>
          <li>engage in any conduct that disrupts or impedes a third party’s use and enjoyment of the VWANU Services;</li>
          <li>use the output or other information generated by the Services for any purpose other than as contemplated by this agreement;</li>
          <li>use the VWANU Services for any use other than Customer’s internal business use;</li>
          <li>use unauthorized modified versions of the Services, including without limitation, to build a similar or competitive Platform or Services or to obtain unauthorized access to the Services;</li>
          <li>use the Services in any way that is contrary to applicable local, state/provincial, federal and foreign laws, including without limitation those relating to privacy, electronic communications and anti-spam legislation.</li>
          <li>VWANU retains all titles to, and, except as expressly licensed herein, all rights to the Services, all copies, derivatives and improvements thereof and all related documentation and materials.</li>
          </ol>
          `}
          />

          <ParagraphPolicy
            name="acceptable_use"
            heading="10. ACCEPTABLE USE "
            description={`
          <p class="py-1">
          You agree not to use the Platform or Services for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the Platform or Services in any way that could damage the Platform, Services, or general business of Vwanu.
          </p>
<ul class="py-1 pl-16 list-disc">
<li>You further agree not to use the Platform or Services:</li>
<li>To harass, abuse, or threaten others or otherwise violate any person's legal rights;</li>
<li>To violate any of our intellectual property rights or any third party;</li>
<li>To upload or otherwise disseminate any computer viruses or other software that may damage the property of another;</li>
<li>To perpetrate any fraud;</li>
<li>To engage in or create any unlawful gambling, sweepstakes, or pyramid scheme;</li>
<li>To publish or distribute any obscene or defamatory material;</li>
<li>To publish or distribute any material that incites violence, hate, or discrimination towards any group;</li>
<li>To unlawfully gather information about others.</li>
</ul>
         
          `}
          />

          <ParagraphPolicy
            name="assumption_risk"
            heading="11. ASSUMPTION OF RISK "
            description={`
          <p class="py-1">
          The Platform and Services are provided for communication purposes only. You acknowledge and agree that any information posted on Our Platform is not intended to be legal advice, medical advice, or financial advice, and no fiduciary relationship has been created between you and us. You further agree that your purchase of any of the products on the Platform is at your own risk. We do not assume responsibility or liability for any advice or other information given on the Platform.
          </p>
          `}
          />

          <ParagraphPolicy
            name="reverse_engineering"
            heading="12. REVERSE ENGINEERING & SECURITY "
            description={`
          <p class="py-1">
          You agree not to undertake any of the following actions:
          </p>
          <ul class="py-1 pl-16 list-disc">
<li>Reverse engineer, or attempt to reverse engineer or disassemble any code or software from or on the Platform or Services;</li>
<li>Violate the security of the Platform or Services through any unauthorized access, circumvention of encryption or other security tools, data mining, or interference to any host, user, or network.</li>
          </ul>
          `}
          />

          <ParagraphPolicy
            name="indemnification"
            heading="13. INDEMNIFICATION "
            description={`
          <p class="py-1">
          You agree to defend and indemnify us and any of our affiliates (if applicable) and hold us harmless against any legal claims and demands, including reasonable attorney's fees, which may arise from or relate to your use or misuse of the Platform or Services, your breach of this agreement, or your conduct or actions. You agree that we shall be able to select its legal counsel and may participate in its defense if we wish.
          </p>
          `}
          />

          <ParagraphPolicy
            name="exclusion_liability"
            heading="14. EXCLUSION OF LIABILITY "
            description={`
          <p class="py-1">
          You understand and agree that we (A) do not guarantee the accuracy, completeness, validity, or timeliness of information listed by us or any third parties; and (B) shall not be responsible for any materials posted by us or any third party. You shall use your judgment, caution, and common sense in evaluating any prospective methods or offers and any information provided by us or any third party. </p>

           <p class="py-1">
          Further, we shall not be liable for direct, indirect consequential, or any other form of loss or damage that may be suffered by a user through the use of the Vwanu Platform including loss of data or information or any kind of financial or physical loss or damage.
          </p>

           <p class="py-1">
          In no event shall Vwanu  , nor its Owner, directors, employees, partners, agents, suppliers, or affiliates, be accountable for any indirect, incidental, special, eventful, or exemplary costs, including without limitation, loss of proceeds, figures, usage, goodwill, or other intangible losses, consequential from (i) your use or access of or failure to access or use the Service; (ii) any conduct or Content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unlawful access, use or alteration of your transmissions or Content, whether or not based on guarantee, agreement, domestic wrong (including carelessness) or any other lawful concept, whether or not we've been aware of the possibility of such damage, and even if a cure set forth herein is originated to have futile of its important purpose.
          </p>
          `}
          />

          <ParagraphPolicy
            name="spam_policy"
            heading="15. SPAM POLICY "
            description={`
          <p class="py-1">
          You are strictly prohibited from using the Platform or any of our Services for illegal spam activities, including gathering email addresses and personal information from others or sending any mass commercial emails.
          </p>
          `}
          />

          <ParagraphPolicy
            name="third_party_links"
            heading="16. THIRD-PARTY LINKS & CONTENT "
            description={`
          <p class="py-1">
          We may occasionally post links to third-party Apps or other services. You agree that we are not responsible for any loss or damage caused as a result of your use of any third-party services linked to or from Our Platform.
          </p>
          `}
          />

          <ParagraphPolicy
            name="modification_variation"
            heading="17. MODIFICATION & VARIATION"
            description={`
          <p class="py-1">
          We may, from time to time and at any time without notice to you, modify this agreement. You agree that we have the right to modify this agreement or revise anything contained herein. You further agree that all modifications to this agreement are in full force and effect immediately upon posting on the Platform and that modifications or variations will replace any prior version of this agreement unless prior versions are specifically referred to or incorporated into the latest modification or variation of this agreement.
          </p>
          `}
          />

          <ParagraphPolicy
            name="entire_agreement"
            heading="18. ENTIRE AGREEMENT"
            description={`
          <p class="py-1">
         This agreement constitutes the entire understanding between the Parties concerning any use of this Platform. This agreement supersedes and replaces all prior or contemporaneous agreements or understandings, written or oral, regarding the use of this Platform.
          </p>
          `}
          />

          <ParagraphPolicy
            name="service_interruption"
            heading="19. SERVICE INTERRUPTIONS"
            description={`
          <p class="py-1">
        We may need to interrupt your access to the Platform to perform maintenance or emergency services on a scheduled or unscheduled basis. You agree that your access to the App may be affected by unanticipated or unscheduled downtime, for any reason, but that we shall have no liability for any damage or loss caused as a result of such downtime.
          </p>
          `}
          />

          <ParagraphPolicy
            name="term_termination"
            heading="20. TERM, TERMINATION & SUSPENSION"
            description={`
          <p class="py-1">
        We may terminate this agreement with you at any time for any reason, with or without cause. We specifically reserve the right to terminate this agreement if you violate any of the terms outlined herein, including, but not limited to, violating the intellectual property rights of us or a third party, failing to comply with applicable laws or other legal obligations, and/or publishing or distributing illegal material. If you have registered for an account with Us, you may also terminate this agreement at any time by contacting us and requesting termination. At the termination of this agreement, any provisions that would be expected to survive termination by their nature shall remain in full force and effect.
          </p>

          <ul class="py-1 pl-16 list-disc">
<li>We can remove any content or information you share on the Service if we believe that it violates these Terms of Use, our policies</li>
<li>Content will not be deleted within 90 days of the account deletion or content deletion process beginning in the following situations:</li>
<li>Where your Content has been used by others by this license and they have not deleted it (in which case this licenes will continue to apply until that Content is deleted); or</li>
<li>Where deletion within 90 days is not possible due to technical limitations of our systems, in which case, we will complete the deletion as soon as technically feasible; or</li>
<li>Where deletion would restrict our ability to:</li>
<li>Investigate or identify illegal activity or violations of our terms and policies (for example, to identify or investigate misuse of our products or systems);</li>
<li>Protect the safety and security of our products, systems, and users;
</li>
<li>Comply with a legal obligation, such as the preservation of evidence; or</li>
<li>Comply with a request of judicial or administrative authority, law enforcement, or a government agency;
</li>
<li>In which case, the Content will be retained for no longer than is necessary for the purposes for which it has been retained (the exact duration will vary on a case-by-case basis).
</li>
<li>If you delete or disable your account, these Terms shall terminate as an agreement between you and us, but this section and the section below called "our agreement and what happens if we disagree" will still apply even after your account is terminated, disabled, or deleted.</li>

          `}
          />

          <ParagraphPolicy
            name="no_warranties"
            heading="21.  NO WARRANTIES"
            description={`
          <p class="py-1">
You agree that your use of the Platform and Services is at your sole and exclusive risk and that any Services provided by us are on an "As Is" basis. We hereby expressly disclaim any express or implied warranties of any kind, including, but not limited to the implied warranty of fitness for a particular purpose and the implied warranty of merchantability. We make no warranties that the Platform or Services will meet your needs or that the Platform or Services will be uninterrupted, error-free, or secure. We also make no warranties as to the reliability or accuracy of any information on the Platform or obtained through the Services. You agree that any damage that may occur to you, through your computer system, or as a result of the loss of your data from your use of the Platform or Services is your sole responsibility and that we are not liable for any such damage or loss.
          </p>
          `}
          />

          <ParagraphPolicy
            name="limitation_liability"
            heading="22. LIMITATION ON LIABILITY"
            description={`
    <p class="py-1">
We are not liable for any damages that may occur to you as a result of your use of the Platform or Services, to the fullest extent permitted by law. This section applies to any claims by you, including, but not limited to, lost profits or revenues, consequential or punitive damages, negligence, strict liability, fraud, or torts of any kind.
          </p>
          `}
          />

          <ParagraphPolicy
            name="disclaimer"
            heading="23. DISCLAIMER"
            description={`
    <ul class="py-1 pl-16 list-disc">
<li>You are responsible for your own health. Vwanu is not a medical service and is not to be used to seek, and APP not providing, medical treatment or advice. Information made available through the Services and by our partners and affiliates shall solely be used for recreational and educational purposes.
</li>
<li>You use the Service at your own risk. The Service is provided “AS IS”, without any warranties, and Vwanu does not warrant that the Service and availability thereof will be uninterrupted or error-free. PLATFORM does not assume any responsibility for errors or omissions in the information or software or other documents, including User Content, which are referenced by or linked to. References or links to third parties’ websites are provided “AS IS” without warranty of any kind, either express or implied.
</li>
<li>PLATFORM cannot guarantee that the information provided in our database is accurate, reliant, or complete. Vwanu is not responsible for any personal injury or any other damages that may have been the result, direct or indirect, of any use or misuse of the Services.
</li>
<li>Our PLATFORM or Services may be temporarily unavailable from time to time for maintenance or other reasons Vwanu assumes no responsibility for any error, omission, interruption, deletion, defect, delay in operation or transmission, communications line failure, theft or destruction, or unauthorized access to, or alteration of, User communications.</li>
<li>Under no circumstances will Vwanu. be responsible for any loss or damage, including any loss or damage or personal injury or death, resulting from anyone’s use of our PLATFORM or Services, or any interactions between Users or Coach of our PLATFORM or Services, whether online or offline Vwanu reserves the right to change any Content, video and other items used or contained in our PLATFORM or Services, at any time without notice. Reference to any products, services, processes, or other information, by trade name, trademark, manufacturer, supplier or otherwise does not constitute or imply endorsement, sponsorship or recommendation thereof, or any affiliation therewith, by our website, by third parties or by any of the equipment or programming associated with or utilized by our Services.
</li>
<li>In no event shall Vwanu or its affiliates, officers, and/or employees be liable concerning PLATFORM for (i) in the aggregate, any amount above the fees paid by you to subscribe to Vwanu (ii) lost profits, lost data, o failure to meet any duty including without limitation good faith and reasonable care arising out of your access to or use Vwanu; or (iii) any direct, indirect, incidental, punitive, special, exemplary, or consequential damages of any kind whatsoever.
</li>
<li>You agree that this limitation of liability is a reasonable allocation of risk and is a fundamental element of the basis of the bargain between Vwanu and you. You understand that Vwanu would not be provided without such limitations. Some jurisdictions do not allow the limitations in this section, so they may not apply to you.
</li>
<li>Without limiting the foregoing, you understand and agree that you download or otherwise obtain Content and related Content from or through our PLATFORM or services at your own risk and that you will be solely responsible for your use thereof and any damages to your mobile device or computer system, loss of data or other harm of any kind that may result. we, as well as all of our affiliates, are not liable for any indirect, special, incidental, or consequential damages (including damages for loss of business, loss of profits, litigation, or the like), whether based on breach of contract, breach of warranty, tort (including negligence), product liability or otherwise, even if advised of the possibility of such damages. the negation and limitation of damages set forth above are fundamental elements of the basis of the bargain between you and Vwanu.
</li>
<li>Our PLATFORM and services would not be provided without such limitations. no advice or information, whether oral or written, obtained by you from us through our PLATFORM or services shall create any warranty, representation, or guarantee not expressly stated in this agreement.
</li>
<li>If you have any specific questions about any medical matter, you should consult your doctor or another professional healthcare provider.
</li>
<li>If you think you may be suffering from any medical condition you should seek immediate medical attention from a doctor or Physician.
</li>
<li>The Content on this PLATFORM is provided for informational purposes only and is not intended to be a substitute for professional or safety advice. At any time, you have questions regarding a specific situation; you should seek the advice of a professional.
</li>
    </ul>
          `}
          />

          <ParagraphPolicy
            name="general_provisions"
            heading="24.  GENERAL PROVISIONS:"
            description={`
 <ol class="py-1 pl-16 list-decimal">
 <li><span class="font-semibold">JURISDICTION, VENUE & CHOICE OF LAW:</span > The terms herein will be governed by and construed by the laws of the United States without giving effect to any principles of conflicts of law. The Courts of the United States shall have exclusive jurisdiction over any dispute arising from the use of the Platform.</li>
  <li><span class="font-semibold">ASSIGNMENT:</span > This Agreement, or the rights granted hereunder, may not be assigned, sold, leased, or otherwise transferred in whole or part by you. Should this agreement, or the rights granted hereunder, be assigned, sold, leased, or otherwise transferred by us, the rights and liabilities of Vwanu will bind and insure to any assignees, administrators, successors, and executors.</li>
   <li><span class="font-semibold">SEVERABILITY:</span> If any part or sub-part of this agreement is held invalid or unenforceable by a court of law or competent arbitrator, the remaining parts and sub-parts will be enforced to the maximum extent possible. In such a condition, the remainder of this agreement shall continue in full force.</li>
    <li><span class="font-semibold"> SUSPENSION AND TERMINATION</span> We may suspend or terminate your user account or temporarily disable access to the whole or part of any Service in the event of any suspected illegal activity, extended periods of inactivity, or requests by law enforcement or other government agencies. Objections to suspension or disabling of user accounts should be made at Vwanu within thirty days of being notified about the suspension.
</li>
     <li><span class="font-semibold"> NO WAIVER:</span> If we fail to enforce any provision of this agreement, this shall not constitute a waiver of any future enforcement of that provision or any other provision. Waiver of any part or sub-part of this agreement will not constitute a waiver of any other part or sub-part.</li>
      <li><span class="font-semibold"> CONFIDENTIALITY</span> You shall agree and acknowledge that you may have access to certain information and materials, including the terms of the agreement, concerning the business, clients, business writings, employee’s information, business technologies that we use, products and services of the other party, that are business secrets and confidential information. You shall note except with your prior permission, replicate, reproduce, use, share, and disclose to any other third-party any confidential Information or business secrets. You shall return to us or destroy the business secrets or confidential Information promptly upon our written request.
</li>
       <li><span class="font-semibold"> HEADINGS FOR CONVENIENCE ONLY:</span> Headings of parts and sub-parts under this agreement are for convenience and organization, only. Headings shall not affect the meaning of any provisions of this agreement.</li>
        <li><span class="font-semibold"> NO AGENCY, PARTNERSHIP, OR JOINT VENTURE:</span> No agency, partnership, or joint venture has been created between the Parties as a result of this agreement. No Party has any authority to bind the other to third parties.</li>
        <li><span class="font-semibold"> FORCE MAJEURE:</span> We are not liable for any failure to perform due to causes beyond its reasonable control including, but not limited to, acts of God, acts of civil authorities, acts of military authorities, riots, embargoes, acts of nature, and natural disasters, and other acts which may be due to unforeseen circumstances, i.e., COVID-19!</li>
         <li><span class="font-semibold"> ELECTRONIC COMMUNICATIONS PERMITTED:</span> Electronic communications are permitted to both Parties under this agreement, including e-mail. For any questions or concerns, please use the contact us form on the Platform or email us at info@vwanu.com</li>
          <li><span class="font-semibold"> END OF TERMS OF SERVICE</span>
If you have any questions or concerns regarding this agreement, please contact us.
</li>
 </ol>
          `}
          />

          <div className="pt-10">
            <p className="font-semibold">Vwanu</p>
            <p>United States</p>
            <p>info@vwanu.com</p>
          </div>

          <p className="font-semibold italic">This Document is last updated on August 20, 2021</p>
        </div>
      </div>
    </div>
  );
};

TermsConditions.propTypes = {};

export default TermsConditions;
