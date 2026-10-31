<?php
/**
 * CAPACITY CONNECT — Authentication & Security Middleware
 * Session governance, CSRF tokens, role-based authorization
 */

declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_httponly' => true,
        'cookie_samesite' => 'Lax',
        'use_strict_mode' => true,
    ]);
}

/**
 * Generate cryptographically secure CSRF token
 */
function getCsrfToken(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF token from POST body
 */
function verifyCsrfToken(?string $token): bool {
    if (empty($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Get active authenticated user
 */
function getAuthUser(): ?array {
    return $_SESSION['user'] ?? null;
}

/**
 * Role-Based Access Control (RBAC) Guard
 */
function requireRole(array|string $allowedRoles): void {
    $user = getAuthUser();
    if (!$user) {
        header('Location: /login.php?error=unauthorized');
        exit;
    }

    $roles = is_array($allowedRoles) ? $allowedRoles : [$allowedRoles];
    if (!in_array($user['role'], $roles, true)) {
        http_response_code(403);
        die("403 Forbidden: Your role ({$user['role']}) does not possess authorization for this resource.");
    }
}
