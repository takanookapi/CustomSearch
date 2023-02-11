<?php
require(dirname(__FILE__)."/common/constants.php");
include(ROOT_PATH."/svg/svg.php");


$msg = "";
$title = "Google検索一覧";

if ($_GET["keyword"]) {

    $keyword = $_GET["keyword"];
} else {

    $keyword = "";
    $msg = "検索文字を入力してください";
}

//検索文字
$query = htmlspecialchars($keyword, ENT_QUOTES, "UTF-8");

//検索始めの開始位置
$start = 1;
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include(ROOT_PATH."/inc/head.php"); ?>
        <script type="text/javascript" src="../js/search.js" defer></script>
    </head>
    <body>
        <?php include(ROOT_PATH."/inc/header.php"); ?>

        <form action="" class="search" id="frmSearch">
            <input type="text" name="keyword" id="keyword" value="<?php echo $keyword; ?>" placeholder="検索文字を入力" maxlength="32">
            <button class="submit" type="submit">
                <svg class="searchSvg">
                    <use xlink:href="#searchSvg"></use>
                </svg>
            </button>
        </form>
        <main id="searchResult">
            <?php if ($msg) { ?>

                <p class="errNone"><?php echo $msg; ?></p>

            <?php } else { ?>
            <ul>
                <?php 
                    for($i = 1; $i <= DISPLAY_SEARCH_RESULT; $i++) {

                        $paramArr = array(
                            "key" => CUSTOM_SEARCH_API_KEY,
                            "cx" => CUSTOM_SEARCH_ID,
                            "q" => $query,
                            "alt" => "json",
                            "start" => $start,
                        );
                        $params = http_build_query($paramArr);
                        $url = CUSTOM_SEARCH_URL . $params;

                        $json = @file_get_contents($url, true);
                        $arr = json_decode($json, true);

                        if ((empty($arr["items"])) || $json == false) {
                            
                            $msg = "検索結果はありません。";
                        }
                        if($msg) { 
                    ?>
                        <p class="errNone"><?php echo $msg; break;?></p>

                    <?php } else {  ?>
                        <?php  foreach ($arr["items"] as $key => $val) { ?>
                                <li class="itemList">
                                    <dl>
                                    <dt>
                                        <a class="itemLink" href="<?php echo $val["link"];?>"><?php echo htmlspecialchars($val["link"]); ?>
                                            <div class="itemTitle"><?php echo $val["title"]; ?></div>
                                        </a>
                                    </dt>
                                    <dd class="itemSnippet"><?php echo $val["htmlSnippet"]; ?></dd>
                                    </dl>
                                </li>
                    <?php 
                            }

                            if(isset($arr["queries"]["nextPage"][0]["startIndex"])) {  

                                $start = $arr["queries"]["nextPage"][0]["startIndex"];
                                
                            } else { 

                                break;
                            }
                        }
                    }; 
                ?>
                <p class="quantityTime"><?php echo "約 " . $arr["searchInformation"]["formattedTotalResults"] . " 件 " . $arr["searchInformation"]["formattedSearchTime"] . "秒" . " (上位".  DISPLAY_SEARCH_RESULT * 10 ."サイトのみを表示)"; ?></p>

            </ul>
            <?php }; ?>
        </main>
        <?php include(ROOT_PATH."/inc/footer.php"); ?>
    </body>
</html>