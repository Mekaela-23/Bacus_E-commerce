import React from "react";
import ImageCard from "../../../../components/ui/card";

export default function CardList() {
    return (
        <div style={containerStyle}>
            <ImageCard
            image="https://t3.ftcdn.net/jpg/01/18/09/04/240_F_118090481_nhnEzJixwzuAVk5f0ynZ9p3pAswOxTWb.jpg"
            title="Mountain View"
            description="A beautiful mountain landscape."
            />

            <ImageCard
            image="https://t3.ftcdn.net/jpg/01/18/09/04/240_F_118090481_nhnEzJixwzuAVk5f0ynZ9p3pAswOxTWb.jpg"
            title="Ocean Breeze"
            description="Relaxing ocean scenery."
            />

            <ImageCard
            image="https://t3.ftcdn.net/jpg/01/18/09/04/240_F_118090481_nhnEzJixwzuAVk5f0ynZ9p3pAswOxTWb.jpg"
            title="City Lights"
            description="Nigth view of the city skyline."
            />
        </div>
    );
}


const containerStyle = {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "40px",
}