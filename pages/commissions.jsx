import React, { useState } from "react";

const CommissionsPage = () => {
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
        <div className="commissions-container">
            <div className="commissions-intro">
                <h3> Hello and welcome to Kuki's Creations Commissions! </h3>
                <br />
                <p> Whether you have a specific idea in mind or you're looking for a one-of-a-kind piece of art, you're
                    in the right place.  commission process is designed to make your creative dreams a reality.
                    <br /><br />
                    Please fill out the form below with as much detail as possible, and we'll get back to you promptly to discuss
                    your project further. Your input is essential in helping us understand your vision, so don't hesitate to provide
                    any references, preferences, or specific requirements you may have.
                    <br /><br />
                    Thank you for considering Kuki's Creations for your custom art needs. We look forward to collaborating with you
                    and turning your imagination into a masterpiece!
                </p>
            </div>

            <form
                action="https://getform.io/f/a7b02e0b-baeb-4138-978d-e5f270600052"
                method="POST"
                encType="multipart/form-data"
                className="commissions-form"
            >
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="commissions-input"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="commissions-input"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description of request"
                    required
                    className="commissions-textarea"
                />
                <input
                    type="file"
                    name="attachment"
                    onChange={handleAttachment}
                    className="commissions-input"
                />
                <button type="submit" className="commissions-button">Submit</button>
            </form>
        </div>
    );
};

export default CommissionsPage;