import React, { useState } from "react";
import HubspotForm from 'react-hubspot-form';

const contactPage = () => {
    const initialState = {
        name: "",
        email: "",
        description: "",
        attachment: null,
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAttachment = (e) => {
        setFormData((prev) => ({ ...prev, attachment: e.target.files[0] }));
    };

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
        </div>
    );
};

export default contactPage;