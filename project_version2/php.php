<?php



//make connectoin with database 

$con =new mysqli("localhost", "root", "rootroot", "my_db");
if($con->connect_error){
 die("Connection failed".$con->connect_error);
}
//else echo "success";

// load
if(isset($_POST['load'])){
	$arr=json_decode($_POST['load'],true);
	//echo json_encode($arr);
	//echo count($arr);
	if(count($arr)>0){
	for($i=0;$i<count($arr);$i++){
		$name_event=$arr[$i]["name"];
		$type_event=$arr[$i]["type"];
		$target=$arr[$i]["target"];
		$date_time=$arr[$i]["date"];
		$sql="Insert Into events Values('$name_event','$type_event','$target','$date_time')";
		$con->query($sql);
	}
		if($con->affected_rows > 0){
    echo "Inserted Successfully";
  }
  else{
    echo "Sorry: Problem With Insertion";	
  } 
	}
}
 // unload
 if(isset($_POST['unload'])){
	$arr=json_decode($_POST['unload'],true);
	//echo json_encode($arr);
	//echo count($arr);
	if(count($arr)>0){
	for($i=0;$i<count($arr);$i++){
		$name_event=$arr[$i]["name"];
		$type_event=$arr[$i]["type"];
		$target=$arr[$i]["target"];
		$date_time=$arr[$i]["date"];
		$sql="Insert Into events Values('$name_event','$type_event','$target','$date_time')";
		$con->query($sql);
	}
		if($con->affected_rows > 0){
    echo "Inserted Successfully";
  }
  else{
    echo "Sorry: Problem With Insertion";	
	} 
	}
}
//generate
if(isset($_POST['generate'])){
	$arr=json_decode($_POST['generate'],true);
	//echo json_encode($arr);
	//echo count($arr);
	if(count($arr)>0){
	for($i=0;$i<count($arr);$i++){
		$name_event=$arr[$i]["name"];
		$type_event=$arr[$i]["type"];
		$target=$arr[$i]["target"];
		$date_time=$arr[$i]["date"];
		$sql="Insert Into events Values('$name_event','$type_event','$target','$date_time')";
		$con->query($sql);
	}
		if($con->affected_rows > 0){
    echo "Inserted Successfully";
  }
  else{
    echo "Sorry: Problem With Insertion";	
  } 
	}
}

//letter_buttons
if(isset($_POST['letter_buttons'])){
	$arr=json_decode($_POST['letter_buttons'],true);
	//echo json_encode($arr);
	//echo count($arr);
	if(count($arr)>0){
	for($i=0;$i<count($arr);$i++){
		$name_event=$arr[$i]["name"];
		$type_event=$arr[$i]["type"];
		$target=$arr[$i]["target"];
		$date_time=$arr[$i]["date"];
		$sql="Insert Into events Values('$name_event','$type_event','$target','$date_time')";
		$con->query($sql);
	}
		if($con->affected_rows > 0){
    echo "Inserted Successfully";
  }
  else{
    echo "Sorry: Problem With Insertion";	
  } 
	}
}

if(isset($_GET['events'])){
	
    $sql = "Select * from events order By Date_Time";
	      
      if ($result = $con->query($sql)){
           $rows = array();
             if($result->num_rows > 0){
                 while($row = $result->fetch_assoc()){
                     array_push($rows, $row);
                 }
                  echo json_encode($rows,true);
             }
      }else																																																																																																																																																																																																																																																																																																																																																																																																																																																																																
   echo "No Data to Retrieve";
    }
   

?>