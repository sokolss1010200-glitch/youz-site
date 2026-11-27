<?php
// Приём заявок с сайта ЮZ: пишет в журнал и отправляет в Telegram и MAX.
// Токены лежат в ../lead-config.php (вне папки сайта, в git их нет):
//   <?php return ['tg_token'=>'...', 'tg_chat'=>'-100...', 'tg_thread'=>7932, 'max_token'=>'...', 'max_chat'=>'...'];
// Файл создаёт GitHub Actions («Заливка на хостинг») из секретов TG_TOKEN / MAX_TOKEN / MAX_CHAT.
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }

$raw = file_get_contents('php://input', false, null, 0, 20000);
$d = json_decode($raw, true);
if (!is_array($d)) $d = $_POST;
$cut = function ($s, $n) { return mb_substr(trim(strip_tags((string)$s)), 0, $n); };
$name = $cut($d['name'] ?? '', 100);
$phone = $cut($d['phone'] ?? '', 40);
$comment = $cut($d['comment'] ?? '', 3000);
$page = $cut($d['page'] ?? ($_SERVER['HTTP_REFERER'] ?? ''), 300);
if (!empty($d['website'])) { echo '{"ok":true}'; exit; }            // ловушка для ботов
if (strlen(preg_replace('/\D/', '', $phone)) < 10) { http_response_code(400); echo '{"ok":false,"why":"phone"}'; exit; }

// не больше 10 заявок в час с одного адреса
$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$dir = dirname(__DIR__) . '/lead-data';
@mkdir($dir, 0700, true);
$rl = $dir . '/rl-' . md5($ip) . '.txt';
$times = array_filter(array_map('intval', @file($rl) ?: []), function ($t) { return $t > time() - 3600; });
if (count($times) >= 10) { http_response_code(429); echo '{"ok":false,"why":"rate"}'; exit; }
$times[] = time();
file_put_contents($rl, implode("\n", $times));

date_default_timezone_set('Europe/Moscow');
$text = "Заявка с сайта youz.store\n"
      . "Имя: " . ($name ?: '—') . "\n"
      . "Телефон: $phone\n"
      . ($comment ? "Комментарий: $comment\n" : '')
      . ($page ? "Страница: $page\n" : '')
      . "Время: " . date('d.m.Y H:i');

// журнал — заявка не потеряется, даже если мессенджеры недоступны
file_put_contents($dir . '/leads-' . date('Y-m') . '.log', $text . "\n----\n", FILE_APPEND | LOCK_EX);

$cfgFile = dirname(__DIR__) . '/lead-config.php';
$cfg = is_file($cfgFile) ? include $cfgFile : [];
$sent = 0;

$diag = ['cfg' => is_file($cfgFile), 'tg' => null, 'max' => null];
function post_json($url, $body, $headers = [], &$info = null) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($body, JSON_UNESCAPED_UNICODE),
        CURLOPT_HTTPHEADER => array_merge(['Content-Type: application/json'], $headers),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 8,
    ]);
    $r = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    $j = json_decode((string)$r, true);
    $info = ['code' => $code, 'err' => $err, 'desc' => is_array($j) ? ($j['description'] ?? '') : ''];
    return $code >= 200 && $code < 300;
}

if (!empty($cfg['tg_token']) && !empty($cfg['tg_chat'])) {
    foreach ((array)$cfg['tg_chat'] as $chat) {
        $msg = ['chat_id' => $chat, 'text' => $text];
        if (!empty($cfg['tg_thread'])) $msg['message_thread_id'] = (int)$cfg['tg_thread'];   // тема «Заявки с сайта»
        if (post_json('https://api.telegram.org/bot' . $cfg['tg_token'] . '/sendMessage', $msg, [], $i)) $sent++;
        $diag['tg'] = $i;
    }
}
if (!empty($cfg['max_token']) && !empty($cfg['max_chat'])) {
    foreach ((array)$cfg['max_chat'] as $chat) {
        if (post_json('https://platform-api.max.ru/messages?chat_id=' . urlencode($chat), ['text' => $text], ['Authorization: ' . $cfg['max_token']], $i)) $sent++;
        $diag['max'] = $i;
    }
}
if (!empty($cfg['email'])) {
    $subj = '=?UTF-8?B?' . base64_encode('Заявка с сайта youz.store') . '?=';
    if (@mail($cfg['email'], $subj, $text, "Content-Type: text/plain; charset=utf-8\r\nFrom: site@youz.store")) $sent++;
}
// ошибки отправки — в журнал (без токенов)
if (!$sent) file_put_contents($dir . '/errors.log', date('d.m.Y H:i') . ' ' . json_encode($diag, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND);
echo json_encode(['ok' => true, 'sent' => $sent] + (!empty($d['diag']) ? ['diag' => $diag] : []), JSON_UNESCAPED_UNICODE);
