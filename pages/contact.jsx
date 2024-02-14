import React from "react";
import HubspotForm from 'react-hubspot-form';

const ContactPage = () => {

    return (
        <div className="contact-container">
            <HubspotForm
                region='na1'
                portalId='45258227'
                formId='d664392b-fb1d-4462-9f8f-b3799f3a8803'
                onSubmit={() => console.log('Submit!')}
                onReady={(form) => console.log('Form ready!')}
                loading={<div>Loading...</div>}
            />
            <br />
            <HubspotForm
                region='na1'
                portalId='45258227'
                formId='2afc4515-fd30-4683-ba03-8d3908bfbfe8'
                onSubmit={() => console.log('Submit!')}
                onReady={(form) => console.log('Form ready!')}
                loading={<div>Loading...</div>}
            />
        </div>
    );
};

export default ContactPage;