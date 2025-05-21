package com.example.config;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class SignalingHandler extends TextWebSocketHandler {
    // Map<roomCode, Map<sessionId, WebSocketSession>>
    private final Map<String, Map<String, WebSocketSession>> rooms = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // No-op: wait for join message
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Expect JSON: { "type": "join", "room": "ROOMCODE" } or signaling { "type": "signal", ... }
        String payload = message.getPayload();
        if (payload.contains("\"type\":\"join\"")) {
            String room = extractValue(payload, "room");
            rooms.putIfAbsent(room, new ConcurrentHashMap<>());
            rooms.get(room).put(session.getId(), session);
            // Optionally notify others
        } else if (payload.contains("\"type\":\"signal\"")) {
            String room = extractValue(payload, "room");
            String target = extractValue(payload, "target");
            Map<String, WebSocketSession> roomSessions = rooms.get(room);
            if (roomSessions != null && roomSessions.containsKey(target)) {
                roomSessions.get(target).sendMessage(message);
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // Remove from all rooms
        for (Map<String, WebSocketSession> room : rooms.values()) {
            room.remove(session.getId());
        }
    }

    private String extractValue(String json, String key) {
        // Simple JSON value extractor (not robust, for demo only)
        String pattern = "\"" + key + "\":\"";
        int idx = json.indexOf(pattern);
        if (idx == -1) return null;
        int start = idx + pattern.length();
        int end = json.indexOf('\"', start);
        return json.substring(start, end);
    }
}