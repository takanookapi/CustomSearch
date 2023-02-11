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
            var array = res.response.Main;
            html += `${res.response.Sub.SearchInformation.formattedTotalResults}`;
            html += `${res.response.Sub.Queries.nextPage[0].startIndex}`;

            if(res.result) {
                array.map((obj, i)=>{
                    html += `<ul>`;
                    html += `<li>`;
                    html += `<dl>`;
                    html += `<dt><a href="${obj.Link}"></a>${obj.Title}<dt>`;
                    html += `<dd><a href="${obj.Link}"></a>${obj.Link}<dd>`;
                    html += `<dd>${obj.HtmlSnippet}<dd>`;
                    html += `</dl>`;
                    html += `</li>`;
                    html += `</li>`;
                });
                
                $("#searchResult").html(html);
                GeneralFrame.hideLoading($spinner);
            } else {

                alert(res.message);
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {

            alert("検索結果がありません。");
        })
    });

    return false
});