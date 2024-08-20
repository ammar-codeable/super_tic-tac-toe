import { useEffect, useState } from "react";

export function useSocket(
	handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void,
) {
	const [socket, setSocket] = useState<WebSocket | null>(null);
	useEffect(() => {
		const socket = new WebSocket("ws://localhost:8080");

		socket.onopen = () => {
			console.log("Connection Established with server");
			setSocket(socket);
		};

		socket.onmessage = (message) => {
			const { boardId, cellId } = JSON.parse(message.data);
			console.log(boardId, cellId);

			handlePlay(boardId, cellId, false);
		};

		return () => {
			socket.close();
		};
	}, []);

	return socket;
}
