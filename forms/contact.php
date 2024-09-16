<?php
$receiving_email_address = 'edupardob@gmail.com';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = strip_tags(trim($_POST["message"]));

    if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please fill out all fields and enter a valid email address.";
        exit;
    }

    $content = "Name: $name\n";
    $content .= "Email: $email\n\n";
    $content .= "Subject: $subject\n\n";
    $content .= "Message:\n$message\n";

    $headers = "From: $name <$email>";

    if (mail($receiving_email_address, $subject, $content, $headers)) {
        http_response_code(200);
        echo "Your message has been sent. Thank you!";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }

} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>