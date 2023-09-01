import React, { useState } from 'react';

export default function ReadMore() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div className='read-more-toggle' onClick={toggleContent}>
                {isExpanded ? 'Close' : 'Read More...'}
            </div>
            {isExpanded ? (
                <div className='read-more'>
                    FEATURES:
                    <br />
                    🔸 Gamer's Delight: These earrings encapsulate all four abilities of your favorite agent. Each earring features two abilities painted on opposite sides.
                    <br />
                    🔸 Elegant & Comfortable Design: The hoops are 25mm diameter and measure around 45mm in total length with hooks, making them both lightweight and comfortable to wear while also being eye-catching.
                    <br />
                    🔸 Hand-Painted Resin: The hand-painted resin brings out the vibrant colors and intricate details of each ability.
                    <br />
                    <br />
                    MATERIALS:
                    <br />
                    🔸 18K Gold-Plated Brass (LEAD AND NICKEL FREE): The gold-plated brass earrings minimize the risk of allergic reactions, while also adding a touch of luxury.
                    <br />
                    🔸 Resin Paintings: The abilities are hand painted transparent resin, ensuring they remain protected and vivid for years to come.
                    <br />
                    <br />
                    CARE INSTRUCTIONS:
                    <br />
                    🔸 Keep It Dry: Avoid wearing your jewelry when swimming, showering, or exercising to prevent damage to the gold plating and resin.
                    <br />
                    🔸 Avoid Chemicals: Remove your jewelry before applying lotions, perfumes, or cosmetics. Also, keep it away from chlorine and harsh chemicals.
                    <br />
                    🔸 Store Safely: Store your jewelry in a cool, dry place, away from direct sunlight and heat. Use a soft pouch or compartmentalized box and avoid storing with other jewelry to prevent scratching.
                    <br />
                    🔸 Gentle Cleaning: After wearing, gently wipe your jewelry with a soft, lint-free cloth to remove dirt and oils. For deeper cleaning, use lukewarm water and mild soap.
                    <br />
                    🔸 Sunlight Protection: UV rays can affect the resin. Store your jewelry out of direct sunlight to prevent yellowing and degradation.
                    <br />
                    Remember, these are not just earrings, they are wearable pieces of art that need proper care to ensure they stay radiant and beautiful for years to come.
                    <br />
                    <br />
                    GIFTING AND SHIPPING:
                    <br />
                    🔸 Gift-Ready Packaging: The earrings will arrive in a jewelry box, making them an ideal gift for fellow gamers or a treat for yourself!
                    <br />
                    🔸 Prompt Shipping: While we're excited to get these special earrings to you quickly, they are made to order and crafted meticulously to ensure quality. Your order will be ready within 3-5 business days and shipped with care.
                    <br />
                    <br />
                    Follow Instagram @KukisCreationsDotCom to stay updated on recent projects and pieces</div>
            ) : null}
        </>
    );
}