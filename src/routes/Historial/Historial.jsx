import React, { useState, useEffect, useRef } from "react";
import "./Historial.css";
import consulta from "../../utils/consulta"; // tu helper para Axios o fetch

export default function Historial() {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedEmail, setSelectedEmail] = useState(null);
	const [emails, setEmails] = useState([]);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [showMobileDetail, setShowMobileDetail] = useState(false);
	const [page, setPage] = useState(1);
	const limit = 10;
	const [hasMore, setHasMore] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);

	console.log("Emails -->", emails)
	console.log("setHasMore -->", hasMore)
	console.log("isRefreshing -->", isRefreshing)
	console.log("showMobileDetail -->", showMobileDetail)
	console.log("isMobile -->", isMobile)

	const scrollRef = useRef(null);

	const buscarEmails = async (append = false) => {
		try {
			setIsLoading(true);
			const urlEmails = `/email/api?page=${page}&limit=${limit}`;
			const response = await consulta.get(urlEmails);
			const nuevos = response.data || [];
			if (nuevos.length < limit) setHasMore(false);
			else setHasMore(true);

			setEmails(prev => append ? [...prev, ...nuevos] : nuevos);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	// Scroll infinito
	const handleScroll = () => {
		const el = scrollRef.current;
		if (!el || isLoading || !hasMore) return;

		const bottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
		if (bottom) {
			setPage(prev => prev + 1);
		}
	};

	// Inicial
	useEffect(() => {
		buscarEmails();
	}, []);

	// Cuando cambia la página
	useEffect(() => {
		if (page > 1) {
			buscarEmails(true);
		}
	}, [page]);

	// Resize listener
	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth <= 768;
			setIsMobile(mobile);
			if (!mobile) setShowMobileDetail(false);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Refresco automático cada 30 segundos
	useEffect(() => {
		const intervalo = setInterval(async () => {
			setIsRefreshing(true);
			setPage(1);
			await buscarEmails(false);
			setIsRefreshing(false);
		}, 20 * 60 * 1000); // 20 minutos en milisegundos

		return () => clearInterval(intervalo);
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
				<div
					className={`email-list ${isRefreshing ? "refreshing" : ""}`}
					ref={scrollRef}
					onScroll={handleScroll}
				>
					{emails.length === 0 && !isLoading ? (
						<div className="empty-list">
							No hay correos para mostrar
						</div>
					) : (
						emails.map((correo) =>
							correo.email.map((email, index) => (
								<div
									key={`${correo.id}-${index}`}
									className={`email-item ${selectedEmail?.id === `${correo.id}-${index}`
										? "selected"
										: ""
										}`}
									onClick={() =>
										handleEmailClick({
											id: `${correo.id}-${index}`,
											sender: correo.direccion,
											subject: email.asunto || "Sin asunto",
											message: email.mail || "",
											time: new Date(correo.createdAt).toLocaleString(),
											tipo: email.plantilla || "general",
										})
									}
								>
									<div className="email-avatar">
										{(correo.email[0]?.plantilla || "G")[0].toUpperCase()}
									</div>
									<div className="email-content">
										<div className="email-sender">{correo.direccion}</div>
										<div className="email-subject">
											{correo.email[0]?.asunto || "Sin asunto"}
										</div>
										<div className="email-preview">
											{correo.email[0]?.mail || ""}
										</div>
										<div className="email-time">
											{new Date(correo.createdAt).toLocaleString()}
										</div>
									</div>
								</div>
							))
						)
					)}
					{isLoading && <div className="loading">Cargando...</div>}
					{!hasMore && !isLoading && (
						<div className="end-message">No hay más correos</div>
					)}
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
							<h2>Asunto: {selectedEmail.subject}</h2>
							<h4>Para: {selectedEmail.sender}</h4>
							<div dangerouslySetInnerHTML={{ __html: selectedEmail.message }} />
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

			{/* Botón cargar más */}
			{!isLoading && hasMore && (
				<button onClick={() => setPage((prev) => prev + 1)} className="load-more">
					Cargar más
				</button>
			)}
		</main>
	);

}