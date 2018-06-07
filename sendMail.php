
<?php

$to      = 'hello@annabellegoldsworthy.com'; //one.com email, or domain email

$name = $_POST['name'];
$email = $_POST['email'];
$sub = $_POST['subject'];
$body = $_POST['message'];


$subject = 'New Enquiry';

$message = "New enquiry from " . $name . " (". $email ."): " . $body; //input subject
$headers = 'From: hello@annabellegoldsworthy.com' . "\r\n" .
    'Reply-To: hello@annabellegoldsworthy.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

if(mail($to, $subject, $message, $headers)){
    header("Location: index.html");
    //echo "mail sent";
} else {
    echo "Failure to send";
}

?>

<!-- https://stackoverflow.com/questions/5335273/how-to-send-an-email-using-php -->
