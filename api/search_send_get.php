<?php
require_once(dirname(__FILE__)."/../common/constants.php");

header("Content-type: application/json; charset=UTF-8");

$title = "Google検索一覧";

//結果保存用
$result = false;
$msg = "";
$ret = array();


if ($_GET["keyword"]) {

    $keyword = $_GET["keyword"];

    //検索されたキーワード
    $query = htmlspecialchars($keyword, ENT_QUOTES, "UTF-8");
    //取得スタート位置
    $start = 1;
    
    for($i = 1; $i <= DISPLAY_SEARCH_RESULT; $i++) {

        $arr = array (
            'key' => CUSTOM_SEARCH_API_KEY,
            'cx' => CUSTOM_SEARCH_ID,
            'q' => $query,
            'alt' => 'json',
            'start' => $start,
        );

        $param = http_build_query($arr);
        $requestURL = CUSTOM_SEARCH_URL . $param;

        $data = file_get_contents($requestURL, true);
        $json = json_decode($data, true);

        if(!empty($json['items'])) {

            foreach ($json['items'] as $index => $value) { 

                $ret[] = array (
                    "Title" => $value["title"],
                    "Link" => $value["link"],
                    "HtmlSnippet" => $value["htmlSnippet"],
                );
            }
            $result = true;
            $msg = "検索完了";
        }
    }
    $sub = array (
        "Queries" => $json["queries"],
        "SearchInformation" => $json["searchInformation"]
    );

} else {
    $msg = "検索文字が未入力です。";
}

$res = array (
    "result" => $result,
    "message" => $msg,
    "response" => array(
        "Main" => $ret,
        "Sub" => $sub,
        "DisplaySearchResult" => DISPLAY_SEARCH_RESULT
    )
);

echo json_encode($res);
?>