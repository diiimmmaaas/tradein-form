<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    $mail = new PHPMailer(true);
    $mail -> CharSet = 'UTF-8';
    $mail -> setLanguage('ru', 'phpmailer/language/');
    $mail -> IsHTML(true);

    $name = $_POST['name'];
	$phone = $_POST['phone'];
    $email = $_POST['email'];

	$to = "dm.sokolov1994@gmail.com";
	$date = date ("d.m.Y");
	$time = date ("h:i");
	$from = $email;
	$subject = "Заявка на Trade-In";

	$msg="
    Имя: $name /n
    Телефон: $phone /n
    Почта: $email /n
	mail($to, $subject, $msg, "From: $from ");
?>

<p>Привет, форма отправлена</p>
