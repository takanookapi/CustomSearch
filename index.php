<?php
require(dirname(__FILE__)."/common/constants.php");
include(ROOT_PATH."/svg/svg.php");

$title = "Google検索";
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include(ROOT_PATH."/inc/head.php"); ?>
        <script type="text/javascript" src="../js/search.js" defer></script>
    </head>
    <body>
        <?php include(ROOT_PATH."/inc/header.php"); ?>

        <form action="/search_send.php" class="search" id="frmSearch">
            <input type="text" name="keyword" id="keyword" value="" placeholder="検索文字を入力" maxlength="32">
            <button class="submit" type="submit">
                <svg class="searchSvg">
                    <use xlink:href="#searchSvg"></use>
                </svg>
            </button>
        </form>

        <main id="searchResult">
            <!-- API -->
        </main>

        <?php include(ROOT_PATH."/inc/footer.php"); ?>
    </body>
</html>
