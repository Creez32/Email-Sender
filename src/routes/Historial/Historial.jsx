import React, { useState, useEffect } from "react";
import "./Historial.css";

const dummyEmails = [
	{
		id: 1,
		sender: "juan@example.com",
		subject: "Reunión mañana",
		message: "Hola, ¿confirmamos la reunión de mañana a las 10?",
		time: "10:45",
		tipo: "reunion",
	},
	{
		id: 2,
		sender: "soporte@empresa.com",
		subject: "Actualización de sistema",
		message: "Se ha actualizado el sistema correctamente.",
		time: "09:15",
		tipo: "soporte",
	},
	{
		id: 3,
		sender: "maria@example.com",
		subject: "Invitación al evento",
		message: "Te espero en el evento de esta tarde.",
		time: "Ayer",
		tipo: "invitacion",
	},
];

export default function Historial() {
	const [selectedEmail, setSelectedEmail] = useState(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [showMobileDetail, setShowMobileDetail] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth <= 768;
			setIsMobile(mobile);
			if (!mobile) setShowMobileDetail(false); // reset en desktop
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleEmailClick = (email) => {
		setSelectedEmail(email);
		if (isMobile) setShowMobileDetail(true);
	};

	const handleBack = () => {
		setShowMobileDetail(false);
		setSelectedEmail(null);
	};

	return (
		<main className="historial-container">
			{/* LISTA DE EMAILS */}
			{!isMobile || !showMobileDetail ? (
				<div className="email-list">
					{dummyEmails.map((email) => (
						<div
							key={email.id}
							className={`email-item ${selectedEmail?.id === email.id ? "selected" : ""
								}`}
							onClick={() => handleEmailClick(email)}
						>
							{/* NUEVO BLOQUE: avatar tipo plantilla */}
							<div className={`email-avatar ${email.tipo}`}>
								{email.tipo[0].toUpperCase()}
							</div>

							{/* ENVOLVÍ lo anterior en un nuevo div para mejor maquetado */}
							<div className="email-content">
								<div className="email-sender">{email.sender}</div>
								<div className="email-subject">{email.subject}</div>
								<div className="email-preview">{email.message}</div>
								<div className="email-time">{email.time}</div>
							</div>
						</div>
					))}
				</div>
			) : null}

			{/* PANEL DE PREVISUALIZACIÓN */}
			{!isMobile || showMobileDetail ? (
				<div
					className={`email-preview-panel ${isMobile && showMobileDetail ? "show" : ""
						}`}
				>
					{selectedEmail ? (
						<>
							<h2>{selectedEmail.subject}</h2>
							<h4>De: {selectedEmail.sender}</h4>
							<p>{selectedEmail.message}</p>

							{isMobile && (
								<button className="back-button" onClick={handleBack}>
									VOLVER
								</button>
							)}
						</>
					) : (
						<div className="empty-preview">
							Seleccioná un mail para leerlo
						</div>
					)}
				</div>
			) : null}
		</main>
	);
}
