<?php /* http://php.net/manual/de/function.http-response-code.php */ $code = (int) $_SERVER['QUERY_STRING']; http_response_code($code); ?>
