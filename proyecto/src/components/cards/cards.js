import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './cards.css';

function Cards() {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <Card
                style={{ maxWidth: "500px", transform: isHovered ? 'scale(1.02)' : 'scale(1)', transition: 'transform 0.3 ease' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Card.Img variant="top" src="https://www.guatemala.com/fotos/2021/01/Nuevas-promociones-2x1-de-Trefratelli-en-la-app-de-Cupones-Guatemala.com-1-885x500.jpg" />
                <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                        <h2>Tre Fratelli</h2>
                    </Card.Title>
                </Card.Body>
            </Card>
        </>
    );
}

export default Cards;