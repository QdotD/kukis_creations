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

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // justifyContent: 'center',
            marginTop: "5vh",
            marginBottom: "15vh",
            // minHeight: '100vh',
            // backgroundColor: '#F5F5F5',
            fontFamily: 'Arial, sans-serif',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '500px',
            padding: '20px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
        },
        textarea: {
            width: '100%',
            minHeight: '100px',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
        },
        button: {
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#FFE6C1',
            color: '#FFF',
            cursor: 'pointer',
        }
    };

    return (
        <div style={styles.container}>
            <form
                action="https://getform.io/f/a7b02e0b-baeb-4138-978d-e5f270600052"
                method="POST"
                encType="multipart/form-data"
                style={styles.form}
            >
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    style={styles.input}
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description of request"
                    required
                    style={styles.textarea}
                />
                <input
                    type="file"
                    name="attachment"
                    onChange={handleAttachment}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );
};

export default CommissionsPage;
