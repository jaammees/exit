<?php

function cmpkeys($a, $b) {
  return strlen($b) - strlen($a);
}


function replaceConstants($content, $constantsFile = "js/constants.js") {
  if(!file_exists($constantsFile)) {
    print "constants file doesn't exist!!! $constantsFile";
    exit();
  }
  $constants = [];
  $constantsContent = file_get_contents($constantsFile);
  $lines = explode("\n", $constantsContent);
  foreach($lines as $line) {
    $originalLine = $line;
    $line = trim($line);
    if($line) {
      $line = trim($line, ";");
      $line = str_replace("var ", "", $line);
      $parts = explode("=", $line);
      if(count($parts)  != 2) {
        print "parts = " . count($parts) . "\n";
        print $line . "\n";
        exit();
      } else {
//        print $line . "\n";
        $name = trim($parts[0]);
        if(array_key_exists($name, $constants)) {
          print "already exists $name";
          exit();
        } else {  
          $constants[$name] = trim($parts[1]);
        }
        $content = str_replace($originalLine, "", $content);
      }
    }
  }

  uksort($constants, "cmpkeys");

//  print_r($constants);
  foreach($constants as $name => $value) {
    $content = str_replace($name, $value, $content);
  }

  return $content;
}


$index = file_get_contents("index.html");

$searchString = 'src="js/';
$pos = strpos($index, $searchString);

$source = "";

while($pos !== false) {
  $pos += strlen($searchString);

  $endPos = strpos($index, '"', $pos);
  $pos -= 3;
  $filepath = substr($index, $pos, $endPos - $pos);
  $include = true;

  if($include) {

    if(file_exists($filepath)) {
      $source .= file_get_contents($filepath) . "\n\n";

    } else {
      print "FILE NOT FOUND $filepath";
      exit();
    }
  }
  $pos = strpos($index, $searchString, $pos);
}

$source = replaceConstants($source);

$fp = fopen("build/js/main.js", "w");
fwrite($fp, $source);
fclose($fp);

$cmd = "uglifyjs build/js/main.js --mangle --output build/js/main.min.js";

exec($cmd);
unlink("build/js/main.js");