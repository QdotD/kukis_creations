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