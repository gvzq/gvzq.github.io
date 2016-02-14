<?php

// Get values from form
$name=$_POST['name'];
$email=$_POST['email'];
$subject=$_POST['subject'];
$email=$_POST['email'];
$message=$_POST['message'];


$to = "g@cs.tamu.edu";
$subject = Contact Form";
$message = " Name: " . $name . "\r\n Subject: " . $subject . "\r\n Message: " . $message . "\r\n Email: " . $email;


$from = "people.tamu.edu";
$headers = "From:" . $name . "\r\n";
$headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n"; 

if(@mail($to,$subject,$message,$headers))
{
  print "<script>document.location.href='http://people.tamu.edu/~gvzq/success.html';</script>";
  // Created by Future Tutorials
}else{
  echo "Error! Please try again.";
}



?>
