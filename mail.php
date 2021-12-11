<?php
$name = $_POST['name'];
$email= $_POST['email'];
$message= $_POST['message'];
$to = "jhonfrancisduarte12345@gmail.com";
$subject = "Mail from my website";
$txt ="Name = ". $name . "\r\n  Email = " . $email . "\r\n Message =" . $message;
$headers = "From: noreply@yoursite.com" . "\r\n" . "CC: " . $email;
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
//header("Location:thankyou.html");
echo '<script>alert("Thank you for contacting me!")</script>';
?>
