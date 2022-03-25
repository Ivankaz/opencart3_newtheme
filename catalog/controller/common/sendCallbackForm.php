<?php
// загружаю классы OpenCart
require_once(__DIR__ . '/sendCallbackFormLoader.php');

class ControllerCallbackForm extends Controller {
    // получить значение из массива $_GET
    public function getValue($value = '') {
        return htmlspecialchars(filter_input(INPUT_POST, $value));
    }

    // отправить сообщение о новом заказе обратного звонка
    public function send() {
        $result = false;

        // получаю данные клиента
        $name = $this->getValue('name');
        $phone = $this->getValue('phone');

        if (($name == null) || ($phone == null)) {
            return false;
        }

        $phoneNumber = filter_var($phone, FILTER_SANITIZE_NUMBER_INT);
        $comment = $this->getValue('comment');

        $subject = "Новый заказ обратного звонка ($name)";
        $text = "<b>Имя клиента:</b> $name<br/>
<b>Телефон:</b> <a href=\"tel:$phoneNumber\">$phone</a><br/>
<b>Комментарий:</b> $comment<br/>
";

        // устанавливаю настройки SMTP-подключения
        $mail = new Mail($this->config->get('config_mail_engine'));
        $mail->parameter = $this->config->get('config_mail_parameter');
        $mail->smtp_hostname = $this->config->get('config_mail_smtp_hostname');
        $mail->smtp_username = $this->config->get('config_mail_smtp_username');
        $mail->smtp_password = html_entity_decode($this->config->get('config_mail_smtp_password'), ENT_QUOTES, 'UTF-8');
        $mail->smtp_port = $this->config->get('config_mail_smtp_port');
        $mail->smtp_timeout = $this->config->get('config_mail_smtp_timeout');

        // отправляю уведомление о заказе обратного звонка на почту админу
        $mail->setTo($this->config->get('config_email'));
        $mail->setFrom($this->config->get('config_mail_smtp_username'));
        $mail->setSender(html_entity_decode($this->config->get('config_name'), ENT_QUOTES, 'UTF-8'));
        $mail->setSubject(html_entity_decode($subject, ENT_QUOTES, 'UTF-8'));
        $mail->setHtml($text);
        $result = $mail->send() === null ? true : false;

        // отправляю сообщение на дополнительные почтовые ящики, если они указаны
        $emails = explode(',', $this->config->get('config_mail_alert_email'));

        foreach ($emails as $email) {
            if (utf8_strlen($email) > 0 && filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $mail->setTo($email);
                $mail->send();
            }
        }

        return $result;
    }
}

$callbackForm = new ControllerCallbackForm($registry);
$result = $callbackForm->send();
exit(json_encode(['result' => $result]));

