<?php
/**
 * CAPACITY CONNECT — Database Configuration & PDO Connector
 * College Project: PBL-I Digital Capacity Building & LMS Portal
 */

declare(strict_types=1);

class Database {
    private static ?PDO $instance = null;

    private const DB_HOST = 'localhost';
    private const DB_NAME = 'capacity_connect';
    private const DB_USER = 'root';
    private const DB_PASS = '';
    private const DB_CHARSET = 'utf8mb4';

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $dsn = sprintf(
                "mysql:host=%s;dbname=%s;charset=%s",
                self::DB_HOST,
                self::DB_NAME,
                self::DB_CHARSET
            );

            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false, // Native prepared statements
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            ];

            try {
                self::$instance = new PDO($dsn, self::DB_USER, self::DB_PASS, $options);
            } catch (PDOException $e) {
                // Log exception in production; do not leak raw credentials
                error_log("Database Connection Error: " . $e->getMessage());
                die(json_encode([
                    'error' => true,
                    'message' => 'Unable to connect to the database. Ensure MySQL is running in XAMPP and capacity_connect is imported.'
                ]));
            }
        }

        return self::$instance;
    }
}
