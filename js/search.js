$(function() {
    $(".submit").click(function() {

        var keyword = $("#keyword").val();
        $("#keyword").val(keyword);

        // 非同期
        $spinner = GeneralFrame.showLoading();

        var keyword = $("#keyword").val();

        keyword = GeneralFrame.htmlSpecialChars(keyword);

        $.ajax({ 
            url: "/api/search_send_get.php?keyword=" + keyword,
            type: "GET",
            dataType: "json"
        })
        .done(function(res) {
            var html = "";
            //検索結果
            var array = res.response.Main;
            //全ヒット数
            var formattedTotalResults = res.response.Sub.SearchInformation.formattedTotalResults;
            //constants.phpで1回の検索で何件表示
            var displaySearchResult = res.response.DisplaySearchResult;
            //1回の限界検索表示
            var startIndex = res.response.Sub.Queries.nextPage[0].startIndex;

            //検索結果表示
            if(res.result) {
                array.map((obj, i)=>{
                    console.log(obj);
                    html += `<li class="itemList">`;
                    html += `<dl>`;
                    html += `<dt>`;
                    html += `<a href="${obj.Link}" class="itemLink">${obj.Link}`;
                    html += `<div class="itemTitle">${obj.Title}</div>`;
                    html += `</a>`;
                    html += `</dt>`;
                    html += `<dd class="itemSnippet">${obj.HtmlSnippet}</dd>`;
                    html += `</dl>`;
                    html += `</li>`;
                });
                html += `<p class="quantityTime">約 ${formattedTotalResults} 件 (上位 ${displaySearchResult * 10} サイトのみを表示)</p>`;

                $("#searchResult").html(html);
                GeneralFrame.hideLoading($spinner);

            //検索結果ない場合 
            } else {
                html += `<p class="errNone">検索結果はありません。/p>`
            }
        })
        //検索結果失敗
        .fail(function(jqXHR, textStatus, errorThrown) {

            alert("検索結果がありません。");
        })
    });

    return false
});