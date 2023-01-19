$(function() {
    $(".submit").click(function() {

        var keyword = $("#keyword").val();
        $("#keyword").val(keyword);

    });

    // 非同期
    //     GeneralFrame.showLoading();

    //     var keyword = $("#keyword").val();

    //     keyword = GeneralFrame.htmlSpecialChars(keyword);

    //     $.ajax({ 
    //         url: "/api/search_send_get.php?keyword=" + keyword,
    //         type: "GET",
    //         dataType: "json"
    //     })
    //     .done(function(res) {
    //         var html = "";
    //         var obj = res.response.Main;
    //         html += `${res.response.Sub.SearchInformation.formattedTotalResults}`;
    //         html += `${res.response.Sub.Queries.nextPage[0].startIndex}`;

    //         if(res.result) {
    //             Object.keys(obj).forEach(function(i) {

    //                 // 値が取れない
    //                 obj[i].forEach(function(arr, key) {
    //                     html += `<ul>`;
    //                     html += `<li>`;
    //                     html += `<dl>`;
    //                     html += `<dt><a href="${arr.Link}"></a>${arr.Title}<dt>`;
    //                     html += `<dd><a href="${arr.Link}"></a>${arr.Link}<dd>`;
    //                     html += `<dd>${arr.HtmlSnippet}<dd>`;
    //                     html += `</dl>`;
    //                     html += `</li>`;
    //                     html += `</li>`;
    //                 });
    //             });
    //             $("searchResult").html(html);
    //             GeneralFrame.HideLoading();
    //         } else {

    //             alert(res.message);
    //         }

    //         //検索秒数
    //         // console.log(res.response.Sub.Queries.searchTime + "秒")
    //     })
    //     .fail(function(jqXHR, textStatus, errorThrown) {

    //         alert("検索結果がありません。");
    //     })
    //     .always(function() {

    //         GeneralFrame.HideLoading();
    //     });
    // });
});