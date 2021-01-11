<!DOCTYPE html>
<html>
<head>
    <title>CONWAVE.com</title>
    <style>
    #h2 {
        font-family: Arial, Helvetica, sans-serif;
        color: pink;
        align-self: center;
    }
    
    </style>
</head>
<body>
    <h2 id="h2">Booking Successful</h2>
    <h3>Congratulation on booking a session with CONWAVE!<br> Here are the details for your session</h3>
    <p>Subject: {{ $data['course_name'] }} <br> 
    Tutor's name: {{ $data['tutor_firstname'] }} {{ $data['tutor_lastname']}} <br> 
    Student's name: {{ $data['student_firstname'] }} {{ $data['student_lastname']}} <br> 
    Date: {{ $data['day'] }}, {{ $data['date'] }} <br>
    Time: {{ $data['hour'] }}
    </p>
    <!-- <p>Tutor's name: {{ $data['tutor_firstname'] }} {{ $data['tutor_lastname']}}</p>
    <p>Student's name: {{ $data['student_firstname'] }} {{ $data['student_lastname']}}</p>
    <p>Date: {{ $data['day'] }}, {{ $data['date'] }}</p>
    <p>Time: {{ $data['hour'] }}</p> -->
    <br>
    <p>Thank you</p>
    <h4>CONWAVE team</h4>
</body>
</html>