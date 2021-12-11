<?php
if (isset($_POST['submit'])){
    $name = $_POST['name'];
    $emailFrom = $_POST['email'];
    $message = $_POST['message'];

    $mailTo = "jhonfrancisduarte12345@gmail.com";
    $headers = "From: " . $emailFrom;
    $txt = "You have an email from ". $name . ".\n\n" . $message;
    mail($mailTo, $txt, $headers);
    header("Location: contact.html?mailsent");
}
?>
