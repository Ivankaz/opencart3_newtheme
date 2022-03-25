<?php
require_once(__DIR__ . '/../../../config.php');
require_once(DIR_SYSTEM . 'startup.php');

$application_config = 'catalog';

// Registry
$registry = new Registry();

// Config
$config = new Config();
$config->load('default');
$config->load($application_config);
$registry->set('config', $config);

// Log
$log = new Log($config->get('error_filename'));
$registry->set('log', $log);

date_default_timezone_set($config->get('date_timezone'));

// Loader
$loader = new Loader($registry);
$registry->set('load', $loader);

// Response
$response = new Response();
$response->addHeader('Content-Type: text/html; charset=utf-8');
$response->setCompression($config->get('config_compression'));
$registry->set('response', $response);

// Database
$db = new DB(
    $config->get('db_engine'),
    $config->get('db_hostname'),
    $config->get('db_username'),
    $config->get('db_password'),
    $config->get('db_database'),
    $config->get('db_port')
    );
$registry->set('db', $db);

// Language
$language = new Language($config->get('language_directory'));
$registry->set('language', $language);

// Config Autoload
if ($config->has('config_autoload')) {
	foreach ($config->get('config_autoload') as $value) {
		$loader->config($value);
	}
}

// Settings
$query = $db->query("SELECT * FROM " . DB_PREFIX . "setting WHERE store_id = '0' OR store_id = '" . (int)$config->get('config_store_id') . "' ORDER BY store_id ASC");

foreach ($query->rows as $setting) {
	if (!$setting['serialized']) {
		$config->set($setting['key'], $setting['value']);
	} else {
		$config->set($setting['key'], json_decode($setting['value']));
	}
}

// стандартные настройки магазина
$config->set('config_customer_group_id', 1);
$config->set('config_language_id', 1);
$config->set('config_store_id', 0);
